var assert = require('assert');

var problems = require('../problem');

describe("Problem", function(){
  it("should return the correct problem title", function(){
    assert(problems.getTitle(10)=="Summation of primes");
  });
  it("should return problem HTML", function(){
    assert(problems.getHTML(10)!=null);
  })
});