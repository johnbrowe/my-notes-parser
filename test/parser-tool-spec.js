var expect = require('chai').expect;
var pt = require('./../parser-tool');

describe('filterText()', function () {

    it('it should convert note into an array', function () {

        var result = ['\r\n\r\n1. Heading r\n\r\nBody text.\r\n\r\n', '\n\n2. Heading \n\nBody text.\n\n'];
        
        var notes = pt.filterText(result);
        
        expect(notes).to.have.deep.property('[0][0]', '1. Heading r');
        expect(notes).to.have.deep.property('[1][0]', '2. Heading ');

    });

});

describe('parseText()', function () {

    it('it should convert first child elem into <h2>', function () {

        var result = [
            ['1. Heading r\n', 'Body text.'],
            ['2. Heading r\n', 'Body text.']
        ];

        var notes = pt.parseText(result);

        expect(notes).to.have.deep.property('[0][0]', '<h2>1. Heading r\n</h2>');
        expect(notes).to.have.deep.property('[1][0]', '<h2>2. Heading r\n</h2>');

    });

    it('it should convert all child elem except first into <p>', function(){

        var result = [
            ['1. Heading r\n', 'Body text 1.', 'Body text 2.'],
            ['2. Heading r\n', 'Body text.']
        ];

        var notes = pt.parseText(result);
      
        expect(notes).to.have.deep.property('[0][1]', '<p>Body text 1.</p>');
        expect(notes).to.have.deep.property('[0][2]', '<p>Body text 2.</p>');
        expect(notes).to.have.deep.property('[1][1]', '<p>Body text.</p>');
        
    });

    it('it should convert 3 backticks into codeblock', function(){

        var result = [
            [ 
            '1. Codeblock',
            'Here is a code block.\n``` \nfunction test() {\n  console.log("notice the blank line before this function?");\n}\n```',
            ] 
        ]
        
        var notes = pt.parseText(result);
      
        expect(notes).to.have.deep.property('[0][1]', '<p>Here is a code block.</p>\n<pre><code class="  language- ">function test() {\n  console.log("notice the blank line before this function?");\n}</code></pre>');
        
    });

});

describe('flattenText()', function () {

    it('it should convert first child elem into <h2>', function () {

        var result = [ 
            [ 
                '<h2>1. Heading r\n</h2>',
                '<p>Body text 1.</p>',
                '<p>Body text 2.</p>' 
            ],
            [ 
                '<h2>2. Heading r\n</h2>', 
                '<p>Body text.</p>' 
            ] 
        ];

        var notes = pt.flattenArray(result);

        expect(notes[0]).to.be.a('string');
        expect(notes[1]).to.be.a('string');
        
    });

});