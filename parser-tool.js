let _ = require('lodash');
let showdown = require('showdown');
let converter = new showdown.Converter({ omitExtraWLInCodeBlocks: true });

module.exports = {
  /**
   * Filter text
   * Convert text into workable array
   */
  filterText(result) {
    // Set variables
    let newText;
    let newArray = [];

    // Filter and create new array
    result.forEach(function(text) {
      // Regex for \r\n, \r and \n
      // Win uses \r\n and Unix uses \n
      newText = text.split(/\r\n|\r|\n/);

      // Clean empty values
      newText = _.compact(newText);

      // Separate first from rest
      heading = newText.shift();

      // Remove heading from rest of text
      body = text.replace(heading, '');

      // Empty array
      newText = [];

      // Add heading and body
      newText.push(heading, body);

      // Only push if array is not empty
      if (newText.length > 0) {
        newArray.push(newText);
      }
    });

    return newArray;
  },

  /**
   * Parse text
   * Convert text into HTML
   */
  parseText(array) {
    array.forEach((text, key) => {
      text.forEach((txt, key) => {
        if (key === 0) {
          text[key] = '<h2>' + txt + '</h2>';
        } else {
          text[key] = converter.makeHtml(txt);
          text[key] = text[key].replace(/(?:\r\n|\r|\n)/g, '<br>');
        }
      });
    });

    return array;
  },

  /**
   * Flatten Array
   * Convert Aaray to single string
   */
  flattenArray(array) {
    // Create new array
    var newArray = [];

    // Flatten array to single string
    _.each(array, data => {
      // New text variable
      var flatText = '';

      // Set text
      _.each(data, text => {
        flatText += text;
      });

      newArray.push(flatText);
    });

    return newArray;
  },

  /**
   * Escape HTML
   */
  escapeHTML(html) {
    return html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
};
