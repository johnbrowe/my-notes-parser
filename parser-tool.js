var _ = require('underscore');

module.exports = {

    /**
     * Filter text
     * Convert text into workable array
     */
    filterText(result) {

        // Set variables
        var newText;
        var newArray = [];

        // Filter and create new array
        result.forEach(function (text) {

            newText = text.split("\r\n");

            // Cleans empty string from array
            newText = newText.filter(Boolean);;

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

        array.forEach(function (text, key) {

            text.forEach(function (txt, key) {
                if (key === 0) {
                    text[key] = "<h2>" + txt + "</h2>";
                } else {
                    text[key] = "<p>" + txt + "</p>";
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

};