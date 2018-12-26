const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

passport.use(
	new LocalStrategy(
		function(email, password, done) {
			mongoose.model('User').findOne({email: email}).then(
				function(user) {
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

passport.serializeUser(function(user, done) {
	mongoose.model('User').findById(user._id).then(function(err, user) {
		let token = user.setToken();
		user.save().then(function() {
			done(null, user);
		}).catch(function(err) { done(err, null); });
	}).catch(function(err) {
		done(err, null);
	});
});

passport.deserializeUser(function(token, done) {
	mongoose.model('User').findOne({tokens:token}).then(
		function(user) {
			done(null, user);
		}
	).catch(function(err) {
		done(err);
	});
});
