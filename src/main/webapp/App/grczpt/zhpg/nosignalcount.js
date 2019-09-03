Ext.define('App.grczpt.zhpg.nosignalcount', {
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

       
    	
    	
         var option = { 
        		 title: {  
                     text: '各单位迟到统计' ,
                     
                     textStyle : {
     					color : '#ffffff'
     				}
                 },  
         tooltip : {
             trigger: 'axis'
         },
         legend: {
             data:['某单位A','某单位B','某单位C','某单位D','某单位E'],
             textStyle : {
					color : '#ffffff'
				}
         },
         grid: {  
             left: '3%',  
             right: '4%',  
             bottom: '3%',  
             containLabel: true  
         },  
         calculable : true,
         xAxis : [
             {
            	 splitLine:{show: false},
                 type : 'category',
                 boundaryGap : true,
                 axisLabel: {
                     show: true,
                     textStyle: {
                         color: '#fff'
                     },
                     /*interval:0,//横轴信息全部显示  
                     rotate:-30,//-30度角倾斜显示 
*/                 },
                 
                 data : ['一月','二月','三月','四月','五月','六月','七月']
             }
         ],
         yAxis : [
             {
            	 splitLine:{show: false},
                 type : 'value',
                 axisLabel: {
                     show: true,
                     textStyle: {
                         color: '#fff'
                     },
                },
             }
         ],
         series : [
             {
                 name:'某单位A',
                 type:'line',
                 stack: '总量',
                 data:[120, 132, 101, 134, 90, 230, 210]
             },
             {
                 name:'某单位B',
                 type:'line',
                 stack: '总量',
                 data:[220, 182, 191, 234, 290, 330, 310]
             },
             {
                 name:'某单位C',
                 type:'line',
                 stack: '总量',
                 data:[150, 232, 201, 154, 190, 330, 410]
             },
             {
                 name:'某单位D',
                 type:'line',
                 stack: '总量',
                 data:[320, 332, 301, 334, 390, 330, 320]
             },
             {
                 name:'某单位E',
                 type:'line',
                 stack: '总量',
                 data:[820, 932, 901, 934, 1290, 1330, 1320]
             }
         ]};

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