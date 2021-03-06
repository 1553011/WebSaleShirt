var express = require('express');
var app = express();
var models = require('./models');
// Setting for app here

// Define your routes here
app.use(express.static(__dirname + '/public'));
var expressHbs = require('express-handlebars');
var paginateHelper = require('express-handlebars-paginate');
var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout_home', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
	helpers			: {
		paginate: paginateHelper.createPagination
	}
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
	limit: '50mb', extended: true
}));

var flash=require('connect-flash');
var cookieParser=require('cookie-parser');
app.use(cookieParser());
var session=require('express-session');
app.use(session({
	secret:"S3CRET",
	resave:false,
	saveUninitialized:false
}));
app.use(flash());
var passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());

var expressValidator=require('express-validator');
app.use(expressValidator());

app.use(function(req,res,next){
	res.locals.success_message =req.flash('success_message');
	res.locals.error_message = req.flash('error_message');
	res.locals.user=req.user || null;
	next();
});




// Set Server Port & Start Server
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server is listening at port ' + app.get('port'));
});

var shirts = require('./routes/shirts');
app.use('/home', shirts);
var design = require('./routes/design');
app.use('/design', design);

var user = require('./routes/users');
app.use('/users', user);

var cart = require('./routes/cart');
app.use('/cart', cart);


// app.post('/users/register', function(req, res){
// 	console.log("You are here");
// })

app.get('/', function(req, res){
	res.redirect('/home');
});

