exif-extractor
--------------------------------------

SUMMARY
========
It is an API to be integrated with a UI.

TODO:
1. Search engine
2. User interface methods for the search

Jose A. Villarreal (c) 2016.


Dependencies
============
- Express 
- Node.js v6.3.0 (npm v3.10.3) >=
- Mongodb v2.4.12 >=
- See package.js

Usage
===========
-  Start:
```
npm install
node api.js
node api.js --reset
will reset the mongodb table that contains the metadata.
```
- The database is exif-extractor
- The table is exif
- Port 8010
- exif table structure:
```
{
	key: 'imageKey',
	metadata: {exifDataExtractedObject}
}
```

- Query endpoints

```
1. GET localhost:8010/exif
gets the list of all exif photos metadata stored

{
 items: [object],
 count: {number}
}


2. GET localhost:8010/exif/:key

GET http://localhost:8010/exif/001f4fda-11a9-439d-b579-813d7624afe7.ecd9c0eb-65ec-4e30-b537-a3690f81616b
gets the specific item with key

{
 key: 001f4fda-11a9-439d-b579-813d7624afe7.ecd9c0eb-65ec-4e30-b537-a3690f81616b,
metadata: {exifDataExtractedObject}
}
```
