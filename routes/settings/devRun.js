const updateGoalDateIfNecessary = require("./updateGoalDateIfNecessary.js");
const { recalcAndUpdateCaloricBudget } = require("./recalcAndUpdateCaloricBudget.js");

async function wrapper() {
  // recalcAndUpdateCaloricBudget(1);
  updateGoalDateIfNecessary(1, "CST");
}

wrapper();
