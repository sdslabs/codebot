var crypto = require('crypto');
module.exports={
  pad: function(str, len, pad, dir) {
    var STR_PAD_LEFT = 1;
    var STR_PAD_RIGHT = 2;
    var STR_PAD_BOTH = 3;
    if (typeof(len) == "undefined") { var len = 0; }
    if (typeof(pad) == "undefined") { var pad = '&nbsp'; }
    if (typeof(dir) == "undefined") { var dir = STR_PAD_RIGHT; }
   
    if (len + 1 >= str.length) {
   
      switch (dir){
   
        case STR_PAD_LEFT:
          str = Array(len + 1 - str.length).join(pad) + str;
        break;
   
        case STR_PAD_BOTH:
          var right = Math.ceil((padlen = len - str.length) / 2);
          var left = padlen - right;
          str = Array(left+1).join(pad) + str + Array(right+1).join(pad);
        break;
   
        default:
          str = str + Array(len + 1 - str.length).join(pad);
        break;
   
      } // switch
    }
    return str;
   
  },
  hash: function(str){
    return require('crypto').createHash('sha1').update(str+"TEHWDOEIUF").digest('hex');
  }
}