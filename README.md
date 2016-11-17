exif-extractor
--------------------------------------

SUMMARY
========
Jose A. Villarreal (c) 2016.


Dependencies
============
- Express
- Node.js
- Mongodb
See package.js

Usage
===========
-  Start:
node api.js
node api.js --reset
will reset the mongodb table that contains the metadata.

- The database is exif-extractor
- The table is exif
- Port 8010
- exif table structure:
{
	id: {imageKey},
	exif: {exifDataExtracted}
}
- Query endpoint
GET localhost:8010/exif
gets the list of all exif photos metadata stored




