const db = require('../../data/knex');

module.exports = {
  addUser
};

async function addUser({
  firebase_id,
  email,
  dob,
  height_cm,
  sex,
  activity_level,
  weekly_goal_rate,
  caloric_budget,
  weight_kg
}) {
  
  const [user_id] = await db('users')
    .insert({
      firebase_id,
      email,
      dob,
      height_cm,
      sex
    })
    .returning('id');

  await db('user_budget_data').insert({
    user_id,
    start_date: new Date(),
    activity_level,
    weekly_goal_rate,
    caloric_budget,
    // USDA Recommended Macronutrient Ratios
    carb_ratio: 0.5,
    protein_ratio: 0.3,
    fat_ratio: 0.2
  });

  await db('user_metric_history').insert({
    user_id,
    weight_kg,
    observation_time: toSQLDateTime(new Date())
  });

  return findById(user_id);
}

/********************************************************
*                      FUNCTIONS                        *
********************************************************/
function findById(id) {
  return db('users').where({ id }).first();
}

// converts ISO Date-Time format to SQL datetime format
// ex: 2019-11-19T03:27:02.313Z ---> 2019-11-19 03:31:51
function toSQLDateTime(now) {
  return now.toISOString().split('T').join(' ').split('.')[0];
}