var problems = require("./problem");

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
      { msg:"SDSLabs Codematics is a program to help you discover & solve cool mathematical problems. You can type the following commands",
        className:'jquery-console-message'  },
      { msg:"[[b;;;white]help] For this help message"},
      { msg:'[[b;;;white]problems] to view a list of problems' },
      { msg:'[[b;;;white]problem <ID>] to view a particular problem' },
      { msg:'[[b;;;white]problem <ID> <Solution>] to submit a solution for a problem'  },
      { msg:'[[b;;;white]users] to see list of top 10 users' },
      { msg:'[[b;;;white]score] to see your own score' },
      { msg:'Several other terminal commands (like [[;;;red]ls,cd,whoami] etc) are also supported.' }
    ]);
  });
}
