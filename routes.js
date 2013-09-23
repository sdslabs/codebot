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
		var html  = problems.getHTML(id);
		if(id<=430 && id>0)
			res.json({
				title: title, 
				msg: html
			});
		else
			res.json({msg:"No such problem",className:"error"});
	});	/**
	 * Respond back with the username
	 */
	app.get('/whoami',auth,function(req,res){
		res.json({msg:req.session.username});
	});
	/**
	 * Some basic help text 
	 */
	app.get('/help',function(req,res){
		res.json([
			{	msg:"SDSLabs Codematics is a program to help you discover & solve cool mathematical problems. You can type the following commands",
				className:'jquery-console-message'	},
			{	msg:"`help` For this help message",className:'value'	},
			{	msg:'`problems` to view a list of problems'	},
			{	msg:'`problem [ID]` to view a particular problem'	},
			{	msg:'`problem [ID] [Solution]` to submit a solution for a problem'	},
			{	msg:'`users` to see list of top 10 users' },
			{	msg:'`score` to see your own score'	},
			{	msg:'Several other terminal commands (like @ls@,@cd@,@whoami@ etc) are also supported.'	}
		]);
	});
}
