var request = require('request');
var fs = require('fs');
var parser = require('xml2json');
var path = require('path');
var config = require('../config');

var Exif = require('./exif');
var ExifImage = require('exif').ExifImage;

var Extractor = function(url){
  this.url = url;
};

var extractor = Extractor.prototype;

extractor.exif = function(imagePath){

  try {
    let image = imagePath.split("/");
    let imageName = image[image.length - 1];
    new ExifImage({ image : imagePath }, function (error, exifData) {
      if (error)
        console.log(`Error: ${imageName} `+error.message);
      else{
	var data = new Exif({
	  key: imageName.split(".jpg")[0],
	  metadata: exifData.exif
	});
	data.save(function (err) {
	  if (err) {
	    console.log(err);
	  } else {
	    console.log("Extracted EXIF for: ", imageName);
            console.log(exifData.exif);
	  }
	});
      }
    });
  } catch (error) {
    console.log(`Error: ${imageName} ` + error.message);
  }
};

extractor.download = function (){
  let self = this;
  let exif = function(){
    //writeStreamWritter path
    let path = this.path;
    self.exif(path);
  };

  let parse = function (){
    let xml = fs.readFileSync('waldo-recruiting.xml');
    let images = JSON.parse(parser.toJson(xml));
    images.ListBucketResult.Contents.forEach( c => {
      let stream = fs.createWriteStream(path.join(process.cwd(), config.get('photosPath'), c.Key));
      request.get(`${self.url}/${c.Key}`)
	.on('error', err => {
	  console.log(`Error with ${c.Key}`);
	  console.error(err);
	})
	.pipe(stream
	      .on('finish', exif));
    });
  };

  request.get(self.url).on('error', err => { console.error(err);}).pipe(fs.createWriteStream('waldo-recruiting.xml')
									.on('close', parse));
};

module.exports = Extractor;
