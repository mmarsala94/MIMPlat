var MIMPlat = MIMPlat || {};

MIMPlat.GameState = {

  init: function(level, artifactsCollected, enemyList) {    
    
    //console.log(level);
    this.currentLevel = level || 'NYC';
    this.artifactsCollected = artifactsCollected || [];
    this.enemyList = enemyList || [];
    this.boothInteraction = false;
    //constants
    this.RUNNING_SPEED = 180;
    this.JUMPING_SPEED = 500;
    this.BOUNCING_SPEED = 350;
    //gravity
    this.game.physics.arcade.gravity.y = 1000;    
    
    //cursor keys to move the player
    this.cursors = this.game.input.keyboard.createCursorKeys();
  },
  create: function() {
    //load current level
    this.loadLevel();
    
    //show on-screen touch controls
    //this.createOnscreenControls();    
  },   
  update: function() {    
    //this.game.physics.arcade.collide(this.player, this.foregroundLayer); 

    //collision between the player and the collision layer
    //this.game.physics.arcade.collide(this.player, this.collisionLayer); 
    this.game.physics.arcade.collide(this.player, this.platforms);
    this.game.physics.arcade.collide(this.enemies, this.platforms);
    this.game.physics.arcade.collide(this.artifact, this.platforms);
    this.game.physics.arcade.collide(this.pipe, this.player);
    //**this.game.physics.arcade.overlap(this.player, this.path, this.changeLevel, null, this);
    //overlap between player and goal
    //this.game.physics.arcade.overlap(this.player, this.goal, this.changeLevel, null, this);

    this.game.physics.arcade.overlap(this.player, this.enemies, this.hitEnemy, null, this);
    //generic platformer behavior (as in Monster Kong)

    this.player.body.velocity.x = 0;

    if(!this.boothInteraction){

    if(this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking');
      //this.backgroundLayer.scrollFactorX = 0.5;
      //this.foregroundLayer.scrollFactorX = -0.5;
      // this.backgroundLayer.autoScroll(-this.RUNNING_SPEED/6, 0);
      // this.foregroundLayer.autoScroll(-this.RUNNING_SPEED/6, 0);
    }
    else if(this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1);
      this.player.play('walking');
      //this.backgroundLayer.scrollFactorX = 0.5;
      //this.foregroundLayer.scrollFactorX = 0.5;
      // this.backgroundLayer.autoScroll(this.RUNNING_SPEED/6, 0);
      // this.foregroundLayer.autoScroll(this.RUNNING_SPEED/6, 0);
    }
    else {
      this.player.animations.stop();
      this.player.frame = 3;
    }
    if((this.cursors.up.isDown || this.player.customParams.mustJump) && (this.player.body.blocked.down || this.player.body.touching.down)) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
      this.player.customParams.mustJump = false;
      //Only need first half of this if statement for jumping animation
      this.player.play('jumping');
    }

    if(this.cursors.up.isDown && this.game.physics.arcade.overlap(this.player, this.path)){
      this.changeLevel(this.player, this.path, this.enemyList);
    }

    if(this.cursors.down.isDown && this.game.physics.arcade.overlap(this.player, this.booth)){
      this.boothInteraction = true;
      this.boothDialogue();
    }
}

    if(this.cursors.down.isDown && this.game.physics.arcade.overlap(this.player, this.artifact)){
      this.player.customParams.artifacts.push(this.artifact.landmarkName);
      console.log('artifacts collected: ' + this.player.customParams.artifacts);
      this.artifact.kill();
      //console.log(this.player.customParams.artifact1);
    }

    if(this.player.bottom == this.game.world.height){
      //this.gameOver();
    }

    //change level GOTTA TEST THIS

  },
  loadLevel: function(){  
    //create a tilemap object
    this.map = this.add.tilemap(this.currentLevel);
    
    //join the tile images to the json data
    this.map.addTilesetImage('spriteSheetBackground', 'skyLineTiles');
    this.map.addTilesetImage('street', 'buildingTiles');
    this.map.addTilesetImage('ny-street5', 'buildingTilesStreet5');
    //this.map.addTilesetImage('actionButton', 'actionButton');
    //this.map.addTilesetImage('goal', 'goal');
    //create tile layers
    this.backgroundLayer = this.map.createLayer('backgroundLayer');
    this.foregroundLayer = this.map.createLayer('foregroundLayer');
    //this.collisionLayer = this.map.createLayer('collisionLayer');
    //this.collisionLayer.scale.setTo(0.5);
    this.backgroundLayer.scrollFactorX = 0.5;
    //send background to the back
    this.game.world.sendToBack(this.backgroundLayer);
    //collision layer should be collisionLayer
    //this.map.setCollisionBetween(730, 730, true, 'collisionLayer');
    
    //resize the world to fit the layer
    this.foregroundLayer.resizeWorld();
    
    //create player
    var playerArr = this.findObjectsByType('player', this.map, 'objectLayer');
    this.player = this.add.sprite(playerArr[0].x, playerArr[0].y, 'player', 3);
    this.player.anchor.setTo(0.5);
    //this.player.animations.add('walking', [2, 1, 0, 1], 6, true);
    this.player.animations.add('walking', [0, 1, 2, 1], 20, true);
    this.player.animations.add('jumping', [6], 10);
    this.game.physics.arcade.enable(this.player);
    this.player.customParams = {};
    this.player.customParams.artifacts = this.artifactsCollected;
    console.log('artifacts collected: ' + this.player.customParams.artifacts);
    this.player.body.collideWorldBounds = true;


    //create the path GOTTA TEST THIS
    var pathArr = this.findObjectsByType('path', this.map, 'objectLayer');
    this.path = this.add.sprite(pathArr[0].x, pathArr[0].y, pathArr[0].properties.key);
    this.game.physics.arcade.enable(this.path);
    this.path.body.allowGravity = false;
    this.path.nextLevel = pathArr[0].properties.nextLevel;

    // this.player = this.add.group();
    // this.createPlayer();
    // //follow player with the camera
    this.game.camera.follow(this.player);

    this.platforms = this.add.group();
    this.createPlatforms();
    this.enemies = this.add.group();
    this.createEnemies();
    //var sampleEnemy = new ZPlat.Enemy(this.game, 100, 300, 'slime', undefined, this.map);
    //this.enemies.add(sampleEnemy);
    var pipeArr = this.findObjectsByType('pipe', this.map, 'objectLayer');
    this.pipe = this.add.sprite(pipeArr[0].x, pipeArr[0].y, 'pipe');
    this.game.physics.arcade.enable(this.pipe);
    this.pipe.body.allowGravity = false;
    this.pipe.body.immovable = true;
    //this.pipe.alpha = 0;
    this.createBooth();
    //console.log(this.findObjectsByType('booth', this.map, 'objectLayer').length);
  },
  createOnscreenControls: function(){
    this.leftArrow = this.add.button(20, this.game.height - 60, 'arrowButton');
    this.rightArrow = this.add.button(110, this.game.height - 60, 'arrowButton');
    this.actionButton = this.add.button(this.game.width - 100, this.game.height - 60, 'actionButton');

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;

    this.actionButton.events.onInputDown.add(function(){
      this.player.customParams.mustJump = true;
    }, this);

    this.actionButton.events.onInputUp.add(function(){
      this.player.customParams.mustJump = false;
    }, this);

    //left
    this.leftArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    this.leftArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingLeft = true;
    }, this);

    this.leftArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingLeft = false;
    }, this);

    //right
    this.rightArrow.events.onInputDown.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputUp.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);

    this.rightArrow.events.onInputOver.add(function(){
      this.player.customParams.isMovingRight = true;
    }, this);

    this.rightArrow.events.onInputOut.add(function(){
      this.player.customParams.isMovingRight = false;
    }, this);
  },
  findObjectsByType: function(targetType, tilemap, layer){
    var result = [];
    
    tilemap.objects[layer].forEach(function(element){
      if(element.properties.type == targetType) {
        element.y -= tilemap.tileHeight;        
        result.push(element);
      }
    }, this);
    
    return result;
  },
  changeLevel: function(player, path, enemies){
    //GOTTA TEST THIS
    this.game.state.start('Game', true, false, path.nextLevel, player.customParams.artifacts, enemies);
  },
  createPlayer: function(){
    var playerArr = this.findObjectsByType('player', this.map, 'objectLayer');
    this.player = new MIMPlat.Player(this.game, playerArr[0].x, playerArr[0].y, 'player', this.map);
  },
  //You could replace this with one function called createSprites.
  createPlatforms: function(){
    var platformArr = this.findObjectsByType('platform', this.map, 'objectLayer');
    var platform;
    platformArr.forEach(function(element){
      platform = new MIMPlat.Platform(this.game, element.x, element.y, 'platform', this.map);
      this.platforms.add(platform);
    }, this);
  },
  createEnemies: function(){
    var enemyArr = this.findObjectsByType('enemy', this.map, 'objectLayer');
    var enemy;
    enemyArr.forEach(function(element){
      enemy = new MIMPlat.Enemy(this.game, element.x, element.y, 'enemy', element.properties.velocity, element.properties.hasLandmark, element.properties.landmarkName, element.properties.isAlive, element.properties.id, this.map);
      this.enemies.add(enemy);
      this.enemyList.push(enemy);
    }, this);
  },
  createBooth: function(){
    if(this.findObjectsByType('booth', this.map, 'objectLayer').length > 0){
    var boothArr = this.findObjectsByType('booth', this.map, 'objectLayer');
    this.booth = new MIMPlat.Booth(this.game, boothArr[0].x, boothArr[0].y, 'booth', boothArr[0].properties.choice0, boothArr[0].properties.choice1, boothArr[0].properties.choice2, this.map);
    this.booth.inputEnabled = true;
    this.booth.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        this.game.paused = true;

        // Then add the menu
        this.menu = game.add.sprite(this.game.width/2, this.game.height/2, 'actionButton');
        this.menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        this.choiseLabel = game.add.text(this.game.width/2, this.game.height-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        this.choiseLabel.anchor.setTo(0.5, 0.5);
 });




    // var boothArr = this.findObjectsByType('booth', this.map, 'objectLayer');
    // this.booth = this.add.sprite(boothArr[0].x, boothArr[0].y, 'booth');
    // this.game.physics.arcade.enable(this.booth);
    // this.booth.body.allowGravity = false;
    // this.booth.body.immovable = true;
    // this.booth.alpha = 0;
    // this.boothData = JSON.parse(this.game.cache.getText('street5'));
    // this.choices = [];
    // this.boothData.choices.forEach(function(choice){
    //   this.choices.push(choice);
    // }, this);
  }
  },
  boothDialogue: function(){
    console.log('Hi, I\'m Tomoko! How are you darling?');
    console.log(this.boothInteraction);
    //game over overlay
    this.overlay = this.add.bitmapData(this.game.width, this.game.height);
    this.overlay.ctx.fillStyle = '#000';
    this.overlay.ctx.fillRect(this.game.width/2, this.game.height/2, this.game.width/2, this.game.height/3);
    
    //Sprite for the overlay
    this.panel = this.add.sprite(0, this.game.height, this.overlay);
    this.panel.alpha = 0.9;

    //overlay raising tween animation
     var gameOverPanel = this.add.tween(this.panel);
     gameOverPanel.to({y: 0}, 500);
     
    //Stop all movement after the overlay reaches the top
     gameOverPanel.onComplete.add(function(){
      console.log('this.boothInteraction inside of game over panel func is :' + this.boothInteraction);
      this.pickOptions();
      //this.game.paused = true;
      }, this);

    gameOverPanel.start();

  },
  hitEnemy: function(player, enemy){
    if(enemy.body.touching.up){
      console.log(enemy.hasLandmark);
      if(enemy.hasLandmark){
        this.artifact = this.add.sprite(enemy.x, enemy.y, 'artifact');
        this.game.physics.arcade.enable(this.artifact);
        this.artifact.landmarkName = enemy.landmarkName;
      }
      enemy.isAlive = false;
      enemy.kill();
      player.body.velocity.y = -this.BOUNCING_SPEED;
    }
  },
  gameOver: function(){
    this.game.state.start('Game', true, false, this.currentLevel);
  },
  pickOptions: function(){
    console.log('Inside of pickOptions, this.boothInteraction is: ' + this.boothInteraction);
      var style = {font: '13px Comic Sans', fill:'#b3a595', wordWrap: true,
      wordWrapWidth: this.game.width/1.5};

      this.option1 = this.add.text(this.game.width / 2, this.game.height / 2, this.booth.choices[0], style);
      this.option1.inputEnabled = true;
      this.option1.events.onInputUp.add(function () {
        console.log('OPTION 1 CLICKED');
        this.option1.destroy();
        this.option2.destroy();
        this.option3.destroy();
      }, this);

      this.option2 = this.add.text(this.game.width / 2, this.game.height / 2 + 23, this.booth.choices[1], style);
      this.option2.inputEnabled = true;
      this.option2.events.onInputUp.add(function () {
        console.log('OPTION 2 CLICKED');
        this.option1.destroy();
        this.option2.destroy();
        this.option3.destroy();
      }, this);

      this.option3 = this.add.text(this.game.width / 2, this.game.height / 2 + 46, this.booth.choices[2], style);
      this.option3.inputEnabled = true;
      this.option3.events.onInputUp.add(function () {
        console.log('OPTION 3 CLICKED');
        this.boothInteraction = false;
        this.panel.destroy();
        this.option1.destroy();
        this.option2.destroy();
        this.option3.destroy();
      }, this);
  }
};
