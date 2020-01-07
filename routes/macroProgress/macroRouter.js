const express = require("express");
const router = express.Router();
const MacroInfo = require("./macroDB");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");
const actualWeightOverTime = require("../progressReport/actualWeightOverTimeDB");
const goalWeightOverTime = require("../progressReport/goalWeightOverTimeDB");
const averageMacrosOverTime = require("../progressReport/averageMacrosOverTimeDB");
const weightOverTime = require("../progressReport/weightOverTimeDB");
const caloriesOverTime = require("../progressReport/caloriesOverTimeDB");
const fatMacrosOverTime = require("../progressReport/fatMacrosOverTimeDB");
const carbsMacrosOverTime = require("../progressReport/carbsMacrosOverTimeDB");
const proteinMacrosOverTime = require("../progressReport/proteinMacrosOverTimeDB");
const { weightsToLbs, truncateData } = require("./helper/index");

const {
  presentMinusXDays,
  tomorrow
} = require("../../data/helpers/timestampOffsetFns");

/********************************************************
 *            GET MACRO BREAKDOWN OVER TIME              *
 ********************************************************/
router.post(
  "/:user_id/macros-breakdown/:period",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const period = req.params.period;
    const { time_zone, start_date, end_date } = req.body;
    console.log("START DATE:", presentMinusXDays(181));
    console.log("TOMORROW:", tomorrow);
    try {
      let fatMacros = await fatMacrosOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      fatMacros = truncateData(fatMacros, period);

      let carbMacros = await carbsMacrosOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      carbMacros = truncateData(carbMacros, period);

      let proteinMacros = await proteinMacrosOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      proteinMacros = truncateData(proteinMacros, period);

      res.status(200).json({
        fatMacros,
        carbMacros,
        proteinMacros
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
 *             GET WEIGHT ACTUALS/WEIGHT GOALS          *
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

/********************************************************
 *             GET WEIGHT ACTUALS/WEIGHT GOALS          *
 ********************************************************/

router.post(
  "/:user_id/calories/:period",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const period = req.params.period;
    const { time_zone, start_date, end_date } = req.body;

    try {
      let calories = await caloriesOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      // calories = truncateData(calories, period);

      res.status(200).json({
        calories
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
