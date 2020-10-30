if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const expressEjsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const passport = require("passport");
const methodOverride = require("method-override");

const connectDB = require("./db");
const indexRoutes = require("./routes/index-routes");
const blogRoutes = require("./routes/blogs-routes");
const userRoutes = require("./routes/user-routes");
const authRoutes = require("./routes/auth-routes");
const passportLocalConfig = require("./passport-local-config");

const app = express();

//* Connect database.
connectDB();

//* Middlewares.
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
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

passportLocalConfig(passport);

//* Routes.
app.use(indexRoutes);
app.use("/blogs", blogRoutes);
app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use((req, res) => {
  const { user } = req;
  res.status(404).render("404", { user });
});

app.listen(
  process.env.PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode at port ${process.env.PORT}`
  )
);
