// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var ExifSchema = new mongoose.Schema({
  metadata: {
    type: Object,
    required: true
  },
  key: {
    type: String,
    required: true,
    index: true
  }
});

// Execute before each user.save() call

/*
ExifSchema.pre('save', function(next) {
  var exif = this;
  Object.keys(exif).forEach( key => {
    if(exif[key] instanceof Buffer ){
      exif[key] = exif[key].toString("utf-8");
    }
  });
  next();
});
*/

// Export the Mongoose model
module.exports = mongoose.model('Exif', ExifSchema);
