var assert = require('assert');
var redis = require("redis"),
    r = redis.createClient();
var users = require("../users")(r);

describe("User", function(){

  //remove user from db
  /*r.srem("users", "captn3m0");
  r.del("passwords:captn3m0");
  it("should create a new user", function(){
    r.del("users:captn3m0:username");
    r.del("users:captn3m0:password");
    assert(users.create("captn3m0","password")==true);
  });*/
  it("list all users", function(){
    users.get(function(userList){
      assert(userList);
    });
  });
});