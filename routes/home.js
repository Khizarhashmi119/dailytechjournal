const express = require("express");
const routers = express.Router();

const Post = require("../models/Post");

const homeStartingContent = "Welcome to my Blog.";

routers.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});

    res.render("index", {
      homeStartingContent: homeStartingContent,
      posts: posts,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = routers;
