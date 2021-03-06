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
	
    this.happiness = 60;
    this.health = 60;
	this.hunger = 60;
	this.energy = 60;
	
	this.grounded = false;
	this.groundY = this.gameObj.ground;
	this.grav = this.gameObj.grav;
	this.size = 60 + 40 * Math.random();
	this.height = this.size * 1.2 + 1 * Math.random();
	this.width = this.size * 1 + .5 * Math.random();
	
	this.growth = 0;
	
	this.x = this.gameObj.width/2;
	this.y = this.gameObj.height/2;
	this.dx = 0;
	this.dy = 0;
        
    this.setPosition(this.x, this.y);
    
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
	
	//this.parts = [];
	//this.headParts = [];
	
	var head = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*1.5, this.width*.8, 0, -(this.height/2-10), 0, 0,1,.5).setRadius(30).setAnchorPoint(0.5,1);
	this.appendChild(head);
	//this.parts.push(head);
	
	var eyes = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, 64, 64, 0, -head.height*.6, 0, 0, 0,.5).setFill(this.eyeTexture.none).setScale(1.8);
	head.appendChild(eyes);
	//this.headParts.push(eyes);
	
	var mouth = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, 64, 64, 0, -head.height*.3, 0, 0, 0,.5).setFill(this.mouthTexture.none);
	head.appendChild(mouth);
	//this.headParts.push(mouth);
	
	var earRight = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, 64, 64, head.width/2+8, -head.height-22, 0, 0, 0,.5).setFill(this.earTexture);
	head.appendChild(earRight);
	//this.headParts.push(earRight);
	
	var earLeft = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, 64, 64, -head.width/2-8, -head.height-22, 0, 0, 0,.5).setFill(this.earTexture).setScale(-1,1);
	head.appendChild(earLeft);
	//this.headParts.push(earLeft);
	
	var armLeft = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*.8, this.width*.2, -(this.width/2) + 10, -(this.height/4), 45, 1,1,1).setAnchorPoint(1,.5).setRadius(30);
	this.appendChild(armLeft);
	//this.parts.push(armLeft);
	
	var armRight = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*.8, this.width*.2, (this.width/2) - 10, -(this.height/4), -45, 1,-1,1).setAnchorPoint(0,.5).setRadius(30);
	this.appendChild(armRight);
	//this.parts.push(armRight);
	
	var pawLeft = new virtual_pet.BodyPart(this.gameObj,this.gameLayer, this, 64, 64, -this.width*.8, 0, -45, 1, 0,1).setFill('images/hand.svg').setScale(-.8,.8);
	armLeft.appendChild(pawLeft);
	
	var pawRight = new virtual_pet.BodyPart(this.gameObj,this.gameLayer, this, 64, 64, this.width*.8, 0, -45, 1, 0,1).setFill('images/hand.svg').setScale(.8,.8);
	armRight.appendChild(pawRight);
	
	var legLeft = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*.7, this.width*.3, -(this.width/2) + 20, (this.height/2), 0, 1,1,1).setAnchorPoint(1,1).setRadius(30);
	this.appendChild(legLeft,0);
	//this.parts.push(legLeft);
	
	var legRight = new virtual_pet.BodyPart(this.gameObj, this.gameLayer, this, this.width*.7, this.width*.3, (this.width/2) - 20, (this.height/2), 0, 1,-1,1).setAnchorPoint(0,1).setRadius(30);
	this.appendChild(legRight,0);
	//this.parts.push(legRight);
	
	var footRight = new virtual_pet.BodyPart(this.gameObj,this.gameLayer, this, 64, 64, this.width*.8, -this.width*.3, 0, 1, 0,1).setFill('images\/foot.svg').setScale(.8,.8);
	legRight.appendChild(footRight);
	
	var footLeft = new virtual_pet.BodyPart(this.gameObj,this.gameLayer, this, 64, 64, -this.width*.8, -this.width*.3, 0, 1, 0,1).setFill('images\/foot.svg').setScale(-.8,.8);
	legLeft.appendChild(footLeft);
	
	this.parts = {
		head: head,
		eyes: eyes,
		mouth: mouth,
		earRight: earRight,
		earLeft: earLeft,
		armRight: armRight,
		armLeft: armLeft,
		pawRight: pawRight,
		pawLeft: pawLeft,
		legLeft: legLeft,
		legRight: legRight,
		footRight: footRight,
		footLeft: footLeft
	}
	
	this.updateLook();
	
    var dt = this.gameObj.dt;
    var i, arrayLen, toRemove;
	//this.startTime = [];
	//for(i = 0, partsLen = this.parts.length; i < partsLen; i++){
		//this.startTime[i] = new Date().getTime();
	//}
	this.startTime = new Date().getTime();
	
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
		if (this.hunger <= 0) this.health = Math.max(this.health - .05, 0);
		this.energy = Math.min(this.energy + .01, 100);
		this.energy = Math.max(this.energy, 0);
		
		this.height = this.height + (this.growth)*this.height;
		this.width = this.width + (this.growth)*this.width;
		
        
        //console.log('happiness:'+this.happiness);
        //console.log('health:'+this.health);
        
        //game over
        if(this.health <= 0) {
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
		
		var animateAmt = Math.sin((new Date().getTime() - this.startTime)*this.gameObj.dt/4000)*5;
		this.parts.legLeft.animateAmount = animateAmt;
		this.parts.legRight.animateAmount = animateAmt;
		this.parts.armRight.animateAmount = animateAmt;
		this.parts.armLeft.animateAmount = animateAmt;
		
		this.updateLook();
		
		//for(i = 0, partsLen = this.parts.length; i < partsLen; i++){
			
			//if(this.parts[i].animates != 0){
				//if((new Date().getTime() - this.startTime[i]) > (this.gameObj.dt*5)){
				//	this.parts[i].animateAmount = Math.sin((new Date().getTime() - this.startTime[i])*this.gameObj.dt/4000)*5;
				//}
			//}
			//this.parts[i].updatePart();
		//}
		
    }, this, dt);
	//END OF SCHEDULER
    
    //drag it around to make it happier
    goog.events.listen(this,['mousedown','touchstart'],function(e){
			var pos = e.position;
			console.log('x: ' + pos.x + '  y: ' + pos.y);
			if(this.energy >= 5){
				this.happiness = Math.min(this.happiness+3,100);
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
	
    if(this.happiness > 75){
		this.parts.eyes.setFill(this.eyeTexture.happy);
		this.parts.mouth.setFill(this.mouthTexture.happy);
	}else if(this.happiness > 50){
		this.parts.eyes.setFill(this.eyeTexture.none);
		this.parts.mouth.setFill(this.mouthTexture.none);
	}else if(this.happiness > 25){
		this.parts.eyes.setFill(this.eyeTexture.sad);
		this.parts.mouth.setFill(this.mouthTexture.sad);
	}else if(this.happiness > 0){
		this.parts.eyes.setFill(this.eyeTexture.angry);
		this.parts.mouth.setFill(this.mouthTexture.sad);
	}
    //color according to the happiness (between green and red)
    var redAmount = parseInt((this.health)/100*this.colorR);
    var greenAmount = parseInt((100-this.health)/100*this.colorG);
	var blueAmount = parseInt((100-this.health)/100*this.colorB); 
    this.setFill(redAmount,greenAmount, blueAmount);
	this.parts.armLeft.updatePart(1);
	this.parts.armRight.updatePart(1);
	this.parts.legLeft.updatePart(1);
	this.parts.legRight.updatePart(1);
	this.parts.head.updatePart(1);
	this.parts.eyes.updatePart(0);
	this.parts.earLeft.updatePart(0);
	this.parts.earRight.updatePart(0);
	this.parts.pawLeft.updatePart(0);
	this.parts.pawRight.updatePart(0);
	this.parts.footLeft.updatePart(0);
	this.parts.footRight.updatePart(0);
};


