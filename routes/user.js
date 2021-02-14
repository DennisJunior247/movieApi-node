const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, ValUser } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = ValUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await Genre.findOne({ email: req.body.email });
  if (user) return res.status(400).send("user already exist");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.gentoken();
  res.header("x-auth", token).send({
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
