//GET라우팅

var User = require('../models/Users');
var Book = require('../models/Books');
var passport = require("../config/passport");

function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}

exports.index = function(req, res) {
	var success;
	var bookCount = 0;
	var idx1, idx2, idx3;
	if (req.body.success == "true") {
		success = "true";
	} else if (req.body.success == "false") {
		success = "false";
	} else {
		success = "";
	}

	Book.count({}, function(err, count){
		idx1 = getRandomInt(1, count);
		idx2 = getRandomInt(1, count);
		idx3= getRandomInt(1, count);
		Book.find({$or: [
			{index:idx1}, 
			{index:idx2}, 
			{index:idx3}
			]
		},function(err, books){
			if(err){
				res.send(err);
			} else {
				res.render('index', {
					title : 'Recomics',
					success : success,
					books : books
				});
			}
		});
	});	
};

exports.explore = function(req, res) {
	var type = req.query.type || "genre";
	var value;
	switch(type){
	case "genre":
		value = req.query.value || "Action";
		Book.find({genre: value}).count({}, function(err, count){
			if(!err){
				Book.find({genre: value}, function(err, books){
					if(!err){
						console.log(type + value + count);
						res.render('explore', {
							title : 'Recomics',
							books: books,
							type: type,
							value: value,
							count: count
						});
					}
				});
			}
		});
		break;
	case "country":
		value = req.query.value || "kor";
		Book.find({country: value}).count({}, function(err, count){
			if(!err){
				Book.find({country: value}, function(err, books){
					if(!err){
						console.log(type + value + count);
						res.render('explore', {
							title : 'Recomics',
							books: books,
							type: type,
							value: value,
							count: count
						});
					}
				});
			}
		});
		break;
	case "end":
		value = req.query.value || "0";
		Book.find({end: value}).count({}, function(err, count){
			if(!err){
				Book.find({end: value}, function(err, books){
					if(!err){
						console.log(type + value + count);
						res.render('explore', {
							title : 'Recomics',
							books: books,
							type: type,
							value: value,
							count: count
						});
					}
				});
			}
		});
		
		break;
	}
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

exports.mypage = function(req, res) {
	if(req.isAuthenticated()){
		res.render('mypage', {
			title : 'Recomics'
		});
	} else {
		res.send("잘못된 접근");
	}
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

exports.signout = function(req, res) { // 탈퇴
	if(req.isAuthenticated()){
		User.remove({id:req.user.id, createdAt:req.user.createdAt}, function(err, result){
			if(err){
				res.send(err);
			}else{
				req.logout();
				res.redirect("/");
			}
		});
	} else {
		res.send("잘못된 접근");
	}
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