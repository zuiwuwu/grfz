Ext.define('App.grfz.tjfx.pie', {
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

        		    tooltip : {
        		        trigger: 'item',
        		        formatter: "{a} <br/>{b} :{d}%"
        		    },
        		    color:['#8fc31f','#f35833','#00ccff','#ffcc00','#ffcc89'],
        		    legend: {
        		        orient: 'horizontal',
        		        top: 'top',
        		        data: ['0-5年','6-10年','11-15年','16-20年','20年以上']
        		    },
        		    series : [
        		        {
        		            name: '全局警员工龄统计',
        		            type: 'pie',
        		            radius : '55%',
        		            center: ['50%', '50%'],
        		            data:/*[
        		                {value:335, name:'0-5年'},
        		                {value:310, name:'6-10年'},
        		                {value:234, name:'11-15年'},
        		                {value:135, name:'16-20年'},
        		                {value:135, name:'20年以上'}
        		            ]*/this.data,
        		            itemStyle: {
        		                emphasis: {
        		                    shadowBlur: 10,
        		                    shadowOffsetX: 0,
        		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
        		                }
        		            },
        		            itemStyle: {
        		                normal: {
        		                    label:{ 
        	                            show: true, 
        	                            position:'inside',
        	                            formatter: '{d}%' 
        	                        }
        		                },
        	                    labelLine :{show:true}
        		            }
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