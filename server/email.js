Meteor.startup(function() {
  process.env.MAIL_URL = 'smtp://meteorxinwang%40gmail.com:P@ssw0rd!@smtp.gmail.com:587';
  Accounts.config({
	  sendVerificationEmail:true
  });

  Accounts.emailTemplates.siteName = "XinWang";
  Accounts.emailTemplates.from     = "LETS EAT TOGETHER! <admin@XinWang.com>";
  Accounts.emailTemplates.verifyEmail = {
	  subject() {
	    return "[Xin Wang] Verify Your Email Address";
	  },
	  text( user, url ) {
	    let emailAddress   = user.emails[0].address,
	        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${url}`;

	    return emailBody;
	  }
	};
});

Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      return Accounts.sendVerificationEmail(userId);
    }
  },

  sendEmail: function (userId, email) {
    if (this.userId == userId) {
      console.log("Sending");
      Email.send(email);
    };
  }
});
