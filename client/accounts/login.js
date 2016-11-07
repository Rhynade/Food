Template.login.events({
  'click #login' ( event, template ) {
    event.preventDefault();
    var email = template.find( '[name="emailAddress"]' ).value;
    var password = template.find( '[name="password"]' ).value;
    Meteor.loginWithPassword(email,password,error => {
      if (error) {
        alert(error);
      }
    });
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