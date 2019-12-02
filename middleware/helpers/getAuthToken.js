
/********************************************************
*                   GET AUTH TOKEN                      *
********************************************************/
module.exports = (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (tokenHeader) {
    const [bearer, token] = tokenHeader.split(" ");

    if (bearer.toUpperCase() === "BEARER" && token) {
      req.authToken = token;
      next();
      
    } else {
      res.status(401).json({
        errorMessage: "Invalid scheme, or token is missing from the header."
      });
    }
  } else {
    res.status(401).json({ errorMessage: "Missing authorization header." });
  }
};
