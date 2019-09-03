Ext.define('App.grczpt.zhpg.linecount', {
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
				text : '折线图分析',
					textStyle : {
						color : '#9AB1D3'
					}	
			},
			tooltip : {
		        trigger: 'axis'
		    },

		    calculable : true,
		    legend: {
		        data:['案发量','警力分布'],
				textStyle : {
					color : '#9AB1D3'
				}
		    },
		    xAxis : [
		        {
		        	type : 'category',
					axisLabel : {
						textStyle : {
							color : '#9AB1D3'
						}

					},
		            data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
		        }
		    ],
		    yAxis : [
		        {
		       
		            type : 'value',
		            name : '次数',
		            splitLine : {
						show : false
					},
		            axisLabel : {
		                formatter: '{value} 个',
		                textStyle : {
							color : '#9AB1D3'
						}
		            }
		        }
		    ],
		    series : [

		        {
		            name:'案发量',
		            type:'line',
		            data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
		        },
		        {
		            name:'警力分布',
		            type:'line',
		            data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
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