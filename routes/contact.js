const express = require("express");
const routers = express.Router();

const contactContent =
  "If you want to contact me and want to give any feedback then you can email me";

routers.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent,
  });
});

module.exports = routers;
