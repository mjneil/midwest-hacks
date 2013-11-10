goog.provide('virtual_pet.Pet');
goog.require('lime.RoundedRect');
goog.require('lime.Layer');
goog.require('virtual_pet.BodyPart');

virtual_pet.Pet = function(gameObj, gameLayer) {
    goog.base(this);
    
    this.gameObj = gameObj;
    this.gameLayer = gameLayer;
	
    this.happiness = 75;
    this.health = 75;
	this.hunger = 75;
	this.energy = 75;
	
	this.grounded = false;
	this.groundY = this.gameObj.ground;
	this.grav = this.gameObj.grav;
	this.size = 100;
	this.height = this.size;
	this.width = this.size * .8;
	
	this.x = this.gameObj.width/2;
	this.y = this.gameObj.height/2;
	this.dx = 0;
	this.dy = 0;
        
    this.setPosition(this.x, this.y);
    this.updateLook();
	

	//var head = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this.pet, this.width*.8, this.width*.4, this.x, this.y-200, 0);
	//this.appendChild(head);
	
    var dt = this.gameObj.dt;
    var i, arrayLen, toRemove;
    lime.scheduleManager.scheduleWithDelay(function() {
	
		this.grounded = this.y + (this.height / 2)  >= this.groundY;
		if(!this.grounded) this.dy += this.grav;
		else {
			this.dy = Math.min(this.dy,0);
		}
		
		//friction
		if(this.grounded)this.dx = this.dx / 1.3;
		
        this.happiness = Math.max(this.happiness - .01, 0);
        this.hunger = Math.max(this.hunger - .01, 0);
		this.health = Math.max(this.health - .01, 0);
		this.energy = Math.max(this.energy - .01, 0);
        
        //console.log('happiness:'+this.happiness);
        //console.log('health:'+this.health);
        
        //game over
        if(this.happiness <= 0 || this.health <= 0) {
            //alert('Game over!');       
            location.reload(); 
        }

        //check for collision with items   
        toRemove = new Array();
        for(i = 0, arrayLen = this.gameObj.items.length; i<arrayLen; i++) {
            if(goog.math.Box.intersects(this.gameObj.items[i].getBoundingBox(), this.getBoundingBox())) {
                this.happiness = Math.min(this.happiness+this.gameObj.items[i].happiness,100);
                this.hunger = Math.min(this.hunger+this.gameObj.items[i].hunger,100);
				this.health = Math.min(this.health+this.gameObj.items[i].health,100);
				this.energy = Math.min(this.energy+this.gameObj.items[i].energy,100);
                toRemove.push(i);
            }
        }
        
        //remove picked up items        
        for(i = toRemove.length; i > 0; i--) {
            this.gameLayer.removeChild(this.gameObj.items[toRemove[i-1]]);
            this.gameObj.items.splice(toRemove[i-1],1);
        }
		
		this.x += this.dx;
		this.y = Math.min(this.y += this.dy, this.groundY - (this.height / 2));
		this.setPosition(this.x, this.y);
		
		this.updateLook();
		
    }, this, dt);
	//END OF SCHEDULER
    
    //drag it around to make it happier
    goog.events.listen(this,['mousedown','touchstart'],function(e){
			var pos = e.position;
            this.happiness = Math.min(this.happiness+5,100);
			this.energy = Math.max(this.energy-5,0);
			if(this.grounded)
			{
				this.dy -= 10;
				this.dx += (this.x)/100;
			}
    });
	
    
};

goog.inherits(virtual_pet.Pet,lime.RoundedRect);

/**
 * update the pet's look according to it's happiness and health
 */
virtual_pet.Pet.prototype.updateLook = function() {
    this.setSize(this.width,this.height);
    
    //color according to the happiness (between green and red)
    var redAmount = parseInt((100-this.happiness)/100*255); //255 if 0 health
    var greenAmount = parseInt((this.happiness)/100*255); //255 if 100 health
    this.setFill(redAmount,greenAmount, 0);
};


