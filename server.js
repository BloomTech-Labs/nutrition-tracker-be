const express = require("express");
// middleware set up
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

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

server.get("/", (_, res) => {
    res.send("I am not a computer nerd. I prefer to be called a hacker.");
  });

module.exports = server;
