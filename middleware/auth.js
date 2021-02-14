const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("acess not granted ");

  try {
    const decode = jwt.verify(token, "jwtprivate");
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send("invalide token");
  }
}

module.exports = auth;
