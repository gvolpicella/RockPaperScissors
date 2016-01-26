var expect = chai.expect;

describe("Player", function() {

	describe("constructor", function() {

		it("should set player's type", function() {
		  var player = new Player("human");
		  expect(player.type).to.equal("human");
		});

	});

	describe("getMove()", function() {

		it("should return player's move", function() {
			var player = new Player("human");
			player.setMove("rock");
			expect(player.getMove()).to.equal("rock");
		});

	});

	describe("setMove()", function() {

		it("should set player's move", function() {
			var player = new Player("human");
			player.setMove("rock");
			expect(player.move).to.equal("rock");
		});

	});

	describe("toString()", function() {

	    it("should return player's type", function() {
	      var player = new Player("human");
	      expect(player.toString()).to.equal("human");
	    });

	});

});
