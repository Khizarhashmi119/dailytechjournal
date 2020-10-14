const { validationResult } = require("express-validator");

const loginDataValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("auth/login", { user: null, errors: errors.array() });
  }

  next();
};

const registerDataValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("user/register", { user: null, errors: errors.array() });
  }

  next();
};

const createBlogDataValidation = (req, res, next) => {
  const errors = validationResult(req);
  const { user } = req;

  if (!errors.isEmpty()) {
    return res.render("blog/create", { user, errors: errors.array() });
  }

  next();
};

module.exports = {
  loginDataValidation,
  registerDataValidation,
  createBlogDataValidation,
};
