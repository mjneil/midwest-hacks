goog.provide('virtual_pet.Item');
goog.require('lime.Sprite');

virtual_pet.Item = function(gameObj, x, y, dx, size, happiness, health, hunger, energy) {
    goog.base(this);
	
    this.gameObj = gameObj;
	
	this.dx = dx;
	this.dy = 0;
	
	this.x = x;
	this.y = y;
	this.setPosition(x,y);
    
    this.happiness = happiness;
    this.health = health;
	this.hunger = hunger;
	this.energy = energy
	
	this.grounded = false;
	this.groundY = this.gameObj.ground;
	this.grav = this.gameObj.grav;
	this.size = size;
	this.height = this.size;
	this.width = this.size;
	
	var dt = this.gameObj.dt;
    lime.scheduleManager.scheduleWithDelay(function() {
	
		this.grounded = this.y + (this.height / 2)  >= this.groundY;
		if(!this.grounded) this.dy += this.grav;
		else {
			this.dy = Math.min(this.dy,0);
		}
		
		//friction
		if(this.grounded)this.dx = this.dx / 2;
		
		if(this.x > gameObj.width || this.x < 0){
			this.dx *= -1;
		}
		
		this.x += this.dx;
		this.y = Math.min(this.y += this.dy, this.groundY - (this.height / 2));
		
		this.setPosition(this.x, this.y);
		
    }, this, dt);
	//END OF SCHEDULER
	
}

goog.inherits(virtual_pet.Item,lime.Sprite);
