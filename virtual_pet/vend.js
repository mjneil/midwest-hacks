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
		energy: 100,
		scale: this.buttonScale,
		opacity: 1,
		active: 1
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/berry2.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15,
		scale: this.buttonScale,
		opacity: 1,
		active: 1
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/berry3.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15,
		scale: this.buttonScale,
		opacity: 1,
		active: 1
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/berry4.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15,
		scale: this.buttonScale,
		opacity: 1,
		active: 1
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/ball.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15,
		scale: this.buttonScale,
		opacity: 1,
		active: 1
    });
	this.buttons.push({
		width: 64,
		height: 64,
		fill: 'images/videogame.svg',
		happiness: -5,
		health: 20,
		hunger: 15,
		energy: 15,
		scale: this.buttonScale,
		opacity: 1,
		active: 1
    });
	
	var tube = new lime.Sprite().setAnchorPoint(.5,1).setPosition(this.width/2+12,-this.height+20).setFill('images\/tube.svg').setScale(.25);
	this.appendChild(tube);
	
	for(i = 0; i < 3; i++){
		for(k = 0; k < 2; k++){
			var newButton = new lime.Sprite().setAnchorPoint(.5,.5).setPosition((this.width/4 + 50) - this.buttons[2*i+k].width/2 + (k * (this.width/2 -40)),-(this.height-100) + ((this.height/3-45)	*i) + (this.buttons[2*i+k].height/3)).setFill(this.buttons[2*i+k].fill).setScale(this.buttonScale);
			this.appendChild(newButton);
			this.buttonsObj.push(newButton);
		}
	}
	
	var dt = this.gameObj.dt;
    lime.scheduleManager.scheduleWithDelay(function() {
		for(i = 0, buttonLen = this.buttons.length; i < buttonLen; i++){
			if(this.buttons[i].active == 0){
				if(this.buttons[i].scale >= this.buttonScale && this.buttons[i].opacity >= 1){
					this.buttons[i].active = 1;
					this.buttonsObj[i].setScale(this.buttonScale);
					this.buttonsObj[i].setOpacity(1);
				} else{
					this.buttons[i].scale += .006;
					this.buttons[i].opacity += .01;
					this.buttonsObj[i].setScale(this.buttons[i].scale);
					this.buttonsObj[i].setOpacity(this.buttons[i].opacity);
				}
			}
		}
			
	}, this, dt);
	// end schedule
	
	goog.events.listen(this.buttonsObj[0], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
		if(this.getParent().buttons[0].active != 0){
			gameObj.currentItem = this.getParent().buttons[0];
			this.getParent().buttons[0].scale = 0;
			this.getParent().buttons[0].opacity = 0;
			this.getParent().buttons[0].active = 0;
		}
    });
	
	goog.events.listen(this.buttonsObj[1], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
		if(this.getParent().buttons[1].active != 0){
			gameObj.currentItem = this.getParent().buttons[1];
			this.getParent().buttons[1].scale = 0;
			this.getParent().buttons[1].opacity = 0;
			this.getParent().buttons[1].active = 0;
		}
    });
	
	goog.events.listen(this.buttonsObj[2], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
		if(this.getParent().buttons[2].active != 0){
			gameObj.currentItem = this.getParent().buttons[2];
			this.getParent().buttons[2].scale = 0;
			this.getParent().buttons[2].opacity = 0;
			this.getParent().buttons[2].active = 0;
		}
    });
	
	goog.events.listen(this.buttonsObj[3], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
		if(this.getParent().buttons[3].active != 0){
			gameObj.currentItem = this.getParent().buttons[3];
			this.getParent().buttons[3].scale = 0;
			this.getParent().buttons[3].opacity = 0;
			this.getParent().buttons[3].active = 0;
		}
    });
	
	goog.events.listen(this.buttonsObj[4], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
		if(this.getParent().buttons[4].active != 0){
			gameObj.currentItem = this.getParent().buttons[4];
			this.getParent().buttons[4].scale = 0;
			this.getParent().buttons[4].opacity = 0;
			this.getParent().buttons[4].active = 0;
		}
    });
	
	goog.events.listen(this.buttonsObj[5], ['touchstart', 'mousedown'], function(e) {
        e.stopPropagation();
		if(this.getParent().buttons[5].active != 0){
			gameObj.currentItem = this.getParent().buttons[5];
			this.getParent().buttons[5].scale = 0;
			this.getParent().buttons[5].opacity = 0;
			this.getParent().buttons[5].active = 0;
		}
    });
	
}

goog.inherits(virtual_pet.Vend,lime.Sprite);