Ext.define('App.grczpt.zhpg.qjjyxjwcqktj', {
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
			url : '../ZHJS/qjjyxjwcqktj',
			method : 'POST',
			success : function(response) {					
			    
				 var text =response.responseText;
				 str=text.split(',');			 
			}	
		});
    	
    	var newstr = new Array();
   	
    	for ( var i = 0; i < str.length; i++) {
			if (str[i] == "0") {
				newstr[i] = str[i].replace("0","'-'")
			}else{
				newstr[i] = str[i]
			}
		}
    	
    	
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
        		        formatter: "{b} : {c} ({d}%)"
        		    },
        		    legend: {
        		    	show:false,
        		        x: "left",
        		        data: ["政工纪检室", "综合保障室", "情报指挥室","执法监督室","维稳服从队","案件侦办队","治安防控队","明珠派出所","寺港派出所","滨江派出所","周山河派出所","野徐派出所","医药城派出所"],
         		        textStyle:{
         		        	color:'#9AB1D3'
         		        }
        		    },
        		   
        		    series: [{
        		    	  radius : '60%',
        		            center: ['50%', '55%'],
        		    	color: ['#FB497C', '#FFC760', '#6FE621', '#4FCDFF','#f35833','#3263E4','#9AB1D3','#66C2F5','#8AE8C3','#85A1DA','#E2A0B7','#FFFF00','#F4CC63'],
        		        name: "荣誉榜",
        		        type: "pie",
        		       
        		        data: [{
        		            value: newstr[0],
        		            name: "政工纪检室"
        		        }, {
        		            value: newstr[1],
        		            name: "综合保障室"
        		        }, {
        		            value: newstr[2],
        		            name: "情报指挥室"
        		        }, {
        		            value: newstr[3],
        		            name: "执法监督室"
        		        }, {
        		            value: newstr[4],
        		            name: "维稳服从队"
        		        }, {
        		            value: newstr[5],
        		            name: "案件侦办队"
        		        }, {
        		            value: newstr[6],
        		            name: "治安防控队"
        		        }, {
        		            value: newstr[7],
        		            name: "明珠派出所"
        		        }, {
        		            value: newstr[8],
        		            name: "寺港派出所"
        		        }, {
        		            value: newstr[9],
        		            name: "滨江派出所"
        		        }, {
        		            value: newstr[10],
        		            name: "周山河派出所"
        		        }, {
        		            value: newstr[11],
        		            name: "野徐派出所"
        		        }, {
        		            value: newstr[12],
        		            name: "医药城派出所"
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