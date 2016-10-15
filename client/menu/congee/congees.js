Template.congees.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('Congee');
		self.subscribe('imagesCongee');
		self.subscribe('orderItem');
		self.subscribe('order');
	});
});

Template.congees.helpers({
	congees:() => {
		return Congee.find({});
	},
	image: ()=>{
		var image = Template.currentData().images;
		return ImagesCongee.find({_id: image});
	}
});
