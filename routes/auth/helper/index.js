module.exports = {
  getCaloricBudget,
  getAge
}

/********************************************************
*                   GET CALORIC BUDGET                  *
********************************************************/
// Calculates a user's caloric budget using the 
// Mifflin-St. Jeor Equation for TDEE (Total Daily Energy Expediture)
// mutiplies by Activity Level 
function getCaloricBudget(newUser) {
  let { sex, activity_level, dob, weight_kg, height_cm } = newUser;

  return Math.round(
    (10 * weight_kg +
      6.25 * height_cm +
      (sex === 'male' ? 5 : -161) * getAge(dob)) *
      activity_level
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

/********************************************************
*                    TO SQL DATE TIME                   *
********************************************************/
// converts ISO Date-Time format to SQL datetime format
// ex: 2019-11-19T03:27:02.313Z ---> 2019-11-19 03:31:51
function toSQLDateTime(now) {
  return now.toISOString().split("T").join(" ").split(".")[0];
}