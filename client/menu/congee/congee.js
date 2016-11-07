Template.congee.onRendered(function(){
	if(UserSession.get("currentorderid")!=null){
		this.$(".modal-trigger").leanModal();
	}
});

Template.congee.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('order');
	});

});

Template.congee.events({
	'click #order': function(){
		if(UserSession.get("currentorderid")==null){
			alert("Please create a new basket!");
		}
	},

	'click #delete': function(){
		Meteor.call('deleteCongee', this._id, this.images);
	},

	'click #edit': function(event, template){

		template.editMode.set(!template.editMode.get());
	},
});
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
	},
	
	isUser: function() {
		//console.log(Meteor.userId());
		var id = Meteor.userId();
		return Meteor.users.findOne(id).profile.role == 'User';
	},

	hasBasket:function(){
		return UserSession.get('currentorderid');
	}
});
