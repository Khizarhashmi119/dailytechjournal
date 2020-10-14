if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const passport = require("passport");

const indexRoutes = require("./routes/index-routes");
const blogRoutes = require("./routes/blogs-routes");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const initializePassport = require("./passport-local");

const app = express();

const PORT = process.env.PORT || 3000;

//* Connect database.
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
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
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//* Set view engine.
app.set("view engine", "ejs");
app.set("layout", "layouts/app-layout");

initializePassport(passport);

//* Routes.
app.use(indexRoutes);
app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use((req, res) => {
  const { user } = req;
  res.status(404).render("404", { user });
});
