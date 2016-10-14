Template.signup.events({
  'submit form' ( event, template ) {
    event.preventDefault();
    var email = event.target.emailAddress.value;
    var password = event.target.password.value;
    let user = {
      email: email,
      password: password,
    };
    Accounts.createUser( user, ( error ) => {
    if ( error ) {
      Bert.alert( error.reason, 'danger' );
    } else {
      Bert.alert( 'Welcome!', 'success' );
    }
    });
    event.target.emailAddress.value = "";
    event.target.password.value = "";
    return false;
  },
  'click #clicked': function() {
    Session.set('isClicked',false);
  }
});
