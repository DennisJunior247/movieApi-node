const express = require("express");
const router = express.Router();
const { Movies, Val } = require("../models/movies");
const { Genre } = require("../models/genres");

router.post("/", async (req, res) => {
  const { error } = Val(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genres = await Genre.findById(req.body.genreId);
  if (!genres) return res.status(400).send("invalid id");

  let movie = new Movies({
    title: req.body.name,
    numberStock: req.body.numberStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
  });

  movie = await movies.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = Val(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    { new: true }
  );

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

module.exports = router;
