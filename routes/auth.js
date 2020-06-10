const express = require("express");
const routers = express.Router();
const md5 = require("md5");

const Admin = require("../models/Admin");

routers
  .route("/auth")
  .get((req, res) => {
    res.render("auth");
  })
  .post(async (req, res) => {
    const { username } = req.body;

    try {
      const result = await Admin.findOne({
        name: username,
      });

      if (result) {
        if (result.password === md5(req.body.password)) {
          res.render("compose");
        } else {
          console.log("Incorrect password");
        }
      } else {
        console.log("Incorrect username");
      }
    } catch (err) {
      console.log(err);
    }
  });

module.exports = routers;
