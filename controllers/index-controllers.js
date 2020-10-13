const index = async (req, res) => {
  res.redirect("/blogs");
};

const get_about = async (req, res) => {
  res.redirect("/blogs");
};

const get_contact = (req, res) => {
  const { user } = req;
  res.render("index/contact", { user });
};

module.exports = { index, get_about, get_contact };
