const express = require("express");
const Auth = require("./authDB");
const router = express.Router();
const {
  getCaloricBudget,
  calculateWeightGoalDates
} = require("./helper/index");

/********************************************************
 *                      AUTH/REGISTER                    *
 ********************************************************/
router.post("/register", validateRequest, async (req, res) => {
  let newUser = req.body;
  let { goal_start_date, goal_end_date } = calculateWeightGoalDates(newUser);

  newUser.caloric_budget = getCaloricBudget(newUser);
  newUser.goal_start_date = goal_start_date;
  newUser.goal_end_date = goal_end_date;

  try {
    res.status(201).json({
      message: "new user created",
      newUser: await Auth.addUser(newUser)
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

/********************************************************
 *                        MIDDLE-WARE                    *
 ********************************************************/
function validateRequest(req, res, next) {
  let newUser = req.body;
  if (
    newUser &&
    newUser.firebase_id &&
    newUser.sex &&
    newUser.activity_level &&
    newUser.dob &&
    newUser.actual_weight_kg &&
    newUser.goal_weight_kg &&
    newUser.height_cm &&
    // !isNaN() handles occurrence of falsey value when value of obj property is 0
    // it will return false if data-type is not a number, i.e. when data-type is undefined
    !isNaN(newUser.goal_weekly_weight_change_rate) &&
    newUser.email
  ) {
    next();
  } else {
    res.status(400).json({
      errorMessage:
        "The request body must contain values for 'firebase_id', 'sex', 'activity_level', 'dob', 'actual_weight_kg', 'goal_weight_kg', 'height_cm', 'goal_weekly_weight_change_rate', and 'email'"
    });
  }
}

module.exports = router;
