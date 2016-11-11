Template.sideNav.onRendered(function(){
	this.$('.button-collapse').sideNav({
		closeOnClick: true,
	});
});

Template.sideNav.helpers({
	isUser: function() {
		//console.log(Meteor.userId());
		var id = Meteor.userId();
		return Meteor.users.findOne(id).profile.role == 'User';
	},
	name: function() {
		var id = Meteor.userId();
		return Meteor.users.findOne(id).profile.name;
	},
	email: function() {
		var id = Meteor.userId();
		return Meteor.users.findOne(id).emails[0].address;
	}
});

