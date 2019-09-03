Ext.define('App.grczpt.test.q5', {
	extend : 'Ext.Component',
	autoStoreLoad : true,
	remoteFilter : false,
	fusionurl : '',
	initComponent : function() {
	

		var vme = this;
		this.addEvents('itemclick');
		if (!this.listeners) {
			this.listeners = {};
		}
		Ext.apply(this.listeners,
				{
					resize : function(panel, width, height, oldWidth,
							oldHeight, eOpts) {
						myChart1.resize({
							width : width,
							height : height
						});

					}
				});
		this.callParent(arguments);
	},
	afterRender : function() {
		var vme = this;
		this.callParent(arguments);
		this.init();
	},
	init : function() {

		var vme = this;
		if (this.myChart1) {
			this.myChart1.dispose();
		}
		myChart1 = null;
		myChart1 = echarts.init(this.el.dom, 'test', {
			width : this.getWidth(),
			height : this.getHeight(),

		});
		// var myChart1ss = echarts.init(document.getElementById('homes'));
		// var a = Ext.getCmp('home').getValue()


		// debugger
		//圆圈内数据
		var shuju = [54,46];
		//下方字的数据
		var shuju1 = [33,55];
		
		var labelTop = {
			    normal : {
			    	
			        label : {
			          
			            show : true,
			            position : 'center',
			            formatter : '辆',
			            textStyle: {
			                baseline : 'bottom',
			                fontSize : 14
			            }
			        },
			        labelLine : {
			            show : false
			        }
			    }
			};
			/*var labelFromatter = {
			    normal : {
			        label : {
			            formatter : function (params){
			                return 100 - params.value + '%'
			            },
			            textStyle: {
			                baseline : 'top'
			            }
			        }
			    },
			}*/
			var labelBottom = {
			    normal : {
			        color: '#ccc',
			        label : {
			            show : true,
			            position : 'center'
			        },
			        labelLine : {
			            show : false
			        }
			    }
			};
			var data = [
		                {name:'other', value:shuju[0], itemStyle : labelBottom},
		                {name:'数量', value:shuju[1],itemStyle : labelTop}
		            ];
			
			var radius = [50, 56];
		  var option3 = {
				 
				  title : {
				        text: '今日共采集违法车辆信息数量',
				        subtext : '核定数量：'+shuju1[0]+'               '+'有效数量：'+shuju1[1],
				        itemGap : 181,
				        textStyle: {             
                            color: '#0D263F',
                            fontSize:18,
                        },
                        subtextStyle:{
                        	color: '#0D263F',
                        	fontSize:14
                        },
				        x: 'center'
				    },
			   

			    

			    series : [
			        {
			            type : 'pie',
			            center : ['50%', '35%'],
			            radius : radius,
			            x: '0%', // for funnel
			            itemStyle : {
						    normal : {
						    	color:'#4EBECD',
						        label : {
						            formatter : function (params){
						                return params.value 
						            },
						            textStyle: {
						                baseline : 'top',
						                color:'#4EBECD',
						                fontSize : 18
						            }
						        }
						    },
						},
						 data : data
			        }
			    ]
			};

		if (option3) 
			myChart1.setOption(option3);
	
		 window.onresize = myChart1.resize;
	},
	onDestroy : function() {
		this.callParent(arguments);
	},
	setOption : function(option3) {
		if (myChart1)
			myChart1.setOption(option3);
	}
});