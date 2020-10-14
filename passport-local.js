const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

const User = require("./models/User");

const initializePassport = (passport) => {
  const authenticateUser = async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: "Invalid credentials." });
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return done(null, false, { message: "Invalid credentials." });
      }

      return done(null, user, { message: "Successfully logged in." });
    } catch (err) {
      return done(err, false, { message: "Internal server error." });
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  });
};

module.exports = initializePassport;
