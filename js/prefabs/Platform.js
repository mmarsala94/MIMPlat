var MIMPlat = MIMPlat || {};

MIMPlat.Platform = function(game, x, y, key, tilemap) {
	Phaser.Sprite.call(this,game, x, y, key);

	this.game = game;
	this.tilemap = tilemap;

	this.game.physics.arcade.enableBody(this);
	this.scale.setTo(1, 0.7);
	this.body.immovable = true;
	this.body.collideWorldBounds = true;
	this.alpha = 0;
};

MIMPlat.Platform.prototype = Object.create(Phaser.Sprite.prototype);
MIMPlat.Platform.prototype.constructor = MIMPlat.Platform;