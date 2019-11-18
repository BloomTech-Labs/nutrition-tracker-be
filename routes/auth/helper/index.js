module.exports = {
  getCaloricBudget,
  getAge
}

// Calculates a user's caloric budget using the 
// Mifflin-St. Jeor Equation for TDEE (Total Daily Energy Expediture)
// mutiplies by Activity Level 
function getCaloricBudget(newUser) {
  let { sex, activity_level, dob, weight_kg, height_cm } = newUser;

  // (Mifflin-St. Jeor Equation for TDEE) * Activity Level
  return Math.round(
    (10 * weight_kg +
      6.25 * height_cm +
      (sex === 'male' ? 5 : -161) * getAge(dob)) *
      activity_level
  );
}

function getAge(dob) {
  const today = new Date();
  const birthDate = new Date(dob);
  const age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}