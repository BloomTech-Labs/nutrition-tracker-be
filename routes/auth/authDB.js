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
  const {
    user_id,
    activity_level,
    goal_weekly_weight_change_rate,
    caloric_budget,
    actual_weight_kg,
    goal_weight_kg,
    goal_start_date,
    goal_end_date
  } = newUser;

  return trx("user_budget_data").insert({
    user_id,
    activity_level,
    goal_weekly_weight_change_rate,
    actual_weight_kg,
    goal_weight_kg,
    goal_start_date,
    goal_end_date,
    caloric_budget,
    // USDA Recommended Macronutrient Ratios
    carb_ratio: 0.5,
    protein_ratio: 0.3,
    fat_ratio: 0.2
  });
}

function findUserById(id, trx) {
  return trx("users as u")
    .join("user_budget_data as ubd", "ubd.user_id", "=", id)
    .select(
      "u.firebase_id",
      "u.email",
      "u.sex",
      "u.dob",
      "u.height_cm",
      "ubd.actual_weight_kg",
      "ubd.goal_weight_kg",
      "ubd.activity_level",
      "ubd.goal_weekly_weight_change_rate",
      "ubd.caloric_budget",
      "ubd.fat_ratio",
      "ubd.carb_ratio",
      "ubd.protein_ratio"
    )
    .where("u.id", "=", id);
}
