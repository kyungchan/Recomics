
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/modules', express.static(__dirname + '/node_modules'));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


var databaseUrl = mongoose.connect("mongodb://team6:team123456@13.124.250.181:27017/recomics",  {
	useMongoClient: true,
});


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("DB connected");
});

app.get('/', routes.index);
app.post('/', routes.indexpost);
app.get('/explore', routes.explore);
app.get('/recommend', routes.recommend);
app.get('/register', routes.register);
app.post('/register', routes.registerpost);
app.get('/search', routes.search);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

