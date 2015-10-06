# parse-wikitext

A simple wikitext parser in node.js

## Usage

see [example.js](example.js)

## API

### WikiTextParser(wikiserver)

Create the WikiTextParser object with `wikiserver`

### WikiTextParser.getArticle(title,cb)

get page `title`, cb has two arguments : 

* err
* data : an array of lines

### WikiTextParser.dplQuery(query,cb)

make a dpl `query`, cb has two arguments : 

* err
* result

### WikiTextParser.pageToSectionObject(data)

`data` is an array of lines. This function return the article as a tree of sections, 
the content of each section is in the key 'content'


### WikiTextParser.parseInfobox(data)

`data` is an array of lines. Returns an object mapping the name of the fields to their value.


### WikiTextParser.parseTemplate(data)

`data` is an array of lines. Return an object with 3 properties: 

* template : the name of the template
* namedParts : an object mapping the named parts to their value
* simpleParts : an array of simple parts
