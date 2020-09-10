const Blog = require("../models/Blog");

const blog_index = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.render("blog/index", {
      blogs,
    });
  } catch (err) {
    console.error(err);
  }
};

const blog_get_create = (req, res) => {
  res.render("blog/create");
};

const blog_post_create = async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
  } catch (err) {
    console.error(err);
  }

  res.redirect("/");
};

const blog_detail = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    res.render("blog/detail", {
      blog: blog,
    });
  } catch (err) {
    res.status(404).render("404");
  }
};

const blog_delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndRemove(id);
    res.json({ redirect: "/" });
  } catch (err) {
    console.error(err);
  }
};

const blog_get_update = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    res.render("blog/update", {
      blog,
    });
  } catch (err) {
    console.error(err);
  }
};

const blog_put_update = async (req, res) => {
  const { id } = req.params;
  try {
    const newBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({ redirect: `/blogs/${newBlog._id}` });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  blog_index,
  blog_get_create,
  blog_post_create,
  blog_detail,
  blog_delete,
  blog_get_update,
  blog_put_update,
};
