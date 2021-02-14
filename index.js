const express = require("express");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const user = require("./routes/user");
const movies = require("./routes/movies");
const rentals = require("./routes/user");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost/moviesApi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch(() => console.error("DB not connected"));

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/users", user);
app.use("/api/rentals", rentals);

const port = 3000 || process.env.PORT;

app.listen(port, () => console.log("loading din din loading....."));
