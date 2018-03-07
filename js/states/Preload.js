var MIMPlat = MIMPlat || {};

//loading the game assets
MIMPlat.PreloadState = {
  preload: function() {
    //show loading screen
    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(3);

    this.load.setPreloadSprite(this.preloadBar);

    //load game assets    
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('goal', 'assets/images/goal.png');
    this.load.image('slime', 'assets/images/slime.png');
    //this.load.spritesheet('player', 'assets/images/spriteSheetLuigi.png', 17, 35, 5, 1, 1); 
    this.load.spritesheet('player', 'assets/images/spriteSheetLuigi3.png', 17, 35, 12, 1, 1);
    this.load.spritesheet('enemy', 'assets/images/spriteSheetKoopaWalking.png', 15, 30, 2, 1, 1);
    //this.load.spritesheet('player', 'assets/images/player_spritesheet.png', 28, 30, 5, 1, 1); 
    this.load.spritesheet('fly', 'assets/images/fly_spritesheet.png', 35, 18, 2, 1, 2);    
    this.load.image('arrowButton', 'assets/images/arrowButton.png');    
    this.load.image('actionButton', 'assets/images/actionButton.png');    
    this.load.image('artifact', 'assets/images/artifact.png');
    this.load.image('pipe', 'assets/images/pipe.png');
    this.load.image('backgroundTiles', 'assets/images/spriteSheet.png');
    this.load.image('skyLineTiles', 'assets/images/spriteSheetBackground.png');
    this.load.image('buildingTiles', 'assets/images/street.png');
    this.load.image('buildingTilesStreet5', 'assets/images/ny-street5.png');
    this.load.image('curb', 'assets/images/curb.png');
    this.load.image('curbRight', 'assets/images/curbRight.png');
    this.load.image('curbLeft', 'assets/images/curbLeft.png');
    this.load.image('road', 'assets/images/road.png');
    this.load.image('goal', 'assets/images/goal.png');
    this.load.image('path', 'assets/images/pathToNextStreet.png');
    this.load.image('booth', 'assets/images/booth.png');
    this.load.tilemap('NYC', 'assets/levels/testMIM7.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.tilemap('street5', 'assets/levels/nystreet5.json', null, Phaser.Tilemap.TILED_JSON);

    this.load.text('street5', 'assets/data/prometheus.json');

  },
  create: function() {
    this.state.start('Game');
  }
};