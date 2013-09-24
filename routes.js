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
      res.json([{msg:"No such problem",className:"error"}]);
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
      { msg:"SDSLabs Codematics is a program to help you discover & solve cool mathematical problems. You can type the following commands: "},
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
  app.get('/problems/:start/:end', function(req,res){
    var start=parseInt(req.params.start), end=parseInt(req.params.end);
    response = ["Showing problems "+start+" to "+end];
    for(var i=start;i<=end;i++){
      if(i>430)
        break;
      response.push(util.pad(i.toString(),3,' ',1)+". "+problems.getTitle(i));
    }
    res.json(response);
  });
}
