const passport = require('passport');

module.exports = app => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	// Login
	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		(request, response) => {
			response.redirect('/surveys');
		}
	);

	// Logout
	app.get('/api/logout', (request, response) => {
		request.logout();
		response.redirect('/');
	});

	// Check current_user
	app.get('/api/current_user', (request, response) => {
		response.send(request.user);
	});

	// app.get('/', (request, response) => {
	// 	response.send({ hi: 'there' });
	// });
};
