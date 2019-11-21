const db = require("../data/knex");
const admin = require("../services/firebaseAdmin");

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
  getAuthToken(req,res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      const firebase_id = userInfo.uid;

      const {id} = await db("users")
        .select("id")
        .where({
          firebase_id
        }).first();

      req.user_id = id;

      console.log(req.user_id);

      return next();
    } catch (err) {
      return res
        .status(401)
        .send({ error: `User with firebase_id ${firebase_id} not found.` });
    }
  });
}

