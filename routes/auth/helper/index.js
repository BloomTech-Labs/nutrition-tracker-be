module.exports = {
  getCaloricBudget,
  getAge
};

/********************************************************
 *                   GET CALORIC BUDGET                  *
 ********************************************************/
// Calculates a user's caloric budget using the
// Mifflin-St. Jeor Equation for BMR (Basal Metabolic Rate)
// mutiplied by an Activity Level (1.2 - 1.9)
// https://www.calculator.net/bmr-calculator.html
function getCaloricBudget(newUser) {
  let { sex, activity_level, dob, weight_kg, height_cm } = newUser;

  return Math.round((
    (10 * weight_kg) 
    + (6.25 * height_cm) 
    - (5 * getAge(dob)) 
    + (sex === "male" ? 5 : -161)) 
    * activity_level
  );
}

/********************************************************
 *                        GET AGE                        *
 ********************************************************/
function getAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
