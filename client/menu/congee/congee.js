Template.congee.onRendered(function(){
	this.$(".modal-trigger").leanModal();
});

Template.congee.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('order');
	});
})

Template.congeeModal.helpers({
	foodid: function() {
		return this._id;
	},

	category: function(){
		return 2;
	},

	orderid: function(){
		return UserSession.get('currentorderid');
	}
});

Template.congee.helpers({

	image: ()=>{
		var image = Template.currentData().images;
		return ImagesCongee.find({_id: image});
	}
});
