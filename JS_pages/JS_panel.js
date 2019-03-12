// a JS panel
function JS_panel(x,y, width, height)
{
	this.x = x || 0;
	this.y = y || 0;
	
	this.width = width || 0;
	this.height = height || 0;
	
	this.children = [];
	
	this.type = "JS_panel";
}

JS_panel.prototype.draw = function(context, lapse)
{
	for (var element in this.children)
	{
		this.children[element].draw(context, lapse);
	}
}

JS_panel.prototype.handle_mouse_up = function(mouseX, mouseY)
{
	for (var element in this.children)
	{
		if (this.children[element].type = "JS_button")
		{
			if (this.children[element].isInBound(mouseX,mouseY))
			{
				this.children[element].handle_mouse_up(mouseX,mouseY);
			}
		}
	}
}

JS_panel.prototype.handle_mouse_down = function(mouseX, mouseY)
{
	for (var element in this.children)
	{
		if (this.children[element].type = "JS_button")
		{
			if (this.children[element].isInBound(mouseX,mouseY))
			{
				this.children[element].handle_mouse_down(mouseX,mouseY);
			}
		}
	}
}