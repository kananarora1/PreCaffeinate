const jwt = require("jsonwebtoken");

const authenticate = function(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).send({ success: false, message: "No token provided" });
    }
    const verifiedtoken = jwt.verify(token, process.env.secret_key_jwt);
    req.user = { userId: verifiedtoken.userId }; // Store user information in req.user
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ success: false, message: "Token Invalid" });
  }
}

module.exports = authenticate;
