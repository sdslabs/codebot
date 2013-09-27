/** Users Module */

var util=require('./util');

module.exports = function(r){
  var createUser = function(username, password, cb){
    username = username.replace(/\W/g, '');
    var hash = util.hash(password);
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
  var checkPass = function(username, password, cb){
    r.get("passwords:"+username, function(err, res){
      if(err)
        cb(false);
      else{
        if(util.hash(password)==res)
          cb(true);
        else
          cb(false);
      }
    })
  }
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
    create: createUser,
    checkPass: checkPass
  }
};