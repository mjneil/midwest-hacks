goog.provide('virtual_pet.Vend');
goog.require('lime.Sprite');
goog.require('lime.Layer');

virtual_pet.Vend = function(width, height, gameObj) {
    goog.base(this);
    
	this.gameObj = gameObj;
	this.width = width;
	this.height = height;
	this.buttons = [];
	this.buttonsObj = [];
	this.buttonScale = .6;
	
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/berry1.svg',
		happiness: 100,
		health: 100,
		hunger: 100,
		energy: 100
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/berry2.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/berry3.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/berry4.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/berry1.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/berry2.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15
    });
	
	for(i = 0; i < 3; i++){
		for(k = 0; k < 2; k++){
			var newButton = new lime.Sprite().setAnchorPoint(0,0).setPosition((this.width/4) - this.buttons[2*i+k].width/2 + (k * (this.width/2 -25)),-(this.height) + ((this.height/3-20)	*i) + (this.buttons[2*i+k].height/3)).setFill(this.buttons[2*i+k].fill).setScale(this.buttonScale);
			this.appendChild(newButton);
			this.buttonsObj.push(newButton);
		}
	}
	
	goog.events.listen(this.buttonsObj[0], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
        gameObj.currentItem = this.getParent().buttons[0];
    });
	
	goog.events.listen(this.buttonsObj[1], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
        gameObj.currentItem = this.getParent().buttons[1];
    });
	
	goog.events.listen(this.buttonsObj[2], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
        gameObj.currentItem = this.getParent().buttons[2];
    });
	
	goog.events.listen(this.buttonsObj[3], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
        gameObj.currentItem = this.getParent().buttons[3];
    });
	
	goog.events.listen(this.buttonsObj[4], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
        gameObj.currentItem = this.getParent().buttons[4];
    });
	
	goog.events.listen(this.buttonsObj[5], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
        gameObj.currentItem = this.getParent().buttons[5];
    });
	
}

goog.inherits(virtual_pet.Vend,lime.Sprite);