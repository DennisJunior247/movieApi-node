const mongoose = require("mongoose");
const Joi = require("joi");

const Customers = mongoose.model(
  "Customer",
  new mongoose.Schema({
    isGold: {
      type: Boolean,
      defult: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    tele: {
      type: Number,
      required: true,
      minlength: 11,
      maxlength: 11,
    },
  })
);

function Val(req) {
  const schema = Joi.object({
    name: Joi.string().required().max(20).min(5),
    tele: Joi.number().required().max(20).min(5),
    isGold: Joi.boolean(),
  });

  return schema.validate(req);
}



exports.Customers = Customers;
exports.Val = Val;
