
var Game = (
	function()
	{
		// metrics 
		var turn_count = 0;
		// the game!
		var current_map = null;
		var player;
		return {
			get player() {return player},
			
			initialize: function()
			{
				// oh boy, we're setting up the map...
				current_map = new map(prison_map_string,35,10);
				player = new map_object(current_map,image_library["player_test"]);
				current_map.set_map_object(player,1,1);
				
				current_map.set_map_object(new map_object(current_map,image_library["jail_door"]),4,1);
				current_map.set_map_object(new map_object(current_map,image_library["jail_door"]),7,2);
				current_map.set_map_object(new map_object(current_map,image_library["jail_door"]),4,4);
				current_map.set_map_object(new map_object(current_map,image_library["jail_door"]),7,5);
				
				current_map.add_special_tile(new special_tile("jail_1",current_map,image_library["generic_important"]
						,function()
						{
							scene_handler.create_scene(jail_break);
							page_manager.switch_page("scene_handler");
							current_map.remove_special_tile_by_id("jail_1");
							
							current_map.remove_map_object(4,1);
						})
					,3
					,1)
					
					
				Engine.log(current_map);
			},
			
			// moving player 
			move_player: function(delta_x,delta_y)
			{
				if(player.move(delta_x,delta_y))
				{
					current_map.trigger_special_tile(player.x, player.y);// try triggering 
					Game.turn(); // pass a turn only if we actually moved  
				}
			},
			
			handle_mouse_up: function(mouseX,mouseY)
			{
				
			},
			
			handle_mouse_down: function(mouseX,mouseY)
			{
				Engine.log(mouseX);
			},
			
			draw: function(context)
			{
				// draw map 
				map_handler.draw(context,current_map);
			},
			
			// each tick is technically a turn, so we don't need a lapse
			turn: function()
			{
				turn_count++;
				Engine.log("Turns: " + turn_count);
			},
		}
	}
)();