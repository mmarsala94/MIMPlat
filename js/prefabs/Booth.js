var MIMPlat = MIMPlat || {};

MIMPlat.Booth = function(game, x, y, key, choice0, choice1, choice2, tilemap) {
	Phaser.Sprite.call(this,game, x, y, key);

	this.game = game;
	this.tilemap = tilemap;

	this.game.physics.arcade.enableBody(this);
	this.scale.setTo(1, 0.7);
	this.body.allowGravity = false;
	this.body.immovable = true;
	this.alpha = 0;
	this.choices = [];
	this.choices[0] = choice0;
	this.choices[1] = choice1;
	this.choices[2] = choice2;

};

MIMPlat.Booth.prototype = Object.create(Phaser.Sprite.prototype);
MIMPlat.Booth.prototype.constructor = MIMPlat.Booth;
