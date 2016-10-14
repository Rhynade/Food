Template.login.events({
  'click form' ( event, template ) {
    event.preventDefault();
    var email = template.find( '[name="emailAddress"]' ).value;
    var password = template.find( '[name="password"]' ).value;
    Meteor.loginWithPassword(email,password);
  },
  'click #clicked': function() {
    Session.set('isClicked',true);
  }
});

Template.HomeLayout.helpers({
	isClicked: function() {
		return Session.get('isClicked');
	}
});