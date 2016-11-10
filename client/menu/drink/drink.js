Template.drink.onRendered(function(){
	if (UserSession.get("currentorderid")!=null){
		this.$(".modal-trigger").leanModal();
	}
});

Template.drinkModal.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('order');
	});
});

Template.drinkModal.helpers({
	foodid: function() {
		return this._id;
	},

	category: function(){
		return 4;
	},

	orderid: function() {
		return UserSession.get('currentorderid');
	}
});


Template.drink.helpers({

	image: ()=>{
		var image = Template.currentData().images;
		return ImageDrink.find({_id: image});
	},

	updateDrinkId: function(){
		return this._id;

	},

	isUser: function() {
		//console.log(Meteor.userId());
		var id = Meteor.userId();
		return Meteor.users.findOne(id).profile.role == 'User';
	},
	hasBasket: function(){
		var order = Order.find({custID: Meteor.user()._id, confirmed:false}).fetch();
		return order.length>0;
		// return UserSession.get('currentorderid');
	}
});

Template.drink.events({

	'click #delete': function(){
		Meteor.call('deleteDrink', this._id, this.images);
	},

	'click #order': function(){
		if(UserSession.get("currentorderid")==null){
			alert("Please create a new basket!");
		}
	}
});


