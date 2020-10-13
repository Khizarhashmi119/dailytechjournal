if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressEjsLayouts = require("express-ejs-layouts");

const indexRoutes = require("./routes/index-routes");
const blogRoutes = require("./routes/blogs-routes");

const app = express();

const PORT = process.env.PORT || 3000;

//* Connect database.
mongoose
  .connect(process.env.MONGODB_URI, {
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

//* Middlewares.
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(expressEjsLayouts);

//* Set view engine.
app.set("view engine", "ejs");
app.set("layout", "layouts/app-layout");

//* Routes.

//* Index routes.
app.use(indexRoutes);

//* Blog routes.
app.use("/blogs", blogRoutes);

//* 404 route
app.use((req, res) => {
  res.status(404).render("404");
});
