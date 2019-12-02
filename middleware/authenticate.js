const admin = require("../services/firebaseAdmin");
const getAuthToken = require("./helpers/getAuthToken");

/********************************************************
*                     AUTHENTICATE                      *
********************************************************/
module.exports = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      await admin.auth().verifyIdToken(req.authToken);
      next();
    } catch (err) {
      res
        .status(401)
        .json({ errorMessage: "You are not authorized to make this request." });
    }
  });
};
