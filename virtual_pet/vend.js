goog.provide('virtual_pet.Vend');
goog.require('lime.Sprite');
goog.require('lime.Layer');

virtual_pet.Vend = function(width, height) {
    goog.base(this);
    
	this.width = width;
	this.heght = height;
	var buttons = new Array();
	var vendLayer = new lime.Layer();
	
	var appleButton = new lime.Sprite().setSize(this.width/3,this.height/4).
        setPosition(gameObj.width/4,gameObj.height/10).setFill('images/apple.png');
	this.buttons.push(appleButton);
	
	var icecreamButton = new lime.Sprite().setSize(this.width/3,this.height/4).
        setPosition(gameObj.width/2,gameObj.height/10).setFill('images/icecream.png');
	this.buttons.push(icecreamButton);
		
	var toyButton = new lime.Sprite().setSize(this.width/3,this.height/4).
        setPosition(gameObj.width*3/4,gameObj.height/10).setFill('images/toy.png');
	this.buttons.push(toyButton);
	
	while(buttons.length !== 0){
		var i = 0;
		var k = 0;
		var currButton = this.buttons.pop();
		currButton.setPosition((this.width/3) + (i * this.width/3),(this.height/6) + (k * this.height/6))
		i++;
		if(i == 3){
			i = 0;
			k++;
		}
	}
}

goog.inherits(virtual_pet.Item,lime.Sprite);