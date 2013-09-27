/**
 * The module for 
 * talking to problems
 */
//Use a variable to store all titles
var fs = require('fs');
var util = require('util');
var titles = fs.readFileSync("problems/titles.md",{encoding:"utf-8"}).split("\n");

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
  }
}