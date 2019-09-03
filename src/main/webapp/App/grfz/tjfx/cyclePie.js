Ext.define('App.grfz.tjfx.cyclePie', {
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
        		        trigger: 'item',
        		        formatter: function(params, ticket, callback) {
        		            var res = params.seriesName;
        		            res += '<br/>' + params.name + ' : ' + params.percent + '%';
        		            return res;
        		        }
        		    },
        		    legend: {
        		        orient: 'horizontal',
        		        left: 'left',
        		        data: ['90后', '80后', '70后', '60后'],
        		        itemWidth: 20,
        		        itemHeight: 10
        		    },
        		    series: [{
        		        name: '年龄段统计',
        		        type: 'pie',
        		        selectedMode: 'single',
        		        radius: ['50%', '80%'],
        		        center:['50%','50%'],
        		        color:['#F7BA4D','#00ABF1','#4BCDD6','#75D7FA'],
        		        label: {
        		            normal: {
        		                position: 'inner',
        		                formatter: '{d}%',
        		                textStyle: {
        		                    color: '#fff',
        		                    fontSize: 14
        		                }
        		            }
        		        },
        		        labelLine: {
        		            normal: {
        		                show: false
        		            }
        		        },
        		        data: this.data/*[{
        		            value: 11,
        		            name: '90后'
        		        }, {
        		            value: 22,
        		            name: '80后'
        		        }, {
        		            value: 33,
        		            name: '70后'
        		        }, {
        		            value: 22,
        		            name: '60后'
        		        }, {
        		            value: 22,
        		            name: '50后'
        		        }]*/
        		    }]

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