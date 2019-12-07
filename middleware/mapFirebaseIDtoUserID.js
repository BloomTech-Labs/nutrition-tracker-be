const db = require("../data/knex");

/********************************************************
*              MAP FIREBASE ID TO USER ID               *
********************************************************/
module.exports = async (req, res, next) => {
  const firebaseID = req.params.user_id;
  console.log("firebaseID", firebaseID);
  try {
    const user = await getUserID(firebaseID);
    if (!user) {
      res.status(400).json({
        errorMessage: `A user with firebaseID: ${firebaseID} could not be found.`
      });
    }
    req.params.user_id = user.id;
    next();

  } catch (err) {
    res.status(500).json({
      errorMessage: "Internal Server Error"
    });
  }
};
/********************************************************
*                      GET USER ID                      *
********************************************************/
function getUserID(firebase_id) {
  return db("users")
    .select("id")
    .where({
      firebase_id
    })
    .first();
}
