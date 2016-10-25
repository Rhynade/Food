Template.signup.events({
  'submit form' ( event, template ) {
    event.preventDefault();
    // var name = event.target.name.value;
    var email = event.target.emailAddress.value;
    var password = event.target.password.value;
    let user = {
      // roles: "Guest",
      email: email,
      password: password,
    };
    Accounts.createUser( user, ( error ) => {
    });
    event.target.emailAddress.value = "";
    event.target.password.value = "";
    // event.target.name.value = "";
    return false;
  },
  'click #clicked': function() {
    Session.set('isClicked',false);
  }

});