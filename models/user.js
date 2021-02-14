const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    maxlength: 255,
    minlength: 5,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

UserSchema.methods.gentoken = function () {
  const token = jwt.sign({ _id: this._id }, "jwtprivate");
  return token;
};

const User = mongoose.model("user", UserSchema);

function ValUser(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().min(3).max(225).required().email(),
    password: Joi.string().min(3).max(225).required(),
  });

  return schema.validate(genre);
}

exports.User = User;
exports.ValUser = ValUser;
