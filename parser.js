let dotenv = require('dotenv');
let fs = require('fs');
let jsonfile = require('jsonfile');
let _ = require('lodash');
let pt = require('./parser-tool');

// Load enviroment variables
dotenv.load();
let notes_path = process.env.NOTES_PATH;
console.log(notes_path + 'notes.txt');

/**
 * Read file
 * Convert txt into parsed JSON file
 */
fs.readFile(notes_path + 'notes.txt', 'utf8', (err, data) => {
  if (err) return console.log(err);

  // Separate notes into array
  let result = data.split('----');

  // Filter text
  let newArray = pt.filterText(result);

  // Parse text
  newArray = pt.parseText(newArray);

  // Flatten array
  newArray = pt.flattenArray(newArray);

  // Convert array to object
  let newObject = _.extend({}, newArray);

  // Write file
  jsonfile.writeFile(
    notes_path + 'notes.json',
    newObject,
    { spaces: 2 },
    err => {
      if (err) console.error(err);

      console.log('Parsed');
    }
  );
});
