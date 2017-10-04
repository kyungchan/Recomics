
/*
 * GET home page.
 */

exports.index = function(req, res){
	  res.render('index', { title: 'Recomics' });
};

exports.explore = function(req, res){
	  res.render('explore', { title: 'Recomics' });
};

exports.recommend = function(req, res){
	  res.render('recommend', { title: 'Recomics' });
};

exports.register = function(req, res){
	  res.render('register', { title: 'Recomics' });
};