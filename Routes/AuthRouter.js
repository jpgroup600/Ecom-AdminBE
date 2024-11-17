const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const passport = require('passport');

const router = require('express').Router();



router.post('/login', loginValidation, login);
router.get('/naverlogin',
	passport.authenticate('naver'));

router.get('/naver/callback',
	passport.authenticate('naver', { failureRedirect: '/' }),
	function (req, res) {
		console.log('naver callback');
		// Successful authentication, redirect home.
		res.redirect('/');
	});
router.post('/signup', signupValidation, signup);

module.exports = router;