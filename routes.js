var problems = require("./problem"),
    util = require("./util");
module.exports=function(app,config){
  function dbError(res){
    res.json("There was an error in performing your request.")
  }
  /**
   * Displays a problem
   * Uses markdown
   * and guesses problems if id is numeric
   * Also saves the current viewing problem inside session
   */
  app.get('/problem/:id',function(req,res){
    var id = req.params.id;
    req.session.problemId = id;//Save the current problem Id for later use
    var title = problems.getTitle(id);
    var html = problems.getHTML(id);
    if(!html)
    {
      res.json("[[;;;red]No such problem]");
    }
    else
    {
      msg = [
        {msg:"[[b;;]"+id+". "+title+"]"},
        {msg:html,raw:true}
      ];
      res.json(msg);
    }
  }); /**
   * Respond back with the username
   */
  app.get('/whoami',function(req,res){
    res.json({msg:req.session.username});
  });
  /**
   * Some basic help text 
   */
  app.get('/help',function(req,res){
    res.json([
      { raw: true, msg:"SDSLabs CodeBot is an alternative interface to <a href='https://projecteuler.net'>Project Euler</a>. You can type the following commands: "},
      { msg:"[[b;;;white]help] For this help message"},
      { msg:'[[b;;;white]problems] to see first 10 problems' },
      { msg:'[[b;;;white]problems <start> <end>] to view a list of problems numbering from start to end.' },
      { msg:'[[b;;;white]problem <ID>] to view a particular problem' },
      { msg:'[[b;;;white]submit <ID> <Solution>] to submit a solution for a problem'  },
      { msg:'[[b;;;white]users] to see list of top 10 users' },
      { msg:'[[b;;;white]score] to see your own score' },
      { msg:'Several other terminal commands (like [[;;;red]ls,cd,whoami] etc) are also supported.' }
    ]);
  });

  /** Problem related routes */
  /** Get a list of Problems */
  app.get('/problems',function(req,res){
    res.redirect('/problems/1/10');
  });
  //Fix a typo
  app.get('/problems/:id', function(req,res){
    res.redirect('/problem/'+req.param.id);
  });
  //Fix another typo
  app.get('/problem/:start/:end', function(req,res){
    res.redirect('/problems/'+req.params.start+"/"+req.params.end);
  });
  //Show the problems in a table
  app.get('/problems/:start/:end', function(req,res){
    var start=parseInt(req.params.start), end=parseInt(req.params.end);
    response = ["Showing problems "+start+" to "+end];
    for(var i=start;i<=end;i++){
      if(i>430)
        break;
      response.push("[[b;;;]"+util.pad(i.toString(),3,' ',1)+".] "+problems.getTitle(i));
    }
    res.json(response);
  });

  /** Session aware routes **/
  app.get('/pwd',function(req,res){
    if(!req.session.cwd)
      req.session.cwd = '/';
    res.json(req.session.cwd);
  });

  app.get('/ls',function(req,res){
    var cwd = req.session.cwd||'/';
    switch(cwd){
      case 'problems':
        res.redirect('/problems');
        break;
      case 'users':
        res.json('all top recent');
        break;
      default:
        res.json('[[b;;;]problems/]  README [[b;;;]users/]');
    }
  });

  app.get(/(file|open|cat|more|less)\/(\S+)/,function(req,res){
    var cwd = req.session.cwd || '/';
    var cmd=req.params[0];
    var file = req.params[1];
    switch(cwd){
      case '/':
        if(file == 'README')
          res.json({msg: '<b>CodeBot</b> is a mathematical initiative by <a target="_blank" href="https://facebook.com/SDSLabs">SDSLabs</a>, IIT Roorkee. The problems are same as those of <a href="https://projecteuler.net">Project Euler</a> and are used under a <a href="https://projecteuler.net/copyright">CC BY-NC-SA 2.0 UK</a> Licence.', raw:true});
        else
          res.json("cat: "+file+": No such file or directory");
        break;
      case 'problems':
        res.redirect('/problem/'+file);
        break;
      case 'users':
        res.redirect('/user/'+file);
        break;
      default:
        res.json(cmd+": "+file+": No such file or directory");
    }
  });

  app.get('/cd/:dir?',function(req,res){
    var cwd = req.session.cwd;
    var dir = req.params.dir || '/';
    if(dir == '/' || dir == 'users' || dir == 'problems')
    {
      req.session.cwd = dir//change directory
      res.redirect('/pwd');//notify user of directory change
    }
    else
      res.json("[[;;;red]Invalid Directory]");
      //invalid directory
  });

  app.get('/apt-get/moo',function(req,res){
    res.json([
      {raw:true,msg:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(__)"},
      {raw:true,msg:"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(oo)"},
      {raw:true,msg:"&nbsp;&nbsp;&nbsp;/------\/&nbsp;"},
      {raw:true,msg:"&nbsp;&nbsp;/&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;"},
      {raw:true,msg:"&nbsp;*&nbsp;&nbsp;/\\---/\\&nbsp;"},
      {raw:true,msg:"&nbsp;&nbsp;&nbsp;&nbsp;~~&nbsp;&nbsp;&nbsp;~~&nbsp;"},
      {raw:true,msg:"....\"Have&nbsp;you&nbsp;mooed&nbsp;today?\"..."}
    ]);
  });
  app.get('/moo',function(req,res){
    res.json("Have you mooed today?");
  });
  app.get('/sudo/*',function(req,res){
    res.json('Make me a sandwich');
  });
  app.get('/sv_restart/1',function(req,res){
    res.json("Try running your own server if you wanna restart it.");
  });
  app.get('/google/:word',function(req,res){
    res.json('@@Google@@ says '+req.params.word+' does not exist');
  });
  app.get('/*siri*',function(req,res){
    res.json('No, I\'m not Siri, thankyou');
  });
  app.get('*', function(req, res){
    var str = require('querystring').unescape(req.params[0]).replace(/\//g,' ');
    if(str.charAt(str.length-1)=='?'){
      //we get to ask wolfram alpha!
      /**
      wa.query(str,function(result){
        if(typeof result == "string")
          res.json({msg:result});
        else
          res.json({msg:"I did not understand that question.",className:"error"});
      });
      **/
    }
    else
      res.json('[[;;;red]'+str+": command not found]");
  });
}