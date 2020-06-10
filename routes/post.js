const express = require("express");
const routers = express.Router();

const Post = require("../models/Post");

routers.get("/post/:postName", async (req, res) => {
  const { postName } = req.params;

  try {
    const post = await Post.findOne({ title: postName });

    res.render("post", {
      post: post,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = routers;
