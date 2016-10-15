Template.createbasket.onCreated(function(){
	var self = this;
	self.subscribe('order');
});

Template.createbasket.events({
  'submit form': function(e, t) {
  	var length = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch().length;
  	var currentorder = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch()[length-1]._id;
  	Session.set('currentorderid', currentorder);
   	FlowRouter.go('menu');
  },
});