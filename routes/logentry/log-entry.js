const express = require("express");
const LogEntry = require("./log-entry-model.js");
const router = express.Router();

/********************************************************
*                      POST/LOG-ENTRY                   *
********************************************************/
router.post("/log-entry", validateRequest, async (req, res) => {

});

/********************************************************
*                        MIDDLE-WARE                    *
********************************************************/
function validateRequest(req, res, next) {
  let newLog = req.body;
  if (
    newLog &&
    newLog.food_id &&
    newLog.fatsecret_food_id &&
    newLog.serving_id &&
    newLog.quantity &&
    newLog.user_id
  ) {
    next();
  } else {
    res.status(400).json({
      errorMessage:
        "The request body must contain values for 'food_id', 'fatsecret_food_id', 'serving_id', and 'quantity'"
    });
  }
}

module.exports = router;
