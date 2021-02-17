const mongoose = require("mongoose");
const { genreSchema } = require("./genres");
const Joi = require("joi");

function Val(req) {
  const schema = Joi.object({
    title: Joi.string().required().min(5).max(225),
    numberStock: Joi.string().required().min(0).max(225),
    dailyRentalRate: Joi.number().required().min(0).max(225),
    genreId: Joi.objectId().required(),
  });

  return schema.validate(req);
}

const movies = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 225,
    minlength: 5,
  },
  numberStock: {
    type: String,
    required: true,
    maxlength: 225,
    minlength: 0,
  },
  dailyRentalRate: {
    type: Number,
    required: true,
    maxlength: 225,
    minlength: 0,
  },
  genre: genreSchema,
});

const Movies = mongoose.model("Movies", movies);

module.exports.Movies = Movies;
module.exports.Val = Val;
