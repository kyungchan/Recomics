
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , passport = require('./config/passport')
  , session = require('express-session')
  , flash = require('connect-flash')
  , bodyParser = require('body-parser');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.cookieParser());
app.use(express.methodOverride());
app.use(session({
	  secret: 'team6',
	  resave: false,
	  saveUninitialized: true
	  }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
	 res.locals.isAuthenticated = req.isAuthenticated();
	 res.locals.currentUser = req.user;
	 next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(__dirname + '/node_modules'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://team6:team123456@13.124.250.181:27017/recomics",  {
	useMongoClient: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("DB connected");
});

app.get('/', routes.index);
app.get('/explore', routes.explore);
app.get('/recommend', routes.recommend);
app.get('/register', routes.register);
app.post('/register', routes.registerpost);
app.get('/search', routes.search);
app.post('/login', routes.loginpost);
app.get('/login', routes.login);
app.get('/mypage', routes.mypage);
app.get('/logout', routes.logout);
app.get('/signout', routes.signout);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
