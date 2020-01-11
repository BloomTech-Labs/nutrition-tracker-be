const { db } = require("../../data/pg-promise");

module.exports = {
  getLogEntry,
  addLogEntry,
  updateLogEntry,
  removeLogEntry
};

async function getLogEntry(foodLogId) {
  try {
    return await db.any(`
      select *
      from food_log
      where id = ${foodLogId}
    `);
  } catch (err) {
    return err;
  }
}

async function addLogEntry(data) {
  const daily_nutrition_totals_values = `
    select 
      ${data.user_id} as user_id,
      '${data.daily_nutrition_totals_date}'::date as date, 
      f.calories_kcal * ${data.quantity} as total_calories,
      f.fat_g * ${data.quantity} * 9 as fat_calories,
      f.protein_g * ${data.quantity} * 4 as protein_calories,
      f.carbs_g * ${data.quantity} * 4 as carbs_calories
    from foods as f
    where f.id = ${data.food_id}
  `;

  const updateDailyNutritionTotalsSql = `
    insert into daily_nutrition_totals as t
      (user_id, date, total_calories, fat_calories, protein_calories, carbs_calories)
    ${daily_nutrition_totals_values}
    ON CONFLICT(user_id, date) DO UPDATE SET
      total_calories = t.total_calories + EXCLUDED.total_calories,
      fat_calories = t.fat_calories + EXCLUDED.fat_calories,
      protein_calories = t.protein_calories + EXCLUDED.protein_calories,
      carbs_calories = t.carbs_calories + EXCLUDED.carbs_calories
    ;
  `;

  const addFoodLogSql = `
    insert into food_log (
      user_id, 
      food_id, 
      fatsecret_food_id, 
      serving_id, 
      time_consumed_at, 
      daily_nutrition_totals_date, 
      time_zone_name, 
      time_zone_abbr, 
      quantity
    )
    values (
      ${data.user_id}, 
      ${data.food_id}, 
      ${data.fatsecret_food_id}, 
      ${data.serving_id}, 
      '${data.time_consumed_at}',
      '${data.daily_nutrition_totals_date}',
      '${data.time_zone_name}',
      '${data.time_zone_abbr}',
      ${data.quantity}
    )
    returning *;
  `;

  return db
    .tx(async t => {
      console.log(updateDailyNutritionTotalsSql);
      await t.none(updateDailyNutritionTotalsSql);
      return await t.any(addFoodLogSql);
    })
    .catch(error => {
      return error;
    });
}

async function updateLogEntry(foodLogId, data) {
  //updates daily_nutrition_totals, and then updates actual food log entry

  //using sql UNION to produce a set of records
  //that are then used to update the values in daily nutrition totals
  //if the situation in a particular "sub" query does not apply,
  //that subquery will produce no records, and thus cause no updates

  //do nothing with daily nutrition totals
  //ie the food log entry had its time updated, but not its date

  //this section just here for human readability.

  //expects "food_log as fl", and "foods as f"
  const calculated_fields_sql = `
      fl.user_id,
      fl.daily_nutrition_totals_date as date, 
      f.calories_kcal * fl.quantity as total_calories,
      f.fat_g * fl.quantity * 9 as fat_calories,
      f.protein_g * fl.quantity * 4 as protein_calories,
      f.carbs_g * fl.quantity * 4 as carbs_calories
  `;

  const current_values = `
    select 
      ${calculated_fields_sql}
    from food_log as fl 
    inner join foods as f on 
      f.id = fl.food_id
    where fl.id = ${foodLogId}
  `;

  const synthetic_food_log_record_new_values = `
    select 
      ${data.food_id} as food_id,
      fl.user_id,
      '${data.daily_nutrition_totals_date}'::date as daily_nutrition_totals_date, 
      ${data.quantity} as quantity
    from 
      (select food_id, user_id from food_log where id = ${foodLogId}) as fl
  `;

  const new_values = `
    select 
      ${calculated_fields_sql}
    from (${synthetic_food_log_record_new_values}) as fl 
    inner join foods as f on f.id = fl.food_id
  `;

  const new_current_change_values = `
    select
      cv.user_id,

      cv.date as current_date,
      cv.total_calories as current_total_calories,
      cv.fat_calories as current_fat_calories,
      cv.protein_calories as current_protein_calories,
      cv.carbs_calories as current_carbs_calories,

      nv.date as new_date,
      
      nv.total_calories - cv.total_calories as change_total_calories,
      nv.fat_calories - cv.fat_calories as change_fat_calories,
      nv.protein_calories - cv.protein_calories as change_protein_calories,
      nv.carbs_calories - cv.carbs_calories as change_carbs_calories,

      cv.total_calories <> nv.total_calories as updatedDailyNutritionTotalsAmount,
      cv.date <> nv.date as updatedDailyNutritionTotalsDate
    from (${current_values}) as cv 
    cross join (${new_values}) as nv
  `;

  const upsert_values = `
--simple increase/decrease of calories from change in quantity &/or serving size
  select 
    v.user_id,
    v.current_date as date,
    v.change_total_calories as total_calories,
    v.change_fat_calories as fat_calories,
    v.change_protein_calories as protein_calories,
    v.change_carbs_calories as carbs_calories
  from (${new_current_change_values}) as v
  where 
    v.updatedDailyNutritionTotalsAmount

UNION

--for changes of dates, we need to both back out the (calorie) values from the old date, 
--and add the (calorie) values into the new date 

--requires 2 queries, one for each date affected

--removing calories from current date
  select 
    v.user_id,
    v.current_date as date,
    -v.current_total_calories as total_calories,
    -v.current_fat_calories as fat_calories,
    -v.current_protein_calories as protein_calories,
    -v.current_carbs_calories as carbs_calories
  from (${new_current_change_values}) as v
  where 
    v.updatedDailyNutritionTotalsDate

UNION

--adding calories to new date
  select 
    v.user_id,
    v.new_date as date,
    v.current_total_calories as total_calories,
    v.current_fat_calories as fat_calories,
    v.current_protein_calories as protein_calories,
    v.current_carbs_calories as carbs_calories
  from (${new_current_change_values}) as v
  where 
    v.updatedDailyNutritionTotalsDate
`;

  const updateDailyNutritionTotalsSql = `
    insert into daily_nutrition_totals as t
      (user_id, date, total_calories, fat_calories, protein_calories, carbs_calories)
    ${upsert_values}
    ON CONFLICT(user_id, date) DO UPDATE SET
      total_calories = t.total_calories + EXCLUDED.total_calories,
      fat_calories = t.fat_calories + EXCLUDED.fat_calories,
      protein_calories = t.protein_calories + EXCLUDED.protein_calories,
      carbs_calories = t.carbs_calories + EXCLUDED.carbs_calories
    ;
  `;

  const updateFoodLogSql = `
    update food_log
    set 
      food_id = ${data.food_id},
      fatsecret_food_id = ${data.fatsecret_food_id},
      serving_id = ${data.serving_id},
      quantity = ${data.quantity},
      time_consumed_at = '${data.time_consumed_at}',
      time_zone_name = '${data.time_zone_name}',
      time_zone_abbr = '${data.time_zone_abbr}',
      daily_nutrition_totals_date = '${data.daily_nutrition_totals_date}'
    where id = ${foodLogId}
    returning *;
  `;

  return db
    .tx(async t => {
      await t.none(updateDailyNutritionTotalsSql);
      return await t.any(updateFoodLogSql);
    })
    .catch(error => {
      return error;
    });
}

async function removeLogEntry(foodLogId) {
  const current_values = `
    select 
      fl.user_id,
      fl.daily_nutrition_totals_date as date, 
      f.calories_kcal * fl.quantity as current_total_calories,
      f.fat_g * fl.quantity * 9 as current_fat_calories,
      f.protein_g * fl.quantity * 4 as current_protein_calories,
      f.carbs_g * fl.quantity * 4 as current_carbs_calories
    from food_log as fl 
    inner join foods as f on 
      f.id = fl.food_id
    where fl.id = ${foodLogId}
  `;

  const upsert_values = `
    select 
      v.user_id,
      v.date,
      -v.current_total_calories as total_calories,
      -v.current_fat_calories as fat_calories,
      -v.current_protein_calories as protein_calories,
      -v.current_carbs_calories as carbs_calories
    from (${current_values}) as v
  `;

  const updateDailyNutritionTotalsSql = `
    insert into daily_nutrition_totals as t
      (user_id, date, total_calories, fat_calories, protein_calories, carbs_calories)
    ${upsert_values}
    ON CONFLICT(user_id, date) DO UPDATE SET
      total_calories = t.total_calories + EXCLUDED.total_calories,
      fat_calories = t.fat_calories + EXCLUDED.fat_calories,
      protein_calories = t.protein_calories + EXCLUDED.protein_calories,
      carbs_calories = t.carbs_calories + EXCLUDED.carbs_calories
    ;
  `;

  return db
    .tx(async t => {
      await t.none(updateDailyNutritionTotalsSql);
      return await t.any(`
        delete from food_log
        where id = ${foodLogId}
        returning *
      `);
    })
    .catch(error => {
      return error;
    });
}
