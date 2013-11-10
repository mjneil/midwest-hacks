goog.provide('virtual_pet.Vend');
goog.require('lime.Sprite');
goog.require('lime.Layer');

virtual_pet.Vend = function(width, height, gameObj) {
    goog.base(this);
    
	this.gameObj = gameObj;
	this.width = width;
	this.height = height;
	this.buttons = [];
	
	var appleButton = new lime.Sprite().setScale(1.5).
        setPosition(0,0).setFill('images/apple.png').setAnchorPoint(0,0);
	this.appendChild(appleButton);
	this.buttons.push(appleButton);
	
	var icecreamButton = new lime.Sprite().setScale(1.5).setAnchorPoint(0,0).
        setPosition(0,0).setFill('images/icecream.png');
	this.appendChild(icecreamButton);
	this.buttons.push(icecreamButton);
		
	var toyButton = new lime.Sprite().setScale(1.5).setAnchorPoint(0,0).
        setPosition(0,0).setFill('images/toy.png');
	this.appendChild(toyButton);
	this.buttons.push(toyButton);
	
	var i = 0;
	var k = 0;
	while(this.buttons.length !== 0){
		
		var currButton = this.buttons.pop();
		currButton.setPosition(30 + (i * this.width/2),-(this.height)+ 30 + (currButton.getSize().height)*1.5*k);
		i++;
		if(i == 2){
			i = 0;
			k++;
		}
		
	}
}

goog.inherits(virtual_pet.Vend,lime.Sprite);