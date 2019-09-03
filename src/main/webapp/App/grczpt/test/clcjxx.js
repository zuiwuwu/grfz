Ext.define('App.grczpt.test.clcjxx', {
    extend: 'Ext.Component',
    autoStoreLoad: true,
    remoteFilter: false,
    fusionurl:'',
    initComponent: function () {
    	
    	var ss = '';
		console.log(this.endtime)
		if ('undefined'!==typeof(this.endtime) && 'undefined'!==typeof(this.starttime)) {
			
			this.loads(this.endtime ,this.starttime );
			
		} 
    	
        var vme = this;
        this.addEvents('itemclick');
        if (!this.listeners) {
            this.listeners = {};
        }
        Ext.apply(this.listeners, {
            resize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
                myChart11.resize({width:width, height:height});
            }
        });
        this.callParent(arguments);
    },
    afterRender: function () {
        var vme = this;
        this.callParent(arguments);
        this.init();
    },
    init: function () {
    	
    	var str = new Array(); 
    	  	
        var vme = this;
        if (this.myChart11) {
            this.myChart11.dispose();
        }
        myChart11 = null;
        myChart11 = echarts.init(this.el.dom,'test',{				 	
				 width:  this.getWidth(),
        		height:  this.getHeight()
        	
        	});
       
        var data = [10, 100, 50];

        option11 = {
        		tooltip: {
        	        trigger: 'axis',

        	        backgroundColor:'rgba(255,255,255,0.8)',
        	        extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
        	        textStyle:{
        	            color:'#666',
        	        },
        	    }, 
        	    xAxis: {
        	    	 axisLine: {
                         show: false
                     },
                     axisTick: {
                         show: false
                     },
        	        type: 'category',
        	         data : ['卡口', '卡警', '微卡口'],
        	    },
        	    yAxis: {
        	        type: 'value',
        	        axisTick: {
                        show: false
                    },
        	        axisLine: {
                        show: false
                    }
        	    },
        	    series: [{
        	        data: data,
        	        type: 'bar',
        	        //配置样式
        	        itemStyle: {   
        	            //通常情况下：
        	            normal:{  
        	                color: function (params){
        	                    var colorList = ['#E74B3B','#8CE3CE ','#FFDF8C '];
        	                    return colorList[params.dataIndex];
        	                }
        	            },
        	            //鼠标悬停时：
        	            emphasis: {
        	                    shadowBlur: 10,
        	                    shadowOffsetX: 0,
        	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
        	            }
        	        },
        	        //设置柱子的宽度
        	        barWidth : 112,
        	    }]
        	};




         if (option11)
 			myChart11.setOption(option11);
    },
    onDestroy: function () {
        this.callParent(arguments);
    },
    setOption:function(option11)
    {
    	if(myChart11)
    		myChart11.setOption(option11);
    },
    loads : function(endtime,starttime ) {
  	
		Ext.Ajax.request({
			//url : '../qwjdtj/getGWYCTJ?starttime='+starttime+'&endtime='+endtime,
			method : 'get',
			scope : this,
			callback : function(options, success, response) {
				if (success) {
					debugger
					if (response.responseText && response.responseText != '') {
						var result = Ext.JSON.decode(response.responseText);
						var seriesData = [];
						for (i = 0; i < result.length; i++) {
							seriesData[i] = result[i]
						}
						//示列最后数据类型如下
						//seriesData = [60,100,30];
						option11.series[0].data = seriesData;
						console.log(seriesData)
							if (option11)
								this.setOption(option11);
							window.onresize = myChart11.resize;
						}

					} else {
						if (option11)
							myChart1.setOption(option11);
					}

				}
			
		});
	
    }
});