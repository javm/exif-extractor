exif-extractor
--------------------------------------

SUMMARY
========
Jose A. Villarreal (c) 2014.


Dependencies
============
- Express
- Node.js
- Mongodb
See package.js

Usage
===========
- node api.js
- node api.js will reset the mongodb table that contains the metadata.
- The database is exif-extractor
- The table is exif
- exif table structure:
{
	id: {imageKey},
	exif: {exifDataExtracted}
}
