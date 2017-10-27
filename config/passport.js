const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(
	new LocalStrategy(
		function(username, password, done) {
			User.findOne({username: username}).then(
				function(user) {					
					if (!user) { return done(null, false); }
					if (!user.checkPassword(password)) { return done(null, false); }
					return done(null, user);
				},
				function(err) {
					if (err) { return done(err); }
				}
			)
		}
	)
)

passport.serializeUser(function(user, done) {
	User.findById(user._id).then(function(err, user) {
		let token = user.setToken();
		user.save().then(function() {
			done(null, user)
		}).catch(function(err) { done(err, null) })
	}).catch(function(err) {
		done(err, null);
	})
});

passport.deserializeUser(function(token, done) {
	User.findOne({tokens:token}).then(
		function(user) {
			done(null, user);
		}
	).catch(function(err) {
		done(err);
	})
})