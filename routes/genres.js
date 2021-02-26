const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const asyncMiddleware = require("../middleware/async");
const { Genre, validateGenre } = require("../models/genres");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  asyncMiddleware(async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send("invalid id ");

    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send("not found");
    res.send(genre);
  })
);

router.post("/", auth, async (req, res) => {
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
  if (!genre) return res.status(404).send("not found");
  res.send(genre);
});

router.delete("/:id", [isAdmin, auth], async (req, res) => {
  const genres = await Genre.findByIdAndDelete(req.params.id);
  if (!genres) return res.status(404).send("not found");
  res.send(genres);
});

module.exports = router;
