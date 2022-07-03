const passport = require("passport");
const userModel = require("../models/user");

const initializePassport = require("../passport-config");
initializePassport(
  passport,
  async (email) => {
    const user = await userModel.findOne({ email: email });
    return user;
  },
  async (id) => await userModel.findOne({ id: id })
);

const renderRegister = async (req, res) => {
  res.render("register.ejs");
};
const register = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    const user = await userModel.create({
      name,
      email,
      password,
    });
    res.redirect("/auth/login");
  } catch (err) {
    res.redirect("/auth/register");
  }
};

const renderLogin = async (req, res) => {
  res.render("login.ejs");
};

const logout = (req, res, next) => {
  req.logOut(() => {
    res.redirect("/auth/login");
  });
};

module.exports = { register, renderRegister, renderLogin, logout };
