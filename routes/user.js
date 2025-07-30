const express = require("express");
//const user = require("../models/users.js");
const router = express.Router()
const passport = require("passport");
const {saveredireecturl} = require("../middleware.js");
const usercontroller = require("../controllers/user.js");

router
  .route("/signup")
  .get(usercontroller.signupform)
  .post(usercontroller.signuplogic)

router
  .route("/login")
  .get(usercontroller.loginform)
  .post(saveredireecturl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  usercontroller.loginlogic)

router.get("/logout",usercontroller.logout);

module.exports = router;