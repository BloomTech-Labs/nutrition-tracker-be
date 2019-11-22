const db = require("../data/knex");
const admin = require("../services/firebaseAdmin");
const getAuthToken = require("./helpers/getAuthToken");

module.exports = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const userInfo = await admin.auth().verifyIdToken(req.authToken);
      const firebase_id = userInfo.uid;
      const { id } = await db("users")
        .select("id")
        .where({
          firebase_id
        })
        .first();

      req.body.user_id = id;
      return next();
    } catch (err) {
      return res
        .status(401)
        .send({ error: `User with firebase_id: ${firebase_id} not found.` });
    }
  });
};
