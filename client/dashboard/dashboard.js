Template.dashboard.onCreated(function(){
	var self = this;
	self.autorun(function(){
		self.subscribe('order');
		self.subscribe('orderItem');
		self.subscribe('dimSums');
		self.subscribe('Congee');
	});
});

Template.dashboard.helpers({
	createChart: function() {
		var Highcharts = require('highcharts');
		require('highcharts/modules/drilldown')(Highcharts);
		var cat1 = OrderItems.find({category:1, added:true}).fetch();
		var cat2 = OrderItems.find({category:2, added:true}).fetch();

		//dim sums
		var siewmai = 0;
		var harkow = 0;
		var porkribs = 0;
		var others = 0;

		//congee
		var chickenCongee = 0;

		var sum1 = 0;

		for (i=0; i<cat1.length ; i++){
			var food= DimSums.find({ _id: cat1[i].foodID}).fetch()[0];
			if (food.name == "siew mai"){
				siewmai += cat1[i].quantity;
			} else if (food.name == "har kow"){
				harkow += cat1[i].quantity;
			} else if (food.name == "Pork Ribs"){
				porkribs +=cat1[i].quantity;
			} else {
				others+=cat1[i].quantity;
			}

			sum1 += cat1[i].quantity;
		}

		var sum2 = 0;

		for (i=0; i<cat2.length ; i++){
			var food= Congee.find({ _id: cat2[i].foodID}).fetch()[0];
			if (food.name == "Shredded chicken porridge"){
				chickenCongee += cat2[i].quantity;
			}

			sum2 += cat2[i].quantity;
		}
		//var allOrders = Order.find().count();
		var ordersData = [{
				y: sum1*100/(sum1+sum2),
				name: "Dim Sum",
				drilldown: "dimsums"
			},{
				y: sum2*100/(sum1+sum2),
				name: "Congee",
				drilldown: "congees"
			}];

		var dimsums = [{
				name: "Siew Mai",
				y: siewmai*100/sum1
			},{
				name: "Pork Ribs",
				y: porkribs*100/sum1
			}, {
				name: "Har Kow",
				y: harkow*100/sum1
			}, {
				name: "Others",
				y: others*100/sum1	

			}];

		var congees = [{
				name:"Chicken Congee",
				y:chickenCongee
		}];

		Meteor.defer(function(){
			Highcharts.chart('chart',{
				title:{
					text: "Breakdown of Orders by Food Category"
				},
		        plotOptions: {
		            series: {
		                dataLabels: {
		                    enabled: true,
		                    format: '{point.name}: {point.y:.1f}%'
		                }
		            }
		        },
				series: [{
					type: 'pie',
					data: ordersData,
				}],
				drilldown:{
					series: [{
						name:"DimSums",
						id:"dimsums",
						type:'pie',
						data: dimsums
					}, {
						id:"congees",
						name:"Congees",
						type:'pie',
						data: congees
					}]
				}
			});
		});
	}
});