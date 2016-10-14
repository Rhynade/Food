//Homepage route
FlowRouter.route('/',{
	name: "home",
	action(){
		//if users are logged in they will be directed to recipe book
		if(Meteor.userId()){
			FlowRouter.go('menu');
		}
		BlazeLayout.render('HomeLayout');
	}
});

//Login
if(Meteor.isClient){
	Accounts.onLogin(function(){
		//upon login
		FlowRouter.go('menu');
	});

	Accounts.onLogout(function(){
		FlowRouter.go('home');
	});
}

FlowRouter.triggers.enter([function(context, redirect){
	//if user does not exist
	if(!Meteor.userId()){
		FlowRouter.go('home');
	}
}]);

//menu route
FlowRouter.route('/menu',{
	name: "menu",
	action(){
		BlazeLayout.render('mainLayout', {main: 'dimSums'}); //main-> name of template
	}
});

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

//add dishes route
FlowRouter.route('/add_dishes',{
	name: "add_dishes",
	action(){
		BlazeLayout.render('mainLayout', {main: 'newDishes'}); //main-> name of template
	}
});

