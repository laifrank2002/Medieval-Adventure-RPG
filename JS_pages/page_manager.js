// manages JSPages
var page_manager = (
	function()
	{
		var pages = {};
		var current_page;
		return {
			get current_page() { return current_page },
			get pages() { return pages },
			
			initialize: function()
			{
				// game 
				pages["game"] = new JS_page(function(context,lapse)
					{
						// make the game render the, well, game!
						Game.draw(context);
						// draw all JS_buttons in the page
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
						// draw all JS_labels in the page
						for (label in this.labels)
						{
							this.labels[label].draw(context);
						}
						// draw all images in the page
						for (image in this.images)
						{
							this.images[image].draw(context);
						}
					}
					,function(event)
					{
						var bounds = Canvas.canvas.getBoundingClientRect();
						var mouseX = event.clientX - bounds.x;
						var mouseY = event.clientY - bounds.y;
						
						Game.handle_mouse_up(mouseX,mouseY);
					}
					,function(event)
					{
						// we get internal canvas x and y
						// simplifies a lot of code.
						var bounds = Canvas.canvas.getBoundingClientRect();
						var mouseX = event.clientX - bounds.x;
						var mouseY = event.clientY - bounds.y;
						
						// let the game respond to mouse events 
						Game.handle_mouse_down(mouseX,mouseY);
						
						for (var button in this.buttons)
						{
							if(this.buttons[button].isInBound(mouseX,mouseY))
							{
								this.buttons[button].handle_click(mouseX,mouseY);
							}
						}
					});
				
				pages["game"].keys_pressed = {up:false,down:false,left:false,right:false};
				
				pages["game"].handle_key_up = function()
				{
					switch (event.keyCode) 
					{
						case 87:
						case 38:
							Engine.log("UP key pressed");
							this.keys_pressed["up"] = false;
							break;

						case 83:
						case 40:
							Engine.log("DOWN key pressed");
							this.keys_pressed["down"] = false;
							break;
							
						case 65:
						case 37:
							Engine.log("LEFT key pressed");
							this.keys_pressed["left"] = false;
							break;

						case 68:
						case 39:
							Engine.log("RIGHT key pressed");
							this.keys_pressed["right"] = false;
							break;
					}
				}
				
				pages["game"].handle_key_down = function()
				{
					switch (event.keyCode) 
					{
						case 87:
						case 38:
							Engine.log("UP key pressed");
							this.keys_pressed["up"] = true;
							Game.move_player(0,-1);
							break;

						case 83:
						case 40:
							Engine.log("DOWN key pressed");
							this.keys_pressed["down"] = true;
							Game.move_player(0,1);
							break;
							
						case 65:
						case 37:
							Engine.log("LEFT key pressed");
							this.keys_pressed["left"] = true;
							Game.move_player(-1,0);
							break;

						case 68:
						case 39:
							Engine.log("RIGHT key pressed");
							this.keys_pressed["right"] = true;
							Game.move_player(1,0);
							break;
					}
				}
				// adventure scene handler 
				pages["scene_handler"] = new JS_page(function(context,lapse)
					{
						// draw all JS_buttons in the page
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
						// draw all JS_labels in the page
						for (label in this.labels)
						{
							this.labels[label].draw(context);
						}
						// draw all images in the page
						for (image in this.images)
						{
							this.images[image].draw(context);
						}
					}
					,function(event)
					{
						
					}
					,function(event)
					{
						// we get internal canvas x and y
						// simplifies a lot of code.
						var bounds = Canvas.canvas.getBoundingClientRect();
						var mouseX = event.clientX - bounds.x;
						var mouseY = event.clientY - bounds.y;
						
						for (var button in this.buttons)
						{
							if(this.buttons[button].isInBound(mouseX,mouseY))
							{
								this.buttons[button].handle_click(mouseX,mouseY);
								return; // return because we'll be doing some STUFF when messing around with buttons.
							}
						}
					});
				
				pages["scene_handler"].add_button(new JS_button(625,425,150,50,"Return"
					,function()
					{
						page_manager.switch_page("game");
						Engine.log("return to game!");
					}));
				// tile editor 
				pages["tile_editor"] = new JS_page(function(context,lapse)
					{
						// draw all JS_buttons in the page
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
						// draw all JS_labels in the page
						for (label in this.labels)
						{
							this.labels[label].draw(context);
						}
						// draw all images in the page
						for (image in this.images)
						{
							this.images[image].draw(context);
						}
					}
					,function(event)
					{
						
					}
					,function(event)
					{
						// we get internal canvas x and y
						// simplifies a lot of code.
						var bounds = Canvas.canvas.getBoundingClientRect();
						var mouseX = event.clientX - bounds.x;
						var mouseY = event.clientY - bounds.y;
						
						for (var button in this.buttons)
						{
							if(this.buttons[button].isInBound(mouseX,mouseY))
							{
								this.buttons[button].handle_click(mouseX,mouseY);
								return; // return because we'll be doing some STUFF when messing around with buttons.
							}
						}
					});
					
				pages["tile_editor"].add_button(new JS_button(625,425,150,50,"Return"
					,function()
					{
						page_manager.switch_page("main_menu");
						Engine.log("return to main menu!");
					}));
				
				// main menu
				pages["main_menu"] = new JS_page(function(context,lapse)
					{
						// draw all JS_buttons in the page
						for (button in this.buttons)
						{
							this.buttons[button].draw(context);
						}
						// draw all JS_labels in the page
						for (label in this.labels)
						{
							this.labels[label].draw(context);
						}
						// draw all images in the page
						for (image in this.images)
						{
							this.images[image].draw(context);
						}
					}
					,function(event)
					{
						
					}
					,function(event)
					{
						// we get internal canvas x and y
						// simplifies a lot of code.
						var bounds = Canvas.canvas.getBoundingClientRect();
						var mouseX = event.clientX - bounds.x;
						var mouseY = event.clientY - bounds.y;
						
						for (var button in this.buttons)
						{
							if(this.buttons[button].isInBound(mouseX,mouseY))
							{
								this.buttons[button].handle_click(mouseX,mouseY);
							}
						}
					});
				
				pages["main_menu"].add_button(new JS_button(325,200,150,50,"Start"
					,function()
					{
						page_manager.switch_page("game");
						Engine.log("Started!");
					}));
					
				pages["main_menu"].add_button(new JS_button(325,275,150,50,"Tile Editor"
					,function()
					{
						page_manager.switch_page("tile_editor");
						Engine.log("Tile Editor!");
					}));
				
				pages["main_menu"].add_label(new JS_label(400,150,"Medieval Adventure RPG",24));
				// setting up default page (It really shouldn't be here)
				current_page = pages["main_menu"];
			},
			
			switch_page: function(id)
			{
				if (pages[id])
				{
					current_page = pages[id];
					Engine.log("Navigated to page: " + id);
				}
				else 
				{
					Engine.log("Not a valid page: " + id);
				}
			},
			
		}
	}
)();