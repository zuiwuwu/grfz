
Ext.define('App.grczpt.Home.grxq', {
	extend : 'Ext.container.Container',
	autoScroll:true,
	layout : 'vbox',
	width:'100%',
	border:false,
	style:{
		 background:'url(../images/grczpt/grczpt_bg.png)',
	       padding: '10px'
	 },
	initComponent : function() {
		var me=this;
		var vme = this;
		var a = '滨江派出所';
		
		
		    var myname = GetArgs(window.location.href,"JH");
//		    alert("参数为"+myname);
		
		function GetArgs(params,paramName){
		    var argsIndex = params.indexOf("?");
		    var arg = params.substring(argsIndex+1);
		    args = arg.split("&");
		    var valArg = "";
		    for(var i =0;i<args.length;i++){
		    str = args[i];
		    var arg = str.split("=");
		 
		        if(arg.length<=1) continue;
		        if(arg[0] == paramName){
		            valArg = arg[1];
		        }
		    }
		    return valArg;
		}
		
		vme.result = [];
		Ext.Ajax.request({
    		url : '../grxq/getuserinfo?JH='+myname,
   			method : 'get', 
   			params : {
   			},
   			async: false,//是否异步请求
   			scope:this,
   			callback : function(options, success, response) {
   				if (success) {
   					if (response.responseText&& response.responseText != '') {
   						vme.result = Ext.JSON.decode(response.responseText);
   						
   					}
   				} else {
   				}
   			}
   		});
		
		this.QSSJ = Ext.create('Ext.form.field.Date', {    	    
			background : 'color:#59D9FF',
  			width : 140,
            name:'QSSJ',
  			//value : nowTime,
        	format : 'Y-m-d',
  			
  		});
		
		me.items = [
		            {
		            	xtype:'container',
		            	cls:'',
		            	style: 'background-color:transparent',
		            	margin:'60 0 0 0',
		            	layout : 'hbox',
		            	height:280,
		            	width:'100%',
		            	items:[
		            	       {
		            	    	   xtype:'container',
		            	    	   style:{
			  			 				 background:'url(../images/grczpt/home/grxq/1.png)',
			  			 			       padding: '10px'
			  			 			   },
		            	    	   margin:'0 0 0 382',
		            	    	   height:280,
		   		            	   width:452,
		   		            	   items:[
		   		            	          {
		   		            	        	  xtype:'component',
		   		            	        	  width:452,
		   		            	        	  height:280,
		   		            	        	  html:'<div style="with:452px;height:280px;">'+
		   		            	        		   '<div style="with:180px;height:220px;text-align:center;float:left;margin-top:30px;margin-left:30px;"><img src=""></div>'+
		   		            	        	       '<div style="width:150px;height:220px;float:left;margin-top:30px;margin-left:180px;">'+
		   		            	        	    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">姓名:'+vme.result[0].XM+'</div>'+
		   		            				    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">性别:'+vme.result[0].SEX+'</div>'+
		   		            				    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">年龄:'+vme.result[0].NL+'</div>'+
		   		            				    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">身高:'+vme.result[0].SG+'</div>'+
		   		            				    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">体重:'+vme.result[0].TZ+'</div>'+
		   		            				    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">警号:'+vme.result[0].JH+'</div>'+
		   		            				    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">手机号:'+vme.result[0].PHONE+'</div>'+
		   		            				    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">大部门:'+vme.result[0].DBM+'</div>'+
		   		            	        	       '</div>'+
		   		            	        		  '</div>'
		   		            	          }
		   		            	          ]
		            	       },
		            	       {
		            	    	   xtype:'container',
		            	    	   style:{
		  			 				 background:'url(../images/weudu.png)',
		  			 			       padding: '10px'
		  			 			   },
		            	    	   margin:'0 0 0 20',
		            	    	   height:280,
		   		            	   width:309,
		   		            	   items:[{
										xtype : 'component',
										width : '100%',
										height : 30,
										margin : '0 0 0 0',
										style : 'color:#59D9FF;font-size:15px;',
										cls : 'grczpt-zhpg-title',
										html : '维度'
									},Ext.create('App.grczpt.zhpg.xingxing', {
										width : '100%',
										cls : 'scroll-1',
										flex : 1
									})
		   		            	   ]
		            	       },
		            	       {
		            	    	   xtype:'container',
		            	    	   layout:'vbox',
		            	    	   margin:'0 0 0 20',
		            	    	   style:{
			  			 				 background:'url(../images/weidu_leida.png)',
			  			 			       padding: '10px'
			  			 			   },
		            	    	   height:280,
		   		            	   width:360,
		   		            	   items:[
		   		            	       {
										xtype : 'component',
										width : '100%',
										height : 30,
										margin : '0 0 0 0',
										style : 'color:#59D9FF;font-size:15px;',
										cls : 'grczpt-zhpg-title',
										html : '维度'
									},Ext.create('App.grczpt.zhpg.leidatu', {
										width : '100%',
										url : '../dimension/getListss?USERNAME='+vme.result[0].XM,
										flex : 1
									})
									]
		            	       },{
		            	    	   xtype:'button',
		            	    	   text : '个人设置',
		            	    	   margin:'0 0 0 100',
		            	    	   scope:this,
		            	    	   handler : this.open,
		            	    	   height:20,
		   		            	   width:70,
		            	       }   		            	  
	            	       
		            	       ]
		            },
		            {
		            	xtype:'container',
		            	cls:'',
		            	style: 'background-color:transparent',
		            	margin:'35 0 0 0',
		            	layout : 'hbox',
		            	height:300,
		            	width:'100%',
		            	items:[
		            	       {
		            	    	   xtype:'container',
		            	    	   style:{
			  			 				 background:'url(../images/chengjiu_bg.png)',
			  			 			       padding: '10px'
			  			 			   },
		            	    	   margin:'0 0 0 382',
		            	    	   height:300,
		   		            	   width:711,
		   		            	   items:[/*{
										xtype : 'component',
										width : '100%',
										height : 30,
										style : 'color:#59D9FF;font-size:15px;',
										cls : 'grczpt-zhpg-title',
										html : '我的成就'
									},Ext.create('App.grczpt.Home.chengjiu', {
										width : '100%',
										height :290,										
										cls : 'scroll-1',
										url:'../dictionary/getLists?s='+a,
										flex : 1
									})*/{
										xtype : 'component',
										width : '100%',
										height : 30,
										margin : '0 0 0 0',
										style : 'color:#59D9FF;font-size:15px;',
										cls : 'grczpt-zhpg-title',
										html : '岗位档案'
									},
									Ext.create('App.grczpt.zhpg.gwda', {
										width : '100%',
//										cls : 'scroll-1',
										height :290,
										url:'../grxq/getDALists?XM='+vme.result[0].XM,
										flex : 1
									})]
		            	       },
		            	       {
		            	    	   xtype:'container',
		            	    	   style:{
			  			 				 background:'url(../images/rongyu_bg.png)',
			  			 			       padding: '10px'
			  			 			   },
		            	    	   margin:'0 0 0 20',
		            	    	   height:300,
		   		            	   width:425,
		   		            	   items:[{
										xtype : 'component',
										width : '100%',
										height : 30,
										style : 'color:#59D9FF;font-size:15px;',
										cls : 'grczpt-zhpg-title',
										html : '奖惩'
									},Ext.create('App.grczpt.Home.jiangcheng', {
										width : '100%',
										height :290,
										cls : 'scroll-1',
										url:'../grxq/getJCLists?GRHDW='+vme.result[0].XM,
										flex : 1
									})]
		            	       }
		            	       ]
		            },
		            {
		            	xtype:'container',
		            	cls:'',
		            	style: 'background-color:transparent',
		            	margin:'30 0 0 0',
		            	layout : 'hbox',
		            	height:300,
		            	width:'100%',
		            	items:[
		            	       {
		            	    	   xtype:'container',
		            	    	   style:{
			  			 				 background:'url(../images/rongyu_bg.png)',
			  			 			       padding: '10px'
			  			 			   },
		            	    	   margin:'0 0 0 382',
		            	    	   height:300,
		   		            	   width:425,
		   		            	   items:[{
										xtype : 'component',
										width : '100%',
										height : 30,
										style : 'color:#59D9FF;font-size:15px;',
										cls : 'grczpt-zhpg-title',
										html : '考核档案'
									},{
										xtype : 'component',
										width : '100%',
										margin : '12 0 0 0',
										cls : '',
										html : '<div style="width:380px;height:40px;" >'+ 
										'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:65px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">时间</span>'+
										'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:85px;height:40px;">成绩</span>'+
										'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:80px;height:40px;">等级</span>'+
										' </div>'
									},
									Ext.create('App.grczpt.Home.khda', {
										width : '100%',
										cls : 'scroll-1',
										url:'../grxq/getKHLists?XM='+vme.result[0].XM,
										flex : 1
									})]
		            	       },
		            	       {
		            	    	   xtype:'container',
		            	    	   style:{
			  			 				 background:'url(../images/gangwei_bg.png)',
			  			 			       padding: '10px'
			  			 			   },
		            	    	   margin:'0 0 0 25',
		            	    	   height:300,
		   		            	   width:709,
		   		            	   items:[/*
											{
												xtype : 'component',
												width : '100%',
												height : 30,
												margin : '0 0 0 0',
												style : 'color:#59D9FF;font-size:15px;',
												cls : 'grczpt-zhpg-title',
												html : '岗位档案'
											},
											Ext.create('App.grczpt.zhpg.gwda', {
												width : '100%',
//												cls : 'scroll-1',
												height :290,
												url:'../grxq/getDALists?XM='+vme.result[0].XM,
												flex : 1
											})
						 			        */{
												xtype : 'component',
												width : '100%',
												height : 30,
												style : 'color:#59D9FF;font-size:15px;',
												cls : 'grczpt-zhpg-title',
												html : '我的成就'
											},Ext.create('App.grczpt.Home.chengjiu', {
												width : '100%',
												height :290,										
												cls : 'scroll-1',
												url:'../grxq/getJCLists?GRHDW='+vme.result[0].XM,
												flex : 1
											})]
		            	       }
		            	       ]
		            },
		            {
		            	xtype:'container',
		            	cls:'',
		            	style: 'background-color:transparent',
		            	margin:'30 0 0 0',
		            	layout : 'hbox',
		            	height:300,
		            	width:'100%',
		            	items:[
		            	       {
		            	    	   xtype:'container',
		            	    	   style:{
						 				 background:'url(../images/peixun_bg.png)',
						 			       padding: '10px'
						 			 },
		            	    	   margin:'0 0 0 382',
		            	    	   height:300,
		   		            	   width:700,
		   		            	   items:[		   		            	          		   		            	          

											{xtype: 'container',
												
												layout: 'hbox',
												items :[
												        {
													xtype : 'component',
													width : '76%',
													style : 'color:#59D9FF;font-size:15px;',
													height : 30,
													margin : '0 0 0 0',
													cls : 'grczpt-zhpg-title',
													html : '培训档案'
													
												},/*{
													xtype: 'datefield',
													width : 140,
										            name:'QSSJ',										            
										  			//value : nowTime,
										        	format : 'Y-m-d',	
												}*/]												
											},
											{
												xtype : 'component',
												width : '100%',
												margin : '12 0 0 0',
												cls : '',
												html : '<div style="width:680px;height:40px;" >'+ 
												'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:70px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">时间</span>'+
												'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:100px;height:40px;">培训名称</span>'+
												'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:100px;height:40px;">培训单位</span>'+
												'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:100px;height:40px;">培训完成情况</span>'+
												' </div>'
											},
											Ext.create('App.grczpt.Home.pxda', {
												width : '100%',
												cls : 'scroll-1',
												url:'../grxq/getPXLists?XM='+vme.result[0].XM,
												flex : 1
											})
						 			        ]
		            	       },
		            	       {
		            	    	   xtype:'container',
		            	    	   style:{
						 				 background:'url(../images/toushu_bg.png)',
						 			       padding: '10px'
						 			 },
		            	    	   margin:'0 0 0 20',
		            	    	   height:300,
		   		            	   width:438,
		   		            	   items:[		   		            	          		   		            	          

											{xtype: 'container',
												
												layout: 'hbox',
												items :[
												        {
													xtype : 'component',
													width : '63%',
													style : 'color:#59D9FF;font-size:15px;',
													height : 30,
													margin : '0 0 0 0',
													cls : 'grczpt-zhpg-title',
													html : '被投诉信息'
													
												},/*{
													xtype: 'datefield',
													width : 140,
										            name:'QSSJ',										            
										            
										        	format : 'Y-m-d',	
												}*/]												
											},
											{
												xtype : 'component',
												width : '100%',
												margin : '12 0 0 0',
												cls : '',
												html : '<div style="width:400px;height:40px;" >'+ 
												'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:65px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">被投诉时间</span>'+
												'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:50px;height:40px;">类型</span>'+
												'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:70px;height:40px;">内容</span>'+
												' </div>'
											},
											Ext.create('App.grczpt.Home.tsda', {
												width : '100%',
												cls : 'scroll-1',
												url:'../grxq/getTSLists?JH='+vme.result[0].JH,
												flex : 1
											})
						 			        ]
		            	       }
		            	       ]
		            }
		            ];	
		this.callParent(arguments);
	},
	
	open : function(){
		var vme = this;
		Ext.create('App.grczpt.Home.editPp',{
			NAME: vme.result[0].XM
		}).show()
	}
	
});

