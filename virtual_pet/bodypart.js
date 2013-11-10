goog.provide('virtual_pet.BodyPart');
goog.require('lime.RoundedRect');

virtual_pet.BodyPart = function(gameObj, gameLayer, pet, width, height, x, y, angle, animates, facing) {
	goog.base(this);
	
	this.gameObj = gameObj;
    this.gameLayer = gameLayer;
	this.pet = pet;
	this.animates = animates;
	this.animateAmount = 0;
	this.height = height;
	this.width = width
	this.x = x;
	this.y = y;
	this.petHeightStart;
	this.petWidthStart;
	this.angle = angle;
	this.facing = facing;
	
	this.setPosition(this.x*this.pet.growth,this.y*this.pet.growth);
	this.updatePart();
}

goog.inherits(virtual_pet.BodyPart,lime.RoundedRect);

/**
 * update the part's look according to it's happiness and health
 */
virtual_pet.BodyPart.prototype.updatePart = function() {
    this.setSize(this.width*this.pet.growth,this.height*this.pet.growth);
	if(this.animates != 0){
   		this.setRotation(this.angle + this.animateAmount*this.facing - this.pet.dy*2*this.facing + this.pet.dx*2*this.facing);
	}
    //color according to the happiness (between green and red)
    var redAmount = parseInt((this.pet.health)/100*this.pet.colorR); //255 if 0 health
    var greenAmount = parseInt((100-this.pet.health)/100*this.pet.colorG); //255 if 100 health
	var blueAmount = parseInt((100-this.pet.health)/100*this.pet.colorB);
    this.setFill(redAmount,greenAmount, blueAmount);
};