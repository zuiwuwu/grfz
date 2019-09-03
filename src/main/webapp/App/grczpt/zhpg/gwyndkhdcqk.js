Ext.define('App.grczpt.zhpg.gwyndkhdcqk', {
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
			url : '../ZHJS/gwyndkhdcqk',
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
				seriesData[i] = this.data[i].GRADE
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
        		        type: 'value',
        		        nameTextStyle:{
        		        	color:'#9AB1D3'
        		        },
        		        axisLabel:{
        		        	textStyle: {
        		        		color:'#9AB1D3'
        	                   }
        		        	
        		        },
        		        splitLine:{
        		        	show:false
        		        },
        		        axisLine:{
        		            show:false
        		        },

        		        axisTick: {
        		            // color:'#fff',
        		            show: false,
        		        }
        		        
        		    },
        		    yAxis: {
        		        type: 'category',
        		        nameTextStyle:{
        		        	color:'#9AB1D3'
        		        },
        		        axisLabel:{
        		        	textStyle: {
        		        		color:'#9AB1D3'
        	                   }
        		        	
        		        },
        		        axisLine:{
        		            show:false
        		        },

        		        axisTick: {
        		            // color:'#fff',
        		            show: false,
        		        },
        		        data:/*seriesData*/ ['优秀','称职','基本称职','不称职','不定等次']
        		    },
        		    series: [
        		        {
        		            name: '',
        		            type: 'bar',
        		            stack: '总量',
        		            barWidth:15,
        		            itemStyle: {
        		        	                normal: {
        		        	                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        		        		                        offset: 0,
        		        		                        color: '#B562D4'
        		        		                    }, {
        		        		                        offset: 1,
        		        		                        color: '#00AAFB'
        		        		                    }])
        		        	                }
        		        	            },
        		            label: {
        		                normal: {
        		                    show: false,
        		                    position: 'insideRight'
        		                }
        		            },
        		            data: /*xAxisData*/[str[0], str[1], str[2], str[3], str[4]]
        		        }
        		    ]

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