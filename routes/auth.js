const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = ValUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("ivalide pass or email");

  const val = await bcrypt.compare(req.body.password, user.password);
  if (!val) return res.status(400).send("ivalide pass or email");

  const token = user.gentoken();
  res.header("x-auth", token).send(token);
});

function ValUser(genre) {
  const schema = Joi.object({
    email: Joi.string().min(3).max(225).required().email(),
    password: Joi.string().min(3).max(225).required(),
  });

  return schema.validate(genre);
}

module.exports = router;
