Ext.define('App.grczpt.test.linecount', {
	extend : 'Ext.Component',
	autoStoreLoad : true,
	remoteFilter : false,
	fusionurl : '',
	initComponent : function() {
        var vme = this;
        var ss = '';
        if (this.ss == 'A') {
			ss = this.ss
			this.loads(ss,option1)
		}else if (this.ss == 'B') {
			ss = this.ss
			this.loads(ss,option1)
		}
        this.addEvents('itemclick');
        if (!this.listeners) {
            this.listeners = {};
        }
        Ext.apply(this.listeners, {
            resize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
                myChart2.resize({width:width, height:height});
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
        if (this.myChart2) {
            this.myChart2.dispose();
        }
        myChart2 = null;
        myChart2 = echarts.init(this.el.dom,'test',{				 	
				 width:  this.getWidth(),
        		height:  this.getHeight()
        	
        	});


		var str = new Array();
		var sts = new Array();
		var ss = 'A';
		option1 = {
			title : {
				text : '折线图分析',
					textStyle : {
						color : '#fff'
					}	
			},
			tooltip : {
		        trigger: 'axis'
		    },

		    calculable : true,
		    legend: {
		        data:['案发量','警力分布'],
				textStyle : {
					color : '#fff'
				}
		    },
		    xAxis : [
		        {
		        	type : 'category',
					axisLabel : {
						textStyle : {
							color : '#fff'
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
							color : '#fff'
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
		this.loads(ss,option1);
		/*
		 * if (option) this.myChart.setOption(option); window.onresize =
		 * this.myChart.resize;
		 */
		// window.onresize = this.myChart.resize;
		if (option1) 
			myChart2.setOption(option1);
	
		 window.onresize = myChart2.resize;
		
	    },
	    onDestroy: function () {
	        this.callParent(arguments);
	    },
	    setOption:function(option1)
	    {
	    	if(myChart2)
	    		myChart2.setOption(option1);
	    },
	    loads : function(ss,option1) {
	    	if(ss == 'A'){
	    		option1.series[0].data=[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3];
	    		option1.series[1].data=[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3];
	    		if (option1)
					this.setOption(option1);
				 window.onresize = myChart2.resize;
	    	}else if(ss == 'B'){
	    		option1.series[0].data=[3.0, 4.9, 6.0, 13.2, 25.6, 76.7, 35.6, 122.2, 32.6, 2.0, 66.4, 3.3];
	    		option1.series[1].data=[4.6, 5.9, 5.0, 16.4, 28.7, 70.7, 75.6, 142.2, 48.7, 1.8, 62.0, 2.3];
	    		if (option1)
					this.setOption(option1);
				 window.onresize = myChart2.resize;
	    	}
	
	    }
});