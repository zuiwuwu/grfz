Ext.define('App.grfz.tjfx.index', {
    extend: 'Ext.panel.Panel',
    layout:'absolute',
    border:false,
    autoScroll: true,
    mapdata:[],
    funsiondata:[],
    piedata:[],
    cyclePiedata:[],
    barChartdata:[],
    rosePiedata:[],
    vfunsiondata:[],
    initComponent: function () {
        var me = this;
        console.log(this.result)
        this.DEPT=Ext.create('App.Common.ComboBoxDropList', {
			x:0,
			y:0,
			scope:this,
        	allowBlank : false,
			width:284,
			height:46,
			value : '全局',
			data : [{
						ID : '全局',
						NAME : "全局"
					}, {
						ID : '明珠派出所',
						NAME : "明珠派出所"
					}, {
						ID : '周山河派出所',
						NAME : "周山河派出所"
					}, {
						ID : '寺巷派出所',
						NAME : "寺巷派出所"
					}, {
						ID : '野徐派出所',
						NAME : "野徐派出所"
					}, {
						ID : '滨江派出所',
						NAME : "滨江派出所"
					}, {
						ID : '医药城派出所',
						NAME : "医药城派出所"
					}, {
						ID : '案件侦办队',
						NAME : "案件侦办队"
					}, {
						ID : '治安防控',
						NAME : "治安防控"
					}, {
						ID : '维稳服务队',
						NAME : "维稳服务队"
					}, {
						ID : '情报指挥室',
						NAME : "情报指挥室"
					}],
				listeners:{
					scope:this,
					select:this.chose
				}	
					
					});
        
        this.map =  Ext.create('App.grfz.tjfx.map', {
        	x:0,
        	y:40,
			width : 500,
			height : 400
			
		});
        this.funsionChart =  Ext.create('App.grfz.tjfx.funsionChart', {
        	x:0,
        	y:40,
			width : 780,
			height : 400
			
		});
        this.pie = Ext.create('App.grfz.tjfx.pie', {
        	x:0,
        	y:40,
			width : 480,
			height : 400,
			data:this.result.piedata
			
		});
        
        this.cyclePie = Ext.create('App.grfz.tjfx.cyclePie', {
        	x:0,
        	y:40,
			width : 420,
			height : 280,
			data:this.result.cyclePiedata
			
		});
        
        this.barChart = Ext.create('App.grfz.tjfx.barChart', {
        	x:0,
        	y:40,
			width : 420,
			height : 280,
			data:this.result.barChartdata
		});
        
        this.rosePie = Ext.create('App.grfz.tjfx.rosePie', {
        	x:0,
        	y:40,
			width : 500,
			height : 280
			
		});
        
        this.vfunsionChart = Ext.create('App.grfz.tjfx.VfunsionChart', {
        	x:0,
        	y:40,
			width : 370,
			height : 280,
			data:this.result.vfunsiondata
			
		});
       
        this.chartContainer = Ext.create('Ext.Container',{
        	x:0,
        	y:117,
        	width: '100%',
        	height: 844,
        	layout:'absolute',
        	items :[
{xtype:'container',
	   x:50,
	   y:0,
	   layout:'absolute',
	   width:500,
	   height:440,
	   cls:'grfz-tjfx-container',
	   items:[{xtype:'container',
		       x:0,
		       y:0,
		       layout:'absolute',
		       width:500,
		       height:40,
		       cls:'grfz-tjfx-titlecontainer',
		       items:[Ext.create('Ext.Component',
		                {
     	        x:20,
     	        y:9,
                 width: 125,
                 height: 19,
                 cls: 'grfz-tjfx-TITLE-text',
                 html: '全局警员地区分布'
             })]},this.map]},
	   {xtype:'container',
		   x:580,
		   y:0,
		   layout:'absolute',
		   width:780,
		   height:440,
		   cls:'grfz-tjfx-container',
		   items:[{xtype:'container',
		       x:0,
		       y:0,
		       layout:'absolute',
		       width:780,
		       height:40,
		       cls:'grfz-tjfx-titlecontainer',
		       items:[Ext.create('Ext.Component',
		                {
     	        x:20,
     	        y:9,
                 width: 153,
                 height: 19,
                 cls: 'grfz-tjfx-TITLE-text',
                 html: '执法综合能力等级统计'
             })]},this.funsionChart]},
	   {xtype:'container',
			   x:1390,
			   y:0,
			   layout:'absolute',
			   width:480,
			   height:440,
			   cls:'grfz-tjfx-container',
			   items:[{xtype:'container',
			       x:0,
			       y:0,
			       layout:'absolute',
			       width:480,
			       height:40,
			       cls:'grfz-tjfx-titlecontainer',
			       items:[Ext.create('Ext.Component',
			                {
	        	        x:20,
	        	        y:9,
	                    width: 115,
	                    height: 19,
	                    cls: 'grfz-tjfx-TITLE-text',
	                    html: '全局警员工龄统计'
	                })]},this.pie]},
	   {xtype:'container',
 			   x:50,
 			   y:474,
 			   layout:'absolute',
 			   width:440,
 			   height:360,
 			   cls:'grfz-tjfx-container',
 			   items:[{xtype:'container',
				       x:0,
				       y:0,
				       layout:'absolute',
				       width:440,
				       height:40,
				       cls:'grfz-tjfx-titlecontainer',
				       items:[Ext.create('Ext.Component',
				                {
		        	        x:20,
		        	        y:9,
		                    width: 143,
		                    height: 19,
		                    cls: 'grfz-tjfx-TITLE-text',
		                    html: '全局警员的年龄段统计'
		                })]},this.cyclePie]},		
	 {xtype:'container',
          	    x:520,
          	    y:474,
          		layout:'absolute',
          	    width:420,
          		height:360,
          		cls:'grfz-tjfx-container',
          		items:[{xtype:'container',
      				     x:0,
      				     y:0,
      				     layout:'absolute',
      				     width:420,
      				     height:40,
      			         cls:'grfz-tjfx-titlecontainer',
      			         items:[Ext.create('Ext.Component',
      			                {
      	        	        x:20,
    		        	        y:9,
    		                    width: 162,
    		                    height: 19,
    		                    cls: 'grfz-tjfx-TITLE-text',
    		                    html: '公务员年度考核等次情况'
      		                })]},this.barChart]},		
   {xtype:'container',
                 x:970,
                 y:474,
                 layout:'absolute',
                 width:500,
                 height:360,
                 cls:'grfz-tjfx-container',
                 items:[{xtype:'container',
                      		x:0,
                      		y:0,
                      		layout:'absolute',
                      		width:500,
                      		height:40,
                      	    cls:'grfz-tjfx-titlecontainer',
                      		items:[Ext.create('Ext.Component',
                      			        {
                      	                 x:20,
                    		        	      y:9,
                    		                  width: 168,
                    		                  height: 19,
                    		                  cls: 'grfz-tjfx-TITLE-text',
                    		                  html: '全局警员休假完成情况统计'
                      		})]},this.rosePie]},		
     {xtype:'container',
             x:1500,
             y:474,
             layout:'absolute',
             width:370,
            height:360,
             cls:'grfz-tjfx-container',
             items:[{xtype:'container',
                     x:0,
                     y:0,
                     layout:'absolute',
                     width:370,
                     height:40,
                   cls:'grfz-tjfx-titlecontainer',
                    items:[Ext.create('Ext.Component',
                                   {
                                    x:20,
                                    y:9,
                                    width: 129,
                                    height: 19,
                                    cls: 'grfz-tjfx-TITLE-text',
                                   html: '全局警进入方式统计'
                           })]},this.vfunsionChart]}
        	        ]
        });
        this.items = [
                      {
                       xtype:'container',
           			   x:50,
           			   y:30,
           			   layout:'absolute',
           			   width:284,
           			   height:46,
           			   cls:'grfz-tjfx-container',
           			   items:[this.DEPT]
                      },
                      this.chartContainer
                         		                
                	    ]
        this.callParent(arguments);
    },
	chose : function() {
		var DEPTNAME = this.DEPT.getValue();
		Ext.Ajax.request({
  			url:'../TJFX/getAlldata',
  			method : 'post', 
  			params: { DEPTNAME: this.DEPT.getValue() },
  			scope: this,
  			callback : function(options, success, response) {
  				if (success) {
  					if (response.responseText&& response.responseText != '') {
  						var result = Ext.JSON.decode(response.responseText);
  						var map =  Ext.create('App.grfz.tjfx.map', {
  				        	x:0,
  				        	y:40,
  							width : 500,
  							height : 400
  							
  						});
  						
  						 var funsionChart =  Ext.create('App.grfz.tjfx.funsionChart', {
  				        	x:0,
  				        	y:40,
  							width : 780,
  							height : 400,
  							data:result.funsiondata
  							
  						});
  						 
  						var  pie = Ext.create('App.grfz.tjfx.pie', {
  				        	x:0,
  				        	y:40,
  							width : 480,
  							height : 400,
  							data:result.piedata
  							
  						});
  						
  					var	cyclePie = Ext.create('App.grfz.tjfx.cyclePie', {
  	  			        	x:0,
  	  			        	y:40,
  	  						width : 420,
  	  						height : 280,
  							data:result.cyclePiedata
  	  						
  	  					});
  						
  					var	barChart = Ext.create('App.grfz.tjfx.barChart', {
  				        	x:0,
  				        	y:40,
  							width : 420,
  							height : 280,
  							data:result.barChartdata
  							
  						});
  					
  					var rosePie = Ext.create('App.grfz.tjfx.rosePie', {
  			        	x:0,
  			        	y:40,
  						width : 500,
  						height : 280,
						data:result.rosePiedata
  						
  					});
  					
  				   var vfunsionChart = Ext.create('App.grfz.tjfx.VfunsionChart', {
  				        	x:0,
  				        	y:40,
  							width : 370,
  							height : 280,
  							data:result.vfunsiondata
  							
  						});
  					
  				 var   chartContainer = Ext.create('Ext.Container',{
  		        	x:0,
  		        	y:0,
  		        	width: '100%',
  		        	height: 844,
  		        	layout:'absolute',
  		        	items :[
  		{xtype:'container',
  			   x:50,
  			   y:0,
  			   layout:'absolute',
  			   width:500,
  			   height:440,
  			   cls:'grfz-tjfx-container',
  			   items:[{xtype:'container',
  				       x:0,
  				       y:0,
  				       layout:'absolute',
  				       width:500,
  				       height:40,
  				       cls:'grfz-tjfx-titlecontainer',
  				       items:[Ext.create('Ext.Component',
  				                {
  		     	        x:20,
  		     	        y:9,
  		                 width: 125,
  		                 height: 19,
  		                 cls: 'grfz-tjfx-TITLE-text',
  		                 html: '全局警员地区分布'
  		             })]},map]},
  			   {xtype:'container',
  				   x:580,
  				   y:0,
  				   layout:'absolute',
  				   width:780,
  				   height:440,
  				   cls:'grfz-tjfx-container',
  				   items:[{xtype:'container',
  				       x:0,
  				       y:0,
  				       layout:'absolute',
  				       width:780,
  				       height:40,
  				       cls:'grfz-tjfx-titlecontainer',
  				       items:[Ext.create('Ext.Component',
  				                {
  		     	        x:20,
  		     	        y:9,
  		                 width: 153,
  		                 height: 19,
  		                 cls: 'grfz-tjfx-TITLE-text',
  		                 html: '执法综合能力等级统计'
  		             })]},funsionChart]},
  			   {xtype:'container',
  					   x:1390,
  					   y:0,
  					   layout:'absolute',
  					   width:480,
  					   height:440,
  					   cls:'grfz-tjfx-container',
  					   items:[{xtype:'container',
  					       x:0,
  					       y:0,
  					       layout:'absolute',
  					       width:480,
  					       height:40,
  					       cls:'grfz-tjfx-titlecontainer',
  					       items:[Ext.create('Ext.Component',
  					                {
  			        	        x:20,
  			        	        y:9,
  			                    width: 115,
  			                    height: 19,
  			                    cls: 'grfz-tjfx-TITLE-text',
  			                    html: '全局警员工龄统计'
  			                })]},pie]},
  			   {xtype:'container',
  		 			   x:50,
  		 			   y:474,
  		 			   layout:'absolute',
  		 			   width:440,
  		 			   height:360,
  		 			   cls:'grfz-tjfx-container',
  		 			   items:[{xtype:'container',
  						       x:0,
  						       y:0,
  						       layout:'absolute',
  						       width:440,
  						       height:40,
  						       cls:'grfz-tjfx-titlecontainer',
  						       items:[Ext.create('Ext.Component',
  						                {
  				        	        x:20,
  				        	        y:9,
  				                    width: 143,
  				                    height: 19,
  				                    cls: 'grfz-tjfx-TITLE-text',
  				                    html: '全局警员的年龄段统计'
  				                })]},cyclePie]},		
  			 {xtype:'container',
  		          	    x:520,
  		          	    y:474,
  		          		layout:'absolute',
  		          	    width:420,
  		          		height:360,
  		          		cls:'grfz-tjfx-container',
  		          		items:[{xtype:'container',
  		      				     x:0,
  		      				     y:0,
  		      				     layout:'absolute',
  		      				     width:420,
  		      				     height:40,
  		      			         cls:'grfz-tjfx-titlecontainer',
  		      			         items:[Ext.create('Ext.Component',
  		      			                {
  		      	        	        x:20,
  		    		        	        y:9,
  		    		                    width: 162,
  		    		                    height: 19,
  		    		                    cls: 'grfz-tjfx-TITLE-text',
  		    		                    html: '公务员年度考核等次情况'
  		      		                })]},barChart]},		
  		   {xtype:'container',
  		                 x:970,
  		                 y:474,
  		                 layout:'absolute',
  		                 width:500,
  		                 height:360,
  		                 cls:'grfz-tjfx-container',
  		                 items:[{xtype:'container',
  		                      		x:0,
  		                      		y:0,
  		                      		layout:'absolute',
  		                      		width:500,
  		                      		height:40,
  		                      	    cls:'grfz-tjfx-titlecontainer',
  		                      		items:[Ext.create('Ext.Component',
  		                      			        {
  		                      	                 x:20,
  		                    		        	      y:9,
  		                    		                  width: 168,
  		                    		                  height: 19,
  		                    		                  cls: 'grfz-tjfx-TITLE-text',
  		                    		                  html: '全局警员休假完成情况统计'
  		                      		})]},rosePie]},		
  		     {xtype:'container',
  		             x:1500,
  		             y:474,
  		             layout:'absolute',
  		             width:370,
  		            height:360,
  		             cls:'grfz-tjfx-container',
  		             items:[{xtype:'container',
  		                     x:0,
  		                     y:0,
  		                     layout:'absolute',
  		                     width:370,
  		                     height:40,
  		                   cls:'grfz-tjfx-titlecontainer',
  		                    items:[Ext.create('Ext.Component',
  		                                   {
  		                                    x:20,
  		                                    y:9,
  		                                    width: 129,
  		                                    height: 19,
  		                                    cls: 'grfz-tjfx-TITLE-text',
  		                                   html: '全局警进入方式统计'
  		                           })]},vfunsionChart]}
  		        	        ]
  		        }); 
  				 
  				this.chartContainer.removeAll();
  				this.chartContainer.add(chartContainer);
  						
  					}
  				} else {
  					
  				}
  			}
  		});
		
	}
});


