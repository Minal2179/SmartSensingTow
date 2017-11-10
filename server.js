var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/smartTowing";
mongoose.connect(url);
var db = mongoose.connection;
var cursor;


//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// serve static files from template
app.use(express.static(__dirname + '/views'));

// include routes
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


// listen on port 3000
app.listen(3000, function () {
  console.log('Express app listening on port 3000');
});






// app.use(bodyParser.urlencoded({extended: true}))
// app.set('view engine','ejs');

// MongoClient.connect(url, (err,database) => {
// 	if(err) return console.log(err);
// 	db = database;
// 	app.listen(4000, function() {
// 		console.log('listening on 4000');
// 	});
// })


// app.get('/', (req,res) => {
// 	cursor = db.collection('authuser').find().toArray(function(err, result) {
// 		if(err) return console.log(err);
// 		console.log(result);
// 		console.log(result[0].name);
// 		res.render('index.ejs');
// 		// res.render('index.ejs',{authuser:result})
// 	});
// });

// app.post('/authuser', (req, res) => {
// 	console.log(req.body.name);
// 	cursor = db.collection('authuser').find().toArray(function(err, result) {
// 		if(err) return console.log(err);
// 		if(req.body.name == result[0].name && req.body.password == result[0].password){
// 			response.statusCode = 302; 
//     		response.setHeader("Location", "/login");
//     		response.end();
// 		}
// 		// res.render('index.ejs');
// 		// res.render('index.ejs',{authuser:result})
// 	});
// 	// res.redirect('/');
// 	// db.collection('authuser').save(req.body, (err, result) => {
// 	// 	if(err) return console.log(err);

// 	// 	console.log('saved to database');
// 	// 	res.redirect('/');
// 	// })
// });