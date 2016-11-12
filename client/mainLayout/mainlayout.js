import introJs  from 'intro.js';
import '/node_modules/intro.js/minified/introjs.min.css';

Template.mainLayout.events({
	'click #log': function() {
		return Meteor.logout();
	},
	'click #copyBtn': function(event){

		if (UserSession.get('currentorderid')==null){
			sweetAlert("You do not have any reservations at the moment")
		} else {

     	var clipboard = new Clipboard('.btn');
     	clipboard.on('success', function(e) {
     		sweetAlert("Copied to clipboard")
     		e.clearSelection();
     		clipboard.destroy();

     	});
     	clipboard.on('error',function(e){
     		sweetAlert("Error \n This function only works for Safari 10+ and Google Chrome 42+")

     	});
     }
    },
	'click .intro': function(event){
		var route = FlowRouter.current().path

		if(route != '/menu' && route != '/drinks' && route != '/mongkokCongee' && route != '/sushi'){
			FlowRouter.go('/menu');
		} 

		event.preventDefault();
		var guide = require('intro.js');
		guide.introJs().setOption('doneLabel','Next page').start().oncomplete(function(){
			window.location.href = '/currentOrders?multipage=true';
		});
	}	
});

Template.mainLayout.helpers({
	orderId: () =>{
		return UserSession.get('currentorderid');
	},
	isUser: function() {
		// console.log(Meteor.userId());
		var id = Meteor.userId();
		return Meteor.users.findOne(id).profile.role == 'User';
	}

});