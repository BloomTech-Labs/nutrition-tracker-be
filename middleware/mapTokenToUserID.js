const admin = require("../services/firebaseAdmin");
const getAuthToken = require("./helpers/getAuthToken");
const maptoUserID = require("./helpers/mapToUserID");

/********************************************************
*                 MAP TOKEN TO USER ID                  *
********************************************************/
module.exports = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const authToken = req.authToken;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      const firebaseID = userInfo.uid;

      req.body.user_id = await maptoUserID(firebaseID, res);
      
      next();

    } catch (err) {
      res
        .status(401)
        .send({ error: `The Firebase ID token has invalid signature.` });
    }
  });
};
