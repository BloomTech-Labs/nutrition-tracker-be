const user_id = 1;
const time_zone = `CST`;
const start_date = `2019-12-20`;
const end_date = `2020-01-31`;

const actualWeightOverTime = require("./actualWeightOverTimeDB");
const goalWeightOverTime = require("./goalWeightOverTimeDB");
const targetGoalWeightOverTimeDB = require("./targetGoalWeightOverTimeDB");
const weightOverTime = require("./weightOverTimeDB");

const actualCaloriesOverTime = require("./actualCaloriesOverTimeDB");
const goalCaloriesOverTime = require("./goalCaloriesOverTimeDB");
const caloriesOverTime = require("./caloriesOverTimeDB");

async function runWeightOverTime() {
  //executes actualWeightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  // console.log(await actualWeightOverTime(user_id, time_zone, start_date, end_date));

  //executes goalWeightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  // console.log(await goalWeightOverTime(user_id, time_zone, start_date, end_date));

  //executes targetGoalWeightOverTimeDB function with some hardcoded example values which creates SQL and runs the query in pg-promise
  // console.log(await targetGoalWeightOverTimeDB(user_id, time_zone, start_date, end_date));

  //executes weightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  console.log(await weightOverTime(user_id, time_zone, start_date, end_date));
}

async function runCaloriesOverTime() {
  //executes actualCaloriesOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  // console.log(await actualCaloriesOverTime(user_id, start_date, end_date));

  //executes goalCaloriesOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  // console.log(await goalCaloriesOverTime(user_id, time_zone, start_date, end_date));

  //executes caloriesOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  console.log(await caloriesOverTime(user_id, time_zone, start_date, end_date));
}

runWeightOverTime();
runCaloriesOverTime();
