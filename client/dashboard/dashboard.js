Template.dashboard.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('order');
		self.subscribe('orderItem');
	});
});

Template.dashboard.helpers({
	createChart: function() {
		var Highcharts = require('highcharts/highstock');
		var cat1 = OrderItems.find({category:1}).fetch();
		var cat2 = OrderItems.find({category:2}).fetch();
		var sum1 = 0;
		for (i=0; i<cat1.length ; i++){
			sum1 += cat1[i].quantity;
		}
		var sum2 = 0;
		for (i=0; i<cat2.length ; i++){
			sum2 += cat2[i].quantity;
		}
		//var allOrders = Order.find().count();
		var ordersData = [{
				y: sum1,
				name: "Dim Sum"
			},{
				y: sum2,
				name: "Congee"
			}];

		Meteor.defer(function(){
			Highcharts.chart('chart',{
				title:{
					text: "Breakdown of Orders by Food Category"
				},
				series: [{
					type: 'pie',
					data: ordersData,
				}]
			});
		});
	}
});