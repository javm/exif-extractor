/********************************************************************
 Default Settings, will be overridden by any environment specific
 settings.
 ********************************************************************/
var nconf = require('nconf');
var path  = require('path');

// load command line args and environment variables.
nconf.argv().env();

// set a default environment.
var env = process.env['EXIF_EXTRACTOR_NODE_ENV'] || 'development';


// Try to load an environment level config.
nconf.file({
  file: env + '.json',
  dir: path.join(__dirname, 'env'),
  search: true
});

// Default to the environment variable config.
// Note usually you want to use a  a .env
// don't use the environment json file.
nconf.defaults({
  log: {
    level: 'debug',
    file: path.join(process.cwd(), 'logs', env + '.log')
  },
  environment: env,
  s3: {
    url: "http://s3.amazonaws.com/waldo-recruiting"
  },
  photosPath: 'photos',
  port: process.env.PORT || 8010
});


module.exports = nconf;
