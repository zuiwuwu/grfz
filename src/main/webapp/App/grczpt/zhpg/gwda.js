Ext.define('App.grczpt.zhpg.gwda', {
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
        var str = new Array(); 
        var sts = new Array();
        var ss = '';
        var sq = [];
        var sc = [];

        Ext.Ajax.request({
    		async: false,
			url : this.url,
			method : 'POST',
			success : function(response) {					
				
				 var text =response.responseText;
				 
				 ss = text.split('|');
				 
				 if (ss[0] !== '' && ss[0] !== null) {
					 sts = ss[0].split(',');
					 str=ss[1].split(',');
					 
					 for ( var i = 1; i < str.length; i++) {
						 if(str[i] == '无等级'){
							 sq.push('0')
							}	
						 if(str[i] == '一级'){
							 sq.push('4')
							}	
						 if(str[i] == '二级'){
							 sq.push('3')
							}	
						 if(str[i] == '三级'){
							 sq.push('2')
							}
						 if(str[i] == '四级'){
							 sq.push('1')
							}	
							
						}
				        
				        for ( var i = 1; i < sts.length; i++) {
							sc.push(
									sts[i]
							)
						}
				}/*else{
					//SQ不能为空 必须有1个{}
					sq.push(
							{
								
							}
					)
				}*/								 
				 
			}	
		});
       
    	
         var option = {tooltip : {
             trigger: 'axis',
             formatter: function (params) {
//            	 alert(params[0].value)
            	 var res='<div><p>'+params[0].name+'</p></div>' 
            
            	 if(params[0].value == 4){
            		 res+='<p>'+params[0].seriesName+':一级</p>'
            	 }
            	 if(params[0].value == 3){
            		 res+='<p>'+params[0].seriesName+':二级</p>'
            	 }
            	 if(params[0].value == 2){
            		 res+='<p>'+params[0].seriesName+':三级</p>'
            	 }
            	 if(params[0].value == 1){
            		 res+='<p>'+params[0].seriesName+':四级</p>'
            	 }
            	 if(params[0].value == 0){
            		 res+='<p>'+params[0].seriesName+':无等级</p>'
            	 }
            	 return res;
                }
         
         },
         
         legend: {
             data:['等级']
         },
        
         calculable : true,
         grid: {  
             y2: 100  
         },
         xAxis : [
             {
            	 splitLine:{show: false},
                 type : 'category',
                 boundaryGap : false,
                 axisLabel: {
                     show: true,
                     textStyle: {
                         color: '#fff'
                     },
                     /*interval:0,//横轴信息全部显示  
                     rotate:-30,//-30度角倾斜显示 
*/                 },
                 data : sc
             }
         ],
         yAxis : 
             {
        	 splitLine:{show: false},
               axisLabel:{
            	   textStyle: {
                       color: '#fff'
                   },
                         formatter: function (value, index) {
                          var texts = [];
                             if (value === 4) {
                                 texts.push('一级');
                             }
                             if (value === 3) {
                                 texts.push('二级');
                             }
                             if(value==2){
                                 texts.push('三级');
                             }
                             if(value==1){
                                 texts.push('四级');
                             }
                           if(value==0){
                                 texts.push('无等级');
                             }
                             return texts;
                         }
                     }
               

             }
         ,
         series : [
             {
                 name:'等级',
                 type:'line',
                 smooth:true,
                 itemStyle: {normal: {areaStyle: {type: 'default'}}},
                 data:sq
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
         window.onresize = this.myChart.resize;
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