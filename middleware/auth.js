const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    const decoded = await jwt.verify(token, "this is my first jwt token");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) throw new Error();
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
module.exports = auth;
