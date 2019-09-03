Ext.define('App.grczpt.zhpg.zfzhnldjtj', {
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
        var vme = this;
        if (this.myChart) {
            this.myChart.dispose();
        }
        this.myChart = null;
        this.myChart = echarts.init(this.el.dom,'test',{				 	
				 width:  this.getWidth(),
        		height:  this.getHeight()
        	
        	});

         var	option = {

     		    tooltip: {
     		        trigger: 'axis',
     		        axisPointer: { // 坐标轴指示器，坐标轴触发有效
     		            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
     		        }
     		    },
     		    legend: {
     		        data: ['优', '良','一般','较弱'],
     		        textStyle:{
     		        	color:'#9AB1D3'
     		        },
     		        
     		    },
     		    grid: {
     		        left: '3%',
     		        right: '4%',
     		        bottom: '3%',
     		        containLabel: true
     		    },
     		    xAxis: [{
     		        type: 'category',
    		        axisLabel:{
    		        	textStyle: {
    		        		color:'#9AB1D3'
    	                   }
    		        	
    		        },
     		        data: ['明珠派出所', '周山河派出所', '寺巷派出所', '野徐派出所', '滨江派出所','医药城派出所','案件侦办队','治安防控队','维稳服务队','情报指挥室']
     		    }],
     		    yAxis: [{
     		        name: '人数',
     		        type: 'value',
    		        splitLine:{
    		        	show:false
    		        },
    		        axisLabel:{
    		        	textStyle: {
    		        		color:'#9AB1D3'
    	                   }
    		        	
    		        }
     		    }],
     		    series: [{
     		        name: '优',
     		        type: 'bar',
     		       stack:'广告',
     		       barWidth:24,
     		       itemStyle:{
     		           normal:{
     		               color:'#66C2F5'
     		           }
     		       },
     		        data: [120, 132, 101, 134, 90,34,54,342,234,32],
     		        label: {
     		            normal: {
     		                show: false
     		            }
     		        },
     		    }, {
     		        name: '良',
     		        type: 'bar',
     		        stack:'广告',
     		        barWidth:24,
     		       itemStyle:{
     		           normal:{
     		               color:'#8AE8C3'
     		           }
     		       },
     		        data: [220, 182, 191, 234, 290, 101, 134, 90,34,54],
     		        label: {
     		            normal: {
     		                show: false
     		            }
     		        },
     		    },{
     		        name: '一般',
     		        type: 'bar',
     		        stack:'广告',
     		        barWidth:24,
     		       itemStyle:{
     		           normal:{
     		               color:'#85A1DA'
     		           }
     		       },
     		        data: [220, 182, 191, 234, 290, 101, 134, 90,34,54],
     		        label: {
     		            normal: {
     		                show: false
     		            }
     		        },
     		    },{
     		        name: '较弱',
     		        type: 'bar',
     		        stack:'广告',
     		        barWidth:24,
     		       itemStyle:{
     		           normal:{
     		               color:'#E2A0B7'
     		           }
     		       },
     		        data: [220, 182, 191, 234, 290, 101, 134, 90,34,54],
     		        label: {
     		            normal: {
     		                show: false
     		            }
     		        },
     		    }/*,{
     		        name: '警员晋警司培训',
     		        type: 'bar',
     		        stack:'广告',
     		        barWidth:24,
     		       itemStyle:{
     		           normal:{
     		               color:'#F4CC63'
     		           }
     		       },
     		        data: [220, 182, 191, 234, 290, 101, 134, 90,34,54],
     		        label: {
     		            normal: {
     		                show: false
     		            }
     		        },
     		    }*/  ]

         };
         
         
         /* Ext.Ajax.request({
  			url : this.url,
  			method : 'get', 
  			scope: this,
  			callback : function(options, success, response) {
  				if (success) {
  					if (response.responseText&& response.responseText != '') {
  						var result = Ext.JSON.decode(response.responseText);
  						var xAxisData =[];
  						var seriesData = [];
  						for (i = 0;i < result.length;i++){
  							xAxisData[i] = result[i].gxdwmc
  						}
  						for (i = 0;i < result.length;i++){
  							seriesData[i] = result[i].tcount
  						}
  						option.xAxis[0].data = xAxisData;
  						option.series[0].data = seriesData;
  						if (option)
  							this.myChart.setOption(option);
  						
  					}
  				} else {
  					if (option)
							this.myChart.setOption(option);
  				}
  			}
  		});*/
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