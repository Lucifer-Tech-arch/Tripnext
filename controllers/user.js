const user = require("../models/users.js");

module.exports.signupform = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signuplogic = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        let newuser = new user({ email, username });
        let registeruser = await user.register(newuser, password);
        console.log(registeruser);
        req.logIn(registeruser, (err) => {
            if (err) {
                next(err);
            }
            req.flash("success", "Welcome to wonderlust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.loginform =  (req, res) => {
    res.render("users/login.ejs");
}

module.exports.loginlogic =  async (req, res) => {
        req.flash("success", "Welcome back to wonderlust");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully");
        res.redirect("/listings");
    })
};