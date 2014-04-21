var Travel = new Class({

	initialize: function(position, destination, element)
	{
		this.position = position;
		this.destination = destination;
		this.element = element;
	},

	setTravel: function(travel)
	{
		this.travel = travel;
	},

	display: function()
	{
		var innerP = this.element.getChildren('p');
		if(innerP != null || innerP != undefined)
			innerP.dispose();

		innerP = new Element('p',{
			html: this.travel,
		});
		this.element.adopt(innerP);
	}
});