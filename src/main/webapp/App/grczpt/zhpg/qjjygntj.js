Ext.define('App.grczpt.zhpg.qjjygntj', {
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
			url : '../ZHJS/qjjygntj',
			method : 'POST',
			success : function(response) {					
			    
				 var text =response.responseText;
				 str=text.split(',');			 
			}	
		});
   		var newstr = new Array();
   		var sq = [];
    	for ( var i = 0; i < str.length; i++) {
			if (str[i] == "0") {
				newstr[i] = str[i].replace("0","'-'")
			}else{
				newstr[i] = str[i]
			}
		}
    	var sc = ['0-5年','6-10年','11-15年','16-20年','20年以上'];
    	for(var i = 0; i < newstr.length; i++){
    		if(newstr[i] !== "'-'"){
    			sq.push(
    					{
    						value : newstr[i],
    						name : sc[i]
    					}
    			)
    		}
    		
    	}
    	console.log(sq)
    	
        var vme = this; 
        if (this.myChart) {
            this.myChart.dispose();
        }
        console.log(this.getWidth())
        this.myChart = null;
        this.myChart = echarts.init(this.el.dom,'test',{				 	
				 width:  this.getWidth(),
        		height:  this.getHeight()
        	
        	});
        
         var	option = {

        		    tooltip : {
        		        trigger: 'item',
        		        formatter: "{a} <br/>{b} : {c} ({d}%)"
        		    },
        		    color:['#8fc31f','#f35833','#00ccff','#ffcc00','#ffcc89'],
        		    legend: {
        		    	show:true,
        		        orient: 'horizontal',
        		        top: 'top',
        		        data: ['0-5年','6-10年','11-15年','16-20年','20年以上'],
         		        textStyle:{
         		        	color:'#9AB1D3'
         		        }
        		    },
        		    series : [/*
        		        {
        		            name: '全局警员工龄统计',
        		            type: 'pie',
        		            radius : ['5%','50%'],
        		            center: ['50%', '50%'],
        		            roseType : 'area',
        		            x: '50%',               // for funnel
        		            max: 40,                // for funnel
        		            sort : 'ascending',
        		            data:[
        		                {value:newstr[0], name:'0-5年'},
        		                {value:newstr[1], name:'6-10年'},
        		                {value:newstr[2], name:'11-15年'},
        		                {value:newstr[3], name:'16-20年'},
        		                {value:newstr[4], name:'20年以上'}
        		            ]this.data,
        		            
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
        		    */
        		              {
        		                  name:'全局警员工龄统计',
        		                  type:'pie',
        		                  radius : [10, 90],
        		                  center : ['50%', '58%'],
        		                  roseType : 'area',
        		                  x: '50%',               // for funnel
        		                  max: 40,                // for funnel
        		                  sort : 'ascending',     // for funnel
        		                  data:sq,
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