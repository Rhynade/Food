Template.createbasket.onCreated(function(){
	var self = this;
	self.subscribe('order');
});

// Template.createbasket.events({
//   'submit form': function(e, t) {
//   	var length = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch().length;
//   	var currentorder = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch()[length-1]._id;
//   	Session.set('currentorderid', currentorder);
//    	FlowRouter.go('menu');
//   },

//   'click #add': function(){
//   	var orderNo = document.getElementById("order_no").value;
//   	Session.set('currentorderid', orderNo);
//   	FlowRouter.go('menu');
//   }
// });

AutoForm.addHooks(["insertOrderForm"], {
  

    onSuccess: function(operation, result, template) {
      var length = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch().length;
      var currentorder = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch()[length-1]._id;
      Session.set('currentorderid', currentorder);
      FlowRouter.go('menu');
    }
  });
  

  Template.createbasket.events({
    'click #add': function(){
      Session.set('add', true);
      var orderNo = document.getElementById("order_no").value;
      Session.set('currentorderid', orderNo);
      FlowRouter.go('menu');
    }
  });

