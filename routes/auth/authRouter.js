const express = require('express');
const Auth = require('./authDB');
const router = express.Router();
const {getCaloricBudget, getAge} = require('./helper')

/********************************************************
*                      AUTH/REGISTER                    *
********************************************************/
router.post('/register', validateRequest, async (req, res) => {
  let newUser = req.body;

  newUser.caloric_budget = getCaloricBudget(newUser);

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

module.exports = router;
