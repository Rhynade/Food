DimSums = new Mongo.Collection('dimSums');

ImagesDimSum = new FS.Collection("imagesDimSum", {
  stores: [
    new FS.Store.GridFS("imagesDimSum"),
    new FS.Store.GridFS("thumbsDimSum", {
      beforeWrite: function(fileObj) {

        return {
          extension: 'jpeg',
          type: 'image/jpeg'
        };
      },
      transformWrite: resizeImageStream({
        width: 200,
        height: 100,
        format: 'image/jpeg',
        quality: 50
      })
    })
  ],
});


ImagesDimSum.allow({
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


DimSums.allow({
	insert: function(userId, doc) {
		return true;
		// return userRole == 7;
	},
	update: function(userId, doc) {
		return true;
		//return userRole == 7;
	}
});

DimSumSchema = new SimpleSchema({

	categoryID: {
		type: Number,
		label: "categoryID",
		autoValue: function(){
			return 1
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
				collection: "imagesDimSum"
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

	deleteDimSum: function(id, imageID){
		DimSums.remove(id);
		ImagesDimSum.remove(imageID);
	}
});

DimSums.attachSchema( DimSumSchema );

