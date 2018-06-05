const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

// Take our the user from database, and attach user's info into the cookie
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Get back the cookie from user - turn user id into user
passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

// Declare the authentication strategy for passport to work with
// Use Google oauth20 strategy
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleID: profile.id });

			//user is already in our database
			if (existingUser) {
				return done(null, existingUser);
			}

			//create a new user
			const user = await new User({ googleID: profile.id }).save();
			done(null, user);
		}
	)
);
