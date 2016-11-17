var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.use(bodyParser.urlencoded({extended: true})); // Get POST Data.
app.use(bodyParser.json());
var config = require('./config');
config.set('baseDir', process.cwd());


//Initializing...
var Extractor = require('./models/extractor');
var Exif = require('./models/exif');

var extractor = new Extractor(config.get('s3').url);

function connectCb(err){
  if (err) {
    console.log("Couldn't connect to mongodb");
    process.exit(1);
  }
  console.log("Connected to mongodb...");
  if(process.argv && process.argv[2] && process.argv[2] === '--reset'){
    Exif.remove({}, err => {
      if(err){
	console.error(err);
      }
      extractor.download();
    });
  }

}

// Use bluebird
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/exif-extractor', connectCb);

//Just saying hello
app.get('/', (req, res, next) => {
  res.json({msg: 'EXIF Extractor!'});
});

//Get all the exif metadata saved in the database in JSON format in the items array and the total number if items 'count'
app.get('/exif', (req, res, next) => {

  Exif.find().then(all => {
    res.json({items: all, count: all.length});
  }).catch(err => {
    res.status(500);
    return res.json({ error: err });
  });
});


//Get a specific photo exif metadata by key, the name of the image file (without '.jpg')
app.get('/exif/:key', (req, res, next) => {
  let key = req.params.key;
  Exif.findOne({key: key}).then(item => {
    if(!item){
      res.status(404);
      return res.json({ error: `No item found with key ${key}` });
    }
    res.json({item: item});
  }).catch(err => {
    res.status(500);
    return res.json({ error: err });
  });
});

let port = config.get('port');
app.listen(port);
console.info(`App listening on port ${port}`);
