var fs = require('fs'),
    jsonfile = require('jsonfile'),
    _  = require('underscore');

fs.readFile('notes/notes.txt', 'utf8', function (err,data) {

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

    jsonfile.writeFile("notes/notes.json", newObject, {spaces: 2}, function (err) {
        console.error(err)
    })

});