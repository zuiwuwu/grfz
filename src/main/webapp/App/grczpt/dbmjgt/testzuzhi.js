/*Ext.define('App.grczpt.dbmjgt.testzuzhi.tree',{
		extend : 'Ext.tree.Panel',
		urlGetGroupTree : '../dictionary/zuzhi',
		rootVisible : false, 
		flex : 1,
		initComponent : function() {
			var vme =  this;
			this.store = Ext.create('Ext.data.TreeStore', {
				autoLoad : true,
				root : {
					expanded : true,
					text : '组织结构管理',
					id : '',
				},
				proxy : {
					type : 'ajax',
					actionMethods : 'post',
					url : this.urlGetGroupTree,
					reader : {
						type : 'json'
					}
				}
			});
			this.callParent(arguments);
		}
	});*/





	Ext.define('App.grczpt.dbmjgt.testzuzhi', {
		extend : 'Ext.container.Container',
		border : false,
		layout : 'vbox',
		autoScroll:true,
		width : '100%',
//		height : '100%',
		 style:{
			 background:'url(../images/grczpt/grczpt_bg.png)',
		       padding: '10px'
		 },
		cls : 'x-sp-zhdd-container',
		initComponent : function() {
			var vme = this;
			var param1 = '';
			var a = 1;
			var b = 2;
			var c = 3;
			var d = 4;
			var e = 5;
			console.log(this.inf)
/*			this.Tree =  Ext.create('App.grczpt.dbmjgt.testzuzhi.tree',{
	 		   rootVisible : true, 
	 		   
	      	   scope : this,
	      	   listeners : {
					scope : this,
					selectionchange : this.onSelectionchange
				},
	      	   tbar : [{
	                 iconCls: 'icon-refresh',
	                 text: '刷新',
	                 scope: this,
	                 handler: function () {
	                	 this.Tree.store.load();
	                 }
	             }, {
	                 iconCls: 'icon-add',
	                 text: '添加',
	                 scope: this,
	                 handler: function () {
	                	 var vsel = this.Tree.getSelectionModel().getSelection();
	                	 console.log(vsel)
	               
	                 }
	             }],
	         })*/
	   	 
			vme.items = [ 
			          
			             /* {
					xtype : 'container',
					height : '100%',
					flex : 1,
					
					layout : 'vbox',
				items : [this.Tree],
				
			},*/ {
				xtype : 'container',
				width : '100%',
//				height : '100%',
				layout : 'fit',
				
				items : [ {
					xtype : 'container',
					width : '100%',
					cls : 'x-sp-zhdd-container',
					flex : 1,
					items : [{
						xtype : 'box',

						autoEl : {
							tag : 'div',
							
							html : Ext.String.format('<iframe id="sunPage" src="../jsp/index/ajax-datasource.jsp?param1='+this.inf+'"  width="100%" height="100%" frameborder="0 marginwidth="0" marginheight="0" scrolling="auto" ></iframe>'),
//							html : Ext.String.format('<iframe id="sunPage" src="../jsp/index/websockerts.jsp"  width="100%" height="100%" frameborder="0 marginwidth="0" marginheight="0" scrolling="auto" ></iframe>'),
							style : 'width:100%;height:800px'
								
						}
					},{
						xtype : 'component',
						width : 120,
						height : 40,
						margin : '50 0 0 105',
						style : {
							background : '#184B92',
						},
						
						html : '<div style="text-align: center;line-height:40px;font-size:16px;color:#59D9FE;">表彰勋章</div>'
					},{
						xtype : 'component',
						width : '100%',
						
						margin : '0 0 0 95',
						cls : 'grczpt-zhpg-title',
						html : '<div style="width:1690px;height:1px;border-top:solid #1F67CC 2px;"></div>'
					},{

	      	    		  
	      	    		  
      					xtype : 'container',
      					width:1590,
	        	    	   	height:300,
	        	    	 
      					
      					cls : 'x-sp-zhdd-container',
      					items : [{
      						xtype : 'component',
							width : 105,
							height : 18,				
							margin : '50px 0 0 100px',
							html : '<div style="font-size:13px;color:#59D9FE;">个人表彰奖励 >></div>'
								},Ext.create('App.grczpt.dbmjgt.cllsxxs', {
								width : '100%',
								height :300,
								margin : '-50px 0 0 180px',
								cls : 'scroll-1',
								url:'../dictionary/getListsss?s='+this.inf,
								flex : 1
							})],
      					
      				
					},
					{
      	    		  
      	    		  
      					xtype : 'container',
      					width:1590,
	        	    	   	height:300,
	        	    	 
      					
      					cls : 'x-sp-zhdd-container',
      					items : [{
      						xtype : 'component',
							width : 105,
							height : 18,				
							margin : '30px 0 0 100px',
							html : '<div style="font-size:13px;color:#59D9FE;">单位表彰奖励 >></div>'
								},Ext.create('App.grczpt.dbmjgt.cllsxx', {
								width : '100%',
								height :300,
								margin : '-50px 0 0 180px',
								cls : 'scroll-1',
								url:'../dictionary/getLists?s='+this.inf,
								flex : 1
							})],
      					
      				},{
						xtype : 'component',
						width : 149,
						height : 40,
						margin : '40 0 0 105',
						style : {
							background : '#184B92'
						},
						html : '<div style="text-align: center;line-height:40px;font-size:16px;color:#59D9FE;">个人绩效排行</div>'
					},{
						xtype : 'component',
						width : '100%',
						
						margin : '0 0 0 95',
						cls : 'grczpt-zhpg-title',
						html : '<div style="width:438px;height:1px;border-top:solid #1F67CC 2px;"></div>'
					},{
						xtype : 'component',
						width : 111,
						height : 40,
						margin : '-42 0 0 1435',
						style : {
							background : '#184B92'
						},
						html : '<div style="text-align: center;line-height:40px;font-size:16px;color:#59D9FE;">单位效绩</div>'
					},{
						xtype : 'component',
						width : '100%',
						
						margin : '0 0 0 1425',
						cls : 'grczpt-zhpg-title',
						html : '<div style="width:390px;height:1px;border-top:solid #1F67CC 2px;"></div>'
					},{
						
						xtype : 'container',
						height : '100%',
						flex : 1,	
						margin : '0 0 0 95',
						layout : 'hbox',
						items:[
						       
						        {
				xtype : 'container',
				 
				layout : 'vbox',
				
				items : [ {
					
					 xtype:'container',
					 width:250,
     	    	   	height:222,
        	    	   	margin : '30 0 0 10',
        	    	   style:{
			 				 background:'url(../images/grczpt/home/11.png)',
			 			       padding: '10px',
			 			      
			 			 },
			 			items:[
								
								{
									xtype : 'component',
									width : '100%',
									margin : '-12 0 0 0',
									cls : '',
									html : '<div style="width:248px;height:27px;margin-top:-15px;" >'+ 
									'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-top:-5px;width:29px;height:20px;display:inline;text-align:center; line-height:40px;">等级</span>'+
									'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:50px;height:20px;">姓名</span>'+
									'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:65px;height:20px;">成绩</span>'+
									' </div>'
								},
								Ext.create('App.grczpt.dbmjgt.xjph', {
									width : '100%',
									cls : 'scroll-1',
									
									height :200,
									url:'../dictionary/getListsS?grade='+a+'&deptname='+this.inf,
									flex : 1
								})
			 			        ]
        	    	  },
    				
				]}, {
					xtype : 'container',
					 
					layout : 'vbox',
					items : [ {
						
						 xtype:'container',
						 width:250,
	        	    	   	height:222,
	        	    	   	margin : '30 0 0 10',
	        	    	   style:{
				 				 background:'url(../images/grczpt/home/22.png)',
				 			       padding: '10px',
				 			      
				 			 },
				 			items:[
									
									{
										xtype : 'component',
										width : '100%',
										margin : '-12 0 0 0',
										cls : '',
										html : '<div style="width:248px;height:27px;margin-top:-15px;" >'+ 
										'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-top:-5px;width:29px;height:20px;display:inline;text-align:center; line-height:40px;">等级</span>'+
										'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:50px;height:20px;">姓名</span>'+

										'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:65px;height:20px;">成绩</span>'+
										' </div>'
									},
									Ext.create('App.grczpt.dbmjgt.xjph', {
										width : '100%',
										cls : 'scroll-1',
										height :200,
										url:'../dictionary/getListsS?grade='+b+'&deptname='+this.inf,
										flex : 1
									})
				 			        ]
	        	    	  },
	    				
					]},{
				xtype : 'container',
				
				layout : 'vbox',
				items : [ {
					
					 xtype:'container',
					 width:250,
     	    	   	height:222,
        	    	   	margin : '30 0 0 10',
        	    	   style:{
			 				 background:'url(../images/grczpt/home/33.png)',
			 			       padding: '10px',
			 			      
			 			 },
			 			items:[
								
								{
									xtype : 'component',
									width : '100%',
									margin : '-12 0 0 0',
									cls : '',
									html : '<div style="width:248px;height:27px;margin-top:-15px;" >'+ 
									'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-top:-5px;width:29px;height:20px;display:inline;text-align:center; line-height:40px;">等级</span>'+
									'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:50px;height:20px;">姓名</span>'+

									'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:65px;height:20px;">成绩</span>'+
									' </div>'
								},
								Ext.create('App.grczpt.dbmjgt.xjph', {
									width : '100%',
									cls : 'scroll-1',
									height :200,
									url:'../dictionary/getListsS?grade='+c+'&deptname='+this.inf,
									flex : 1
								})
			 			        ]
        	    	  },
    				
				]},{
				xtype : 'container',
				
				layout : 'vbox',
				items : [ {
					
					 xtype:'container',
					 width:250,
     	    	   	height:222,
        	    	   	margin : '30 0 0 10',
        	    	   style:{
			 				 background:'url(../images/grczpt/home/44.png)',
			 			       padding: '10px',
			 			      
			 			 },
			 			items:[
								
								{
									xtype : 'component',
									width : '100%',
									margin : '-12 0 0 0',
									cls : '',
									html : '<div style="width:248px;height:27px;margin-top:-15px;" >'+ 
									'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-top:-5px;width:29px;height:20px;display:inline;text-align:center; line-height:40px;">等级</span>'+
									'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:50px;height:20px;">姓名</span>'+

									'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:65px;height:20px;">成绩</span>'+
									' </div>'
								},
								Ext.create('App.grczpt.dbmjgt.xjph', {
									width : '100%',
									cls : 'scroll-1',
									height :200,
									url:'../dictionary/getListsS?grade='+d+'&deptname='+this.inf,
									flex : 1
								})
			 			        ]
        	    	  },
    				
				]},{
					xtype : 'container',
					 
					layout : 'vbox',
					items : [ {
						
						 xtype:'container',
						 width:250,
	        	    	   	height:222,
	        	    	   	margin : '30 0 0 10',
	        	    	   style:{
				 				 background:'url(../images/grczpt/home/55.png)',
				 			       padding: '10px',
				 			      
				 			 },
				 			items:[
									
									{
										xtype : 'component',
										width : '100%',
										margin : '-12 0 0 0',
										cls : '',
										html : '<div style="width:248px;height:27px;margin-top:-15px;" >'+ 
										'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-top:-5px;width:29px;height:20px;display:inline;text-align:center; line-height:40px;">等级</span>'+
										'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:50px;height:20px;">姓名</span>'+

										'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:65px;height:20px;">成绩</span>'+
										' </div>'
									},
									Ext.create('App.grczpt.dbmjgt.xjph', {
										width : '100%',
										cls : 'scroll-1',
										height :200,
										url:'../dictionary/getListsS?grade='+e+'&deptname='+this.inf,
										flex : 1
									})
				 			        ]
	        	    	  },
	    				
					]},{
						xtype : 'container',
						 
						layout : 'vbox',
						items : [ {
							
							 xtype:'container',
							 width:392,
		        	    	   	height:222,
		        	    	   	margin : '30 0 0 40',
		        	    	   style:{
					 				 background:'url(../images/grczpt/home/66.png)',
					 			       padding: '10px',
					 			      
					 			 },
					 			items:[
										
										{
											xtype : 'component',
											width : '100%',
											margin : '-12 0 0 0',
											cls : '',
											html : '<div style="width:248px;height:27px;margin-top:5px;margin-left:80px;" >'+ 
											'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-top:-5px;width:29px;height:20px;display:inline;text-align:center; line-height:40px;">时间</span>'+
											'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:50px;height:20px;">成绩</span>'+

											'<span style="color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;margin-left:65px;height:20px;">排名</span>'+
											' </div>'
										},
										Ext.create('App.grczpt.dbmjgt.dwxj', {
											width : '100%',
											cls : 'scroll-1',
											height :210,
											url:'../dictionary/getListss?s='+this.inf,
											flex : 1
										})
					 			        ]
		        	    	  },
		    				
						]},/*, {
		        	    		  
		        	    		  margin : '220 0 0 0',
		        					xtype : 'container',
		        					width:460,
		 	        	    	   	height:400,
		 	        	    	   style:{
						 				 background:'url(../images/grczpt/home/3.png)',
						 			       padding: '10px'
						 			 },
		        					
		        					cls : 'x-sp-zhdd-container',
		        					items : [{
										xtype : 'component',
										width : '100%',
										height : 30,				
										cls : 'grczpt-zhpg-title',
										html : '表彰勋章'
									},Ext.create('App.grczpt.dbmjgt.cllsxx', {
										width : '100%',
										height :400,
										cls : 'scroll-1',
										url:'../dictionary/getLists?s='+this.inf,
										flex : 1
									})],
		        					
		        				}*/]},{
		        					xtype : 'container',
		        					height : 93,
		        					width:'100%'
		        				}]
				}],
				}, {/*	xtype : 'container',
					height : '100%',
					flex : 1,
					
					layout : 'vbox',
					items:[{
						
						 xtype:'container',
						 width:460,
	        	    	   	height:400,
	        	    	   
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
										html : '绩效排名'
									},
									{
										xtype : 'component',
										width : '100%',
										margin : '0 0 0 0',
										cls : '',
										html : '<div style="width:300px;height:40px;" >'+ 
										'<span style="color:#59D9FF;font-size:18px; font-family: MicrosoftYaHei;margin-left:15px;width:10px;height:40px;display:inline;text-align:center; line-height:40px;">排名</span>'+
										'<span style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;margin-left:55px;height:40px;">姓名</span>'+
										'<span style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;margin-left:55px;height:40px;">趋势</span>'+
										'<span style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;margin-left:55px;height:40px;">成绩</span>'+
										' </div>'
									},
									Ext.create('App.grczpt.dbmjgt.xjph', {
										width : '100%',
										cls : 'scroll-1',
										height :310,
										url:'../dictionary/getListsS',
										flex : 1
									})
				 			        ]
	        	    	  },  {
	        	    		  
	        	    		  margin : '20 0 0 0',
	        					xtype : 'container',
	        					width:460,
	 	        	    	   	height:400,
	 	        	    	   style:{
					 				 background:'url(../images/grczpt/home/3.png)',
					 			       padding: '10px'
					 			 },
	        					
	        					cls : 'x-sp-zhdd-container',
	        					items : [{
									xtype : 'component',
									width : '100%',
									height : 30,				
									cls : 'grczpt-zhpg-title',
									html : '表彰勋章'
								},Ext.create('App.grczpt.dbmjgt.cllsxx', {
									width : '100%',
									height :400,
									cls : 'scroll-1',
									url:'../dictionary/getLists?s='+this.inf,
									flex : 1
								})],
	        					
	        				}],*/}
						];
			
//			Ext.get('sunPage').dom.contentWindow.document.body.innerHTML=html;

			this.callParent(arguments);
		},

		onSelectionchange : function(node, checked, eOpts) {
			
			if (checked.length > 0) {
				var m = checked[0].get('id');
				this.changeGroup(m, checked[0].get('text'));
			}
		},
		changeGroup : function(groupid, text) {
			Ext.Ajax.request({
	   			url : '../dictionarys/zuzhi',
	   			params : {
	   				TEXT : text
	   			},
	   			method : 'post',
	   			success:function(obj){
	   					console.log(obj.responseText)
//	   					var r=document.getElementById("map")
	   				
					}
	   			});
			
			
		},
	});