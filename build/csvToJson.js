var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var csv2geojson = require('csv2geojson');
var parse = require('csv-parse');
var async = require('async');


// define parameter number for each new file
var paramNum = '71900'
var inputFile = 'src/assets/csv/'+paramNum+'.csv';
var outputFile = 'src/assets/json/'+paramNum+'.json';

var string = [];

/* define parsing function */
var parser = parse({delimiter: ',', columns: true}, function(err, data) {
	string.push(data);
});

/* stream csv data */
fs.createReadStream(inputFile).pipe(parser).on('end', ()=>{
	console.log(outputFile)
	fs.writeFile(outputFile, JSON.stringify(string), (err) => {
		if (err) throw err;
		console.log('done');
		server.close();
	})
});




// Set server port
var server = app.listen(4000);
console.log('server is running');