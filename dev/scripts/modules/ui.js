/**
* UI view
* ---------------------------------------------
* expose : 	showPlayer1view
* 			showMainview
* 			updateMessage
* 			updateScore
* 			showSelection
* 			hideSelection
* 			setSelectionView
*/
var UI = function() {

	// current game
	var game;

	// selectors
	var config = {
		header          : document.getElementById("header"),
		message         : document.getElementById("message"),
		btnStart        : document.getElementById("btn-start"),
		choosePlayer1   : document.getElementById("player1-view"),
		mainView        : document.getElementById("main-view"),
		mainViewPlayer1 : document.getElementById("main-view-player1"),
		mainViewPlayer2 : document.getElementById("main-view-player2")
	};

	/**
    * choose player 1 type
    * @public
    */	
	var showPlayer1view = function(){
		hideViews();
		updateMessage("Select Player 1");
		config.choosePlayer1.className = "active-view";
	}; 

	/**
    * if computer, show an icon otherwise build the game buttons
    * @public
    */	
	var setSelectionView = function(type){
		if (type === "computer") {
			document.getElementById("player1-view-selection").innerHTML = '<img src="images/computer.gif" alt="Computer" />';
		} else {
			document.getElementById("player1-view-selection").innerHTML =   '<button id="btn-player1-rock" class="btn btn-primary btn-choose-move">' +
													                            '<img src="images/rock.png" alt="Rock" />' +
													                            'Rock' +
													                        '</button>' +
													                        '<button id="btn-player1-paper" class="btn btn-primary btn-choose-move">' +
													                            '<img src="images/paper.png" alt="Paper" />' +
													                            'Paper' +
													                        '</button>' +
													                        '<button id="btn-player1-scissors" class="btn btn-primary btn-choose-move">' +
													                            '<img src="images/scissors.png" alt="Scissor" />' +
													                            'Scissors' +
													                        '</button>';
		}
	}; 

	/**
    * show the chosen move
    * @public
    */	
	var showSelection = function(player, selection){

		var nodeSelection = player + "-view-selection";
		    nodeSelected = player + "-view-selected";
		document.getElementById(nodeSelection).className = "hide";
		document.getElementById(nodeSelected).className = "";
		document.getElementById(nodeSelected).innerHTML = '<img src="images/' + selection + '.png" />';
	}; 

	/**
    * hide the chosen move
    * @public
    */	
	var hideSelection = function(player){
		var nodeSelection = player + "-view-selection";
		    nodeSelected = player + "-view-selected";
		document.getElementById(nodeSelection).className = "";
		document.getElementById(nodeSelected).innerHTML = '';
	}; 

	/**
    * show the game board
    * @public
    */	
	var showMainview = function(player1type){
		game = new Game(player1type, "computer");
		hideViews();
		updateMessage("Score: 0 - 0");
		config.mainView.className = "active-view";
		currentPlayer(config.mainViewPlayer1); 
	}; 	

	/**
    * hide game views
    * @private
    */	
	var hideViews = function(){
		config.choosePlayer1.className = "view";
		config.mainView.className = "view";
	};

	/**
    * highlight current player
    * @private
    */	
	var currentPlayer = function(playerSection) {
		config.mainViewPlayer1.className = "player";
		config.mainViewPlayer2.className = "player";
		playerSection.className = "player active";
	};

	/**
    * update game message
    * @public
    */	
	var updateMessage = function(msg){
		config.message.innerHTML = msg;
	};

	/**
    * update score
    * @public
    */	
	var updateScore = function(score, quit){
		updateMessage(score);
		if (quit) {
			setTimeout(function(){
				hideViews();
				setSelectionView("human");
				hideSelection("player1");
				hideSelection("player2");
				bindButtonsEvents();
				// start a new game
				showPlayer1view();
			}, 2000);	
		} else {
			setTimeout(function(){
				hideSelection("player1");
				hideSelection("player2");	
			}, 2000);		
		}
	};

	/**
    * set game buttons events
    * @private
    */	
	var bindButtonsEvents = function() {

		// player 1: rock
		document.getElementById("btn-player1-rock").addEventListener('click', function(){
			currentPlayer(config.mainViewPlayer2);
			game.nextTurn("player1","rock");
		});

		// player 1: paper
		document.getElementById("btn-player1-paper").addEventListener('click', function(){
			currentPlayer(config.mainViewPlayer2);
			game.nextTurn("player1","paper");
		});

		// player 1: scissors
		document.getElementById("btn-player1-scissors").addEventListener('click', function(){
			showSelection("player1", "scissors");
			currentPlayer(config.mainViewPlayer2);
			game.nextTurn("player1","scissors");
		});

	};

	/**
    * set game events
    * @private
    */	
	var bindEvents = function(){
		// Start a new game
		config.btnStart.addEventListener('click', function(){
			config.header.className = "";
			showPlayer1view();
		});

		// player 1 choice: human
		document.getElementById("btn-player1-human").addEventListener('click', function(){			
			showMainview("human");
		});

		// player 1 choice: computer
		document.getElementById("btn-player1-computer").addEventListener('click', function(){
			showMainview("computer");
		});

		bindButtonsEvents();

	};

	/**
    * module init
    */
	(function init(){
		bindEvents();
	})();

    /**
    * Module's public interface
    * @returns {object}
    */
	return { 
		showPlayer1view  : showPlayer1view,
		showMainview	 : showMainview,
		updateMessage    : updateMessage,
		updateScore      : updateScore,
		showSelection    : showSelection,
		hideSelection    : hideSelection,
		setSelectionView : setSelectionView
	};

};
