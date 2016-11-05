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
		min: new Date(),
		optional: false,
		label: "Reservation Date",

	},

	reservationTime: {
		type: Number,
		optional: false,
		label: "Time",
		autoform: {
			options: {
				"1000": "10:00",
				"1100": "11:00",
				"1200": "12:00",
				"1300": "13:00",
				"1400": "14:00",
				"1500": "15:00",
				"1600": "16:00",
				"1700": "17:00",
				"1800": "18:00",
				"1900": "19:00",
				"2000": "20:00",
				"2100": "21:00",
			}
		}
	},

	numPax: {
		type: Number,
		optional: false,
		label: "Number of Pax"

	},

	totalPrice: {
		type: Number,
		label: "TotalPrice",
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
		type: [String],
		label: "Customer",
		//default value
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