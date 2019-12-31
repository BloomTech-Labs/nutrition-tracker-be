const express = require("express");
const router = express.Router();
const MacroInfo = require("./macroDB");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");
const actualWeightOverTime = require("../progressReport/actualWeightOverTimeDB");
const goalWeightOverTime = require("../progressReport/goalWeightOverTimeDB");
const weightOverTime = require("../progressReport/weightOverTimeDB");

const { weightsToLbs, truncateData } = require("./helper/index");

//
router.get(
  "/weekly-actuals/:user_id",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const user = await MacroInfo.findByUserId(user_id);
      user.reverse();
      console.log(user);
      // user.length < 7 ? // fill the empty places with null
      const actual_fats = user.map(item => {
        return Math.round((item.fat_calories / item.total_calories) * 100);
      });
      const actual_carbs = user.map(item => {
        return Math.round((item.carbs_calories / item.total_calories) * 100);
      });
      const actual_protein = user.map(item => {
        return Math.round((item.protein_calories / item.total_calories) * 100);
      });
      const fatArray = [
        actual_fats[6],
        actual_fats[5],
        actual_fats[4],
        actual_fats[3],
        actual_fats[2],
        actual_fats[1],
        actual_fats[0]
      ];
      const carbArray = [
        actual_carbs[6],
        actual_carbs[5],
        actual_carbs[4],
        actual_carbs[3],
        actual_carbs[2],
        actual_carbs[1],
        actual_carbs[0]
      ];
      const proteinArray = [
        actual_protein[6],
        actual_protein[5],
        actual_protein[4],
        actual_protein[3],
        actual_protein[2],
        actual_protein[1],
        actual_protein[0]
      ];
      const returnObj = {
        fats: fatArray,
        carbs: carbArray,
        protein: proteinArray
      };
      res.status(200).json(returnObj);
    } catch (err) {
      res.status(500).json({ message: "Failed to get macro progress" });
    }
  }
);

router.get(
  "/monthly-actuals/:user_id",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const user = await MacroInfo.findByUserId(user_id);
      user.reverse();
      console.log(user);
      // user.length < 7 ? // fill the empty places with null
      const actual_fats = user.map(item => {
        return Math.round((item.fat_calories / item.total_calories) * 100);
      });
      const actual_carbs = user.map(item => {
        return Math.round((item.carbs_calories / item.total_calories) * 100);
      });
      const actual_protein = user.map(item => {
        return Math.round((item.protein_calories / item.total_calories) * 100);
      });
      const fatArray = [
        actual_fats[30],
        actual_fats[27],
        actual_fats[24],
        actual_fats[21],
        actual_fats[18],
        actual_fats[15],
        actual_fats[12],
        actual_fats[9],
        actual_fats[6],
        actual_fats[3],
        actual_fats[0]
      ];
      const carbArray = [
        actual_carbs[30],
        actual_carbs[27],
        actual_carbs[24],
        actual_carbs[21],
        actual_carbs[18],
        actual_carbs[15],
        actual_carbs[12],
        actual_carbs[9],
        actual_carbs[6],
        actual_carbs[3],
        actual_carbs[0]
      ];
      const proteinArray = [
        actual_protein[30],
        actual_protein[27],
        actual_protein[24],
        actual_protein[21],
        actual_protein[18],
        actual_protein[15],
        actual_protein[12],
        actual_protein[9],
        actual_protein[6],
        actual_protein[3],
        actual_protein[0]
      ];
      const returnObj = {
        fats: fatArray,
        carbs: carbArray,
        protein: proteinArray
      };
      res.status(200).json(returnObj);
    } catch (err) {
      res.status(500).json({ message: "Failed to get macro progress" });
    }
  }
);

router.get(
  "/quarterly-actuals/:user_id",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const user = await MacroInfo.findByUserId(user_id);
      user.reverse();
      console.log(user);
      // user.length < 7 ? // fill the empty places with null
      const actual_fats = user.map(item => {
        return Math.round((item.fat_calories / item.total_calories) * 100);
      });
      const actual_carbs = user.map(item => {
        return Math.round((item.carbs_calories / item.total_calories) * 100);
      });
      const actual_protein = user.map(item => {
        return Math.round((item.protein_calories / item.total_calories) * 100);
      });
      const fatArray = [
        actual_fats[90],
        actual_fats[84],
        actual_fats[77],
        actual_fats[70],
        actual_fats[63],
        actual_fats[56],
        actual_fats[49],
        actual_fats[42],
        actual_fats[35],
        actual_fats[28],
        actual_fats[21],
        actual_fats[14],
        actual_fats[7],
        actual_fats[0]
      ];
      const carbArray = [
        actual_carbs[90],
        actual_carbs[84],
        actual_carbs[77],
        actual_carbs[70],
        actual_carbs[63],
        actual_carbs[56],
        actual_carbs[49],
        actual_carbs[42],
        actual_carbs[35],
        actual_carbs[28],
        actual_carbs[21],
        actual_carbs[14],
        actual_carbs[7],
        actual_carbs[0]
      ];
      const proteinArray = [
        actual_protein[90],
        actual_protein[84],
        actual_protein[77],
        actual_protein[70],
        actual_protein[63],
        actual_protein[56],
        actual_protein[49],
        actual_protein[42],
        actual_protein[35],
        actual_protein[28],
        actual_protein[21],
        actual_protein[14],
        actual_protein[7],
        actual_protein[0]
      ];
      const returnObj = {
        fats: fatArray,
        carbs: carbArray,
        protein: proteinArray
      };
      res.status(200).json(returnObj);
    } catch (err) {
      res.status(500).json({ message: "Failed to get macro progress" });
    }
  }
);

router.get(
  "/biannual-actuals/:user_id",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const user = await MacroInfo.findByUserId(user_id);
      user.reverse();
      console.log(user);
      // user.length < 7 ? // fill the empty places with null
      const actual_fats = user.map(item => {
        return Math.round((item.fat_calories / item.total_calories) * 100);
      });
      const actual_carbs = user.map(item => {
        return Math.round((item.carbs_calories / item.total_calories) * 100);
      });
      const actual_protein = user.map(item => {
        return Math.round((item.protein_calories / item.total_calories) * 100);
      });
      const fatArray = [
        actual_fats[180],
        actual_fats[150],
        actual_fats[120],
        actual_fats[90],
        actual_fats[60],
        actual_fats[30],
        actual_fats[0]
      ];
      const carbArray = [
        actual_carbs[180],
        actual_carbs[150],
        actual_carbs[120],
        actual_carbs[90],
        actual_carbs[60],
        actual_carbs[30],
        actual_carbs[0]
      ];
      const proteinArray = [
        actual_protein[180],
        actual_protein[150],
        actual_protein[120],
        actual_protein[90],
        actual_protein[60],
        actual_protein[30],
        actual_protein[0]
      ];
      const returnObj = {
        fats: fatArray,
        carbs: carbArray,
        protein: proteinArray
      };
      res.status(200).json(returnObj);
    } catch (err) {
      res.status(500).json({ message: "Failed to get macro progress" });
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
