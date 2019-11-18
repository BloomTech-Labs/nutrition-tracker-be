const express = require('express');
const Auth = require('./authDB');
const router = express.Router();

/********************************************************
*                      AUTH/REGISTER                    *
********************************************************/
router.post('/register', validateRequest, async (req, res) => {
  let newUser = req.body;

  newUser.caloric_budget = getCaloricBudget(newUser);

  console.log(newUser.caloric_budget);

  try {
    newUser = await Auth.addUser(newUser);
    res.status(201).json({
      message: 'new user created',
      newUser
    });
  } catch (err) {
    res.status(500).json({
      errorMessage: err.message,
      error: err
    });
  }
});

/********************************************************
*                        MIDDLE-WARE                    *
********************************************************/
function validateRequest(req, res, next) {
  let newUser = req.body;
  if (
    newUser.firebase_id &&
    newUser.sex &&
    newUser.activity_level &&
    newUser.dob &&
    newUser.weight_kg &&
    newUser.height_cm &&
    newUser.weekly_goal_rate &&
    newUser.email
  ) {
    next();
  } else {
    res.status(400).json({
      errorMessage:
        "The request body must contain values for 'sex', 'activity_level', 'dob', 'weight_kg', and 'height_cm'"
    });
  }
}

/********************************************************
*                        FUNCTIONS                      *
********************************************************/
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

module.exports = router;
