const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, "Cv-Service");
    const user = await userModel.findOne({
      _id: decode._id,
      "tokens.token": token,
    });
    if (!user) throw new Error("Error");
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = auth;
