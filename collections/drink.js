Drink = new Mongo.Collection('Drink');

ImageDrink = new FS.Collection("imageDrink", {
  stores: [
    new FS.Store.GridFS("imageDrink"),
    new FS.Store.GridFS("thumbsDrink", {
      beforeWrite: function(fileObj) {

        return {
          extension: 'jpeg',
          type: 'image/jpeg'
        };
      }
    })
  ],
});


ImageDrink.allow({
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


Drink.allow({
	insert: function(userId, doc) {
		return true;
		
	},
	update: function(userId, doc) {
		return true;
	}
});

DrinkSchema = new SimpleSchema({

	categoryID: {
		type: Number,
		label: "categoryID",
		autoValue: function(){
			return 3
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

	deleteDrink: function(id, imageID){
		Drink.remove(id);
		ImageDrink.remove(imageID);
	}
});

Drink.attachSchema( DrinkSchema );

