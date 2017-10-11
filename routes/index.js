//GET라우팅

var User = require('../models/Users');
var database;

exports.index = function (req, res) {
	res.render('index', { title: 'Recomics' });
};

exports.explore = function (req, res) {
	res.render('explore', { title: 'Recomics' });
};

exports.recommend = function (req, res) {
	res.render('recommend', { title: 'Recomics' });
};

exports.register = function (req, res) {
	res.render('register', { title: 'Recomics', err_msg: "", length: 0 });
};

exports.search = function (req, res) {
	var keyword = req.query.keyword;
	res.render('search', { title: 'Recomics', keyword: keyword });
};

//Post 라우팅

exports.registerpost = function (req, res) {
	var err_msg = [], length = 0;
	if (req.body.name == "") {
		err_msg.push("이름을 입력해주세요.");
		length++;
	}
	if (req.body.id == "") {
		err_msg.push("ID를 입력해주세요.");
		length++;
	}
	if (req.body.password == "" && req.body.password_confirmation == "") {
		err_msg.push("비밀번호를 입력해주세요.");
		length++;
	}
	if (req.body.password != req.body.password_confirmation) {
		err_msg.push("비밀번호가 일치하지 않습니다.");
		length++;
	}
	if (length == 0) {
		var user = new User();
		user.name = req.body.name;
		user.id = req.body.id;
		user.password = req.body.password;
		user.save(function (err) {
			if (err) {
				console.log(err);
				res.send('<script type="text/javascript">alert("회원가입 실패");</script>');
			} else {
				console.log("회원가입 성공 : " + req.body.name);
				res.redirect('/');
			}
		});
	} else {
		res.render('register', { title: 'Recomics', err_msg: err_msg, length: length });
	}
	//	res.send("POST 응답<br>" + "ID : " + req.body.id + "<br>NAME : " + req.body.name, { err_msg: err_msg});

};


exports.indexpost = function (req, res) {
	var err_msg = [];
	var username = req.body.userid;
	var password = req.body.userpass;

	User.findOne({id: username, password: password}, function(err, user){

		if (username == "" || password == "") {
			console.log("아이디 또는 비밀번호 값이 안들어왔습니다.");
		}
		else if(err){
			console.log("오류");
			console.log(err);
			return res.status(500).send();				
		}
		else if(!user){
			console.log("유저아님");			
			return res.status(404).send();
		}
		else {
		console.log("유저임");	
		}	
		return res.status(200).send();
	})
	//console.log("test" + username + " " + password);
};
