Template.sushi.onRendered(function(){
	if (UserSession.get("currentorderid")!=null){
		this.$(".modal-trigger").leanModal();
	}
});

Template.sushiModal.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('order');
	});
});

Template.sushiModal.helpers({
	foodid: function() {
		return this._id;
	},

	category: function(){
		return 3;
	},

	orderid: function() {
		return UserSession.get('currentorderid');
	}
});

// Template.sushi.onCreated(function(){
// 	this.editMode = new ReactiveVar(false);
// });

Template.sushi.helpers({

	image: ()=>{
		var image = Template.currentData().images;
		return ImagesSushi.find({_id: image});
	},

	updateSushiId: function(){
		return this._id;

	},

	isUser: function() {
		//console.log(Meteor.userId());
		var id = Meteor.userId();
		return Meteor.users.findOne(id).profile.role == 'User';
	},
	hasBasket: function(){
		return UserSession.get('currentorderid');
	}
});

Template.sushi.events({

	'click #delete': function(){
		Meteor.call('deleteSushi', this._id, this.images);
	},

	'click #order': function(){
		if(UserSession.get("currentorderid")==null){
			alert("Please create a new basket!");
		}
	}
});


