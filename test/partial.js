var partial = require("../src/partial")
var assert = require("power-assert")
var heads = function(result){
  return result.map(function(p){
    return p[0]
  })
}
describe("partial", function(){
  it("left", function(){
    var steps = ["あ", "あｋ", "あか", "垢", "赤", "赤お", "赤おｎ","赤おに", "赤鬼"].reverse()
    assert.deepEqual(heads(partial(steps)), ["赤", "鬼"])
  })
  it("right", function(){
    var steps = ["あ", "あｋ", "あか", "垢", "赤", "お赤", "おｎ赤","おに赤", "鬼赤"].reverse()
    assert.deepEqual(heads(partial(steps)), [ "鬼", "赤"])

  })
  it("red centrer", function(){
    var steps = ["あ","あｋ","あか","赤","あ赤","あお赤","青赤","青赤ｋ","青赤き","青赤きい","青赤きいｒ","青赤きいろ","青赤黄色"]

  })
  it("yellow centrer", function(){
    var steps = ["","あ","あｋ","あか","赤","赤あ","赤あお","赤青","赤ｋ青","赤き青","赤きい青","赤きいｒ青","赤きいろ青","赤黄色青"].reverse()
    //, "赤黄色青みどり", "赤黄色青緑" ].
    assert.deepEqual(heads(partial(steps)), ["赤", "黄色", "青"])
  })
})