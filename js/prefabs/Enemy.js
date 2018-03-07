var MIMPlat = MIMPlat || {};

MIMPlat.Enemy = function(game, x, y, key, velocity, hasLandmark, landmarkName, isAlive, id, tilemap) {
	Phaser.Sprite.call(this,game, x, y, key);

	this.game = game;
	this.tilemap = tilemap;
	this.anchor.setTo(0.5);

	this.game.physics.arcade.enableBody(this);
	this.body.collideWorldBounds = true;
	this.body.bounce.set(1, 0);
	this.body.velocity.x = velocity;
	this.animations.add('walking', [0, 1, 0, 1], 5, true);
	this.play('walking');

	this.hasLandmark = hasLandmark;
	this.landmarkName = landmarkName;
	this.isAlive = isAlive;
	this.id = id;
};

MIMPlat.Enemy.prototype = Object.create(Phaser.Sprite.prototype);
MIMPlat.Enemy.prototype.constructor = MIMPlat.Enemy;
MIMPlat.Enemy.prototype.update = function(){
  var direction;
  //Make it look towards the movement
  if(this.body.velocity.x > 0){
    this.scale.setTo(1, 1);
    direction = 1;
  }
  else{
    this.scale.setTo(-1, 1);
    direction = -1;
  }
};