const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// create the charge
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			source: req.body.id,
			description: '$5 for 5 credits'
		});

		// update user credits
		req.user.credits += 5;
		const user = await req.user.save();

		// update user info to database
		res.send(user);
	});
};
