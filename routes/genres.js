const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");
const { object } = require("joi");
const router = express.Router();

const Genre = mongoose.model(
  "Genre",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 10,
      minlength: 3,
    },
  })
);

function validateGenre(genre) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(genre);
}

router.get("/", async (req, res) => {
  const genres = await Genre.find();

  res.send(genres);
});

router.get("/:id", async (req, res) => {
  const genres = await Genre.findById(req.params.id);

  if (!genre) return res.send(404).send("not found");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name,
  });

  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].messages);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
      },
    },
    {
      new: true,
    }
  );
  if (!genre) return res.send(404).send("not found");
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genres = await Genre.findByIdAndDelete(req.params.id);
  if (!genres) return res.send(404).send("not found");
  res.send(genres);
});

module.exports = router;
