const bcrypt = require("bcrypt");

const User = require("../models/User");

const user_get_register = (req, res) => {
  res.render("user/register", { user: null });
};

const user_post_register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      console.log("User already exist.");
      return res.redirect("/user/register");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hash,
    });

    await user.save();
    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    res.redirect("/user/register");
  }
};

module.exports = { user_get_register, user_post_register };
