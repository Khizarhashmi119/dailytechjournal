const express = require("express");

const router = express.Router();

const {
  index,
  get_about,
  get_contact,
} = require("../controllers/index-controllers");

router.get("/", index);
router.get("/about", get_about);
router.get("/contact", get_contact);

module.exports = router;
