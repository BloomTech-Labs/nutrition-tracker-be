const user_id = 1;
const time_zone = `CST`;
const start_date = `2019-12-15`;
const end_date = `2020-01-31`;

const actualWeightOverTime = require("./actualWeightOverTimeDB");
const goalWeightOverTime = require("./goalWeightOverTimeDB");
const weightOverTime = require("./weightOverTimeDB");

async function main() {
  //executes actualWeightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise

  const actual_weight_over_time = await actualWeightOverTime(
    user_id,
    time_zone,
    start_date,
    end_date
  );

  const goal_weight_over_time = await goalWeightOverTime(
    user_id,
    time_zone,
    start_date,
    end_date
  );

  const weight_over_time = await weightOverTime(
    user_id,
    time_zone,
    start_date,
    end_date
  );

  // console.log("actualWeightOverTime:\n", actual_weight_over_time);

  // //executes goalWeightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  // console.log("goalWeightOverTime:\n", goal_weight_over_time);

  //executes weightOverTime function with some hardcoded example values which creates SQL and runs the query in pg-promise
  console.log("weightOverTime:\n", weight_over_time);

  // console.log("actual_weight_over_time:", actual_weight_over_time.length);
  // console.log("goal_weight_over_time:", goal_weight_over_time.length);
  console.log("weight_over_time:", weight_over_time.length);
}

// main();

module.exports = main;
