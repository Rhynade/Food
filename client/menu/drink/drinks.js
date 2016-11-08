Template.drinks.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('Drink');
		self.subscribe('imageDrink');
	});
});

Template.drinks.helpers({
	drinks:() => {
		return Drink.find({});
	},
	
	image: ()=>{
		var image = Template.currentData().images;
		return ImageDrink.find({_id: image});
	}
});