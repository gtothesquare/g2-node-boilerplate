var config = require('_/config');
module.exports = function (req, res, next) {
	res.status(404).sendFile(config.pubDir + '/404.html');
};