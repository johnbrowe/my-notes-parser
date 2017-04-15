let expect = require('chai').expect;
let pt = require('./../parser-tool');

describe('filterText()', () => {
    it('it should convert note into an array', () => {
        var result = ['\r\n\r\n1. Heading r\n\r\nBody text.\r\n\r\n', '\n\n2. Heading \n\nBody text.\n\n'];
        
        var notes = pt.filterText(result);
        
        expect(notes).to.have.deep.property('[0][0]', '1. Heading r');
        expect(notes).to.have.deep.property('[1][0]', '2. Heading ');
    });
});

describe('parseText()', () => {
    it('it should convert first child elem into <h2>', function () {
        let result = [
            ['1. Heading', 'Body text.'],
            ['2. Heading', 'Body text.']
        ];

        let notes = pt.parseText(result);

        expect(notes).to.have.deep.property('[0][0]', '<h2>1. Heading</h2>');
        expect(notes).to.have.deep.property('[1][0]', '<h2>2. Heading</h2>');
    });

    it('it should convert all child elem except first into <p>', function(){
        let result = [
            ['1. Heading r\n', 'Body text 1.', 'Body text 2.'],
            ['2. Heading r\n', 'Body text.']
        ];

        let notes = pt.parseText(result);
      
        expect(notes).to.have.deep.property('[0][1]', '<p>Body text 1.</p>');
        expect(notes).to.have.deep.property('[0][2]', '<p>Body text 2.</p>');
        expect(notes).to.have.deep.property('[1][1]', '<p>Body text.</p>');
    });

    it('it should convert 3 backticks into codeblock', function(){
        let result = [
            [ 
            '1. Codeblock',
            'Here is a code block.\n``` \nfunction test() {\n  console.log("notice the blank line before this function?");\n}\n```',
            ] 
        ]
        
        let notes = pt.parseText(result);
      
        expect(notes).to.have.deep.property('[0][1]', '<p>Here is a code block.</p><br><pre><code class="  language- ">function test() {<br>  console.log("notice the blank line before this function?");<br>}</code></pre>');
    });

    it('should convert newline to breaktag', function(){

        let result = [
            [ 
            'Break',
            'Here is a code block.\n\And here is a new line\n',
            'Windows start\nSearch and click msconfig\nClick startup tab\nUncheck unwanted startup program'
            ] 
        ];
        
        var notes = pt.parseText(result);
      
        expect(notes).to.have.deep.property('[0][1]', '<p>Here is a code block.<br>And here is a new line</p>');
        expect(notes).to.have.deep.property('[0][2]', '<p>Windows start<br>Search and click msconfig<br>Click startup tab<br>Uncheck unwanted startup program</p>');
    });
});

describe('flattenText()', () => {
    it('it should convert first child elem into <h2>', function () {

        let result = [
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

        let notes = pt.flattenArray(result);

        expect(notes[0]).to.be.a('string');
        expect(notes[1]).to.be.a('string');
    });
});
