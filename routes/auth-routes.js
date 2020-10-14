const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const {
  checkIsAuthenticated,
  checkIsUnauthenticated,
} = require("../middlewares/auth-middlewares");
const {
  loginDataValidation,
} = require("../middlewares/data-validation-middlewares");

const {
  auth_get_login,
  auth_get_logout,
  auth_post_login,
} = require("../controllers/auth-controllers");

router.get("/login", checkIsUnauthenticated, auth_get_login);
router.get("/logout", checkIsAuthenticated, auth_get_logout);
router.post(
  "/login",
  [
    checkIsUnauthenticated,
    [
      body("email", "Email is required.").isEmail(),
      body("password", "Password must have at least 6 characters.").isLength({
        min: 6,
      }),
    ],
    loginDataValidation,
  ],
  auth_post_login
);

module.exports = router;
