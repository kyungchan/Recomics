//GET라우팅

var User = require('../models/Users');
var Book = require('../models/Books');
var Rate = require('../models/Rates');
var passport = require("../config/passport");
var jsonAry = [];
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

function Node(value, left, right, data) {
	this.value = value;
	this.left = left;
	this.right = right;
	this.data = data;
}

function BST() {
	this.root = null;
	this.insert = insert;
	this.inOrder = inOrder;
}

function insert(value, data, direction) {
	var node = new Node(value, null, null, data);
	if (this.root == null) {
		this.root = node;
	} else {
		var current = this.root;
		var parent;
		var compare;

		while (true) {
			parent = current;
			if(direction){ //0 내림차 1 오름차
				compare = value < current.value;
			} else {
				compare = value > current.value
			}
			if (compare) {
				current = current.left;
				if (current == null) {
					parent.left = node;
					break;
				}
			} else {
				current = current.right;
				if (current == null) {
					parent.right = node;
					break;
				}
			}
		}
	}
}

function aryPush(value, ary){
	ary.push(value);
}

function inOrder(node, ary) {
	if (node != null) {
		inOrder(node.left, ary);
		ary.push(node.data);
		inOrder(node.right, ary);
	}
}

exports.test = function(req, res){
	var jsonString = '{';
	jsonString += '"id" : "704" }';
	console.log(jsonString);
	var jsonObject = JSON.parse(jsonString);
	console.log(jsonObject);
	
	User.find(jsonObject, function(err, result){
		res.send(result);
	});
	
}


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
	var sort = req.query.sort || "titleasc";
	var dataType;
	switch(type){
	case "genre":
		value = req.query.value || "Action";
		Book.find({genre: value}).count({}, function(err, count){
			if(!err){
				Book.find({genre: value}, function(err, books){
					if(!err){
						var bst = new BST();
						jsonAry=[];
						switch(sort){
						case "titleasc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].title, books[i], 1);
							}
							break;
						case "titledsc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].title, books[i], 0);
							}
							break;
						case "addasc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].index, books[i], 1);
							}
							break;
						case "adddsc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].index, books[i], 0);
							}
							break;
						case "authasc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].author, books[i], 1);
							}
							break;
						case "authdsc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].author, books[i], 0);
							}
							break;
						}
						bst.inOrder(bst.root, jsonAry);
						res.render('explore', {
							title : 'Recomics',
							books: jsonAry,
							type: type,
							value: value,
							count: count,
							sort: sort
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
						var bst = new BST();
						jsonAry=[];
						switch(sort){
						case "titleasc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].title, books[i], 1);
							}
							break;
						case "titledsc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].title, books[i], 0);
							}
							break;
						case "addasc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].index, books[i], 1);
							}
							break;
						case "adddsc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].index, books[i], 0);
							}
							break;
						case "authasc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].author, books[i], 1);
							}
							break;
						case "authdsc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].author, books[i], 0);
							}
							break;
						}
						bst.inOrder(bst.root, jsonAry);
						res.render('explore', {
							title : 'Recomics',
							books: jsonAry,
							type: type,
							value: value,
							count: count,
							sort: sort
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
						var bst = new BST();
						jsonAry=[];
						switch(sort){
						case "titleasc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].title, books[i], 1);
							}
							break;
						case "titledsc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].title, books[i], 0);
							}
							break;
						case "addasc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].index, books[i], 1);
							}
							break;
						case "adddsc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].index, books[i], 0);
							}
							break;
						case "authasc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].author, books[i], 1);
							}
							break;
						case "authdsc":
							for(var i = 0; i < books.length; i++){
								bst.insert(books[i].author, books[i], 0);
							}
							break;
						}
						bst.inOrder(bst.root, jsonAry);
						res.render('explore', {
							title : 'Recomics',
							books: jsonAry,
							type: type,
							value: value,
							count: count,
							sort: sort
						});
					}
				});
			}
		});
		
		break;
	}
};

exports.recommend = function(req, res) {
	if(req.isAuthenticated()){
		var rankBst = new BST();
		var rankAry = [];
		User.find({id: req.user.id}, {
			"id" : false,
			"password" : false,
			"name" : false,
			"_id" : false,
			"createdAt" : false,
			"ifRoot" : false,
			"__v" : false
		}, function(err, result){
			if(!err){
				for(key in JSON.parse(JSON.stringify(result[0]))){
					var property, value;
				      if (key=="rateAction"){  property = "액션"
					      } else if (key=="rateComic"){  property = "코믹"
					      } else if (key=="rateCooking"){  property = "요리"
					      } else if (key=="rateDaylife"){  property = "일상"
					      } else if (key=="rateDrama"){  property = "드라마"
					      } else if (key=="rateFantasy"){  property = "판타지"
					      } else if (key=="rateGamble"){  property = "도박"
					      } else if (key=="rateHeroism"){  property = "무협"
					      } else if (key=="ratePure"){  property = "순정"
					      } else if (key=="rateSF"){  property = "SF"
					      } else if (key=="rateSports"){  property = "스포츠"
					      } else if (key=="rateThriller"){  property = "스릴러" 
					      }
				    rankBst.insert(result[0][key], [property, result[0][key], key], 0);
					
				}
				rankBst.inOrder(rankBst.root, rankAry);
				var weight = [];
				var totalWeight = 0;
				for(var i = 0; i<5;i++){
					weight[i] = rankAry[i][1];
					if(weight[i]==0)
						weight[i] = 1;
					totalWeight += weight[i];
				}
0
				var recomdAry = [];
				var recomdBst = new BST();
				var jsonString = "{\"genre\":\"" + rankAry[0][2].substr(4)+"\"}";
				Book.find(JSON.parse(jsonString)).limit(12*weight[0]/totalWeight).skip(getRandomInt(0, 5)).exec(function(err, result){
					for(var i = 0; i<result.length; i++){
						recomdAry.push(result[i]);
						//recomdBst.insert(rankAry[0][1], result[i], 0)
						console.log(i);
					}
					jsonString = "{\"genre\":\"" + rankAry[1][2].substr(4)+"\"}";
					Book.find(JSON.parse(jsonString)).limit(12*weight[1]/totalWeight).skip(getRandomInt(0, 5)).exec(function(err, result){
						for(var i = 0; i<result.length; i++){
							recomdAry.push(result[i]);
						//	recomdBst.insert(rankAry[1][1], result[i], 0)
							console.log(i);
						}
						jsonString = "{\"genre\":\"" + rankAry[2][2].substr(4)+"\"}";
						Book.find(JSON.parse(jsonString)).limit(12*weight[2]/totalWeight).skip(getRandomInt(0, 5)).exec(function(err, result){
							for(var i = 0; i<result.length; i++){
								recomdAry.push(result[i]);
								//recomdBst.insert(rankAry[i][1], result[i], 0)
								console.log(i);
							}
							jsonString = "{\"genre\":\"" + rankAry[3][2].substr(4)+"\"}";
							Book.find(JSON.parse(jsonString)).limit(12*weight[3]/totalWeight).skip(getRandomInt(0, 5)).exec(function(err, result){
								for(var i = 0; i<result.length; i++){
									recomdAry.push(result[i]);
									//recomdBst.insert(rankAry[i][1], result[i], 0)
									console.log(i);
								}
								jsonString = "{\"genre\":\"" + rankAry[4][2].substr(4)+"\"}";
								Book.find(JSON.parse(jsonString)).limit(12*weight[4]/totalWeight).skip(getRandomInt(0, 5)).exec(function(err, result){
									for(var i = 0; i<result.length; i++){
										recomdAry.push(result[i]);
										//recomdBst.insert(rankAry[i][1], result[i], 0)
										console.log(i);
									}
									Rate.count({userId: req.user.id}, function(err, result){
										res.render('recommend', {
											title : 'Recomics',
											rank : rankAry,
											rcmd : recomdAry,
											countRcmd : recomdAry.length,
											countRate : result
										});
									});
								});
							});
						});
					});
				});
			}
		});
	} else {
		res.render('recommend', {
			title : 'Recomics'
		});
	}
};


exports.rating = function(req, res){
	var rate = req.query.rate;
	var bookId = req.query.bookId;
	var genre = req.query.genre;
	var beforeRate = req.query.before;
	var _id = req.query._id;
	if (rate >= 1 && rate <= 5){
		Rate.update({userId: req.user.id, bookId: bookId, genre: genre}, {$set : {rate: rate}}, {upsert: true}, function(err){
			if(!err){
				var jsonString = '{"$inc": {"rate' + genre + '":' + (rate-beforeRate) + '}}';
				User.update({id: req.user.id}, JSON.parse(jsonString), function(err){
					if(!err){
						console.log(jsonString);
						console.log(JSON.parse(jsonString))
						res.redirect("/bookinfo?book_id="+bookId);
					} else {
						res.send("잘못된 접근" + err);
					}
				});
			} else {
				res.send("잘못된 접근" + err);
			}
		});
	} else {
		res.send("잘못된 접근");
	}
}

exports.bookinfo = function(req, res) {
	var userId = "";
	if(req.isAuthenticated()){
		userId = req.user.id;
	}
	Rate.find({userId: userId, bookId: req.query.book_id}, {rate:true}, function(err, result){
		if(!err){
			Book.find({index: req.query.book_id}, function(err, book){
				if(!err && book!=""){
					var rate = result[0] ? result[0].rate : 0;
					var _id = result[0] ? result[0]._id : 0;
					console.log(book);
					res.render('bookinfo', {
						title : 'Recomics',
						book: book,
						rate : rate,
						_id : _id
					});
				} else {
					res.send("잘못된 접근" + err);
				}
			});
		} else {
			res.send("잘못된 접근" + err);
		}
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
		Rate.count({userId: req.user.id}, function(err, result){
			res.render('mypage', {
				title : 'Recomics',
				rates : result
			});
		});
	} else {
		res.send("잘못된 접근");
	}
};

exports.search = function(req, res) {
	var keyword = req.query.keyword;
	Book.find({"$text": {"$search":keyword}},function(err, result){
		if(!err){
			console.log(result);
			var length = result.length;
			res.render('search', {
				title : 'Recomics',
				keyword: keyword,
				length: length,
				result : result
			});
		} else {
			res.send("검색 오류" + err);
		}
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
				Rate.remove({userId:req.user.id}, function(err, result){
					if(err){
						res.send(err);						
					} else {
						req.logout();
						res.redirect("/");
					}
				});
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
		req.flash("err_msg", "Password 확인이 일치하지 않습니다.");
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
				req.flash("err_msg", "중복된 ID를 입력했습니다.");
				length++;
				res.render('register', {
					title : 'Recomics',
					err_msg : req.flash("err_msg"),
					length : length
				});
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

exports.loginpost = passport.authenticate("local-login", {
	  successRedirect : "/",
	  failureRedirect : "/login",
	  failureFlash : true
});