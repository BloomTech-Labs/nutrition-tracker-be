const express = require("express");
const LogEntry = require("./log-entry-model.js");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");
const router = express.Router();

/********************************************************
*                      POST/LOG-ENTRY                   *
********************************************************/
router.post("/:user_id", mapFirebaseIDtoUserID, validateRequest, async (req, res) => {
  let logEntry = req.body;

  logEntry.user_id = req.params.user_id;

  try {
    [logEntry] = await LogEntry.addLogEntry(logEntry);
    
    res.status(201).json({
      message: "Log was entered.",
      logEntry
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Internal Server Error"
    });
  }
});

/********************************************************
*                      POST/LOG-ENTRY                   *
********************************************************/
router.delete("/:id", async (req, res) => {
  let logID = req.params.id;

  try {
    [logEntry] = await LogEntry.removeLogEntry(logID);
    
    res.status(201).json({
      message: "Log was entered.",
      logEntry
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorMessage: "Internal Server Error"
    });
  }
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
    newLog.time_zone_name &&
    newLog.time_zone_abbr
  ) {
    next();
  } else {
    res.status(400).json({
      errorMessage:
        "The request body must contain values for 'food_id', 'fatsecret_food_id', 'serving_id', 'quantity', time_zone_name and time_zone_abbr"
    });
  }
}

module.exports = router;
