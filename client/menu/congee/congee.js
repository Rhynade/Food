Template.congee.onRendered(function(){
	this.$(".modal-trigger").leanModal();
});

Template.congeeModal.helpers({
	foodid: function() {
		return this._id;
	},

	category: function(){
		return 2;
	}
});

Template.congee.helpers({

	image: ()=>{
		var image = Template.currentData().images;
		return ImagesCongee.find({_id: image});
	}
});
