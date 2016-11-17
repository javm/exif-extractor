var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
app.use(bodyParser.urlencoded({extended: true}));               // Get POST Data.
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

mongoose.connect('mongodb://localhost/exif-extractor', connectCb);

app.get('/', (req, res, next) => {
  res.json({msg: 'EXIF Extractor!'});
});

app.get('/exif', (req, res, next) => {

  Exif.find().then(all => {
    res.json(all);
  });
}); 

app.listen(config.get('port'));
