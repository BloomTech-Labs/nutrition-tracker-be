require("dotenv").config();
const server = require("./server");
const Sentry = require("@sentry/node");
const PORT = process.env.PORT || 4000;
const DSN = process.env.SENTRY_DSN;

// sentry.io... DSN is secret so we use .env to store it
Sentry.init({ dsn: DSN });

server.listen(PORT, () => {
  console.log(`We're in! Port: ${PORT}`);
});
