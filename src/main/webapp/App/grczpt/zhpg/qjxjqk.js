Ext.define('App.grczpt.zhpg.qjxjqk', {
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
		var labelTop = {
			    normal : {
			    	
			        label : {
			          
			            show : true,
			            position : 'center',
			            formatter : '辆',
			            textStyle: {
			                baseline : 'bottom'
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
			var radius = [50, 56];
		  var option3 = {
				  title : {
				        text: '今日共采集车辆信息数量',
				        textStyle: {
                          
                       
                            color: '#0D263F'
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
						    	color:'#E74B3B',
						        label : {
						            formatter : function (params){
						                return params.value 
						            },
						            textStyle: {
						                baseline : 'top',
						                color:'#E74B3B',
						                fontSize : 15
						            }
						        }
						    },
						},
			            data : [
			                {name:'other', value:46, itemStyle : labelBottom},
			                {name:'迟到', value:54,itemStyle : labelTop}
			            ]
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