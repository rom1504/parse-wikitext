# parse-wikitext
[![NPM version](https://img.shields.io/npm/v/parse-wikitext.svg)](http://npmjs.com/package/parse-wikitext)
[![Build Status](https://img.shields.io/circleci/project/rom1504/parse-wikitext/master.svg)](https://circleci.com/gh/rom1504/parse-wikitext)

A simple wikitext parser in node.js

## Usage

see [example.js](example.js)

## API

### WikiTextParser(wikiserver)

Create the WikiTextParser object with `wikiserver`

### WikiTextParser.getFixedArticle(title,date,cb)

get page `title` at the last revision before `date`, cb arguments are : 

* err
* text : the content of the article
* title : the title of the article (might be different from the argument of getFixedArticle in case of redirection)
* timestamp : timestamp of the revision

### WikiTextParser.getFirstRevision(title,cb)

get the first revision of `title` cb arguments are : 

* err
* text : the content of the article
* title : the title of the article
* timestamp : timestamp of the revision

### WikiTextParser.getArticle(title,cb)

get page `title`, cb has two arguments : 

* err
* text : the content of the article
* title : the title of the article (might be different from the argument of getFixedArticle in case of redirection)

### WikiTextParser.dplQuery(query,cb)

make a dpl `query`, cb has two arguments : 

* err
* result

### WikiTextParser.pageToSectionObject(text)

`text` is the text of the article. This function return the article as a tree of sections, 
the content of each section is in the key 'content'


### WikiTextParser.parseInfobox(data)

`data` is an array of lines. Returns an object mapping the name of the fields to their value.


### WikiTextParser.parseTemplate(data)

`data` is an array of lines. Return an object with 3 properties: 

* template : the name of the template
* namedParts : an object mapping the named parts to their value
* simpleParts : an array of simple parts

## History

### 1.0.0

* update dependencies and add test

### 0.3.3

 * check err in getFirstRevision

### 0.3.2

 * fix removing the templates before the infobox

### 0.3.1

 * filter out non-infobox template before the infobox

### 0.3.0

 * add getFirstRevision
 * automatically get the previous page if the required page moved in getFixedArticle

### 0.2.0
 
 * add getFixedArticle to get the last revision of an article before a given date

### 0.1.0

* basic functionality, import from minecraft-data
