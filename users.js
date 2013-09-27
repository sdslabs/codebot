/** Users Module */

var crypto = require('crypto')
  , shasum = crypto.createHash('sha1');

module.exports = function(r){
  var createUser = function(username, password, cb){
    username = username.replace(/\W/g, '');
    var hash = shasum.update(password+"T)A(YR(*QEHWDOEIUF").digest('hex');
    //check if user already exists
    var userInDB = r.sismember("users",username, function(err,res){
      if(err)
        cb(false);
      else{
        if(res){
          cb(false);
        }
        else{
          r.sadd("users", username, function(){
            r.set("passwords:"+username, hash, function(){
              cb(true);
            })
          });
        }
      }
    });
  };
  var getUsers = function(cb){
    var results = r.smembers("users", function(err,res){
      if(err)
        cb(false);
      else
        cb(res);
    });
  };
  return {
    get: getUsers,
    create: createUser
  }
};