$(document).ready(function(){
  var con = $('<div class="console">');
  $('#board').append(con);//Attach it to board instead of body
  $(document).ajaxError(function(e){
    controller1.reset();
  });
   $.fn.simulateKeyPress = function(character) {
    // Internally calls jQuery.event.trigger
    // with arguments (Event, data, elem). That last arguments is very important!
    var code=character.charCodeAt(0);
    $(this).trigger({ type: 'keypress', which: code,charCode:code, keyCode:code  });
    $(this).trigger({ type: 'keydown', which: code,charCode:code, keyCode:code  });
    $(this).trigger({ type: 'keyup', which: code,charCode:code, keyCode:code  });
  };
   var controller1 = con.console({
     errReport:function(){
      report({msg:'Error in command',className:'error'});
     },
     welcomeMessage: "Welcome to SDSLabs CodeBot. Type help to begin.",
     promptLabel: 'CodeBot > ',
     commandHandle:function(line,report){
       if(line == 'clear' || line == 'cls'){
         controller1.reset();
       }
       else{
         var params = line.split(' ');
         $.each(params,function(i,elem){
           if(elem == '.' || elem == '..' || elem == '...')
          {
            report({msg:'Incorrect Parameter. Due to JS Handling, .. cannot be passed as a parameter. Please use /',className:'error'});
            return false;
          }
           params[i] = encodeURIComponent(elem);
         });
         if(params[params.length-1].substr(-3,3)=='%3F'){
           var source = ['XKCD','HAL','Google','Bing','Siri','Ducks','Chuck Norris','Rajnikant','G.One','Iris','Mark Zuckerburg','Einstein'];
           var r = Math.floor(Math.random()*source.length);
          report('Asking '+source[r]+"... ");
        }
        $.getJSON(params.join('/'),{},function(msg){
          if(msg.clear == true)
            controller1.reset();
          report(msg);
          if(msg.exit == true){
            window.location.href='https://sdslabs.co.in';
            close();
          }
          if(msg.redirect){
            window.location.href=msg.redirect;
          }
          $(document).scrollTop($(document).height());
        });
      }
     },
     autofocus:true,
     animateScroll:true,
     promptHistory:true,
   });
  });