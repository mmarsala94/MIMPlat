var MIMPlat = MIMPlat || {};

MIMPlat.Player = function(game, x, y, key, tilemap) {
	Phaser.Sprite.call(this,game, x, y, key);
this.cursors = this.game.input.keyboard.createCursorKeys();
	this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 500;
    this.BOUNCING_SPEED = 350;

	this.game = game;
	this.tilemap = tilemap;
	this.anchor.setTo(0.5);
    //this.player.animations.add('walking', [2, 1, 0, 1], 6, true);
    this.animations.add('walking', [0, 1, 2, 1], 20, true);
    this.animations.add('jumping', [6], 10);
    this.game.physics.arcade.enableBody(this);
    this.customParams = {};
    this.body.collideWorldBounds = true;


    //this.createPlayer();
    //follow player with the camera
    //this.game.camera.follow(this);

};

MIMPlat.Player.prototype = Object.create(Phaser.Sprite.prototype);
MIMPlat.Player.prototype.constructor = MIMPlat.Player;
MIMPlat.Player.prototype.update = function(){
 this.body.velocity.x = 0;

    if(this.cursors.left.isDown || this.customParams.isMovingLeft) {
      this.body.velocity.x = -this.RUNNING_SPEED;
      this.scale.setTo(-1, 1);
      this.play('walking');
      //this.backgroundLayer.scrollFactorX = 0.5;
      //this.foregroundLayer.scrollFactorX = -0.5;
      // this.backgroundLayer.autoScroll(-this.RUNNING_SPEED/6, 0);
      // this.foregroundLayer.autoScroll(-this.RUNNING_SPEED/6, 0);
    }
    else if(this.cursors.right.isDown || this.customParams.isMovingRight) {
      this.body.velocity.x = this.RUNNING_SPEED;
      this.scale.setTo(1, 1);
      this.play('walking');
      //this.backgroundLayer.scrollFactorX = 0.5;
      //this.foregroundLayer.scrollFactorX = 0.5;
      // this.backgroundLayer.autoScroll(this.RUNNING_SPEED/6, 0);
      // this.foregroundLayer.autoScroll(this.RUNNING_SPEED/6, 0);
    }
    else {
      this.animations.stop();
      this.frame = 3;
    }
    if((this.cursors.up.isDown || this.customParams.mustJump) && (this.body.blocked.down || this.body.touching.down)) {
      this.body.velocity.y = -this.JUMPING_SPEED;
      this.customParams.mustJump = false;
      this.play('jumping');
    }

    if(this.bottom == this.game.world.height){
      //this.gameOver();
    }
};