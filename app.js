/**
 * Module dependencies.
 */
var express = require('express'),
    config = require('./config');

var app = module.exports = express();
/**
 * Authentication function
 */
auth = function(req,res,next){
    if(!req.session.username){
        console.log(req.cookies);
        if(req.cookies.hasOwnProperty('sds_login'))
            api.user.check_login(req,function(uid,req){
                if(uid){
                    //If user's cookie was authenticated
                    req.session.uid = uid;
                    api.user.details('username',function(username){
                        req.session.username = username;
                        db.query("select * from codematics.users where uid='"+uid+"'",function(err,results,fields){
                            if(!err){
                                //no results
                                if(results.length===0){
                                    db.query("INSERT INTO users (uid,score) VALUES ('"+uid+"',0)");
                                }
                            }
                        });
                        next();//Only go to next if the user is authenticated
                    });             
                }
                else{
                    res.redirect('/login');
                }
            });
        else
            res.redirect('/login');
    }
    else
        next();
}
function setSession(req,res,next){
    if(!req.session)
        req.session={cwd:'/'};
    if(!req.cookies)
        req.cookies={};
    next();
}
// Common Configuration
app.configure(function(){
    app.use(express.cookieParser());
    app.use(express.session({ 'key':'codematics',secret: "BSAIDG&*A^yuguisayds8a7" }));
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
    app.use(setSession);
    app.use(app.router);
});

// Routes
require('./routes')(app,config);

app.listen(3000);
