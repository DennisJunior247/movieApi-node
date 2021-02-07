const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
    minlength: 3,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
  });

  return schema.validate(genre);
}

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;
