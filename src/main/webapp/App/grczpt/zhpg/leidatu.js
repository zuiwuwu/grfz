Ext.define('App.grczpt.zhpg.leidatu', {
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
        var str = new Array(); 
        var sts = new Array();
        var ss = '';
        var sq = [];
        var sc = [];
        Ext.Ajax.request({
    		async: false,
    	    url: this.url,
			method : 'POST',
			success : function(response) {					
			
				 var text =response.responseText;
				 
				 ss = text.split('-');
				 console.log(ss[0])
				 if (ss[0] !== '' && ss[0] !== null) {
					 sts = ss[0].split(',');
					 str=ss[1].split(',');
					 console.log(1);
					 for ( var i = 1; i < str.length; i++) {
							sq.push(
									{
										text : str[i],
										max : 100
									}
							)
						}
				        
				        for ( var i = 1; i < sts.length; i++) {
							sc.push(
									sts[i]
							)
						}
				}else{
					//SQ不能为空 必须有1个{}
					sq.push(
							{
								
							}
					)
				}
				
				 
				 
			}	
		});
       
    	
    	
         var option = { 
        	tooltip : {
        		trigger: 'item',		        
        	},
		 
		    
		    polar : [
		        {
		            indicator :sq,
		            name : {
		                
		                textStyle: {color:'#ffffff'}
		            },
		            radius : 70
		        }
		    ],
		    calculable : true,
		    series : [
		        {
		            name: '各维度分数',
		            type: 'radar',
		            itemStyle: {
		                normal: {
		                    areaStyle: {
		                    	type: 'default'
		                    }
		                }
		            },
		            data : [
		                {
		                    value : sc,
		                    name: '各维度分数',
		                    itemStyle : {
								normal : {
									color : '#00ccff',
									label : {
										show : true,
										formatter : function(params) {
											return params.value;
										}
									},
									areaStyle : {
										color : 'rgba(44,135,229,0.3)'
									}
								}
							}
		                }
		               
		            ]
		        }
		    ]};
        		               
         
         
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