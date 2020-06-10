const express = require("express");
const routers = express.Router();

const Post = require("../models/Post");
const date = require("../date");

routers.post("/compose", async (req, res) => {
  const { title, post } = req.body;

  const newPost = new Post({
    title: title,
    post: post.slice(0, 1000),
    date: date(),
  });

  try {
    await newPost.save();
  } catch (err) {
    console.log(err);
  }

  res.redirect("/");
});

module.exports = routers;
