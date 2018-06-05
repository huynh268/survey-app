module.exports = (req, res, next) => {
	// if user is not logged in, end the request and send back error message
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in!' });
	}

	// if user is logged in, let the user continue on the request handler
	next();
};
