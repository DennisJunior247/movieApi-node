const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Genre, validateGenre } = require("../models/genres");

router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.send(404).send("not found");
  res.send(genre);
});

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
  if (!genre) return res.send(404).send("not found");
  res.send(genre);
});

router.delete("/:id", async (req, res) => {
  const genres = await Genre.findByIdAndDelete(req.params.id);
  if (!genres) return res.send(404).send("not found");
  res.send(genres);
});

module.exports = router;
