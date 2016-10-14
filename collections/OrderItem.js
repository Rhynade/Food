OrderItems = new Mongo.Collection('orderItem');

OrderItems.allow({
	insert: function(userId, doc) {
		return !!userId;
	},
	update: function(userId,doc){
		return !!userId;
	}
});

OrderItemSchema = new SimpleSchema({
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

	foodID: {
		type: String,
		label: "FoodID"
	},

	category: {
		type: Number,
		label: "Category"
	},

	orderID: {
		type: String,
		label: "OrderID",
		autoform: {
			type: "hidden"
		},
		autoValue: function(){
			return "1";
		}
	},

	quantity: {
		type: Number,
		label: "Quantity",
		allowedValues: [1,2,3,4,5,6,7,8]
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

	},

	specialRequest: {
		type: String,
		label: "Special Request",
		optional: true
	},

	added: {
	 	type: Boolean,
	 	label: "Confirmation",
	 	defaultValue: false,
	 	autoform: {
	 		type:"hidden"
	 	}
	}

});

Meteor.methods({
	toggleOrderItem: function(id) {
		OrderItems.update(id);
	},

	deleteOrderItem: function(id) {
		OrderItems.remove(id);
	}
});

OrderItems.attachSchema( OrderItemSchema );