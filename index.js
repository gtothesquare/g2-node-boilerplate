var cfg = require('_/config');
var app = require('_/app');

if (cfg.ipaddress) {
	app.listen(cfg.port, cfg.ipaddress);
} else {
	app.listen(cfg.port);
}

console.log(cfg.greeting + ' at port ' + cfg.port);