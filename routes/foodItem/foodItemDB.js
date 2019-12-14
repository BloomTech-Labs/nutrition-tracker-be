const db = require("../../data/knex");

const getFoodItem = (foodLogID, userID) => {
  return db("food_log as fl").where({ id: foodLogID, user_id: userID });
};

const updateFoodItem = () => {};

module.exports = {
  getFoodItem
};
