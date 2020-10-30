const index = async (req, res) => {
  res.redirect("/blogs");
};

const get_about = async (req, res) => {
  const { user } = req;
  res.render("index/about", { user, title: "About" });
};

module.exports = { index, get_about };
