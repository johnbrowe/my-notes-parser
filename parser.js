var dotenv = require('dotenv');
var fs = require('fs');
var jsonfile = require('jsonfile');
var _  = require('underscore');
var pt = require('./parser-tool');

// Load enviroment variables
dotenv.load();
var notes_path = process.env.NOTES_PATH;
console.log(notes_path + 'notes.txt');


/**
 * Read file
 * Convert txt into parsed JSON file
 */
fs.readFile(notes_path + 'notes.txt', 'utf8', function (err,data) {

    if (err) return console.log(err);

    // Separate notes into array
    var result = data.split('----');
   
    // Filter text
    var newArray = pt.filterText(result);
    console.log(newArray[1]);
    // Parse text
    newArray = pt.parseText(newArray);
    
    // Flatten array
    newArray = pt.flattenArray(newArray);

    // Convert array to object
    var newObject = _.extend({}, newArray);

    // Write file
    jsonfile.writeFile(notes_path + 'notes.json', newObject, {spaces: 2}, function (err) {

        if(err) console.error(err);

        console.log("Parsed");

    });

});
