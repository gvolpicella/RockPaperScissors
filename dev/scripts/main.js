/**
* Rock, Paper, Scissors - Giuseppe Volpicella
* Tested in Chrome, Safari and Firefox and Mobile - IE *should* work
*/

// rules of the game
var rules = new Map();

// set rules of the game, expand as you like (winner -> losers)
rules.set("rock", ["scissors", "lizard"]);
rules.set("scissors", ["paper", "lizard"]);
rules.set("paper", ["rock", "spock"]);
//rules.set("lizard", ["paper", "spock"]);
//rules.set("spock", ["scissors", "rock"]);
 
// init ui
var ui  = new UI();
