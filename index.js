const express = require("express");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
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

const port = 3000 || process.env.PORT;

app.listen(port, () => console.log("loading din din loading....."));
