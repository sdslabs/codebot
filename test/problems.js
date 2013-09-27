var assert = require('assert');
describe("Problem", function(){
  var problems = require('../problem');
  it("should return the correct problem title", function(){
    assert(problems.getTitle(10)=="Summation of primes");
  });
  it("should return problem HTML", function(){
    assert(problems.getHTML(10)!=null);
  });
  it("should correctly check a solution", function(){
  	assert(problems.check(10,"142913828922"));
  });
});