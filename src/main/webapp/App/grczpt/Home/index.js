
Ext.define('App.grczpt.Home.index', {
	extend : 'Ext.container.Container',
	layout : 'card',
	width:'100%',
	initComponent : function() {
		var me=this;
		me.searchtext = Ext.create('App.Public.HMTextField', {
			name : 'platechars',
			margin:'0 0 0 0',
			width : 540,
			height:45,
			value : "",	
			tooltip : ""
		});
	 me.serachBtn = Ext.create('App.Common.ImageButtonEx',{
 		    width:80,
 		    height:45,
 		    margin:'0 0 0 0',
 			scope : this,
 			tooltip: '搜索',
 			value : "",	
 			btnCls:  'icon-grfz-search',
 			handler : this.serach,
			});
		
	 me.searchcontainer = Ext.create('Ext.Container',{
		 width:'100%',
		 layout:'vbox',
		 autoScroll:true,
		 style:{
			 background:'url(../images/grczpt/grczpt_bg.png)',
		       padding: '10px'
		 },
		 items:[
		        {
		        	xtype:'container',
		        	width:620,
		        	heght:45,
		        	margin:'155 0 0 650',
		        	/* cls : 'grczpt-main-container',*/
		        	layout:'hbox',
		        	items:[me.searchtext,me.serachBtn]
		        },
		        {
		        	xtype:'container',
		        	width:'100%',
		        	height:310,
		        	margin:'82 0 0 0',
		        	 style: 'background-color:transparent',
		        	layout:'hbox',
		        	items:[
		        	       {
		        	    	   xtype:'container',
		        	    	   width:376,
		        	    	   height:276,
		        	    	   margin:'0 0 0 300',
		        	    	   style:{
					 				 background:'url(../images/grczpt/zhpg/new1.png)',
					 			       padding: '10px'
					 			 },
		        	    	   items:[
										{
											xtype : 'component',
											width : '100%',
											height : 30,
											margin : '0 0 0 0',
											cls : 'grczpt-zhpg-title',
											html : '月度先进个人'
										},
										{
											xtype : 'component',
											width : '100%',
											margin : '0 0 0 0',
											cls : '',
											html : '<div style="width:350px;height:40px;" >'+ 
											'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:15px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">姓名</span>'+
											'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:65px;height:40px;">部门</span>'+
											'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:68px;height:40px;">警种</span>'+
											'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:50px;height:40px;">成绩</span>'+
											' </div>'
										},
										Ext.create('App.grczpt.zhpg.ydzx', {
											width : '100%',
											cls : 'scroll-1',
											url:'../zhpg/getydzx',
											flex : 1
										})
					 			        ]
		        	       },
		        	       {
		        	    	   xtype:'container',
		        	    	   width:340,
		        	    	   height:276,
		        	    	   margin:'0 0 0 20',
		        	    	   style:{
					 				 background:'url(../images/grczpt/zhpg/new2.png)',
					 			       padding: '10px'
					 			 },
		        	    	   items:[
										{
											xtype : 'component',
											width : '100%',
											height : 30,
											margin : '0 0 0 0',
											cls : 'grczpt-zhpg-title',
											html : '月度后进个人'
										},
										{
											xtype : 'component',
											width : '100%',
											margin : '0 0 0 0',
											cls : '',
											html : '<div style="width:300px;height:40px;" >'+ 
											'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:10px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">姓名</span>'+
											'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:50px;height:40px;">部门</span>'+
											'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:68px;height:40px;">警种</span>'+
											'<span style="color:#59D9FF;font-size:15px; font-family: MicrosoftYaHei;margin-left:40px;height:40px;">成绩</span>'+
											' </div>'
										},
										Ext.create('App.grczpt.zhpg.ydzx4', {
											width : '100%',
											cls : 'scroll-1',
											url:'../zhpg/getydhj',
											flex : 1
										})
					 			        ]
		        	       },
		        	       {
		        	    	   xtype:'container',
		        	    	   width:531,
		        	    	   height:276,
		        	    	   margin:'0 0 0 20',
		        	    	   layout:'vbox',
		        	    	   style:{
					 				 background:'url(../images/grczpt/home/3.png)',
					 			       padding: '10px'
					 			 },
		        	    	   items:[
										{
											xtype : 'component',
											width : '100%',
											height : 30,
											margin : '0 0 0 0',
											cls : 'grczpt-zhpg-title',
											html : '警力资源配比'
										},Ext.create('App.grczpt.zhpg.jlzypb', {
											width : '100%',
											flex : 1
										})
					 			        ]
		        	       }
		        	       ]
		        },
		        {
		        	xtype:'container',
		        	width:'100%',
		        	height:280,
		        	margin:'40 0 0 0',
		        	 style: 'background-color:transparent',
		        	layout:'hbox',
		        	items:[
		        	       {
		        	    	   xtype:'container',
		        	    	   width:343,
		        	    	   height:250,
		        	    	   margin:'0 0 0 300',
		        	    	   layout:'vbox',
		        	    	   style:{
					 				 background:'url(../images/grczpt/home/4.png)',
					 			       padding: '10px'
					 			 },
		        	    	   items:[
					 			       {
											xtype : 'component',
											width : '100%',
											height : 30,
											margin : '0 0 0 0',
											cls : 'grczpt-zhpg-title',
											html : '荣誉榜'
										},Ext.create('App.grczpt.zhpg.qjjyxjwcqktj', {
											width : '100%',
											flex : 1
										})
					 			        ]
		        	       },
		        	       {
		        	    	   xtype:'container',
		        	    	   width:289,
		        	    	   height:250,
		        	    	   margin:'0 0 0 25',
		        	    	   layout:'vbox',
		        	    	   style:{
					 				 background:'url(../images/grczpt/home/5.png)',
					 			       padding: '10px'
					 			 },
		        	    	   items:[
					 			       {
											xtype : 'component',
											width : '100%',
											height : 30,
											margin : '0 0 0 0',
											cls : 'grczpt-zhpg-title',
											html : '全局警员工龄统计'
										},Ext.create('App.grczpt.zhpg.qjjygntj', {
											width : '100%',
											flex : 1
										})
					 			        ]
		        	       },
		        	       {
		        	    	   xtype:'container',
		        	    	   width:289,
		        	    	   height:250,
		        	    	   margin:'0 0 0 25',
		        	    	   layout:'vbox',
		        	    	   style:{
					 				 background:'url(../images/grczpt/home/5.png)',
					 			       padding: '10px'
					 			 },
		        	    	   items:[
					 			       {
											xtype : 'component',
											width : '100%',
											height : 30,
											margin : '0 0 0 0',
											cls : 'grczpt-zhpg-title',
											html : '公务员年度考核等次情况'
										},Ext.create('App.grczpt.zhpg.gwyndkhdcqk', {
											width : '100%',
											flex : 1
										})
					 			        ]
		        	       },
		        	       {
		        	    	   xtype:'container',
		        	    	   width:289,
		        	    	   height:250,
		        	    	   margin:'0 0 0 25',
		        	    	   layout:'vbox',
		        	    	   style:{
					 				 background:'url(../images/grczpt/home/5.png)',
					 			       padding: '10px'
					 			 },
		        	    	   items:[
					 			       {
											xtype : 'component',
											width : '100%',
											height : 30,
											margin : '0 0 0 0',
											cls : 'grczpt-zhpg-title',
											html : '全局警员进入方式统计'
										},Ext.create('App.grczpt.zhpg.qjjyjrfstj', {
											width : '100%',
											flex : 1
										})
					 			        ]
		        	       }
		        	       ]
		        }
		        ]
	 });
		me.items = [	            
                  me.searchcontainer		
		];	
		this.callParent(arguments);
	},
	
	serach:function(){
	var vme = this;
	
   	var search=this.searchtext.getValue(); 
   	var cllsxx
   	if(search.indexOf("滨江派出所") == 0){
   		
   		
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   		width: '100%',
   		inf:'滨江派出所',
   			//flex: 1,
   			//index:vme,
   	        });
   		//alert(search.indexOf("部门"))
   		
   	}else if(search.indexOf("局领导") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'局领导',
   	   			
   	   	        });
   	}else if(search.indexOf("政工纪检室") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'政工纪检室',
   	   			
   	   	        });
   	}else if(search.indexOf("综合保障室") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'综合保障室',   	   			
   	   	        });
   	}else if(search.indexOf("情报指挥室") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'情报指挥室',  	   			
   	   	        });
   	}else if(search.indexOf("执法监督室") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'滨江派出所',  	   			
   	   	        });
   	}else if(search.indexOf("寺港派出所") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'寺港派出所',  	   			
   	   	        });
   	}else if(search.indexOf("案件侦办队") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'案件侦办队',  	   			
   	   	        });
   	}else if(search.indexOf("治安防控队") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'治安防控队',  	   			
   	   	        });
   	}else if(search.indexOf("明珠派出所") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'明珠派出所',  	   			
   	   	        });
   	}else if(search.indexOf("维稳服务队") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'维稳服务队',  	   			
   	   	        });
   	}else if(search.indexOf("周山河街区派出所") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'周山河街区派出所',  	   			
   	   	        });
   	}else if(search.indexOf("野徐派出所") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'野徐派出所',  	   			
   	   	        });
   	}else if(search.indexOf("医药城派出所") == 0){
   		cllsxx=Ext.create('App.grczpt.dbmjgt.testzuzhi', {
   	   		width: '100%',
   	   		inf:'医药城派出所',  	   			
   	   	        });
   	}else{/*普通查询
   		
   		cllsxx=Ext.create('App.grfz.cllsxx', {
			
			
			index:vme,
			
			id:'cllsxx'
	        });
   	 		cllsxx.getStore().clearFilter(true);
   	 		cllsxx.getStore().filter( [{
				property : 'searchtext',
				value : search
			}]);
   		
   		
   		
   		
   		//alert(search.indexOf("部门"))
   	*/
   		//全文检索
/*   		Ext.Ajax.request({
    		url : '../dictionary/getSearchLists',
   			method : 'post', 
   			params : {
   				serachtext:search
   			},
   			async: false,//是否异步请求
   			scope:this,
   			callback : function(options, success, response) {
   				if (success) {
   			
   						var url = 'http://192.168.1.200:8080/grfz/dictionary/getSearchLists';
						window.open(url);
   				} else {
   				}
   			}
   		});*/
   		cllsxx=Ext.create('App.grczpt.Home.elsearch', {
	   		width: '100%',
	   		inf:search,  	   			
	   	        });
   		}
   
	 		
   	 
   	 
   	 
   /*	 var cllsxx=Ext.create('App.grfz.cllsxx', {
			width: '100%',
			flex: 1,
			index:vme,
			id:'cllsxx'
	        });
   	 		cllsxx.getStore().clearFilter(true);
   	 		cllsxx.getStore().filter( [{
				property : 'searchtext',
				value : search
			}]);*/
 	 
 	 
 	 //cllsxx.getStore().load({params:{searchtext:search}});
 	   vme.add(cllsxx);
	   vme.getLayout().setActiveItem(cllsxx);
   }
	
	
});

