//Homepage route
FlowRouter.route('/',{
	name: "home",
	action(){
		//if users are logged in they will be directed to create new basket page
		if(Meteor.userId()){
			FlowRouter.go('createbasket');
		}
		BlazeLayout.render('HomeLayout');
	}
});

//Login
if(Meteor.isClient){
	Accounts.onLogin(function(){
		//upon login
		if( Meteor.users.findOne(Meteor.userId()).profile.role == 'User'){
			if(FlowRouter.current().path=='/currentOrders'){
				FlowRouter.go(currentOrders);
			}
			else if(Session.get('currentorderid')){

				UserSession.set('currentorderid', Session.get('currentorderid'));
				FlowRouter.go('menu');
			}
			else if(UserSession.get('currentorderid')){
				FlowRouter.go('menu');
			}
			else{
				FlowRouter.go('createbasket');
			}
		}
		else{
			FlowRouter.go('dashboard');
		}
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});

}

FlowRouter.triggers.enter([function(context, redirect){
	// if user does not exist
	if(!Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

//createbasket route
FlowRouter.route('/createbasket',{
	name: 'createbasket',
	action(){
		BlazeLayout.render('mainLayout',{main:'createbasket'});
	}
})
//menu route - dim sum
FlowRouter.route('/menu',{
	name: "menu",
	action(){
		BlazeLayout.render('mainLayout', {main: 'dimSums'}); //main-> name of template
	}
});
//menu route - congee
FlowRouter.route('/mongkokCongee',{
	name: "mongkokCongee",
	action(){
		BlazeLayout.render('mainLayout', {main: 'congees'}); //main-> name of template
	}
});

//orders route
FlowRouter.route('/currentOrders', {
	name: 'currentOrders',
	action(){
		BlazeLayout.render('mainLayout', {main: 'currentOrders'});
	}
});

//orderhistory route
FlowRouter.route('/orderhistory', {
	name: 'orderhistory',
	action(){
		BlazeLayout.render('mainLayout', {main: 'orderHistory'});
	}
});

//add dishes route
FlowRouter.route('/add_dishes',{
	name: "add_dishes",
	action(){
		BlazeLayout.render('mainLayout', {main: 'newDishes'}); //main-> name of template
	}
});

//dashboard route
FlowRouter.route('/dashboard',{
	name: 'dashboard',
	action(){
		BlazeLayout.render('mainLayout',{main: 'dashboard'});
	}
});

//profile route
FlowRouter.route('/profile',{
	name: 'profile',
	action(){
		BlazeLayout.render('mainLayout',{main: 'profilepage'});
	}
});

//reservations route
FlowRouter.route('/reservations',{
	name: 'reservations',
	action(){
		BlazeLayout.render('mainLayout',{main: 'reservations'});
	}
});

FlowRouter.route('/:_id',{
	name: 'alternate',
	action: function(params){
		var id = params._id;
		
		Session.set('currentorderid',id);
		FlowRouter.go('home');
	}
});




