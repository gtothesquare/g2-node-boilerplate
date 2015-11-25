var express = require('express');
var cfg = require('_/config');

var app = express();


app.set('views', cfg.viewDir);
//app.set('view engine', 'jade');
//http://stackoverflow.com/questions/15294941/express-js-app-locals-vs-req-locals-vs-req-session
app.locals.cfg = cfg;

// middleware
app.use(express.static(cfg.pubDir));
app.use('/', express.static(cfg.pubDir));
//app.use(require('./routes.js'));

// custom error middleware
app.use(require('_/middleware/notFound'));
app.use(require('_/middleware/handleError.js'));

module.exports = app;

var options = {
	maxAge: '1d'
};