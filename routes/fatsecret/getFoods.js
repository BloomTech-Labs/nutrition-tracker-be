const db = require("../data/dbConfig.js");
// const moment = require("moment")

module.exports = {
  // getAll,
  getServingsByFatsecretFoodId,
  // getById,
  // insert,
  // update,
  // remove
};

// function getAll() {
//   return db("Habit_Tracking");
// }


function getServingsByFatsecretFoodId(fatsecret_food_id) {
  // calculate current time, minus 22 hours -- to make sure we dont overlap with fatsecret's cache time length maximum of 24 hours.
  // 22h = 1000ms*60s*60min*22hrs = 79200000 = 79.2*10**6 = 79.2 million ms
  const oneMillion = 10**6
  const cacheCutoff = new Date(Date.now() - 79.2*oneMillion);
  // use moment to calc 22 hours before now, to use pass to .where() clause
  return db("foods as f")
    .select("f.*")
    .where("f.fatsecret_food_id", fatsecret_food_id)
    .where("f.retrieved_at", ">", cacheCutoff);
}

// function getById(id) {
//   return db("Habit_Tracking")
//     .where("id", id)
//     .first();
// }

// function insert(habit_done) {
//   return db("Habit_Tracking")
//     .insert(habit_done)
//     .then(([id]) => this.getById(id));
// }

// function update(updated_habit_done, id) {
//   return db("Habit_Tracking")
//     .where("id", id)
//     .update(updated_habit_done)
//     .then(count => (count > 0 ? this.getById(id) : null));
// }

// async function remove(id) {
//   const habitTracked = await getById(id);
//   await db("Habit_Tracking")
//     .where("id", id)
//     .del();
//   return habitTracked;
}
