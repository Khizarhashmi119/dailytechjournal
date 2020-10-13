const express = require("express");

const router = express.Router();

const {
  checkIsAuthenticated,
  checkIsUnauthenticated,
} = require("../middlewares/auth-middlewares");

const {
  auth_get_login,
  auth_get_logout,
  auth_post_login,
} = require("../controllers/auth-controllers");

router.get("/login", checkIsUnauthenticated, auth_get_login);
router.get("/logout", checkIsAuthenticated, auth_get_logout);
router.post("/login", checkIsUnauthenticated, auth_post_login);

module.exports = router;
