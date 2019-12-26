const user_id = 1;
const time_zone = `CST`;
const goal_start_date = `2019-12-20`;
const goal_end_date = `2020-01-31`;

const weightOverTime = require("./weightOverTimeDB");

async function main() {
  console.log(await weightOverTime(user_id, time_zone, goal_start_date, goal_end_date));
}

main();
