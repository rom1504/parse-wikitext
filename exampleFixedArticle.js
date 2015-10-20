var WikiTextParser=require("./");

var wikiTextParser=new WikiTextParser('minecraft.gamepedia.com');

wikiTextParser.getFixedArticle("Slabs","2014-10-11T06:43:53Z",function(err,text,title,timestamp){
  console.log(title);
  console.log(timestamp);
  console.log(text);
});