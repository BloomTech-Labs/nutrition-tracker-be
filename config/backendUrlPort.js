require("dotenv").config();

export const PORT = process.env.PORT || 4000;

const environment = process.env.ENVIRONMENT || "production";

// sets default backend URL to "production" backend environment URL

// to set a custom backendURL, set the .env variable, `REACT_APP_backendURL`

//                     *************
//                     do not make changes to the URL unless you are updating the master
//                     backend URL address!!
//                     *************

const backendURLs = {
  production: `https://nutri-journal.herokuapp.com`,
  staging: `https://nutri-journal-staging.herokuapp.com`,
  development: `http://localhost:${PORT}`
};

//                     STOP! MOVE AWAY FROM THE COOKIE JAR!
//                     ARE YOU SURE YOU SHOULD BE EDITING THIS VALUE?

//                     If you need to point to a different URL for testing
//                     or development, simply edit the `.env` file, eg set:
//                     REACT_APP_backendURL=http://the-backend-you-want-to-use.com

export const backendURL = process.env.REACT_APP_backendURL || backendURLs[environment];
