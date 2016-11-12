//Homepage route
FlowRouter.route('/',{
	name: "home",
	action(){
		//if users are logged in they will be directed to create new basket page
		if(Meteor.userId()){
			if(UserSession.get('currentorderid')){
				FlowRouter.go('menu');
			}
			else{
				FlowRouter.go('menu');
			}
		}
		BlazeLayout.render('HomeLayout');
	}
});

//Login
if(Meteor.isClient){
	Accounts.onLogin(function(){
		//upon login
		if( Meteor.user().profile.role == 'User'){
			// if(FlowRouter.current().path=='/currentOrders'){
			// 	console.log(123);
			// 	FlowRouter.go('currentOrders');
			// }
			// else if(Session.get('currentorderid')){

			// 	UserSession.set('currentorderid', Session.get('currentorderid'));
			// 	console.log(2);
			// 	FlowRouter.go('menu');
			// }
			// // else if(UserSession.get('currentorderid')){
			// // 	console.log(1);
			// // 	FlowRouter.go('menu');
			// // }
			// else{
			// 	console.log(4);
			// 	if(UserSession.get('currentorderid')){
			// 		FlowRouter.go('menu');
			// 	}
			// 	else{
			// 		FlowRouter.go('createbasket');
			// 	}				
			// }
			if(FlowRouter.current().path!='/'){
				FlowRouter.route(FlowRouter.current().path);
			}
			else if(Session.get('currentorderid') || UserSession.get('currentorderid')){
				// console.log("HI")
				// console.log(Session.get('currentorderid'))
				UserSession.set('currentorderid', Session.get('currentorderid'));

				// console.log(Meteor.userId().toString())
				
				Order.update({_id: Session.get('currentorderid')}, {$addToSet:{custID: Meteor.userId().toString()}});

				FlowRouter.go('menu');
			}
			else{
				FlowRouter.go('menu');
			}
		}
		else{
			if(FlowRouter.current().path!='/'){
				FlowRouter.route(FlowRouter.current().path);
			}
			else{
				FlowRouter.go('dashboard');
			}
		}
	});

Accounts.onLogout(function(){
	FlowRouter.go('home');
});

}

FlowRouter.triggers.enter([function(context, redirect){
	// if user does not exist

	var orderID = context.path.split('/')[1]

	if(!Meteor.userId() && orderID.length>15){
	
		Session.set('currentorderid', orderID);
		FlowRouter.go('home'); 
	} else if (!Meteor.userId()){
	
		FlowRouter.go('home');
	}
	// else{
	// 	FlowRouter.go('home');
	// }

	// if(!Meteor.userId() && !Session.get('currentorderid')){
	// 	FlowRouter.go('home');
	// }
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
	// subscriptions: function(params){
	// 	this.register('dimsum', Meteor.subscribe('dimSums'));
	// 	this.register('image', Meteor.subscribe('imagesDimSum'));
	// },
	name: "menu",
	action(){
		BlazeLayout.render('mainLayout', {main: 'dimSums'}); //main-> name of template
	}
});
//menu route - congee
FlowRouter.route('/mongkokCongee',{
	// subscriptions: function(params){
	// 	this.register('congee', Meteor.subscribe('Congee'));
	// 	this.register('image', Meteor.subscribe('imagesCongee'));
	// },
	name: "mongkokCongee",
	action(){
		BlazeLayout.render('mainLayout', {main: 'congees'}); //main-> name of template
	}
});

FlowRouter.route('/sushi',{
	// subscriptions: function(params){
	// 	this.register('sushi', Meteor.subscribe('Sushi'));
	// 	this.register('image', Meteor.subscribe('imagesSushi'));
	// },
	name: "sushi",
	action(){
		BlazeLayout.render('mainLayout', {main: 'sushis'}); //main-> name of template
	}
});

FlowRouter.route('/drinks',{
	// subscriptions: function(params){
	// 	this.register('drinks', Meteor.subscribe('Drink'));
	// 	this.register('image', Meteor.subscribe('imageDrink'));
	// },
	name: "drinks",
	action(){
		BlazeLayout.render('mainLayout', {main: 'drinks'}); //main-> name of template
	}
});

//orders route
FlowRouter.route('/currentOrders', {
	name: 'currentOrders',
	action(){
		BlazeLayout.render('mainLayout', {main: 'currentOrders'});
	}
});

FlowRouter.route('/confirmedOrders', {
	name: 'confirmedOrders',
	action(){
		BlazeLayout.render('mainLayout', {main: 'confirmedOrders'});
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
		UserSession.set('currentorderid',id);
		Order.update({_id: UserSession.get('currentorderid')}, {$addToSet:{custID: Meteor.userId().toString()}});
		FlowRouter.go('home');
	}
});
