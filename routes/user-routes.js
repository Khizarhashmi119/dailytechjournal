const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const { checkIsUnauthenticated } = require("../middlewares/auth-middlewares");

const { user_post_register } = require("../controllers/user-controllers");
const {
  registerDataValidation,
} = require("../middlewares/data-validation-middlewares");

router.post(
  "/register",
  [
    checkIsUnauthenticated,
    [
      body("name", "Name is required").notEmpty(),
      body("email", "Email is required.").isEmail(),
      body("password", "Password must have at least 6 characters.").isLength({
        min: 6,
      }),
    ],
    registerDataValidation,
  ],
  user_post_register
);

module.exports = router;
