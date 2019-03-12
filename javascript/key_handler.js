var key_handler = (
	function()
	{
		var initialized = false;
		
		return {
			initialize: function()
			{
				if(!initialized)
				{
					Engine.log("Initializing key handler...");
					addEventListener("keydown", Engine.handle_key_down); // 
					addEventListener("keyup", Engine.handle_key_up); // up and down to handle > 1 keys at a time
					initialized = true;
				}
				else
				{
					Engine.log("Keyhandler is already initialized!");
				}
			},
			deinitialize: function()
			{
				if(initialized)
				{
					Engine.log("Removing keyhandler...");
					removeEventListener("keydown",Engine.handle_key_down);
					removeEventListener("keyup",Engine.handle_key_up);
					initialized = false;
				}
				else
				{
					Engine.log("Keyhandler has not been initialized!");
				}
			},

		} // end of return 
	}
)();