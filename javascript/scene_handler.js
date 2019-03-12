var scene_handler = (
	function()
	{
		var current_scene = false;
		var current_scene_object = null;
		var page = null;
		
		var possible_next = null;
		
		// positioning
		var margin_top = 25;
		var text_body_offset_x = 50;
		var text_body_offset_y = 75;
		return {
			get current_scene() {return current_scene},
			get current_scene_object() {return current_scene_object},
			
			get possible_next() {return possible_next},
			
			initialize: function()
			{
				page = page_manager.pages["scene_handler"];
			},
			
			create_scene: function(scene_object)
			{
				if(this.current_scene) throw new Error("A scene already exists! Use scene_handler.end_scene() before starting a new one!");
				current_scene_object = scene_object;
				// create the scene 
				Engine.log("Creating a new scene called : <<" + scene_object['title'] + ">>...");
				
				// like HTML page, set offset_y 
				var text_position = margin_top;
				
				// title 
				page.add_label(new JS_label(400,text_position,scene_object['title'],24));
				text_position+= text_body_offset_y;
				
				// start writing the text 
				var texts = scene_object['scenes']['start']['text'].split("\n");
				
				while (texts.length > 0)
				{
					page.add_label(new JS_label(text_body_offset_x
						,0 + text_position
						,texts.shift()
						,18
						,"left"));
					text_position += 25;
				}
				
				// put buttons 
				var buttons = scene_object['scenes']['start']['buttons'];
				var choices = Object.getOwnPropertyNames(buttons);
				
				while (choices.length > 0)
				{
					var choice = choices.shift();
					var current_button = buttons[choice];
					// build function 
					var onclick;
					if (current_button['next_scene'] === 'end')
					{
						onclick = scene_handler.end_scene;
					}
					else 
					{
						possible_next = current_button['next_scene'];
						onclick = function()
						{
							scene_handler.next_scene(scene_handler.current_scene_object['scenes'][getProbability(scene_handler.possible_next)]);
						}
					}
					
					// build the buttons 
					var new_button = new JS_button(text_body_offset_x
						,text_position
						,700
						,50
						,choice
						,onclick);
						
					text_position += 75;
					page.add_button(new_button);
					Engine.log(new_button);
				}
				
				current_scene = true;
			},
			
			next_scene: function(next)
			{
				page.clear();
				var text_position = margin_top;
				
				// title 
				page.add_label(new JS_label(400,text_position,scene_handler.current_scene_object['title'],24));
				text_position+= text_body_offset_y;
				
				// start writing the text 
				var texts = next['text'].split("\n");
				
				while (texts.length > 0)
				{
					page.add_label(new JS_label(text_body_offset_x
						,0 + text_position
						,texts.shift()
						,18
						,"left"));
					text_position += 25;
				}
				
				// put buttons 
				var buttons = next['buttons'];
				var choices = Object.getOwnPropertyNames(buttons);
				
				while (choices.length > 0)
				{
					var choice = choices.shift();
					var current_button = buttons[choice];
					// build function 
					var onclick
					if (current_button['next_scene'] === 'end')
					{
						onclick = scene_handler.end_scene;
					}
					else 
					{
						possible_next = current_button['next_scene'];
						onclick = function()
						{
							scene_handler.next_scene(scene_handler.current_scene_object['scenes'][getProbability(scene_handler.possible_next)]);
						}
					}
					
					// build the buttons 
					var new_button = new JS_button(text_body_offset_x
						,text_position
						,700
						,50
						,choice
						,onclick);
						
					text_position += 75;
					page.add_button(new_button);
					Engine.log(new_button);
				}
			},
			
			end_scene: function()
			{
				page.clear();
				page.add_button(new JS_button(625,425,150,50,"Return"
					,function()
					{
						page_manager.switch_page("game");
						Engine.log("return to game!");
					}));
				current_scene = false;
				current_scene_object = null;
				// return 
				page_manager.switch_page("game");
			},
		}
	}
)();