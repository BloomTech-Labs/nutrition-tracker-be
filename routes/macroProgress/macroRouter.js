const express = require("express");
const router = express.Router();
const MacroInfo = require("./macroDB");
const mapFirebaseIDtoUserID = require("../../middleware/mapFirebaseIDtoUserID");
const moment = require("moment");

//
router.get(
  "/weekly-actuals/:user_id",
  mapFirebaseIDtoUserID,
  async (req, res) => {
    const user_id = req.params.user_id;
    try {
      const user = await MacroInfo.findByUserId(user_id);
      const sortedUser = user.sort(item => moment(item.date));
      console.log(sortedUser);
      // user.length < 7 ? // fill the empty places with null
      const actual_fats = sortedUser.map(item => {
        return Math.round((item.fat_calories / item.total_calories) * 100);
      });
      const actual_carbs = sortedUser.map(item => {
        return Math.round((item.carbs_calories / item.total_calories) * 100);
      });
      const actual_protein = sortedUser.map(item => {
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

module.exports = router;
