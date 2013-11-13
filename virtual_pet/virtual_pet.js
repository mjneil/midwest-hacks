//set main namespace
goog.provide('virtual_pet');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Circle');
goog.require('lime.fill.LinearGradient');
goog.require('virtual_pet.Pet');
goog.require('virtual_pet.Item');
goog.require('virtual_pet.BodyPart');
goog.require('virtual_pet.Vend');

// entrypoint
virtual_pet.start = function(e){
    //object to store game-level properties
    var gameObj = {
        width: 1026,
        height: 480,
        renderer: lime.Renderer.DOM,
        maxPetSize: 200,
        items: [],
		ground: 480*90/100,
		grav: 0.981,
		dt: 10
    };
    
    var director = new lime.Director(document.body,gameObj.width,gameObj.height);
    var gameScene = new lime.Scene().setRenderer(gameObj.renderer)
    var gameLayer = new lime.Layer();
	var vendLayer = new lime.Layer();
	
	var vend = new virtual_pet.Vend(200,300,gameObj).setAnchorPoint(0,1).setSize(200,300).setPosition(gameObj.width/10,gameObj.ground).setFill('images\/vending.svg');
	vendLayer.appendChild(vend);
	
	var gradient = new lime.fill.LinearGradient().
        setDirection(0,0,0,1). // 45' angle 
        addColorStop(0,Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255),1). // start from red color
        addColorStop(1,Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255),.5); // end with transparent blue
    
    var background = new lime.Sprite().setSize(gameObj.width,gameObj.height*45/50).
        setFill(gradient).setAnchorPoint(0,0).setPosition(0,0);
		
    
    goog.events.listen(vend, ['touchstart', 'mousedown'], function(e) {
        if(gameObj.currentItem) {
            var pos = e.position;
            var newItem = new virtual_pet.Item(gameObj, gameObj.width/10 + 150, 70, Math.floor((Math.random()*20)+20), 45, gameObj.currentItem.happiness,gameObj.currentItem.health, gameObj.currentItem.hunger,gameObj.currentItem.energy)
                .setSize(gameObj.currentItem.height, gameObj.currentItem.height)
                .setFill(gameObj.currentItem.fill);
            gameLayer.appendChild(newItem);
            gameObj.items.push(newItem);           
            
            gameObj.currentItem = null;
        }
    });
    
    var groundArea = new lime.Sprite().setSize(gameObj.width,gameObj.height/5).
        setFill('#999999').setPosition(gameObj.width/2,gameObj.height*100/100);
		
	var vendArea = new lime.Sprite().setSize(200,400).
        setFill('#8B5A00').setPosition(gameObj.width/2,gameObj.height*9/10);
    gameScene.appendChild(background,0);    
    gameLayer.appendChild(groundArea);   
	gameScene.appendChild(vendLayer);  
    gameScene.appendChild(gameLayer);
	
    
    //create pet
    var pet = new virtual_pet.Pet(gameObj, gameLayer).setRadius(30);
    gameLayer.appendChild(pet);
	
	var titleLine = new lime.Label().setFontFamily('Verdana').setFontColor('#fff').setFontSize(16).setFontWeight('bold').setPosition(gameObj.width*4/5, gameObj.height/30).setText('Eks - By Nick Vander Woude and Matt Neil');
	var titleLine2 = new lime.Label().setFontFamily('Verdana').setFontColor('#fff').setFontSize(14).setFontWeight('normal').setPosition(gameObj.width*4/5, gameObj.height/15).setText('Alpha version 1.0');
	var stitleLine = new lime.Label().setFontFamily('Verdana').setFontColor('#000').setFontSize(16).setFontWeight('bold').setPosition(1+gameObj.width*4/5, 2+gameObj.height/30).setText('Eks - By Nick Vander Woude and Matt Neil');
	var stitleLine2 = new lime.Label().setFontFamily('Verdana').setFontColor('#000').setFontSize(14).setFontWeight('normal').setPosition(1+gameObj.width*4/5, 2+gameObj.height/15).setText('Alpha version 1.0');
	gameLayer.appendChild(stitleLine);
	gameLayer.appendChild(stitleLine2);
	gameLayer.appendChild(titleLine);
	gameLayer.appendChild(titleLine2);
	
	var petMeta = new lime.Label().setFontFamily('Verdana').setFontColor('#000').setFontSize(16).setFontWeight('bold').setPosition(gameObj.width/2, gameObj.height-20);
		gameLayer.appendChild(petMeta);
	lime.scheduleManager.scheduleWithDelay(function() {
			petMeta.setText('Happiness: ' + round100(pet.happiness) + '  Health: ' + round100(pet.health) + '  Hunger: ' + round100(pet.hunger) + '  Energy: ' + round100(pet.energy));
		}, this, gameObj.dt);
	//END OF SCHEDULER
    
    director.makeMobileWebAppCapable();
    director.replaceScene(gameScene);
	

}

function round100(num) {
    return Math.round(num);
}

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('virtual_pet.start', virtual_pet.start);
