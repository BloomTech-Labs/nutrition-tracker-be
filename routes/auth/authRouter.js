const express = require("express");
const Auth = require("./authDB");
const router = express.Router();
const { getCaloricBudget, getAge } = require("./helper");

/********************************************************
*                      AUTH/REGISTER                    *
********************************************************/
router.post("/register", validateRequest, async (req, res) => {
  let newUser = req.body;

  newUser.caloric_budget = getCaloricBudget(newUser);

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
    newUser.goal_weekly_weight_change_rate &&
    newUser.email
  ) {
    next();
  } else {
    res.status(400).json({
      errorMessage:
        "The request body must contain values for 'firebase_id', 'sex', 'activity_level', 'dob', 'weight_kg', 'height_cm', 'weekly_goal_rate', and 'email'"
    });
  }
}

module.exports = router;
