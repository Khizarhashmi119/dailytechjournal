const bcrypt = require("bcrypt");

const User = require("../models/User");

const user_post_register = async (req, res) => {
  let errors = [];
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      errors.push({ msg: "Email already exist." });
      return res.render("auth/login", {
        user: null,
        errors,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hash,
    });

    await user.save();
    req.flash("success_msg", "You are now registered and can log in");
    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
    errors.push({ msg: "Internal server error." });
    res.render("/auth/login", {
      user: null,
      errors,
    });
  }
};

module.exports = { user_post_register };
