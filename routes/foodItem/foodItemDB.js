const db = require("../../data/knex");
const dbPgp = require("../../data/pg-promise");

const getFoodItem = async foodLogID => {
  try {
    return await dbPgp.any(`
      select *
      from food_log
      where id = ${foodLogID}
    `);
  } catch (err) {
    return err;
  }
};

const updateFoodItem = async (foodLogId, data) => {

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



// Calories - CHANGED
//     Date - NOT CHANGED

  //increase/decrease the amount in daily nutrition totals for the current date
  //upsert the values in {changeNutritionalAmounts}
  applicableQueries.push(`
    update daily_nutrition_totals as dnt_update
    set 
      total_calories = f.calories_kcal * ${data.quantity},
      fat_calories = f.fat_g * 9 * ${data.quantity},
      protein_calories = f.protein_g * 4 * ${data.quantity},
      carbs_calories = f.carbs_g * 4 * ${data.quantity}
    from daily_nutrition_totals as dnt_current
    inner join (select fl.*, f.calories_kcal * fl.quantity from food_log as fl inner join foods as f on f.id = fl.food_id) as log_data
    on
      dnt_current.user_id = food_log.user_id AND
      dnt_current.date = food_log.daily_nutrition_totals_date

    where
      dnt_current.id = dnt_update.id AND

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

const deleteFoodItem = foodLogId => {
  return await dbPgp.any(`
    delete from food_log
    where id = ${foodLogId}
    returning *
`);
};

module.exports = {
  getFoodItem,
  updateFoodItem,
  deleteFoodItem
};
