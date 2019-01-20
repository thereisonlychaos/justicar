const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

passport.use(
	new LocalStrategy(
		function(username, password, done) {
			mongoose.model('User').findOne({email: username}).then(
				function(user) {
					console.log(user, "Password: ", password);
					if (!user) { return done(null, false); }
					if (!user.checkPassword(password)) { return done(null, false); }
					return done(null, user);
				},
				function(err) {
					if (err) { return done(err); }
				}
			);
		}
	)
);
