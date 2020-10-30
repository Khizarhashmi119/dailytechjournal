const express = require("express");

const router = express.Router();

const { index, get_about } = require("../controllers/index-controllers");

router.get("/", index);
router.get("/about", get_about);

module.exports = router;
