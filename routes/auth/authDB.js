const db = require("../../data/knex");
module.exports = {
  addUser
};

async function addUser(newUser) {
  const trx = await db.transaction();

  return insertUser(newUser, trx)
    .then(([id]) => {
      newUser.user_id = id;
      return insertUserBudgetData(newUser, trx);
    })
    .then(() => {
      return insertUserMetricData(newUser, trx);
    })
    .then(() => {
      return findUserById(newUser.user_id, trx);
    })
    .then(newUser => {
      trx.commit();
      return newUser;
    })
    .catch(err => {
      trx.rollback();
      throw new Error(err);
    });
}

function insertUser(newUser, trx) {
  const { firebase_id, email, dob, height_cm, sex } = newUser;
  return db("users")
    .transacting(trx)
    .insert({
      firebase_id,
      email,
      dob,
      height_cm,
      sex
    })
    .returning("id");
}

function insertUserBudgetData(newUser, trx) {
  const { user_id, activity_level, weekly_goal_rate, caloric_budget } = newUser;
  return trx("user_budget_data").insert({
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
}

function insertUserMetricData(newUser, trx) {
  const { user_id, weight_kg } = newUser;
  return trx("user_metric_history").insert({
    user_id,
    weight_kg,
    observation_time: toSQLDateTime(new Date())
  });
}

function findUserById(id, trx) {
  return trx("users as u")
    .join("user_budget_data as ubd", "ubd.user_id", "=", id)
    .join("user_metric_history as umh", "umh.user_id", "=", id)
    .select(
      "u.firebase_id",
      "u.email",
      "u.sex",
      "u.dob",
      "u.height_cm",
      "umh.weight_kg",
      "ubd.activity_level",
      "ubd.weekly_goal_rate",
      "ubd.caloric_budget",
      "ubd.fat_ratio",
      "ubd.carb_ratio",
      "ubd.protein_ratio"
    )
    .where("u.id", "=", id);
}