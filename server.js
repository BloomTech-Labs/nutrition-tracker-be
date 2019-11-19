require("dotenv").config();
const express = require("express");
const Mixpanel = require('mixpanel');
const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN;
const mixpanel = Mixpanel.init(MIXPANEL_TOKEN);
// middleware set up
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const server = express();
const fatSecretRoute = require('./routes/fatsecret/fatsecret');

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
server.use('/', fatSecretRoute);

// Test End-Point for Authentication
server.get('/test', authenticate, (req, res) => {
  res.status(200).json({
    message: "Authorized."
  })
});


server.get("/", (_, res) => {
    mixpanel.track("get request on root", {
      distinct_id: "izzy",
      property_1: "doot"
    });
    res.send("I am not a computer nerd. I prefer to be called a hacker.");
  });

module.exports = server;
