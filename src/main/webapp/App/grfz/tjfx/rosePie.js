Ext.define('App.grfz.tjfx.rosePie', {
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
        		        trigger: "item",
        		        formatter: "{a} <br/>{b} : {c} ({d}%)"
        		    },
        		    legend: {
        		        x: "left",
        		        data: ["已销假", "已续假", "未销假","矿工","逾期不归","其他"]
        		    },
        		   
        		    series: [{
        		    	center: ['50%', '50%'],
        		    	
        		    	color: ['#FB497C', '#FFC760', '#6FE621', '#4FCDFF','#3263E4','#3263E4'],
        		        name: "休假完成情况",
        		        type: "pie",
        		        roseType: "area",
        		        label: {
        		        normal: {
        		            formatter: "{d}%",
        		            position: 'inside'
        		        }
        		    },
        		      labelLine: {
        		        normal: {
        		            show:false
        		        }
        		    },
        		        data: [{
        		            value: 305,
        		            name: "已销假"
        		        }, {
        		            value: 234,
        		            name: "已续假"
        		        }, {
        		            value: 145,
        		            name: "未销假"
        		        }, {
        		            value: 145,
        		            name: "矿工"
        		        }, {
        		            value: 145,
        		            name: "逾期不归"
        		        }, {
        		            value: 145,
        		            name: "其他"
        		        }]
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