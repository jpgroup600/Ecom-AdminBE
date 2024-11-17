const passport = require('passport');
const UserModel = require('../Models/User');
const NaverStrategy = require('passport-naver').Strategy;
var client_id = 'SR7tFkPoL3GMzDGX0XgJ';
var client_secret = 'JrluyF0xt2';

passport.use(new NaverStrategy({
	clientID: client_id,
	clientSecret: client_secret,
	callbackURL: 'http://localhost:8080/auth/naver/callback'
},
	function (accessToken, refreshToken, profile, done) {
		UserModel.findOne({ email: profile.emails[0].value }, function (err, user) {
			if (err) {
				return done(err);
			}
			if (!user) {
				user = new UserModel({
					email: profile.emails[0].value,
					name: profile.displayName,
					password: profile._json
				});
				user.save(function (err) {
					if (err) console.log(err);
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
		});
		return done(null, profile);
	}
));

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
});
