const passport = require("passport");

const auth_get_login = (req, res) => {
  res.render("auth/login", { user: null });
};

const auth_get_logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

const auth_post_login = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login",
});

module.exports = {
  auth_get_login,
  auth_post_login,
  auth_get_logout,
};
