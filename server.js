require("dotenv").config();
const express = require("express");
const Mixpanel = require("mixpanel");
const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN;
const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);

// middleware set up
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mapFirebaseIDtoUserID = require("./middleware/mapFirebaseIDtoUserID");
const server = express();
const authenticate = require("./middleware/authenticate");
const fatSecretRoute = require("./routes/fatsecret/fatsecret");
const authRouter = require("./routes/auth/authRouter");
/*
morgan("dev"):
Concise output colored by response status for development use. 
The :status token will be colored red for server error codes, 
yellow for client error codes, 
cyan for redirection codes, 
and uncolored for all other codes.
*/

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use(helmet());
server.use("/", fatSecretRoute);
server.use("/auth", authRouter);
server.use("/user", settingsRouter);

// Test End-Point for Authentication
server.get("/test/authentication", authenticate, (req, res) => {
  res.status(200).json({
    message: "Authorized"
  });
});

// Test End-Point for Firebase ID conversion
server.get("/test/id-conversion/:user_id", mapFirebaseIDtoUserID, (req, res) => {
  const userID = req.params.user_id
  // req.body should now contain all the fields 
  // on the original request plus the user_id !!!
  res.status(200).json({
    message: "firebase ID in params mapped to user ID in database. User ID",
    updatedParam: userID
  });
});

server.get("/", (_, res) => {
  mixpanel.track("get request on root", {
    distinct_id: "izzy",
    property_1: "doot"
  });
  res.send("I am not a computer nerd. I prefer to be called a hacker.");
});

module.exports = server;
