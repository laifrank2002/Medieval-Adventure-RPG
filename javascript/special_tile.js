function special_tile(id,map,image,on_trigger)
{
	this.id = id;
	this.image = image;
	this.on_trigger = on_trigger;
}

special_tile.prototype.trigger = function(...arguments)
{
	this.on_trigger(arguments);
}