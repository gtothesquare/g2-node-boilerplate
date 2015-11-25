module.exports = function (err, req, res, next) {
	console.log(err);
	res.locals.error = err;
	res.status(500).send({ error: 'sorry, something went wrong!'});
};