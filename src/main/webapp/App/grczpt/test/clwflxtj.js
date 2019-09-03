Ext.define('App.grczpt.test.clwflxtj', {
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
       
    	
        var dataAxis = ['闯红灯', '逆向行驶', '违反标线', '其他'];
        //shuju
        var data = [220, 182, 191, 234];


        var option = {
        		tooltip: {
        	        trigger: 'axis',

        	        backgroundColor:'rgba(255,255,255,0.8)',
        	        extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
        	        textStyle:{
        	            color:'#666',
        	        },
        	    }, 
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    
                    textStyle: {
                        color: '#707070'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
              show:false,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            },

            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: {color: 'rgba(0,0,0,0.05)'}
                    },
                    barGap:'-100%',
                    barCategoryGap:'40%',
                  
                    animation: false
                },
                {
                    type: 'pictorialBar',
                symbol: 'rect',
              
                symbolRepeat: true,
                symbolSize: [40, 8],
                symbolMargin: 2,
                z: -10,
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            
                            label: {
                                show: true,
                                position: 'top',
                                textStyle:{ color: '#707070'},
                                formatter: '{c}'
                            },
                            
                            
                        },
                       
                    },
                    data: [{
                     value: data[0],
                    itemStyle: {
                        normal: {
                            barBorderRadius: [0, 10, 10, 0],
                            color: {
                                type: 'bar',
                                colorStops: [{
                                    offset: 0,
                                    color: 'red' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#ffa800' // 100% 处的颜色
                                }],
                                globalCoord: false, // 缺省为 false

                            }
                        }
                    }
                }, {
                    value: data[1],
                    itemStyle: {
                        // normal:{color:'#b250ff',barBorderRadius:[0,10,10,0],}
                        normal: {
                            barBorderRadius: [10, 0, 0, 10],
                            color: {
                                type: 'bar',
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(11,42,84,.3)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#b250ff' // 100% 处的颜色
                                }],
                                globalCoord: false, // 缺省为 false

                            }
                        }
                    }
                }, {
                    value: data[2],
                    itemStyle: {
                        // normal:{color:'#4f9aff',barBorderRadius:[0,10,10,0],}
                        normal: {
                            barBorderRadius: [0, 10, 10, 0],
                            color: {
                                type: 'bar',
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(11,42,84,.3)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#4f9aff' // 100% 处的颜色
                                }],
                                globalCoord: false, // 缺省为 false

                            }
                        }
                    }
                }, {
                    value: data[3],
                    itemStyle: {
                        // normal:{color:'#4bf3ff',barBorderRadius:[0,10,10,0],  },
                        normal: {
                            barBorderRadius: [0, 10, 10, 0],
                            color: {
                                type: 'bar',
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(11,42,84,.3)' // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#4bf3ff' // 100% 处的颜色
                                }],
                                globalCoord: false, // 缺省为 false

                            }
                        }

                    }
                } ]
                }
            ]
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