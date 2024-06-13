var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/User");



router.get("/register", function(req, res) {
    res.render("Authenication/register");
});
//------------Handel register post request------------------
router.post("/register", function(req, res) {
    User.register(new User({
        username: req.body.username,
        email: req.body.email
    }), req.body.password, function(err, User) {
        if (err) {
            req.flash("error", err.message);
            res.redirect("back");
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", "Your Account was created Successfully");
                res.redirect("/campgrounds");
            });
        }
    });
});
//-----------------Login Page-----------------------------------------------
router.get("/login", function(req, res) {
    res.render("Authenication/login");
});
//------------------handel post login request---------------------------------------
router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}), function(req, res) {
    req.flash("success", "Welcome back " + req.user.username);
});
//----------------------Logout------------------------
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out Successfully");
    res.redirect("/");
});

module.exports = router;