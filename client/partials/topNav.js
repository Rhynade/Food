import { Template } from 'meteor/templating';
import introJs  from 'intro.js';
import '/node_modules/intro.js/minified/introjs.min.css';

Template.topNav.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('orderItem');
		self.subscribe('order');
	});
	// var clipboard = new Clipboard('.btn');

	// clipboard.on('success', function(e) {
	//     console.info('Action:', e.action);
	//     console.info('Text:', e.text);
	//     console.info('Trigger:', e.trigger);
	//     // alert("copied!")
	//    	e.clearSelection();

	// });
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
		
	},

	hasOrder: ()=>{
		var order = Order.find({custID: Meteor.user()._id, confirmed:false}).fetch();
		return order.length>0;
	},
	orderId: ()=>{
		return UserSession.get('currentorderid');
	}
});

Template.topNav.events({
	'change select': function(event){
         // var selectValue = event.target.value;
         var selectValue = document.getElementById('select').value;
         
         UserSession.set('currentorderid', selectValue);
    },

    'click #select': function(event){
     	var x = document.getElementById("select").length;
     	if(x==1){
     		var selectValue = document.getElementById('select').value;
     		UserSession.set('currentorderid', selectValue)
     	}
    },

    'click #copyBtn': function(event){
     	var clipboard = new Clipboard('.btn');
     	clipboard.on('success', function(e) {
     		sweetAlert("Copied to clipboard")
     		e.clearSelection();
     		clipboard.destroy();

     	});
     	clipboard.on('error',function(e){
     		sweetAlert("Error \n This function only works for Safari 10+ and Google Chrome 42+")

     		});
    },

	'click .intro': function(event){
		event.preventDefault();
		var guide = require('intro.js');
		guide.introJs().setOption('doneLabel','Next page').start().oncomplete(function(){
			window.location.href = '/currentOrders?multipage=true';
		});
	}		


 });


