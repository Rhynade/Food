Template.dimSum.onRendered(function(){
	this.$(".modal-trigger").leanModal();
});

Template.dimSumModal.helpers({
	foodid: function() {
		return this._id;
	},

	category: function(){
		return 1;
	}
});

// AutoForm.hooks({
// 	insertOrderItemsForm: {
// 		before: {
// 			insert: function(doc) {
// 				doc.foodID = Template.currentData()._id;
// 				console.log(Session.get(_id));
// 				return doc;
// 			}
// 		}
// 	}
// });

Template.dimSum.onCreated(function(){
	this.editMode = new ReactiveVar(false);
});

Template.dimSum.helpers({

	image: ()=>{
		var image = Template.currentData().images;
		return ImagesDimSum.find({_id: image});
	},

	updateDimSumId: function(){
		return this._id;

	},

	editMode: function(){
		return Template.instance().editMode.get();
	}
});

Template.dimSum.events({

	'click #delete': function(){
		Meteor.call('deleteDimSum', this._id, this.images);
	},

	'click #edit': function(event, template){

		template.editMode.set(!template.editMode.get());
	}
});

