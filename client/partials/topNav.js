Template.topNav.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('orderItem');
		self.subscribe('order');
	});
});

Template.topNav.helpers({

	isUser: function() {
		//console.log(Meteor.userId());
		var id = Meteor.userId();
		return Meteor.users.findOne(id).profile.role == 'User';
	},

	findCurrentDate:()=>{
		var curr = UserSession.get('currentorderid');
		var order = Order.find({_id : curr}).fetch()[0];
		var date = order.reservationDate.toDateString();

		return date;
		
	},

	findCurrentTime: ()=>{
		var curr = UserSession.get('currentorderid');
		var order = Order.find({_id : curr}).fetch()[0];
		var time = order.reservationTime;

		return time;
	},

	findOrder:() =>{
		return Order.find({ custID: Meteor.user()._id, confirmed: false}, {sort: {reservationDate: -1}});
	},

	findDate:()=>{
		return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationDate.toDateString();
	},

	findTime: ()=> {
		return Order.find({ _id: Template.currentData()._id, confirmed: false}).fetch()[0].reservationTime;
	},

	match:()=>{
		var date = Template.topNav.__helpers.get('findDate').call();
		var currentDate = Template.topNav.__helpers.get('findCurrentDate').call();

		var time = Template.topNav.__helpers.get('findTime').call();
		var currentTime = Template.topNav.__helpers.get('findCurrentTime').call();
		return date == currentDate & time==currentTime;
		
	}
});

Template.topNav.events({
      'change select': function(event){
         var selectValue = event.target.value;
         UserSession.set('currentorderid', selectValue)
      }
   });