/** Users Module */

var crypto = require('crypto')
  , shasum = crypto.createHash('sha1');

module.exports = function(r){
  /**
  var createUser = function(username, password){
    username = username.replace(/\W/g, '');
    var hash = shasum.update(password+"T)A(YR(*QEHWDOEIUF").digest('hex');
    //check if user already exists
    var userInDB = r.sismember("users",username);
    if(userInDB){
      return false;
    }
    else{
      //Create a new user
      r.sadd("users", username);
      r.set("passwords:"+username, hash)
    }
  };*/
  var getUsers = function(cb){
    var results = r.smembers("users", function(err,res){
      if(err)
        cb(false);
      else
        cb(res);
    });
    return results;
  };
  return {
    get: getUsers
    //create: createUser
  }
};