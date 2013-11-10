goog.provide('virtual_pet.BodyPart');
goog.require('lime.RoundedRect');

virtual_pet.BodyPart = function(gameObj, gameLayer, pet, width, height, x, y, angle, animates) {
	goog.base(this);
	
	this.gameObj = gameObj;
    this.gameLayer = gameLayer;
	this.pet = pet;
	this.animates = animates;
	this.height = height;
	this.width = width
	this.x = x;
	this.y = y;
	this.angle = this.setRotation(angle);
	
	this.setPosition(this.x,this.y);
	this.updatePart();
}

goog.inherits(virtual_pet.BodyPart,lime.RoundedRect);

/**
 * update the part's look according to it's happiness and health
 */
virtual_pet.BodyPart.prototype.updatePart = function() {
    this.setSize(this.width,this.height);
    
    //color according to the happiness (between green and red)
    var redAmount = parseInt((100-this.pet.happiness)/100*255); //255 if 0 health
    var greenAmount = parseInt((this.pet.happiness)/100*255); //255 if 100 health
    this.setFill(redAmount,greenAmount, 0);
};