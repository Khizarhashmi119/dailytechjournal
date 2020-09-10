const express = require("express");

const {
  blog_index,
  blog_get_create,
  blog_post_create,
  blog_detail,
  blog_delete,
  blog_get_update,
  blog_put_update,
} = require("../controllers/blog-controllers");

const router = express.Router();

router.get("/", blog_index);
router.get("/create", blog_get_create);
router.post("/create", blog_post_create);
router.get("/:id", blog_detail);
router.delete("/delete/:id", blog_delete);
router.get("/update/:id", blog_get_update);
router.put("/update/:id", blog_put_update);

module.exports = router;
