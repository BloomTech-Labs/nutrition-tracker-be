const express = require("express");
const router = express.Router();
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");
const actualWeightOverTime = require("./postgres-queries/actualWeightOverTimeDB");
const targetGoalWeightOverTimeDB = require("./postgres-queries/targetGoalWeightOverTimeDB");
const averageMacrosOverTime = require("./postgres-queries/averageMacrosOverTimeDB");
const caloriesOverTime = require("./postgres-queries/caloriesOverTimeDB");
const fatMacrosOverTime = require("./postgres-queries/fatMacrosOverTimeDB");
const carbsMacrosOverTime = require("./postgres-queries/carbsMacrosOverTimeDB");
const proteinMacrosOverTime = require("./postgres-queries/proteinMacrosOverTimeDB");
const {
  weightsToLbs,
  truncateData,
  extendDate,
  formatDates
} = require("./helper/index");

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
    try {
      let fatMacros = await fatMacrosOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      fatMacros = truncateData(fatMacros, period, "targets");

      let carbMacros = await carbsMacrosOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      carbMacros = truncateData(carbMacros, period, "targets");

      let proteinMacros = await proteinMacrosOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      proteinMacros = truncateData(proteinMacros, period, "targets");

      res.status(200).json({
        fatMacros,
        carbMacros,
        proteinMacros
      });
    } catch (err) {
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
  "/:user_id/weight-actuals/:period",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const period = req.params.period;
    const { time_zone, start_date, end_date } = req.body;

    try {
      let actualWeights = await actualWeightOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      actualWeights = weightsToLbs(actualWeights, "actuals");
      actualWeights = truncateData(actualWeights, period);
      actualWeights = formatDates(actualWeights);

      res.status(200).json({
        actualWeightsLength: actualWeights.length,
        actualWeights
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errorMessage: "Could not retrieve user's goal actuals"
      });
    }
  }
);

router.post(
  "/:user_id/weight-targets/:period",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const period = req.params.period;
    const { time_zone, start_date, end_date } = req.body;

    try {
      let targetWeights = await targetGoalWeightOverTimeDB(
        user_id,
        time_zone,
        start_date,
        extendDate(end_date, period)
      );

      targetWeights = weightsToLbs(targetWeights, "targets");
      targetWeights = truncateData(targetWeights, period, "targets");
      targetWeights = formatDates(targetWeights);

      res.status(200).json({
        targetWeightsLength: targetWeights.length,
        targetWeights
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        errorMessage: "Could not retrieve user's goal weights."
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

      calories = truncateData(calories, period);
      calories = formatDates(calories);

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
