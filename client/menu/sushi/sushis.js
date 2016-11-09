Template.sushis.onCreated(function(){
	var self = this;
	// self.autorun(function(){
	// 	self.subscribe('Sushi');
	// 	self.subscribe('imagesSushi');
	// });
});

Template.sushis.helpers({
	sushis:() => {
		return Sushi.find({});
	},
	image: ()=>{
		var image = Template.currentData().images;
		return ImagesSushi.find({_id: image});
	}
});