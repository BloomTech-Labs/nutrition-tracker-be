const express = require("express");
const router = express.Router();
const MacroInfo = require("./macroDB");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");
const actualWeightOverTime = require("../progressReport/actualWeightOverTimeDB");
const goalWeightOverTime = require("../progressReport/goalWeightOverTimeDB");
const averageMacrosOverTime = require("../progressReport/averageMacrosOverTimeDB");
const weightOverTime = require("../progressReport/weightOverTimeDB");

const {
  weightsToLbs,
  macroValueConverter,
  truncateData
} = require("./helper/index");

/********************************************************
 *             GET MACRO ACTUALS/TARGETS DATA           *
 ********************************************************/

router.post(
  "/:user_id/weight/:period",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const period = req.params.period;
    const { time_zone, start_date, end_date } = req.body;

    try {
      const macros = await macrosOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      const macroValues = macroValueConverter(macros);
      const macroBreakdown = truncateData(macroValues, period);

      res.status(200).json({
        macroBreakdown
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errorMessage: "ERROR"
      });
    }
  }
);

/********************************************************
 *             GET WEIGHT ACTUALS/WEIGHT GOALS           *
 ********************************************************/

router.post(
  "/:user_id/weight/:period",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const period = req.params.period;
    const { time_zone, start_date, end_date } = req.body;

    try {
      let weightsOverTime = await weightOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      weightsOverTime = weightsToLbs(weightsOverTime);
      weightsOverTime = truncateData(weightsOverTime, period);

      res.status(200).json({
        weightsOverTime
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errorMessage: "ERROR"
      });
    }
  }
);

module.exports = router;

/********************************************************
 *             GET AVERAGE MACROS OVER TIME             *
 ********************************************************/
router.post(
  "/:user_id/macros/average",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const start_date = req.body.start_date;

    try {
      const [averageMacros] = await averageMacrosOverTime(user_id, start_date);

      res.status(200).json({
        averageMacros
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errorMessage: "ERROR",
        err
      });
    }
  }
);

module.exports = router;
