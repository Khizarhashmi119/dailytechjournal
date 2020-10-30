const Blog = require("../models/Blog");

const blog_index = async (req, res) => {
  const { user } = req;

  try {
    const blogs = await Blog.find().populate("userId").sort({ createdAt: -1 });

    res.render("blog/index", {
      user,
      blogs,
      title: "Home",
    });
  } catch (err) {
    console.error(err);
  }
};

const blog_get_create = (req, res) => {
  const { user } = req;
  res.render("blog/create", { user, errors: [], title: "Create blog" });
};

const blog_post_create = async (req, res) => {
  const {
    user: { id },
  } = req;
  const { title, content } = req.body;

  try {
    const newBlog = new Blog({
      userId: id,
      title,
      content,
    });
    await newBlog.save();
  } catch (err) {
    console.error(err);
  }

  res.redirect("/");
};

const blog_detail = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const blog = await Blog.findById(id).populate("userId");

    res.render("blog/detail", {
      user,
      blog: blog,
      title: "Blog",
    });
  } catch (err) {
    res.status(404).render("404", { user });
  }
};

const blog_delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.findByIdAndRemove(id);
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
};

const blog_get_update = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  try {
    const blog = await Blog.findById(id);

    res.render("blog/update", {
      user,
      blog,
      title: "Update blog",
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
    res.redirect(`/blogs/${newBlog._id}`);
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
