const admin = require('firebase-admin');

let serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://getnutrijournal.firebaseio.com"
});

module.exports = admin;