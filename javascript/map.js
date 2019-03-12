function map(map_string,width,height)
{
	this.width = width;
	this.height = height;
	this.tiles = map_string.split(",");
	if(this.tiles.length !== this.width*this.height) throw "Map length does not match parameters!";
	
	this.map_objects = [];
	for(var index = 0; index < this.width*this.height; index++)
	{
		this.map_objects.push(null);
	}
	
	this.special_tiles = [];
}

map.prototype.is_valid_coordinate = function(x,y)
{
	if(
		x >= 0
		&& y >= 0
		&& x < this.width
		&& y < this.height)
	{
		return true;
	}
	return false;
}

map.prototype.is_valid_destination = function(x,y)
{
	if(!this.is_valid_coordinate(x,y)) return false;
	
	if(!tiles[this.tiles[this.get_position(x,y)]].collide) 
	{
		return true;
	}
	else 
	{
		return false;
	}
}

map.prototype.get_position = function(x,y)
{
	return (y * this.width) + x;
}

map.prototype.set_tile = function(new_tile,x,y)
{
	this.tiles[this.get_position(x,y)] = new_tile;
}

map.prototype.set_map_object = function(map_object,x,y)
{
	this.map_objects[this.get_position(x,y)] = map_object;
	if(map_object)
	{
		map_object.x = x;
		map_object.y = y;
	}
}

map.prototype.move_map_object = function(x1,y1,x2,y2)
{
	var source = this.map_objects[this.get_position(x1,y1)];
	// check if source is NOT blank
	if(source === null)
	{
		Engine.log("Source is not a map object!");
		return;
	}
	// check if destination is blank.
	var destination = this.map_objects[this.get_position(x2,y2)];
	if(destination !== null)
	{
		Engine.log("Cannot move to destination, " + x2 + "," + y2 + " is occupied by " + destination);
		return;
	}
	// if all is valid 
	this.set_map_object(source,x2,y2);
	this.set_map_object(null,x1,y1);
}

map.prototype.remove_map_object = function(x,y)
{
	this.map_objects[this.get_position(x,y)] = null;
}

map.prototype.swap_map_object = function(x1,y1,x2,y2)
{
	
}

map.prototype.add_special_tile = function(tile,x,y)
{
	tile.x = x;
	tile.y = y;
	this.special_tiles.push(tile);
}

map.prototype.trigger_special_tile = function(x,y)
{
	for (var index = 0; index < this.special_tiles.length; index++)
	{
		if(this.special_tiles[index].x === x
			&& this.special_tiles[index].y === y)
		{
			this.special_tiles[index].trigger();	
		}
	}
}

map.prototype.remove_special_tile_by_id = function(id)
{
	to_remove_index = -1;
	for (var index = 0; index < this.special_tiles.length; index++)
	{
		if(this.special_tiles[index].id === id) to_remove_index = index;
	}
	if(to_remove_index > -1) this.special_tiles.splice(to_remove_index,1);
}