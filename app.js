const express = require("express");

const connectDB = require("./config/db");

const app = express();

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

connectDB();

app.use(require("./routes/home"));
app.use(require("./routes/auth"));
app.use(require("./routes/compose"));
app.use(require("./routes/post"));
app.use(require("./routes/about"));
app.use(require("./routes/contact"));

app.listen(PORT, () =>
  console.log(`Server is up and running at port no. ${PORT}...`)
);
