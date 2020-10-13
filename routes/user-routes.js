const express = require("express");

const router = express.Router();

const { checkIsUnauthenticated } = require("../middlewares/auth-middlewares");

const {
  user_get_register,
  user_post_register,
} = require("../controllers/user-controllers");

router.get("/register", checkIsUnauthenticated, user_get_register);
router.post("/register", checkIsUnauthenticated, user_post_register);

module.exports = router;
