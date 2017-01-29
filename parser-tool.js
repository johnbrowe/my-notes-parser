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

            // Regex for \r\n, \r and \n
            // Win uses \r\n and Unix uses \n
            newText = text.split(/\r\n|\r|\n/);            

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

        var that = this;

        array.forEach(function (text, key) {

            var openTag = true;

            text.forEach(function (txt, key) {
                if (key === 0) {
                    text[key] = "<h2>" + txt + "</h2>";
                } else if (text[key].includes('´´´') && openTag == true){
                    text[key] = "<pre><code>";
                    openTag = false;    
                } else if (text[key].includes('´´´') && openTag == false){
                    text[key] = "</pre></code>";
                    openTag = true;    
                } else if (openTag == false){
                    text[key] = that.escapeHTML(text[key]);        
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

    },

    /**
     * Escape HTML
     */
    escapeHTML(html) {
        return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    }

};