const express = require("express");
const routes = new express.Router();
const userModel = require("../models/user");
const auth = require("../middleware/auth");

routes.post("/users", async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    const token = await user.generateAuthtoken();
    return res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = routes;
