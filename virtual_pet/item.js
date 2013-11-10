goog.provide('virtual_pet.Item');
goog.require('lime.Sprite');

virtual_pet.Item = function(happiness, health, hunger, energy) {
    goog.base(this);
    
    this.happiness = happiness;
    this.health = health;
	this.hunger = hunger;
	this.energy = energy;
}

goog.inherits(virtual_pet.Item,lime.Sprite);
