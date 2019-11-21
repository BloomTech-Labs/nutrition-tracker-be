const admin = require("firebase-admin");
require("dotenv").config();

// let serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS;
let serviceAccount = JSON.parse(process.env.FIREBASE_JSON);

admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://getnutrijournal.firebaseio.com"
});

module.exports = admin;
