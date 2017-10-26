const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
	new LocalStrategy(
		function(username, password, done) {
			User.findOne({username: username}, function(err, user) {
				if (err) { return done(err); }
				if (!user) { return done(null, false); }
				if (!user.checkPassword(password)) { return done(null, false); }
				return done(null, user);
			})
		}
	)
)