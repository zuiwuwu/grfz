Ext.define('App.grczpt.zhpg.callpolicecount', {
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
        Ext.apply(this.listeners, {
            resize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
                vme.myChart.resize({width:width, height:height});
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

		var str = new Array(); 
	  	
        var vme = this;
        if (this.myChart) {
            this.myChart.dispose();
        }
        this.myChart = null;
        this.myChart = echarts.init(this.el.dom,'test',{				 	
				 width:  this.getWidth(),
        		height:  this.getHeight()
        	
        	});
		// var myChartss = echarts.init(document.getElementById('homes'));
		// var a = Ext.getCmp('home').getValue()

		var str = new Array();
		var sts = new Array();


		// debugger
		var option = {
			title : {
				text : '报警统计次数',
					textStyle : {
						color : '#9AB1D3'
					}	
			},
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
		
			},
			legend : {y : 5,
				data : [ 'GPS_1报警次数', 'GPS_2报警次数', 'GPS_3报警次数', 'GPS_4报警次数'
						 ],
				textStyle : {
					color : '#9AB1D3'
				}
			},
			toolbox : {
				show : true,
				orient : 'vertical',
				x : 'right',
				y : 'center',

			},
			 grid: {
  		        left: '3%',
  		        right: '4%',
  		        bottom: '3%',
  		        containLabel: true
  		    },
		
			xAxis : [ {
				type : 'category',
				axisLabel : {
					textStyle : {
						color : '#9AB1D3'
					}

				},
				data : [ '某单位A', '某单位B', '某单位C', '某单位D', '某单位E' ]
			} ],
			yAxis : [ {
				nameTextStyle:{
		        	color:'#9AB1D3'
		        },
				type : 'value',
				name : '次数',
				splitLine : {
					show : false
				},
				axisLabel : {
					textStyle : {
						color : '#9AB1D3'
					}

				},
			} ],
			series : [ {
				name : 'GPS_1报警次数',
				type : 'bar',
				
				itemStyle:{
  		           normal:{
  		               color:'#66C2F5'
  		           }
  		       },
				data : [ 2, 2, 0, 2, 2 ]
			}, {
				name : 'GPS_2报警次数',
				type : 'bar',
				
				itemStyle:{
	  		           normal:{
	  		               color:'#94ECB5'
	  		           }
	  		       },
				data : [ 3, 0, 3, 0, 0]
			}, {
				name : 'GPS_3报警次数',
				type : 'bar',
				
				itemStyle:{
	  		           normal:{
	  		               color:'#E798B2'
	  		           }
	  		       },
				data : [ 5, 5, 5, 5, 5 ],

			}, {
				name : 'GPS_4报警次数',
				type : 'bar',
				
				itemStyle:{
	  		           normal:{
	  		               color:'#c87de6 '
	  		           }
	  		       },
				data : [ 7, 7, 7, 7, 9 ]
			},
			{
                name:'GPS总报警次数',
                type:'line',
                itemStyle : {  /*设置折线颜色*/
                    normal : {
                       /* color:'#c4cddc'*/
                    }
                },
                data:[15, 14, 15, 14, 16]
            }

			]
		};

		/*
		 * if (option) this.myChart.setOption(option); window.onresize =
		 * this.myChart.resize;
		 */
		// window.onresize = this.myChart.resize;
		 if (option)
	 			this.myChart.setOption(option);
	    },
	    onDestroy: function () {
	        this.callParent(arguments);
	    },
	    setOption:function(option)
	    {
	    	if(this.myChart)
	    		this.myChart.setOption(option);
	    }
	
});