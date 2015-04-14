var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
var session = require('express-session');
var router = express.Router();
var errorhandler = require('errorhandler')
var config = require('./config');

var httpProxy = require('http-proxy');
var request = require('superagent');


//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === "admin" && password === "admin") // stupid example
      return done(null, {name: "admin"});

    return done(null, false, { message: 'Incorrect username.' });
  }
));

// Serialized and deserialized methods when got from session
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function(req, res, next){
  if (!req.isAuthenticated()) 
  	res.send(401);
  else
  	next();
};
//==================================================================

// Start express application
var app = express();
app.enable('trust proxy');

// all environments
app.set('port', process.env.PORT || 4000);
app.set('views', __dirname + './tmp/serve');
app.set('view engine', 'ejs');
//app.engine('.html', require('ejs').renderFile());
//app.use(express.favicon());
app.use(logger('dev'));
app.use(cookieParser()); 
app.use(bodyParser());
app.use(methodOverride());
app.use(session({ secret: 'securedsession',cookie:{maxAge:null} }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
app.use(router);
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(path.join(__dirname, '/.tmp/serve')));
app.use('/bower_components',express.static(path.join(__dirname, 'bower_components')));
app.use('/src',express.static(path.join(__dirname, '/src')));
app.use('/components',express.static(path.join(__dirname, '/src/components')));
app.use('/app',express.static(path.join(__dirname, '/src/app')));
app.use('/assets',express.static(path.join(__dirname, '/src/assets')));


// development only
if ('development' == app.get('env')) {
	  app.use(errorhandler());
    var browserSync = require('browser-sync');
  var bs = browserSync();
  app.use(require('connect-browser-sync')(bs));
}
/* browser reload
	var browserSync = require('browser-sync');
	var bs = browserSync({ logSnippet: false });
	app.use(require('connect-browser-sync')(bs));
*/

//==================================================================
// routes
app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/users', auth, function(req, res){
  res.send([{name: "user1"}, {name: "user2"}]);
});
//==================================================================

//==================================================================
// route to test if the user is logged in or not
app.get('/loggedin', function(req, res) {
  res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

// route to log out
app.post('/logout', function(req, res){

  req.logOut();
  res.send(200);
});

var proxy = httpProxy.createProxyServer({ secure: false});
  proxy.on('error',function(err,req,res) {
      console.log(err.toString());
      res.writeHead(500, {
          'Content-Type': 'text/plain'
      });
      res.end('Unable to proxy request to WEB3: '+err.toString());
  });
app.all('/*',function(req,res) {
  console.log(req.url);
  proxy.web(req,res,{ target: 'http://10.5.40.188/' });  
});
//==================================================================

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
