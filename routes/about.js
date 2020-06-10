const express = require("express");
const routers = express.Router();

const aboutContent =
  "Hello. My name is Mohd. Khizar Hashmi. and this is my personal blog. if you are interested in tech news and updates, then visit my website daily.";

routers.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent,
  });
});

module.exports = routers;
