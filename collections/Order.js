Order = new Mongo.Collection('order');

Order.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId,doc){
		return !!userId;
	}
});

OrderSchema = new SimpleSchema({
	createdAt: {
		type: Date,
		label: "Created At",
		autoValue: function(){
			return new Date()
		},
		//hidden field
		autoform:{
			type: "hidden"
		}
	},

	reservationDate: {
		type: Date,
		label: "Reservation Date",
		autoValue: function(){
			return new Date()
		},
		//hidden field
		autoform:{
			type: "hidden"
		}

	},

	totalPrice: {
		type: Number,
		label: "TotalPrice",
		defaultValue: 0.0,
		autoform:{
			type: "hidden"
		},
		decimal: true
	},

	confirmed: {
		type: Boolean,
		label: "Confirmed",
		defaultValue: false,
		autoform:{
			type: "hidden"
		}
	},

	custID: {
		type: String,
		label: "Customer",
		//default value
		autoValue: function() {
			return this.userId
		},
		//hidden field
		autoform:{
			type: "hidden"
		}

	}

});

Meteor.methods({
	toggleOrder: function(id) {
		Order.update(id);
	},

	deleteOrder: function(id) {
		Order.remove(id);
	},

	updateOrder: function(id,modifier){
		Order.update(id,modifier);
	}
});

Order.attachSchema( OrderSchema );