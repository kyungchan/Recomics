var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy; // 1
var User = require("../models/Users");

// serialize & deserialize User // 2
passport.serializeUser(function(user, done) {
	done(null, user._id);
});
passport.deserializeUser(function(id, done) {
	User.findOne({
		_id : id
	}, function(err, user) {
		done(err, user);
	});
});

// local strategy // 3
passport.use("local-login", new LocalStrategy({
	usernameField : "id", // 3-1
	passwordField : "password", // 3-1
	passReqToCallback : true
}, function(req, username, password, done) { // 3-2
	User.findOne({ id : username }).select({ password : 1 })
	.exec(function(err, user) {
		if (err){
			console.log("failure : " + user);
			return done(err);
		}
		if (user && user.password == password) {
			console.log("success : " + user);
			return done(null, user);
		} else {
			req.flash("length", 1);
			req.flash("err_msg", "ID나 Password가 잘못되었습니다.");
			return done(null, false);
		}
	});
}));

module.exports = passport;