Ext.define('App.grczpt.zhpg.qjjyjrfstj', {
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
    	
    	Ext.Ajax.request({
    		async: false,
			url : '../ZHJS/qjjyjrfstj',
			method : 'POST',
			success : function(response) {					
			    
				 var text =response.responseText;
				 str=text.split(',');			 
			}	
		});
    	
    	
    	
        var vme = this;
        if (this.myChart) {
            this.myChart.dispose();
        }
        this.myChart = null;
        this.myChart = echarts.init(this.el.dom,'test',{				 	
				 width:  this.getWidth(),
        		height:  this.getHeight()
        	
        	});
       /* var xAxisData =[];
		var seriesData = [];
		for (i = 0;i < this.data.length;i++){
			xAxisData[i] = this.data[i].COUNT
		}
		for (i = 0;i < this.data.length;i++){
			seriesData[i] = this.data[i].JRFS
		}*/
         var	option = {
        		    tooltip : {
        		        show: true,
        		        formatter: "{b} : {c}人"
        		    },
        		    grid: {
        		        left: '3%',
        		        right: '4%',
        		        bottom: '3%',
        		        containLabel: true
        		    },
        		    xAxis:  {
        		        
        		    	nameTextStyle:{
        		        	color:'#9AB1D3'
        		        },
        		        axisLabel:{
        		        	textStyle: {
        		        		color:'#9AB1D3'
        	                   }
        		        	
        		        },
        		        type: 'category',
        		        axisLine:{
        		            show:false
        		        },

        		        axisTick: {
        		            // color:'#fff',
        		            show: false,
        		        },
        		        data: /*seriesData*/['考试','分配','招聘','其他']
        		    
        		      
        		        
        		    },
        		    yAxis: {
        		         name: '人数(人)',
        		          type: 'value',
        		        axisLine:{
        		            show:false
        		        },
        		        nameTextStyle:{
        		        	color:'#9AB1D3'
        		        },
        		        axisLabel:{
        		        	textStyle: {
        		        		color:'#9AB1D3'
        	                   }
        		        	
        		        },
        		        axisTick: {
        		            // color:'#fff',
        		            show: false,
        		        },
        		        splitLine:{
        		        	show:false
        		        }
        		    },
        		    series: [
        		        {
        		            
        		            type: 'bar',
        		            stack: '总量',
        		            barWidth:43,
        		            itemStyle: {
        		        	                normal: {
        		        	                    color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
        		        		                        offset: 0,
        		        		                        color: '#007FCE'
        		        		                    }, {
        		        		                        offset: 1,
        		        		                        color: '#00FECE'
        		        		                    }])
        		        	                }
        		        	            },
        		            label: {
        		                normal: {
        		                    show: false,
        		                    position: 'insideRight'
        		                }
        		            },
        		            data: /*xAxisData*/[str[0], str[1], str[2], str[3]]
        		        }
        		    ]
};
         
         
          /*Ext.Ajax.request({
  			url:'../TJFX/vfunsionChart',
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