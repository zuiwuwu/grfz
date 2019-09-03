Ext.define('App.grczpt.test.bjzs', {
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
          /* var xAxisData =[];
			var seriesData = [];
			for (i = 0;i < this.data.length;i++){
				xAxisData[i] = this.data[i].COUNT
			}
			for (i = 0;i < this.data.length;i++){
				seriesData[i] = this.data[i].GRADE
			}*/

       var data = 800;
    	
    	
        var option = {
        		title : {
    				text : '报警总数',
    				x:300,
    				y:'center',
    					textStyle : {
    						color : '#0D263F ',
    						fontWeight:100,
    						fontSize:16,
    						fontFamily:'微软雅黑'
    					}	
    			},
        	    series: [{ type: 'liquidFill',
        	    	radius: '80%',
        	    	 center : ['40%', '50%'], 
        	        data: [{
        	            value: 0.5,
        	            direction: 'left',
        	            itemStyle: {
        	                color: '#03D4F0'
        	            }
        	        }],
        	        outline: {
        	            show: false
        	        },
        	        backgroundStyle: {
        	            borderColor: '#03D4F0 ',
        	            borderWidth: 1,
        	            
        	        },
        	        label: {
        	        	 position: ['50%', '40%'],
        	        	 color:'#636DE4',
        	        	 fontSize : 20,
        	          normal: {
        	        	  formatter: function() {
        	                  return data;
        	              }
        	             
        	          }
        	        }}]
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