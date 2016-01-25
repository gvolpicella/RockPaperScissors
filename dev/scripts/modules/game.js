/**
* Game controller
* ---------------------------------------------
* expose : 	player1
*			player2
*			nextTurn
*/
var Game = function(player1type, player2type) {

	// score
	var score = [0,0];

	// players
	var players = {
		'player1' : new Player(player1type), 
		'player2' : new Player(player2type)
	};

	// debug console stripped with Gulp
	console.log("New game started: "+ players.player1 + " vs " + players.player2);

	/**
    * process next turn
    * @public
    */	
	var nextTurn = function(player, choice){
		ui.showSelection(player, choice);
		players[player].setMove(choice);
		console.log(player + " has chosen " + players[player].getMove());
		if (player === "player1") {
			setTimeout(function(){
				nextTurn("player2", computerChoice());
			},50);
		} else {
			var result = compare(players.player1.getMove(), players.player2.getMove());
			updateScore(result);
		}
	};

	/**
    * update score
    * @private
    */	
	var updateScore = function(winner) {

		if (winner === 'player1') {
			score[0] += 1;
		} else if (winner === 'player2') {
			score[1] += 1;
		}
		if (score[0] === 3) {
			ui.updateScore("Player 1 wins!", true);
		} else if (score[1] === 3){
			ui.updateScore("Player 2 wins!", true);
		} else {
			ui.updateScore("Score: " + score[0] + "-" + score[1]);
			if (players.player1.toString() === "computer") {
				setTimeout(function(){
					nextTurn("player1", computerChoice());
				},2000);
			}
		}
	};

	/**
    * computer "AI"
    * @private
    */	
	var computerChoice = function() {
		var choice = Math.floor(Math.random() * rules.size),
			choices = [];
		rules.forEach(function(value, key) {
		  choices.push(key);
		}, rules);
		return choices[choice];
	};

	/**
    * compare the 2 moves and output winner
    * @private
    */	
	var compare = function(move1, move2) {

		if (move1 === move2) {
			return "tie";
		}

		var move1Losers = rules.get(move1),
			move2Losers = rules.get(move2);

		for (var i = 0; i < move1Losers.length; i++) {
			if (move1Losers[i] === move2) {
				return "player1";
			}
		}

		return "player2";

	};

	/**
    * module init
    */		
	(function init(){
		if (players.player1.toString() === "computer") {
			ui.setSelectionView("computer");
			setTimeout(function(){
				nextTurn("player1", computerChoice());
			},1000);
		}
	})();

    /**
    * Module's public interface
    * @returns {object}
    */
	return { 
		player1  : players.player1,
		player2  : players.player2,
		nextTurn : nextTurn
	};
};
