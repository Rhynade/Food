Template.ForgotPassword.events({
  'submit #forgotPasswordForm': function(e, t) {
    e.preventDefault();
    var forgotPasswordForm = $(e.currentTarget),
        email = forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase();

    event.target.forgotPasswordEmail.value = "";

    Accounts.forgotPassword({email: email}, function(err) {
      if (err) {
        if (err.message === 'User not found [403]') {
          console.log('This email does not exist.');
        } else {
          console.log('We are sorry but something went wrong.');
        }
      } else {
        console.log('Email Sent. Check your mailbox.');
      }
    });
    return false;
  },
  'click #back': function() {
    Session.set('signup',false);
    Session.set('forget',false);
  }
});

if (Accounts._resetPasswordToken) {
  Session.set('resetPassword', Accounts._resetPasswordToken);
}

Template.ResetPassword.events({
  'submit #resetPasswordForm': function(e, t) {
    e.preventDefault();
    var resetPasswordForm = $(e.currentTarget),
        oldPassword = resetPasswordForm.find('#resetOldPassword').val(),
        newPassword = resetPasswordForm.find('#resetNewPassword').val();
    
    console.log(Session.get('resetPassword'));

    Accounts.changePassword(oldPassword, newPassword, function(err) {
      if (err) {
        console.log('We are sorry but something went wrong.');
      } else {
        console.log('Your password has been changed. Welcome back!');
      }
    });
    return false;
  }
});