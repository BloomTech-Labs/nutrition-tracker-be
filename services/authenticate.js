const admin = require("./firebaseAdmin");

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

module.exports = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.firebase_id = userInfo.uid;
      return next();
    } catch (err) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
};
