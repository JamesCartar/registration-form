const express = require("express");
const passport = require("passport");

const {
  register,
  renderRegister,
  renderLogin,
  logout,
} = require("../controllers/auth");
const { checkNotAuthenticated } = require("../milddlewares/authenticated");

const router = express.Router();

// Linking css file
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));

router.get("/register", checkNotAuthenticated, renderRegister);
router.get("/login", checkNotAuthenticated, renderLogin);
router.delete("/logout", logout);

router.post("/register", register);
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: true,
  })
);

module.exports = router;
