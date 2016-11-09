Template.congees.onCreated(function(){
	var self = this;
	// self.autorun(function(){
	// 	self.subscribe('Congee');
	// 	self.subscribe('imagesCongee');
	// });
});

Template.congees.helpers({
	congees:() => {
		return Congee.find({});
	},
	image: ()=>{
		return ImagesCongee.find({_id: image});
	}
});
