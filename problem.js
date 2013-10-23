/**
 * The module for 
 * talking to problems
 */
//Use a variable to store all titles
var fs = require('fs');
var util = require('util');
var titles = fs.readFileSync("problems/titles.md",{encoding:"utf-8"}).split("\n");
var solutions = fs.readFileSync("problems/solutions.txt",{encoding:"utf-8"}).split("\n");
var md5 = require('MD5');
var sha1 = require('sha1');

module.exports = {
  //returns the title of the given problem id
  getTitle : function(id){
    return titles[id-1];
  },

  //Returns the problem text in html
  getHTML : function(id){
    try{
      var html = fs.readFileSync("problems/"+id+".md",{encoding:"utf-8"});
    }
    catch(e){
      return false;
    }
    return html;
  },

  //Checks the answer for a problem
  check: function(id, solution){
    var answer = solutions[id-1];
    solution = md5(sha1(solution));
    return (answer==solution);
  }
}