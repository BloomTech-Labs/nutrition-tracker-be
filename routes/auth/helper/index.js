const moment = require("moment-timezone");

module.exports = {
  calculateWeightGoalDates,
  getCaloricBudget,
  getAge,
  updateGoalDateIfNecessary,
  addGoalWeeklyRateChangeRate
};

/********************************************************
 *                   GET CALORIC BUDGET                 *
 ********************************************************/
// Calculates a user's caloric budget using the
// Mifflin-St. Jeor Equation for BMR (Basal Metabolic Rate)
// mutiplied by an Activity Factor of (1.2 - 1.9)
// https://www.calculator.net/bmr-calculator.html
function getCaloricBudget(newUser) {
  let { sex, activity_level, dob, actual_weight_kg, height_cm } = newUser;

  return Math.round(
    (10 * actual_weight_kg +
      6.25 * height_cm -
      5 * getAge(dob) +
      (sex === "Male" ? 5 : -161)) *
      activity_level
  );
}

/********************************************************
 *                        GET AGE                       *
 ********************************************************/
function getAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();
  // handles edge case where if the user's birth month or birth day
  // falls after today's date, if that's the case decrement the age by 1
  // because they haven't yet hit their birthday
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  return age;
}

function afterWeightGoalIsAchieved(user) {
  // wat do when we achieve our goal
}

function isWeightGoalAttainable(newUser) {
  const maximum_abs_change_rate_kg = toKG(2);
  const weeks_until_goal_end_date = (goal_end_date - current_date) / 7;

  const largest_possible_weight_change_by_end_date = maximum_abs_change_rate_kg * weeks_until_goal_end_date;

  const abs_remaining_weight_change_to_meet_goal = abs(goal_weight_kg - current_weight_kg);

  if (largest_possible_weight_change_by_end_date < abs_remaining_weight_change_to_meet_goal) {
    return false;
  }

  // ELSE
  return true;
}

function updateGoalDateIfNecessary() {
  if (!isWeightGoalAttainable()) {
    updateWeightGoal();
  }
}

function updateWeightGoal() {
  // insert into user_budget_data(user_id, goal_start_date, goal_end_date)
  // calculateWeightGoalDates()
}

/********************************************************
 *                                                      *
 ********************************************************/
function calculateWeightGoalDates(newUser) {
  console.log("here");
  let { actual_weight_kg, goal_weight_kg, goal_weekly_weight_change_rate } = newUser;

  // const current_goal_end_date = ???
  // const calculated_potential_new_goal_end_date

  const change_rate_kg = toKG(goal_weekly_weight_change_rate);
  const differenceInKG = toPrecision2(actual_weight_kg - goal_weight_kg);
  const weeksUntilGoal = Math.ceil(Math.abs(differenceInKG / change_rate_kg) * 7) / 7;
  // rounded up to the nearest day

  const goal_start_date = moment()
    .utc()
    .format();

  const goal_end_date = moment(goal_start_date)
    .utc()
    .add(weeksUntilGoal, "w")
    .format();

  const calculated_potential_new_goal_end_date = goal_end_date;

  return {
    goal_start_date,
    goal_end_date
  };
}

// converts kg to lbs and rounds to nearest 100th's place
function toKG(lbs) {
  return toPrecision2(lbs / 2.205);
}

// rounds to nearest 100th's place
function toPrecision2(num) {
  return Math.round(100 * num) / 100;
}
