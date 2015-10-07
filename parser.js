var dotenv = require('dotenv');
var fs = require('fs');
var jsonfile = require('jsonfile');
var _  = require('underscore');

// Load enviroment variables
dotenv.load();
var notes_path = process.env.NOTES_PATH;

fs.readFile(notes_path + 'notes.txt', 'utf8', function (err,data) {

    if (err) {
        return console.log(err);
    }

    var result = data.split('----');
    var newText;
    var newArray = [];


    // Filter and create new array
    result.forEach(function(text){

        newText = text.split("\n\n");
        // Cleans empty string from array
        newText = newText.filter(Boolean);
        // Only push if array is not empty
        if(newText.length > 0){
            newArray.push(newText);
        }

    });


    newArray.forEach(function(text, key){

        text.forEach(function(txt, key){
            if(key === 0){
                text[key] = "<h1>" + txt + "</h1>";
            } else {
                text[key] = "<p>" + txt + "</p>";
            }
        });

    });


    var newObject = _.extend({}, newArray);

    jsonfile.writeFile(notes_path + 'notes.json', newObject, {spaces: 2}, function (err) {
        console.error(err)
    });

});