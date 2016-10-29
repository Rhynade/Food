Congee = new Mongo.Collection('Congee');

ImagesCongee = new FS.Collection("imagesCongee", {
  stores: [
    new FS.Store.GridFS("imagesCongee"),
    new FS.Store.GridFS("thumbsCongee", {
      beforeWrite: function(fileObj) {
        // We return an object, which will change the
        // filename extension and type for this store only.
        return {
          extension: 'jpeg',
          type: 'image/jpeg'
        };
      }
    })
  ],
});


ImagesCongee.allow({
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


Congee.allow({
	insert: function(userId, doc) {
		return true;
		// return userRole == 7;
	},
	update: function(userId, doc) {
		return true;
		//return userRole == 7;
	}
});

CongeeSchema = new SimpleSchema({

	categoryID: {
		type: Number,
		label: "categoryID",
		autoValue: function(){
			return 0
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
				collection: "imagesCongee"
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
	toggleCongeeItem: function(id) {
		Congee.update(id)
	},

	deleteCongee: function(id){
		Congee.remove(id);
	}
});

Congee.attachSchema( CongeeSchema );


// DimSums.update({category: "Dim Sum"}, {$set: {categoryID: 1}});