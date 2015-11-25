var env = process.env.NODE_ENV || 'development';
var resolve = require('path').resolve;

// env specific config
var cfg = require('./env/'+env);
cfg.env = env;

// env agnostic config
cfg.pubDir = resolve(__dirname, cfg.clientAppDir);
//cfg.viewDir = resolve(__dirname, '../views')
cfg.port = process.env.PORT || cfg.port;

module.exports = cfg;
