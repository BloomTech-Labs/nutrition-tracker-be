require("dotenv").config();
const server = require("./server");
const Sentry = require("@sentry/node");
const PORT = process.env.PORT || 4000;
const DSN = process.env.SENTRY_DSN;
const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN;
const Mixpanel = require("mixpanel");

// mixpanel analytics... MIXPANEL_TOKEN is secret so stored in .env
var mixpanel = Mixpanel.init(MIXPANEL_TOKEN);

// sentry.io... DSN is secret so we use .env to store it
Sentry.init({ dsn: DSN });

server.listen(PORT, () => {
  console.log(`We're in! Port: ${PORT}`);
});
