/**
 * Module dependencies.
 */
var express = require('express'),
    config = require('./config');

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

// Routes
require('./routes')(app,config);

app.listen(3000);
