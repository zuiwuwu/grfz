Ext.define('App.grczpt.test.bklx', {
    extend: 'Ext.Component',
    autoStoreLoad: true,
    remoteFilter: false,
    fusionurl:'',
    initComponent: function () {
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
    afterRender: function () {
        var vme = this;
        this.callParent(arguments);
        this.init();
    },
    init: function () {
    	
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
       
    	var data = ['120', '140', '108', '141'];
    	
         var option = {
        		 tooltip: {
        		        trigger: 'axis',

        		        backgroundColor:'rgba(255,255,255,0.8)',
        		        extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
        		        textStyle:{
        		            color:'#666',
        		        },
        		    }, 
        		   
        		   	xAxis: [
        				{
        				type: 'category',
        				data: ['拦截车辆','检查盘问','观察跟踪','报告'],
        				boundaryGap: false,//坐标轴两边留白
        		        splitLine: {
        		            show: false,
        		            lineStyle: {
        		                color: ['#D4DFF5']
        		            }
        		        },
        		        axisTick: {
        		            show: false
        		        },
        		        axisLine: {show: false,},
        		        z : 100
        		    },
        			],
        		    yAxis: [
        				{   
        					type: 'value',
        					axisLabel: {
        						textStyle: {
        							color: '#666',
        						    fontStyle: 'normal',
        						}
        					},
        					axisLine:{
        						show: false
        					},
        					axisTick:{
        						show: false
        					},
        					splitLine: {
        						show: false,
        					}
        				}
        			],
        		    series: [{
        		      
        		        type: 'line',
        		        smooth: true,
        		        showSymbol: true,
        		        //symbol: 'circle',
        		        symbolSize: 10,
        		        data: data,
        		        areaStyle: {
        		            normal: {
        		                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        		                    offset: 0,
        		                    color: '#69E1DD '
        		                }, {
        		                    offset: 1,
        		                    color: 'rgba(34, 154, 255,0.1)'
        		                }], false)
        		            }
        		        },
        		        itemStyle: {
        		            normal: {
        		                color: '#25B6EE'
        		            }
        		        },
        		        lineStyle: {
        		            normal: {
        		                width: 6
        		            }
        		        }
        		    }]
        		};

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