var MIMPlat = MIMPlat || {};

MIMPlat.dim = MIMPlat.getGameLandscapeDimensions(500, 231);

MIMPlat.game = new Phaser.Game(MIMPlat.dim.w, MIMPlat.dim.h, Phaser.AUTO);

MIMPlat.game.state.add('Boot', MIMPlat.BootState); 
MIMPlat.game.state.add('Preload', MIMPlat.PreloadState); 
MIMPlat.game.state.add('Game', MIMPlat.GameState);

MIMPlat.game.state.start('Boot'); 
