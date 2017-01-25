var dotenv = require('dotenv');
var fs = require('fs');
var jsonfile = require('jsonfile');
var _  = require('underscore');

// Load enviroment variables
dotenv.load();
var notes_path = process.env.NOTES_PATH;
console.log(notes_path + 'notes.txt');

// Start read file
fs.readFile(notes_path + 'notes.txt', 'utf8', function (err,data) {

    if (err) return console.log(err);

    // Separate notes into array
    var result = data.split('----');

    // Filter text
    var newArray = filterText(result);

    // Parse text
    newArray = parseText(newArray);

    // Flatten array
    newArray = flattenArray(newArray);

    // Convert array to object
    var newObject = _.extend({}, newArray);

    // Write file
    jsonfile.writeFile(notes_path + 'notes.json', newObject, {spaces: 2}, function (err) {

        if(err) console.error(err);

        console.log("Parsed");

    });

});



function filterText(result){

    // Set variables
    var newText;
    var newArray = [];

    // Filter and create new array
    result.forEach(function(text){

        newText = text.split("\n\n");

        // Cleans empty string from array
        newText = newText.filter(Boolean);;

        // Only push if array is not empty
        if(newText.length > 0){
            newArray.push(newText);
        }

    });

    return newArray;

}


function parseText(array){

    array.forEach(function(text, key){

        text.forEach(function(txt, key){
            if(key === 0){
                text[key] = "<h2>" + txt + "</h2>";
            } else {
                text[key] = "<p>" + txt + "</p>";
            }
        });

    });

    return array;

}

// Array to single string
function flattenArray (array){

    // Create new array
    var newArray = [];

    // Flatten array to single string
    _.each(array, function (data) {

        // New text variable
        var flatText = "";

        // Set text
        _.each(data, function (text) {

            flatText += text;

        });

        newArray.push(flatText);

    });

    return newArray;

}
