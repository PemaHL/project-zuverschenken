const router = require("express").Router();
const Box = require('../models/Box');
const User = require('../models/User.model');


//this file contains CRUD function for logged-in users
//check with Joanna, if the user is not logged in, do we redirect them to sign-up or log-in?

// first, create a middleware to check if the user is logged in

const loginCheck = () => {
    return (req, res, next) => {
      // is there a logged in user
      if (req.session.user) {
        // proceed as intended
        next();
      } else {
        // there is no user logged in
        // we redirect to /login, or sign-up?
        res.redirect('/login');
      }
    }
  }

//if they are logged-in, they can see this page
router.get('/form', loginCheck(), (req, res, next) => {
    const loggedInUser = req.session.user
    res.render('form');
  });

  //add a new box using the form, a user need to be logged in
  router.post('/form', (req, res, next) => {
	// console.log(req.body);
	const { name, description, address } = req.body;
	console.log("creating a box");
	Box.create({ name, description, address })
		.then(createdBox => {
			console.log(`This box has just been added: ${createdBox}`);
            console.log(`/Box/${createdBox._id}`);
			res.redirect(`/profile`);
		})
        .catch(err => {
					console.log(err)
			res.render('form');
		})
});


  //if they are logged-in, they can see this page
  // to-do from July 5th, need to populate box under user???
  router.get('/profile', loginCheck(), (req, res, next) => {
    // this is how you access a cookie
    //console.log('this is the cookie: ', req.cookies)
    // this is how you can set a cookie
    //res.cookie('myCookie', 'hello world');
    // this is how you delete a cookie
    //res.clearCookie('myCookie'); question from July 5th, what does clear cookie do?
    const loggedInUser = req.session.user;
	console.log("checking if receiving user info:", loggedInUser._id);
    User.findById(loggedInUser._id)
        .populate('boxadded')
        .then(userFromDB => {
			console.log("checking info from DB:", userFromDB)
            res.render('profile', { user: userFromDB });
        })
        .catch(err => {
			console.log(err);
		})
  });
  
// this displays the edit form
router.get('/profile/:id/edit', (req, res, next) => {
	const boxId = req.params.id;
	Box.findById(boxId)
		.then(boxFromDB => {
			console.log(boxFromDB);
			// render a form with the book details
			res.render('edit', { boxFromDB });
		})
		.catch(err => {
			console.log(err);
		})
});

router.post('/profile/:id', (req, res, next) => {
	const boxId = req.params.id;
	const { name, description, address} = req.body;
	Box.findByIdAndUpdate(boxId, {
		name,
		description,
        address
	})
		.then(() => {
			res.redirect(`/profile`);
		})
		.catch(err => {
			console.log(err);
		})
});

router.post('/profile/:id/delete', (req, res, next) => {
	console.log(req.params.id);
	// delete this box
	Box.findByIdAndRemove(req.params.id)
		.then(() => {
			// redirect to the user profile section
			res.redirect(`/profile`);
		})
		.catch(err => {
			console.log(err);
		})
});

module.exports = router;