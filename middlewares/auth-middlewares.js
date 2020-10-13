const checkIsAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth/login");
};

const checkIsUnauthenticated = (req, res, next) => {
  if (req.isUnauthenticated()) {
    return next();
  }
  res.redirect("/");
};

module.exports = { checkIsAuthenticated, checkIsUnauthenticated };
