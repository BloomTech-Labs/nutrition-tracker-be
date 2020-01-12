const express = require("express");
const router = express.Router();
const MacroInfo = require("./macroDB");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");
const actualWeightOverTime = require("../progressReport/actualWeightOverTimeDB");
const targetGoalWeightOverTimeDB = require("../progressReport/targetGoalWeightOverTimeDB");
const averageMacrosOverTime = require("../progressReport/averageMacrosOverTimeDB");
const caloriesOverTime = require("../progressReport/caloriesOverTimeDB");
const fatMacrosOverTime = require("../progressReport/fatMacrosOverTimeDB");
const carbsMacrosOverTime = require("../progressReport/carbsMacrosOverTimeDB");
const proteinMacrosOverTime = require("../progressReport/proteinMacrosOverTimeDB");
const {
  weightsToLbs,
  truncateData,
  extendDate,
  formatDates
} = require("./helper/index");

/********************************************************
 *                 GET FATS OVER TIME                    *
 ********************************************************/
router.post(
  "/:user_id/macros/fats/:period",
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

      fatMacros = truncateData(fatMacros, period);

      res.status(200).json({
        fatMacros
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
 *                 GET CARBS OVER TIME                   *
 ********************************************************/
router.post(
  "/:user_id/macros/carbs/:period",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const period = req.params.period;
    const { time_zone, start_date, end_date } = req.body;

    try {
      let carbMacros = await carbsMacrosOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      carbMacros = truncateData(carbMacros, period);

      res.status(200).json({
        carbMacros
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
 *                GET PROTEIN OVER TIME                  *
 ********************************************************/
router.post(
  "/:user_id/macros/protein/:period",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    const period = req.params.period;
    const { time_zone, start_date, end_date } = req.body;

    try {
      let proteinMacros = await proteinMacrosOverTime(
        user_id,
        time_zone,
        start_date,
        end_date
      );

      proteinMacros = truncateData(proteinMacros, period);

      res.status(200).json({
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
/*
  const actualWeightOverTime = require("../progressReport/actualWeightOverTimeDB");
  const goalWeightOverTime = require("../progressReport/goalWeightOverTimeDB");
*/

// CREATE TWO SEPARATE ROUTERS... YOU NEED DIFFERENT LOGIC FOR ACTUALS AND GOALS..

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
