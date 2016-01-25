/**
* Player
* ---------------------------------------------
* expose :  type
*/
var Player = function(type) {
  this.type = type;
  this.move = "";
};

Player.prototype = (function() {
  
  var getMove = function() {
    return this.move;
  };

  var setMove = function(move) {
    this.move = move;
  };
  
  /**
  * Module's public interface
  * @returns {object}
  */
  return {
    getMove : getMove,
    setMove : setMove
  };

})();

// override toString
Player.prototype.toString = function()
{
	return this.type;
};
