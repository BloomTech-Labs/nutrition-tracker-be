const user_id = 1;
const time_zone = `CST`;
const start_date = `2019-12-15`;
const end_date = `2020-01-31`;

const actualWeightOverTime = require("./actualWeightOverTimeDB");
const goalWeightOverTime = require("./goalWeightOverTimeDB");
const weightOverTime = require("./weightOverTimeDB");

async function main() {
  //executes actualWeightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  // console.log(await actualWeightOverTime(user_id, time_zone, start_date, end_date));

  //executes goalWeightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  // console.log(await goalWeightOverTime(user_id, time_zone, start_date, end_date));

  //executes weightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  console.log(await weightOverTime(user_id, time_zone, start_date, end_date));
}

main();
