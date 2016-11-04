Template.login.events({
  'click form' ( event, template ) {
    event.preventDefault();
    var email = template.find( '[name="emailAddress"]' ).value;
    var password = template.find( '[name="password"]' ).value;
    Meteor.loginWithPassword(email,password);
  },
  'click #signup': function() {
    Session.set('signup',true);
  },
  'click #forget': function() {
    Session.set('forget',true);
  },
});

Template.HomeLayout.helpers({
	signUpPage: function() {
		return Session.get('signup');
	},
  forgetPage: function() {
    return Session.get('forget');
  }
});