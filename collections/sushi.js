Sushi = new Mongo.Collection('Sushi');

ImagesSushi = new FS.Collection("imagesSushi", {
	stores: [
	new FS.Store.GridFS("imagesSushi"),
	new FS.Store.GridFS("thumbsSushi", {
		beforeWrite: function(fileObj) {

			return {
				extension: 'jpeg',
				type: 'image/jpeg'
			};
		}
	})
	],
});


ImagesSushi.allow({
	insert: function(userId, doc){
		return true;
	},

	update: function(userId, doc, fieldNames, modifier) {
		return true;
	},
	download: function(userId){
		return true;
	},

	remove: function(userId){
		return true;
	}
});


Sushi.allow({
	insert: function(userId, doc) {
		return true;
		
	},
	update: function(userId, doc) {
		return true;
	}
});

SushiSchema = new SimpleSchema({

	categoryID: {
		type: Number,
		label: "categoryID",
		autoValue: function(){
			return 2
		},

		autoform:{
			type:"hidden"
		},
	},

	name: {
		type: String,
		label: "Name"
	},
	price: {
		type: Number,
		min: 0.0,
		decimal:true,
		label: "Price",
	},
	desc: {
		type: String,
		label: "Description",
		optional: true
	},

	images: {
		type: String,
		autoform: {
			afFieldInput: {
				type: "cfs-file",
				collection: "imagesSushi"
			}
		}
	},

	createdAt: {
		type: Date,
		label: "CreatedAt",
		autoValue: function(){
			return new Date()
		},

		autoform:{
			type:"hidden"
		},
	}
});



Meteor.methods({

	deleteSushi: function(id, imageID){
		Sushi.remove(id);
		ImagesSushi.remove(imageID);
	}
});

Sushi.attachSchema( SushiSchema );

