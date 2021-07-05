const router = require("express").Router();
const User = require('../models/User.model');
const bcrypt = require('bcrypt');

//To-dos: check with Joanna on the exact URLs
//after signing up, they are redirected to the form
//after log-in, they are redirected to the form
//after submitting the form, they are redirected to the home page
//they can edit or delete in their private page (this shows all boxes they have uploaded)

//get sign-up page
router.get('/signup', (req, res, next) => {
    res.render('signup');
  });
//get log-in page
router.get('/login', (req, res, next) => {
    res.render('login');
  });

//post & checking the input against criteria
router.post("/signup", (req, res, next)=> {
    console.log(req.body);
    const { username, password } = req.body;
	// validation
	// is the password at least 8 characters - 
	if (password.length < 8) {
		// if not we show the signup form again with a message 
		res.render('signup', { message: 'Hey there, your password should be at least 8 characters long' });
		return;
	}
	// check if the username is empty
	if (username.length === 0) {
		// if yes show the form again with a message
		res.render('signup', { message: 'Hey there, we need a name here' });
		return;
	}
	if (username.length < 3) {
		// if yes show the form again with a message
		res.render('signup', { message: 'Not so quick, your username should contain at least 3 characters' });
		return;
	}
	// validation passed - username and password are in the correct format
	// we now check if that username already exists
	User.findOne({ username: username })
		.then(userFromDB => {
			// if user exists
			if (userFromDB !== null) {
				// we render signup again	
				res.render('signup', { message: 'Oops, this username is already taken' });
			} else {
				// if we reach this point this username can be used 
				// we hash the password and create the user in the database
				const salt = bcrypt.genSaltSync();
				const hash = bcrypt.hashSync(password, salt);
				console.log(hash);
				User.create({ username: username, password: hash })
					.then(createdUser => {
						console.log(createdUser);
						res.redirect('/form');
					})
					.catch(err => {
						console.log(err);
					})
			}
		})
});

router.post("/login", (req, res, next)=> {
    console.log(req.body);
    const { username, password } = req.body;
	User.findOne({ username: username })
		.then(userFromDB => {
			// if user exists
			if (userFromDB === null) {
				// we render signup again	
				res.render('login', { message: 'Invalid credentials, something is not right' });
				return;
			}
	//  if the username is correct -> we want to check the password from the input against the hash in the db	
			// bcrypt.compare either evaluates to true or false
			if (bcrypt.compareSync(password, userFromDB.password)) {
				// if it matches -> all credentials are correct 
				//  -> we log the user in
				req.session.user = userFromDB;
				res.redirect('/form');
			} else {
				// if that is not matching -> the password is not correct -> show the form again	
				res.render('login', { message: 'Invalid credentials, something is not right' });
				return;
			}
		})
});

  
  module.exports = router;