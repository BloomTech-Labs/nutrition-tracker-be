const user_id = 1;
const time_zone = `CST`;
const goal_start_date = `2019-12-15`;
const goal_end_date = `2020-01-31`;

const weightOverTime = require("./weightOverTimeDB");
const goalWeightOverTime = require("./goalWeightOverTimeDB");

async function main() {
  //executes weightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  console.log(await weightOverTime(user_id, time_zone, goal_start_date, goal_end_date));

  //executes weightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  console.log(await goalWeightOverTime(user_id, time_zone, goal_start_date, goal_end_date));
}

main();
