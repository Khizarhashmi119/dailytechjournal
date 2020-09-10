const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const blogRoutes = require("./routes/blogs-routes");

const app = express();

const PORT = process.env.PORT || 3000;

//* Connect database.
mongoose
  .connect("mongodb://localhost:27017/blogDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB is connected...");
    app.listen(PORT, () =>
      console.log(`Server is up and running at port no. ${PORT}...`)
    );
  })
  .catch((err) => {
    console.error(err);
  });

//* Set view engine.
app.set("view engine", "ejs");

//* Middlewares.
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(express.static("public"));

app.use(morgan("dev"));

//* Routes.
app.get("/", async (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

//* Blog routes.
app.use("/blogs", blogRoutes);

//* 404 route
app.use((req, res) => {
  res.status(404).render("404");
});
