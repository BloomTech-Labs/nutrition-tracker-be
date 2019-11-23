const db = require("../../data/knex");
/********************************************************
*                    MAP TO USER ID                     *
********************************************************/
module.exports = async (firebase_id, res) => {
  try {
    const user = await getUserID(firebase_id)

    if (!user) {
      res.status(400).json({
        errorMessage: `A user with firebaseID: ${firebase_id} could not be found.`
      });
    }

    return user.id;
  } catch (err) {
    console.log("err", err);
    res.status(500).json({
      errorMessage: "Internal Server Error"
    });
  }
}
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