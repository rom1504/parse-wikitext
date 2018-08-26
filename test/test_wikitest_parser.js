var WikiTextParser = require('../');
var _ = require('underscore');
var assert = require("assert");
const date = "2017-12-28T00:00:00Z";


var wikiTextParser = new WikiTextParser('minecraft.gamepedia.com');

function test(input, expectedOutput) {
  var actualOutput = wikiTextParser.pageToSectionObject(input);
  if(_.isEqual(actualOutput,expectedOutput))
  {
    return true;
  }
  else
  {
    console.log("actual output :");
    console.log(JSON.stringify(actualOutput));
    console.log("expected output :");
    console.log(JSON.stringify(expectedOutput));
    return false;
  }
}
describe("wikitext_parser",function(){
  it("parse a simple page",function(done){
    var testInput = "text_abstract\n" +
      "= premiere =\n" +
      "blabla\n" +
      "== deuxieme ==\n" +
      "text\n" +
      "== troisieme ==\n" +
      "text2\n" +
      "= quatrieme =\n" +
      "text3\n";

    var testOutput = {
      "content": ["text_abstract"],
      "premiere": {
        "content":["blabla"],
        "deuxieme": {
          "content": ["text"]
        },
        "troisieme": {
          "content": ["text2"]
        }
      },
      "quatrieme": {
        "content":["text3",""]
      }
    };
    assert.ok(test(testInput, testOutput));
    done();
  });

  it("parse a more complex page",function(done){
    var testInput2 = "text_abstract\n" +
      "= premiere =\n" +
      "blabla\n" +
      "=== deuxieme ===\n" +
      "text\n" +
      "=== troisieme ===\n" +
      "text2\n" +
      "= quatrieme =\n" +
      "text3\n";

    var testOutput2 = {
      "content": ["text_abstract"],
      "premiere": {
        "content":["blabla"],
        "deuxieme": {
          "content": ["text"]
        },
        "troisieme": {
          "content": ["text2"]
        }
      },
      "quatrieme": {
        "content":["text3",""]
      }
    };

    assert.ok(test(testInput2, testOutput2));
    done();
  });

  it("parse an even more complex page",function(done){
    var testInput3 = "text_abstract\n" +
      "= premiere =\n" +
      "blabla\n" +
      "=== deuxieme ===\n" +
      "text\n" +
      "=== troisieme ===\n" +
      "text7\n" +
      "=== 6666 ===\n" +
      "text2\n" +
      "= quatrieme =\n" +
      "text3\n";

    var testOutput3 = {
      "content": ["text_abstract"],
      "premiere": {
        "content":["blabla"],
        "deuxieme": {
          "content": ["text"]
        },
        "troisieme": {
          "content": ["text7"]
        },
        "6666": {
          "content": ["text2"]
        }
      },
      "quatrieme": {
        "content":["text3",""]
      }
    };


    assert.ok(test(testInput3, testOutput3));
    done();
  });

// {{BlockSprite|id
  it("extract the section and infobox of slab of minecraft wiki",function(cb){
    wikiTextParser.getArticle("Slab", function (err, data) {
      var sectionObject = wikiTextParser.pageToSectionObject(data);

      console.log(sectionObject["content"]);
      var infoBox = wikiTextParser.parseInfoBox(sectionObject["content"]);
      var values = infoBox["values"];
      console.log(values);
      cb();
    });
  })


  it("extract wood infobox",function(done){
    wikiTextParser.getFixedArticle("Wood", date, function (err, data) {
      if(err) {
        done(err)
        return;
      }
      var sectionObject = wikiTextParser.pageToSectionObject(data);

      var infoBox = wikiTextParser.parseInfoBox(sectionObject["content"]);
      var values = infoBox["values"];
      console.log(values);
      done();
    });
  });
});
