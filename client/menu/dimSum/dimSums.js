Template.dimSums.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('dimSums');
		self.subscribe('imagesDimSum');
		self.subscribe('orderItem');
		self.subscribe('order');
	});
});

Template.dimSums.helpers({
	dimSums:() => {
		return DimSums.find({});
	},
	image: ()=>{
		var image = Template.currentData().images;
		return ImagesDimSum.find({_id: image});
	}
});