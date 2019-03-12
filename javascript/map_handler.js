// renderer for the maps
var map_handler = (
	function()
	{
		var offset_x = 100;
		var offset_y = 100;
		
		var tile_size = 32;
		
		var viewport = {
			x: 0,
			y: 0,
			width: 500,
			height: 500,
		};
		
		return {
			get viewport() {return viewport},
			
			draw: function(context, map)
			{
				
				// draw the tiles 
				for (var index = 0; index < map.width * map.height; index++)
				{
					// draw outline
					context.beginPath();
					context.drawImage(tiles[map.tiles[index]].image
						,(index % map.width)*tile_size + offset_x - viewport.x
						,(Math.floor(index/map.width))*tile_size + offset_y - viewport.y
						,tile_size
						,tile_size);
					context.stroke();
					
				}
				
				// draw special tiles 
				for (var index = 0; index < map.special_tiles.length; index++)
				{
					if (map.special_tiles[index].image)
					{
						context.drawImage(map.special_tiles[index].image 
							,(map.special_tiles[index].x)*tile_size + offset_x - viewport.x
							,(map.special_tiles[index].y)*tile_size + offset_y - viewport.y
							,tile_size
							,tile_size);
					}
				}
				
				// draw the tiles 
				for (var index = 0; index < map.width * map.height; index++)
				{
					
					// draw map objects on top if there is one 
					if (map.map_objects[index])
					{
						if (map.map_objects[index].image)
						{
							context.drawImage(map.map_objects[index].image 
								,(index % map.width)*tile_size + offset_x - viewport.x
								,(Math.floor(index/map.width))*tile_size + offset_y - viewport.y
								,tile_size
								,tile_size);
						}
					}
				}
			},
		}
	}
)();