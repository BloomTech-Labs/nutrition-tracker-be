const db = require("../../data/knex");
const dbPgp = require("../../data/pg-promise");

const getFoodLogID = async foodLogId => {
  try {
    return await dbPgp.any(`
      select *
      from food_log
      where id = ${foodLogId}
    `);
  } catch (err) {
    return err;
  }
};

const updateFoodLogID = async (foodLogId, data) => {

  //updates daily_nutrition_totals, and then updates actual food log entry

  //using sql UNION to produce a set of records
  //that are then used to update the values in daily nutrition totals
  //if the situation in a particular "sub" query does not apply, 
  //that subquery will produce no records, and thus cause no updates

  const applicableQueries = [];
  
// Calories - NOT CHANGED
//     Date - NOT CHANGED

  //do nothing with daily nutrition totals
  //ie the food log entry had its time updated, but not its date

  //this section just here for human readability.

  //expects "food_log as fl", and "foods as f"
  const calculated_fields_sql = 
     `fl.daily_nutrition_totals_date as date, 
      f.calories_kcal * fl.quantity as total_calories,
      f.fat_g * fl.quantity * 9 as fat_calories,
      f.protein_g * fl.quantity * 4 as protein_calories,
      f.carbs_g * fl.quantity * 4 as carbs_calories`

  const current_values = 
   `select 
      ${calculated_fields_sql}
    from food_log as fl 
    inner join foods as f on 
      f.id = fl.food_id
    where fl.id = ${foodLogId}`

  const synthetic_food_log_record_new_values = `
    select 
      fl.food_id,
      '${data.daily_nutrition_totals_date}' as daily_nutrition_totals_date, 
      ${data.quantity} as quantity,
    from 
      (select food_id from food_log where id = ${foodLogId}) as fl
  `

  const new_values = `
    select 
      ${calculated_fields_sql}
    from (${synthetic_food_log_record_new_values}) as fl 
    inner join foods as f on f.id = fl.food_id

  `


  const daily_nutrition_totals_updated = `
  select 
    f.calories_kcal * ${data.quantity} as total_calories,
    fat_calories = f.fat_g * 9 * ${data.quantity},
    protein_calories = f.protein_g * 4 * ${data.quantity},
    carbs_calories = f.carbs_g * 4 * ${data.quantity}
  from 
  `

// Calories - CHANGED
//     Date - NOT CHANGED

  //increase/decrease the amount in daily nutrition totals for the current date
  //upsert the values in {changeNutritionalAmounts}
  applicableQueries.push(`
    update daily_nutrition_totals as dnt_update
    set 

    from daily_nutrition_totals as dnt_current
    inner join (select fl.*, f.calories_kcal * fl.quantity from food_log as fl inner join foods as f on f.id = fl.food_id) as log_data
    on
      dnt_current.user_id = food_log.user_id AND
      dnt_current.date = food_log.daily_nutrition_totals_date
    where
      dnt_current.id = dnt_update.id AND
      (dnt_current.quantity != ${data.quantity} OR dnt_current.serving_id != ${data.serving_id}) AND
      dnt_current.daily_nutrition_totals '${data.daily_nutrition_totals_date}'

    where 
      dnt.daily_nutrition_totals '${data.daily_nutrition_totals_date}'
  `)


// Calories - CHANGED
//     Date - NOT CHANGED

  //decrease the calories etc on the _original_ date in daily nutrition totals
  //by the amount of {existingNutritionalAmounts},
  //aka the amount of the (unchanged in quantity) food log entry
  //upsert the calories of {existingNutritionalAmounts} into the _new_ date
  applicableQueries.push(`

  `)
  

// Calories - NOT CHANGED
//     Date - CHANGED

  //decrease the calories etc on the _original_ date in daily nutrition totals
  //by the amount of {existingNutritionalAmounts},
  //aka the amount of the _original_ food log entry
  //upsert the values in {changeNutritionalAmounts}
  //aka the calories of the _new_ food log entry, into the _new_ date
  applicableQueries.push(`

  `)


  const joinString = 
    `
      UNION
    `

  const updateDailyNutritionTotalsSql = applicableQueries.join(joinString)

  const updateFoodLogSql = `
    update food_log
    set 
      quantity = ${data.quantity},
      serving_id = ${data.serving_id},
      time_consumed_at = '${data.time_consumed_at}',
      daily_nutrition_totals_date = '${data.daily_nutrition_totals_date}'
    where id = ${foodLogId}
    returning *
  `

  dbPgp.tx(t => {
    //.tx is pg-promise's transaction functionality which works great
    //upo
    return t.batch([
        t.none(updateDailyNutritionTotalsSql),
        t.any(updateFoodLogSql)
    ]);
})
    .then(data => {
        // success;
    })
    .catch(error => {
        // error;
    });
  try {
    return await dbPgp.any(`

    `);
  } catch (err) {
    return err;
  }
};

const deleteFoodLogID = foodLogId => {
  return await dbPgp.any(`
    delete from food_log
    where id = ${foodLogId}
    returning *
`);
};

module.exports = {
  getFoodLogID,
  updateFoodLogID,
  deleteFoodLogID
};
