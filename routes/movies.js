const express = require("express");
const router = express.Router();
const { Movies, Val } = require("../models/movies");
const { Genre } = require("../models/genres");

router.post("/", async (req, res) => {
  const { error } = Val(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("invalid id");

  let genre = new Movies({
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

module.exports = router;
