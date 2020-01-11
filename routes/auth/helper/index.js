const moment = require("moment-timezone");

module.exports = {
  calculateWeightGoalDates,
  getCaloricBudget,
  getAge
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
  const budget = Math.round(
    (10 * actual_weight_kg +
      6.25 * height_cm -
      5 * getAge(dob) +
      (sex === "Male" ? 5 : -161)) *
      activity_level
  );
  return budget;
}

/********************************************************
 *                        GET AGE                       *
 ********************************************************/
function getAge(dob) {
  let today = new Date();
  let birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDifference = today.getMonth() - birthDate.getMonth();
  let dayDifference = today.getDate() - birthDate.getDate();
  // handles edge case where if the user's birth month or birth day
  // falls after today's date, if that's the case decrement the age by 1
  // because they haven't yet hit their birthday
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  return age;
}

/********************************************************
 *                                                      *
 ********************************************************/
function calculateWeightGoalDates(newUser) {
  let {
    actual_weight_kg,
    goal_weight_kg,
    goal_weekly_weight_change_rate
  } = newUser;

  const weeklyChangeRateKg = toKG(goal_weekly_weight_change_rate);
  const differenceInKG = toPrecision2(actual_weight_kg - goal_weight_kg);
  const daysUntilGoal = Math.ceil(
    Math.abs(differenceInKG / weeklyChangeRateKg) * 7
  );
  // rounded up to the nearest day

  const goal_start_date = moment()
    .utc()
    .format();

  const goal_end_date = moment(goal_start_date)
    .utc()
    .add(daysUntilGoal, "d")
    .format();

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
