goog.provide('virtual_pet.Pet');
goog.require('lime.RoundedRect');
goog.require('lime.Layer');
goog.require('virtual_pet.BodyPart');

virtual_pet.Pet = function(gameObj, gameLayer) {
    goog.base(this);
    
    this.gameObj = gameObj;
    this.gameLayer = gameLayer;
	this.colorR = 100+Math.random()*100;
	this.colorG = Math.random()*100;
	this.colorB = Math.random()*25;
	
	this.age = 0;
	
    this.happiness = 75;
    this.health = 75;
	this.hunger = 75;
	this.energy = 75;
	
	this.grounded = false;
	this.groundY = this.gameObj.ground;
	this.grav = this.gameObj.grav;
	this.size = 80 + 40 * Math.random();
	this.height = this.size * 1 + .5 * Math.random();
	this.width = this.size * .8 + .5 * Math.random();
	
	this.x = this.gameObj.width/2;
	this.y = this.gameObj.height/2;
	this.dx = 0;
	this.dy = 0;
        
    this.setPosition(this.x, this.y);
    this.updateLook();
	this.eyeTexture = {
		angry: 'images/eyes1_angry.svg',
		happy: 'images/eyes1_happy.svg',
		none: 'images/eyes1_none.svg',
		sad: 'images/eyes1_sad.svg'
	};
	this.mouthTexture = {
		angry: 'images/mouth1_angry.svg',
		happy: 'images/mouth1_happy.svg',
		none: 'images/mouth1_none.svg',
		sad: 'images/mouth1_sad.svg'
	};
	this.earTexture = 'images/ear1.svg';
	//Randomizes facial features
	var faceRand = Math.floor(Math.random()*100);
	if(faceRand > 50){
		this.eyeTexture = {
			angry: 'images/eyes2_angry.svg',
			happy: 'images/eyes2_happy.svg',
			none: 'images/eyes2_none.svg',
			sad: 'images/eyes2_sad.svg'
		};
	}
	faceRand = Math.floor(Math.random()*100);
	if(faceRand > 50){
		this.mouthTexture = {
			angry: 'images/mouth2_angry.svg',
			happy: 'images/mouth2_happy.svg',
			none: 'images/mouth2_none.svg',
			sad: 'images/mouth2_sad.svg'
		};
	}
	faceRand = Math.floor(Math.random()*100);
	if(faceRand > 33){
		if(faceRand > 66){
			this.earTexture = 'images/ear2.svg';
		}else{
			this.earTexture = 'images/ear3.svg';
		}
	}
	
	this.parts = [];
	this.headParts = [];
	
	var head = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*1.5, this.width*.8, 0, -(this.height/2-10), 0, 0,1).setRadius(30).setAnchorPoint(0.5,1);
	this.appendChild(head);
	this.parts.push(head);
	
	var eyes = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, 64, 64, 0, -head.height*.6, 0, 0, 0).setFill(this.eyeTexture.none).setScale(1.8);
	head.appendChild(eyes);
	this.headParts.push(eyes);
	
	var mouth = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, 64, 64, 0, -head.height*.3, 0, 0, 0).setFill(this.mouthTexture.none);
	head.appendChild(mouth);
	this.headParts.push(mouth);
	
	var earRight = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, 64, 64, head.width/2+8, -head.height-22, 0, 0, 0).setFill(this.earTexture);
	head.appendChild(earRight);
	this.headParts.push(earRight);
	
	var earLeft = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, 64, 64, -head.width/2-8, -head.height-22, 0, 0, 0).setFill(this.earTexture).setScale(-1,1);
	head.appendChild(earLeft);
	this.headParts.push(earLeft);
	
	var armLeft = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*.8, this.width*.2, -(this.width/2) + 10, -(this.height/4), 45, 1,1).setAnchorPoint(1,.5).setRadius(30);
	this.appendChild(armLeft);
	this.parts.push(armLeft);
	
	var armRight = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*.8, this.width*.2, (this.width/2) - 10, -(this.height/4), -45, 1,-1).setAnchorPoint(0,.5).setRadius(30);
	this.appendChild(armRight);
	this.parts.push(armRight);
	
	var legLeft = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*.6, this.width*.3, -(this.width/2) + 10, (this.height/2), 0, 1,1).setAnchorPoint(1,1).setRadius(30);
	this.appendChild(legLeft);
	this.parts.push(legLeft);
	
	var legRight = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*.6, this.width*.3, (this.width/2) - 10, (this.height/2), 0, 1,-1).setAnchorPoint(0,1).setRadius(30);
	this.appendChild(legRight);
	this.parts.push(legRight);
	
    var dt = this.gameObj.dt;
    var i, arrayLen, toRemove;
	this.startTime = [];
	for(i = 0, partsLen = this.parts.length; i < partsLen; i++){
		this.startTime[i] = new Date().getTime();
	}
	
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
		this.energy = Math.max(this.energy + .01, 0);
		
		this.age += (.01*(this.happiness + this.hunger + this.health + this.energy) / 4000);
		this.size
        
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
		
		if(this.x > gameObj.width || this.x < 0){
			this.dx *= -1;
		}
		
		this.x += this.dx;
		this.y = Math.min(this.y += this.dy, this.groundY - (this.height / 2));
		this.setPosition(this.x, this.y);
		
		this.updateLook();
		for(i = 0, partsLen = this.parts.length; i < partsLen; i++){
			
			if(this.parts[i].animates != 0){
				//if((new Date().getTime() - this.startTime[i]) > (this.gameObj.dt*5)){
					this.parts[i].animateAmount = Math.sin((new Date().getTime() - this.startTime[i])*this.gameObj.dt/4000)*5;
				//}
			}
			this.parts[i].updatePart();
		}
		
    }, this, dt);
	//END OF SCHEDULER
    
    //drag it around to make it happier
    goog.events.listen(this,['mousedown','touchstart'],function(e){
			var pos = e.position;
			console.log('x: ' + pos.x + '  y: ' + pos.y);
			if(this.energy >= 5){
				this.happiness = Math.min(this.happiness+5,100);
				this.energy = Math.max(this.energy-2,0);
				if(this.grounded)
				{
					this.dy -= 10 + 50/Math.max(Math.abs(pos.x),5);
					if(pos.x < 0){
						this.dx += Math.min(Math.abs(pos.x),20);
					}
					else{
						this.dx -= Math.min(Math.abs(pos.x),20);
					}
				}
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
    var redAmount = parseInt((this.happiness)/100*this.colorR);
    var greenAmount = parseInt((this.happiness)/100*this.colorG);
	var blueAmount = parseInt((this.happiness)/100*this.colorB); 
    this.setFill(redAmount,greenAmount, blueAmount);
};


