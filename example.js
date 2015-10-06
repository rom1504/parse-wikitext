var WikiTextParser=require("./");

var wikiTextParser=new WikiTextParser('minecraft.gamepedia.com');

// http://minecraft.gamepedia.com/Melon
wikiTextParser.getArticle("Melon",function(err,data){
  if(err) {
    console.log(err);
    return;
  }
  var sections=wikiTextParser.pageToSectionObject(data);
  console.log(wikiTextParser.parseInfoBox(sections["content"]));
});