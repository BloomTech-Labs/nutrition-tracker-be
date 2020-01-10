module.exports = {
  getCaloricBudget,
  getAge
};

/********************************************************
 *                   GET CALORIC BUDGET                  *
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
 *                        GET AGE                        *
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
