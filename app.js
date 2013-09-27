/**
 * Module dependencies.
 */
var express = require('express'),
    config = require('./config'),
    redis = require("redis"),
    r = redis.createClient();


var app = module.exports = express();
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


r.on("error", function (err) {
  console.log("Error " + err);
  process.exit(0);
});
// Routes
require('./routes')(app, config, r);

app.listen(3000);
