function map_object(map,image)
{
	this.x = 0;
	this.y = 0;
	this.map = map;
	this.image = image;
	
	this.name = "";
}

map_object.prototype.move = function(delta_x,delta_y)
{
	var destination_x = this.x + delta_x;
	var destination_y = this.y + delta_y;
	if(this.map.is_valid_destination(destination_x,destination_y))
	{
		this.map.move_map_object(this.x,this.y,destination_x,destination_y);
		return true;
	}
	else
	{
		Engine.log("Invalid destination");
		return false;
	}
}
