Template.createbasket.onCreated(function(){
	var self = this;
	self.subscribe('order');
});

AutoForm.addHooks(["insertOrderForm"], {
  

    onSuccess: function(operation, result, template) {
      event.preventDefault();
      var length = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch().length;
      var currentorder = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch()[length-1]._id;
      UserSession.set('currentorderid', currentorder);
      FlowRouter.go('menu');
    }
  });
  

  Template.createbasket.events({
    'click #add': function(){
    event.preventDefault();
    var orderNo = document.getElementById("order_no").value;
    Order.update( {_id: orderNo} , { $addToSet: { custID: Meteor.user()._id }});
    UserSession.set('currentorderid', orderNo);
    FlowRouter.go('menu');
    }
  });

// Template.createbasket.events({
//   'submit form': function(event, t) {
//     event.preventDefault();
//   	var length = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch().length;
//   	var currentorder = Order.find({custID: Meteor.user()._id, confirmed: false}).fetch()[length-1]._id;
//   	UserSession.set('currentorderid', currentorder);
//    	FlowRouter.go('menu');
//   },

//   'click #add': function(event){
//     event.preventDefault();
//   	var orderNo = document.getElementById("order_no").value;
//     Order.update( {_id: orderNo} , { $addToSet: { custID: Meteor.user()._id }});
//   	UserSession.set('currentorderid', orderNo);
//   	FlowRouter.go('menu');

//   }
// });

Template.createbasket.helpers({
  user: () =>{
    return [Meteor.user()._id];
  },

  zero: ()=>{
    return 0.0;
  }
});
