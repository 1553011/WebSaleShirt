var express = require('express');
var usersController = require('../controllers/userController.js');
var passport = require('passport');

let LocalStrategy = require('passport-local').Strategy;
let router = express.Router();
var delay = require('delay');
//var User = require('../models').User;

router.get('/', function (req, res) {
	req.app.locals.layout = 'layout_login';
	//Duong dan hien tai se -> login
	res.render('login', {
	});
});

router.post('/register', function (req, res) {
	var email = req.body.email;
	var password = req.body.password;
	var cfm_pwd = req.body.cfm_pwd;
	console.log(email);
	console.log(password);
	console.log(cfm_pwd);

	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('cfm_pwd', 'Confirm Password is required').notEmpty();
	req.checkBody('cfm_pwd', 'Confirm Password Must Matches With Password').equals(password);

	var errors = req.validationErrors();
	if (errors) {
		console.log("Failed me roi!");
		res.render('/users', { errors: errors });
	}
	else {

		var user = {
			email: email,
			password: password,
			isAdmin: false,
			name: null,
			phone: null,
			address: null
		}
		usersController.createUser(user, function (err) {
			if (err) throw err;
			else console.log(user);
		});
		req.flash('success_message', 'You have registered, Now please login');
		res.redirect('/users');
	}
});



// passport.use('signup', new LocalStrategy({
// 	usernameField: 'email',
// 	passwordField: 'password',
// 	passReqToCallback: true
// },
// 	function (req, email, password, done) {
// 		usersController.getUserByEmail(email, function (err, user) {
// 			if (err) { return done(err); }
// 			if (!user) {
// 				return done(null, false, req.flash('error_message', 'No email is found'));
// 			}
// 			usersController.comparePassword(password, user.password, function (err, isMatch) {
// 				if (err) { return done(err); }
// 				if (isMatch) {
// 					return done(null, user, req.flash('success_message', 'You have successfully logged in!!'));
// 				}
// 				else {
// 					return done(null, false, req.flash('error_message', 'Incorrect Password'));
// 				}
// 			});
// 		});
// 		process.nextTick(function () {
// 			console.log("C");
// 			// find a user whose email is the same as the forms email
// 			// we are checking to see if the user trying to login already exists
// 			User.findOne({ 'local.email': email }, function (err, user) {
// 				// if there are any errors, return the error
// 				if (err)
// 					return done(err);
// 					console.log("C");
// 				// check to see if theres already a user with that email
// 				if (user) {
// 					return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
// 				} else {
// 					console.log("C");
// 					// if there is no user with that email
// 					// create the user
// 					var newUser = new User();

// 					// set the user's local credentials
// 					newUser.local.email = req.param('email');
// 					newUser.local.password = newUser.generateHash(req.param('password'));
// 					newUser.local.isAdmin = false;
// 					newUser.local.name = null;
// 					newUser.local.phone = null;
// 					newUser.local.address = null;
// 					console.log(newUser);
// 					// save the user
// 					usersController.createUser(newUser, function (err) {
// 						if (err) throw err;
// 						else 
// 						console.log(newUser);
// 					});
// 				}
// 			});
// 		});

// 	}
// ));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	usersController.getUserById(id, function (err, user) {
		done(err, user);
	});
});

// router.post('/register', passport.authenticate('signup', {
	
// 	successRedirect: '/users',
// 	failureRedirect: '/users',
// 	failureFlash: true
// }));

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback : true
},
	function(req, email, password, done) {
		usersController.getUserByEmail(email, function(err, user) {
			if (err) { return done(err); }
	  		if (!user) {
				return done(null, false, req.flash('error_message', 'No email is found'));
	  		}
	  		usersController.comparePassword(password, user.password, function(err, isMatch) {
				if (err) { return done(err); }
				if(isMatch){
		  				return done(null, user, req.flash('success_message', 'You have successfully logged in!!'));
				}
				else{
		  				return done(null, false, req.flash('error_message', 'Incorrect Password'));
				}
	 		});
		});
  	}
));

router.post('/login', passport.authenticate('local', {
	failureRedirect: '/users/login', failureFlash: true
}),
	function (req, res) {
		req.flash('success_message', 'You are now Logged in!!');
		delay(500)
			.then(() => {
				// Executed after 200 milliseconds 
				res.redirect('/');
			});

		console.log('Dang nhap thanh cong');
	}
);
router.get('/logout', function (req, res) {
	req.logout();
	req.flash('success_message', 'You are logged out');
	res.redirect('/users');
});




module.exports = router;