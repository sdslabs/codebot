var assert = require('assert');
var redis = require("redis"),
    r = redis.createClient();
var users = require("../users")(r);

//Choose the test database, instead of the production (0)
r.select(1,function(){
  r.flushdb();
  describe("User Module", function(){

    it("should create a new user", function(){
      users.create("nemo","password", function(res){
        assert(res);
      });
    });

    it("should list all users", function(){
      users.get(function(userList){
        assert(userList.length>0);
      });
    });

    it("should check passwords correctly", function(){
      users.checkPass("nemo","password", function(res){
        assert(res==true);
      });
      users.checkPass("nemo","wrongpassword", function(res){
        assert(res==false);
      });
    });

    it("should mark a problem as solved", function(){
      users.markSolved("nemo", 1, function(){
        users.solvers(1, function(res){
          assert(res.length==1)
        });
        users.solvedProblems("nemo", function(res){
          assert(res.length==1);
        });
      });
    })
    
  });
})