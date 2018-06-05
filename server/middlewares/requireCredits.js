module.exports = (req, res, next) => {
	// if user is not logged in, end the request and send back error message
	if (req.user.credits < 1) {
		return res.status(403).send({ error: 'Not enough credits!' });
	}

	// if user is logged in, let the user continue on the request handler
	next();
};
