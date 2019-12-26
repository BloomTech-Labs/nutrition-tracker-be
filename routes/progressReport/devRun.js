const user_id = 1;
const time_zone = `CST`;
const goal_start_date = `2019-12-15`;
const goal_end_date = `2020-01-31`;

const actualWeightOverTime = require("./actualWeightOverTimeDB");
const goalWeightOverTime = require("./goalWeightOverTimeDB");

async function main() {
  //executes actualWeightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  console.log(await actualWeightOverTime(user_id, time_zone, goal_start_date, goal_end_date));

  //executes goalWeightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  console.log(await goalWeightOverTime(user_id, time_zone, goal_start_date, goal_end_date));
}

main();
