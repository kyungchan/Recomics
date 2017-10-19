//GET라우팅

var User = require('../models/Users');
var passport = require("../config/passport");

exports.index = function(req, res) {
	var success;
	if (req.body.success == "true") {
		success = "true";
	} else if (req.body.success == "false") {
		success = "false";
	} else {
		success = "";
	}
	res.render('index', {
		title : 'Recomics',
		success : success
	});
};

exports.explore = function(req, res) {
	res.render('explore', {
		title : 'Recomics'
	});
};

exports.recommend = function(req, res) {
	res.render('recommend', {
		title : 'Recomics'
	});
};

exports.login = function(req, res) {
	var length = req.flash("length")[0] || {};
	var err_msg = req.flash("err_msg");
	res.render('login', {
		title : 'Recomics',
		length : length,
		err_msg : err_msg
	});
};

exports.register = function(req, res) {
	res.render('register', {
		title : 'Recomics',
		err_msg : "",
		length : 0
	});
};

exports.search = function(req, res) {
	var keyword = req.query.keyword;
	res.render('search', {
		title : 'Recomics',
		keyword : keyword
	});
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect("/");
};

// Post 라우팅

exports.registerpost = function(req, res) {
	var length = 0;
	if (req.body.name == "") {
		req.flash('err_msg', '사용자 이름을 입력해주세요.');
		length++;
	}
	if (req.body.id == "") {
		req.flash('err_msg', "ID를 입력해주세요.");
		length++;
	}
	if (req.body.password == "" && req.body.password_confirmation == "") {
		req.flash("err_msg", "Password를 입력해주세요.");
		length++;
	}
	if (req.body.password != req.body.password_confirmation) {
		req.flash("err_msg", "Password가 일치하지 않습니다.");
		length++;
	}
	if (length == 0) {
		var user = new User();
		user.name = req.body.name;
		user.id = req.body.id;
		user.password = req.body.password;
		user.save(function(err) {
			if (err) {
				console.log(err);
				req.flash("success", "false");
				res.redirect('/');
			} else {
				console.log("Registration Success ID : " + req.body.name);
				req.flash("success", "true");
				res.redirect('/');
			}
		});
	} else {
		res.render('register', {
			title : 'Recomics',
			err_msg : req.flash("err_msg"),
			length : length
		});
	}
};

exports.loginpost = /*function(req, res) {
	var isValid = true;
	var length = 0;
	if (req.body.id == "") {
		isValid = false;
		req.flash("err_msg", "ID를 입력하세요.");
		length++;
	}
	if (req.body.password == "") {
		isValid = false;
		req.flash("err_msg", "Password를 입력하세요.");
		length++;
	}

	if (isValid) {
		console.log("5");
	} else {
		req.flash("length", length);
		res.redirect("/login");

		console.log("4");
	}
}, 
*/passport.authenticate("local-login", {
	  successRedirect : "/",
	  failureRedirect : "/login",
	  failureFlash : true
});