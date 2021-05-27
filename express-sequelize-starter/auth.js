const jwt = require("jsonwebtoken");
const { jwtConfig } = require("./config");
const db = require("./db/models");
const { secret, expiresIn } = jwtConfig;
const bearerToken = require("express-bearer-token");
const { User } = db;

const getUserToken = (user) => {
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
  );
  return token;
};

const restoreUser = (req, res, next) => {
  const { token } = req;
  if (token) {
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            err.status = 401;
            return next(err);
        }
    });
  } else {
    return res.set("WWW-Authenticate", "Bearer").status(401).end();
  }
};

module.exports = { getUserToken };
