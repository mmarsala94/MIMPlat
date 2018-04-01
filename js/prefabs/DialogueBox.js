var MIMPlat = MIMPlat || {};
let dialogueSet1 = [
"Why is the Rockefeller Center closed today?",
"I want to return the Statue of Prometheus.",
"Never mind!"
];
let dialogueSet2 = [
"Like the sign says bud, the Statue of Prometheus was stolen and we can't reopen until it gets returned. Here is a pamphlet with  more information!"
];
let dialogueSet3 = [
"Ok, but you'll have to prove your goods are authentic by answering a few questions.",
"Sure, ask away",
"Uh, no, I think I'll come back later."
];
let dialogueSet4 = [
"The statue that overlooks the skating rink is: ",
"John D. Rockefeller",
"Hans Brinker",
"Prometheus"
];
let dialogueSet5 = [
"Rockefeller Center street closes 1 day a year because: ",
"the streetcleaners need a holiday.",
"the ice skating rink is closed.",
"so the street will remain private property."
];
let dialogueSet6 = [
"At last! The Statue of Prometheus! We've been looking all over town. The Mayor has authorized me to present you with this $1700 reward. Thank you, and good luck finding Mario!"
];
let dialogueSet7 = [
"Another fake! hmmph! Come back when you have your facts straight! Goodbye."
];

let dialogue = [
[
"Why is the Rockefeller Center closed today?",
"I want to return the Statue of Prometheus.",
"Never mind!"
],
[
"Like the sign says bud, the Statue of Prometheus was stolen and we can't reopen until it gets returned. Here is a pamphlet with  more information!"
],
[
"Ok, but you'll have to prove your goods are authentic by answering a few questions.",
"Sure, ask away",
"Uh, no, I think I'll come back later."
],
[
"The statue that overlooks the skating rink is: ",
"John D. Rockefeller",
"Hans Brinker",
"Prometheus"
],
[
"Rockefeller Center street closes 1 day a year because: ",
"the streetcleaners need a holiday.",
"the ice skating rink is closed.",
"so the street will remain private property."
],
[
"At last! The Statue of Prometheus! We've been looking all over town. The Mayor has authorized me to present you with this $1700 reward. Thank you, and good luck finding Mario!"
],
[
"Another fake! hmmph! Come back when you have your facts straight! Goodbye."
]
];


MIMPlat.DialogueBox = function(game, data, boothProperties) {
	//Phaser.Sprite.call(this,game, x, y, key);

	this.game = game;
	this.boothData = data;
	this.boothProperties = boothProperties
  this.style = {font: '13px Comic Sans', fill:'#b3a595' 
      //wordWrap: true,
      //wordWrapWidth: 250
    };
  //Eventually, you'll need a way to automatically determine line limit depending on font size. But for now, this is the number of characters per line allowed
  //for this font type and size.
  this.charLineLimit = 43;
  this.textSlots = {slot: ['', '', '', ''], lineCounter: 0};
  //this.createLines();
//game over overlay
    this.overlay = this.game.add.bitmapData(this.game.width, this.game.height);
    this.overlay.ctx.fillStyle = '#000';
    this.overlay.ctx.fillRect(this.game.width/2, this.game.height/2, this.game.width/2, (this.game.height/3) + 23);
    
    //Sprite for the overlay
    this.panel = this.game.add.sprite(0, this.game.height, this.overlay);
    this.panel.alpha = 0.9;

    //overlay raising tween animation
     var gameOverPanel = this.game.add.tween(this.panel);
     gameOverPanel.to({y: 0}, 500);
     
    //Stop all movement after the overlay reaches the top
     gameOverPanel.onComplete.add(function(){
      console.log('this.boothInteraction inside of game over panel func is :' + this.boothInteraction);
      //this.pickOptions();
      this.createLines();
      this.setInitialText(dialogueSet1, this.charLineLimit);
      //this.game.paused = true;
      }, this);

    gameOverPanel.start();

};

MIMPlat.DialogueBox.prototype = Object.create(Phaser.Sprite.prototype);
MIMPlat.DialogueBox.prototype.constructor = MIMPlat.DialogueBox;
MIMPlat.DialogueBox.prototype.createLines = function(){
  this.lines = {line: ['', '', '', ''], lineCounter: 0};
    for(var i = 0; i < this.lines.line.length; i++){
      //creates 4 lines and spaces each one out, and sets it to a blank line.
        this.lines.line[i] = this.game.add.text(this.game.width / 2, (this.game.height / 2) + (23 * i), '', this.style);
        this.lines.line[i].inputEnabled = true;
    }
};
MIMPlat.DialogueBox.prototype.setInitialText = function(dialogue, charLineLimit){
  for(let i = 0; i < dialogue.length; i++){
  this.determineStringToBeSet(dialogue[i], charLineLimit);
}
};
MIMPlat.DialogueBox.prototype.pickOptions = function(){
	  console.log('Inside of pickOptions, this.boothInteraction is: ' + this.boothInteraction);
      //var style = {font: '13px Comic Sans', fill:'#b3a595', wordWrap: true,
      //wordWrapWidth: 250};

      this.option1 = this.game.add.text(this.game.width / 2, this.game.height / 2, dialogueSet1[0], this.style);
      this.option1.inputEnabled = true;
      this.option1.events.onInputUp.add(function () {
        console.log('OPTION 1 CLICKED');
        this.clearDialogueBox();
        this.option1.text = this.boothData.initialOptions[0].nextDialogue.text;
        //Show image of pamphlet. add click event. after click event, call setInitialOptions again.
      }, this);

      this.option2 = this.game.add.text(this.game.width / 2, this.game.height / 2 + 23, this.boothData.initialOptions[1].text, this.style);
      this.option2.inputEnabled = true;
      this.option2.events.onInputUp.add(function () {
        console.log('OPTION 2 CLICKED');
        this.clearDialogueBox();
        this.option1.text = this.boothData.initialOptions[1].nextDialogue.text;
        //set option 1 = "Ok, but you'll have to prove your goods are authentic by answering a few questions."
        this.option2.text = "  " + this.boothData.initialOptions[1].nextDialogue.option1.text;
        //set option 2 = Indent, "Sure, ask away."
        this.option3.text = "  " + this.boothData.initialOptions[1].nextDialogue.option2;
        //set option 3 = Indent, "Uh, no, I think I'll come back later."
      }, this);

      this.option3 = this.game.add.text(this.game.width / 2, this.game.height / 2 + 46, this.boothData.initialOptions[2].text, this.style);
      this.option3.inputEnabled = true;
      this.option3.events.onInputUp.add(function () {
        console.log('OPTION 3 CLICKED');
        this.boothProperties.interaction = false;
        this.clearDialogueBox();
        this.panel.destroy();
      }, this);

      this.option4 = this.game.add.text(this.game.width / 2, this.game.height / 2 + 69, this.boothData.initialOptions[2].text, this.style);
      this.option4.inputEnabled = true;
      this.option4.events.onInputUp.add(function () {
        console.log('OPTION 4 CLICKED');
        this.boothProperties.interaction = false;
        this.clearDialogueBox();
        this.panel.destroy();
      }, this);
};
MIMPlat.DialogueBox.prototype.clearDialogueBox = function(){
	this.option1.text = '';
    this.option2.text = '';
    this.option3.text = '';
    this.option4.text = '';
    for(var i = 0; i < this.lines.line.length; i++){
      this.lines.line[i].text = '';
    }
};
MIMPlat.DialogueBox.prototype.setTextSlots = function(string, lineCounter){
  this.textSlots.slot[this.textSlots.lineCounter] = string;
  this.textSlots.lineCounter++;

  this.lines.line[this.lines.lineCounter].text = string;
  this.lines.lineCounter++;
  //return textSlots;
};
MIMPlat.DialogueBox.prototype.determineStringToBeSet = function(string, charLineLimit){
  let atChar = 0;
  if(string.length > charLineLimit){
    //If the string is too large, we are now at the last char to be printed
    atChar = charLineLimit;
    //Part of dialogue chunk is set to new variable and passed to print function.
    //If equals a punctuation mark or a whitespace, print it and attach the rest
    if(string[atChar] === '.' || string[atChar] === '?' || string[atChar] === ',' || string[atChar] === ':' || string[atChar] === ';' || string[atChar] === ' '){

      let dialogueToSet = splitStringDialogue(string, atChar);
      this.setTextSlots(dialogueToSet.dialogueToPrintNow);
      this.determineStringToBeSet(dialogueToSet.dialogueToPrintLater, charLineLimit);

    } else{
      //else, keep searching until you hit white space, and then attach that and do the same
      let whiteSpace = false;
      while(!whiteSpace){
        atChar = atChar - 1;
        if(string[atChar] === ' '){
          let dialogueToSet = splitStringDialogue(string, atChar);
          this.setTextSlots(dialogueToSet.dialogueToPrintNow);
          this.determineStringToBePrinted(dialogueToSet.dialogueToPrintLater, charBoxLimit);
          whiteSpace = true;
        }
      }
    }
      
    
  }else{
    this.setTextSlots(string);
  }
};  

MIMPlat.DialogueBox.prototype.splitStringDialogue = function(string, atChar){
  let dialogueToPrint = {
    dialogueToPrintNow: string.slice(0, atChar),
    dialogueToPrintLater: string.slice(atChar, string.length)
  };
  return dialogueToPrint;
};


MIMPlat.DialogueBox.prototype.update = function(){
};