Ext.define('App.framework.mainfrm', {
			extend : 'Ext.Panel',
			border : false,
			// autoScroll: true,
			layout : 'vbox',
			height : '100%',
			systemname : '个人成长平台',
			menus : [],
			// minHeight: 768,
			// minWidth: 1024,
			initComponent : function() {
				console.log(this.ss)
				this.items = [this.createTitle(),this.workpanel];
				this.callParent(arguments);
			},
			afterRender : function() {
				this.callParent(arguments);
				this.mon(this.top.el, {
							scope : this,
							click : this.onFirstMenuClick
						});
				// this.mon(this.secondmenu.el, {
				// scope : this,
				// click : this.onSecondMenuClick
				// });
				// if (this.firstmenu.items.length > 0) {
				// this.firstmenuselitem = this.firstmenu.items.getAt(0);
				// }
				// if (this.secondmenu.items.length > 0) {
				// this.secondmenuselitem = this.secondmenu.items.getAt(0);
				// }
				// if (this.secondmenuselitem)
				// this.showSecondMenuItem(this.secondmenuselitem);
				//
				// if (this.url) {
				// Ext.Ajax.request({
				// url : this.url,
				// params : {
				// },
				// method : 'post',
				// scope : this,
				// callback : function(options, success, response) {
				// if (success) {
				// var result = Ext.JSON
				// .decode(response.responseText);
				// this.loadMenu(result);
				// }
				// }
				// });
				// }
				if(this.menus.length > 0)
				{
					this.changeWorkPanel(this.menus[0]);
				}
			},
			
			
			createTitle : function() {
				var vme = this;
				
				vme.result = [];
		
				
				vme.ssd = '';
			
				Ext.Ajax.request({
		    		url : '../grxq/getName',
		   			method : 'get', 
		   			params : {
		   			},
		   			async: false,//是否异步请求
		   			scope:this,
		   			callback : function(options, success, response) {
		   				if (success) {
		   					if (response.responseText&& response.responseText != '') {
		   						vme.result = Ext.JSON.decode(response.responseText);
		   						console.log(vme.result[0].NAME)
		   					}
		   				} else {
		   				}
		   			}
		   		});
				
				var pull = {
						ssq : function(){
							Ext.Ajax.request({
					    		url : '../GRFZ/recMess',
					   			method : 'post', 
					   			params : {
					   			NAME : vme.result[0].NAME
					   			},
					   			async: false,//是否异步请求
					   			scope:this,
					   			
					   			callback : function(options, success, response) {
					   				if (success) {
					   					
					   					if (response.responseText == '全部已读') {
				   							console.log(111)
				   							vme.ssd = 'message';
//				   							document.getElementById('dv').setAttribute('src','../images/message.png')
//				   							document.getElementById('dv').src("../images/message.png" )
				   							
										}else{
											console.log(222)
											vme.ssd = 'news_xhdpi';
											
//											document.getElementById('dv').setAttribute('src','../images/news_xhdpi.png')
											
										}
					   						
					   					
					   				} else {
					   				}
					   			}
					   		},8000);
						}
				};
				pull.ssq();
				
				var items = [/*{
							xtype : 'component',
							cls : 'x-sp-main-title-logo',
							height : 50,
							width : 50
						},*/ {
							xtype : 'component',
							cls : 'x-sp-main-top-lefttext',
							padding : '0 20 0 20',
							height : 50,
							minWidth : 110,
							html : this.systemname
						},
						
						
						];
				
				for (var i = 0; i < this.menus.length; i++) {
					this.menus[i] = Ext.create('Ext.Component',{
								cls : 'x-sp-main-top-btn',
								overCls : 'x-sp-main-top-btn-hover',
								padding : '0 20 0 20',
								height : 50,
								minWidth : 110,
								html : this.menus[i].text,
								url : this.menus[i].url
							});
					items.push(this.menus[i]);
				}
				items.push({
							xtype : 'component',
							flex : 1
						});
				
				items.push({
					xtype : 'button',
					cls : 'x-sp-main-top-right-btn-menu',
					overCls : 'x-sp-main-top-right-btn-menu-hover',
					padding : '0 20 0 20',
					height : 50,
					name : 'ssa',
					minWidth : 110,
					html : '<img id = "dv" src = "../images/message.png" />',
				/*	 autoEl: {  
					        tag: 'img',    //指定为img标签  
					        src: '../images/'+vme.ssd+'.png'    //指定url路径  
					    }  ,
					    listeners : {
					    	render : function(p) {
								// Append the Panel to the click handler's argument
								// list.
					    		
					    		Ext.getCmp('dvw').getEl().dom.src = '../images/'+vme.ssd+'.png' 
							}
					    },*/
//					icon: "../images/message.png", 
					menu : [{
						//iconCls : 'icon-add',
						
						cls : 'x-sp-main-top-right-btn-menu',
						overCls : 'x-sp-main-top-right-btn-menu-hover',
						height : 40,
						//minWidth : 20,
						padding : '0 0 0 0',
						margin:'0 0 0 0',
						text : '互动',
						scope : this,
						
	                    handler : function(){
	        				Ext.create('App.framework.password', {
	        					ss : vme.result[0].NAME
	        				}).show();
	        			},
					/*	menu:[{
							xtype : 'container',
							margin:'0 0 0 0',
							hideOnClick: false,
		                    focusOnSelect: true,
		                    allowOtherMenus: true,
							height : 800,
							cls : 'x-sp-main-top-right-btn-menu',
							overCls : 'x-sp-main-top-right-btn-menu-hover',
							minWidth : 250,
						
							items:[{
			                       xtype: 'label',
			                       text: '互动',
			                       		                       

			                   },{
			                       xtype: 'textfield',
			                       fieldLabel: '内容',
			                       name: 'EVENTNAME',		                       

			                   },  {
			                	  
			                       xtype: 'textarea',
			                       fieldLabel: "接收人",
			                       name: 'EVENTDESC',
			                       height: 60

			                   }]
						}]*/
					},{
						//iconCls : 'icon-add',
						
						cls : 'x-sp-main-top-right-btn-menu',
						overCls : 'x-sp-main-top-right-btn-menu-hover',
						height : 40,
						//minWidth : 20,
						padding : '0 0 0 0',
						margin:'0 0 0 0',
						listener : {
							
						},
						text : '消息',
						scope : this,
						handler : function(){
	        				Ext.create('App.framework.mes', {
	        					sss : vme.result[0].NAME
	        				}).show();
	        			},
					}]
				});

				items.push(	
					{
					xtype : 'button',
					cls : 'x-sp-main-top-right-btn-menu',
					overCls : 'x-sp-main-top-right-btn-menu-hover',
					padding : '0 20 0 20',
					height : 50,
					minWidth : 110,
					html : vme.result[0].NAME,
					menu : [{
						//iconCls : 'icon-add',
						cls : 'x-sp-main-top-right-btn-menu',
						overCls : 'x-sp-main-top-right-btn-menu-hover',
						height : 40,
						//minWidth : 20,
						padding : '0 0 0 0',
						margin:'0 0 0 0',
						text : '修改密码',
						scope : this,
						//handler : this.changePassword
					},{
						//iconCls : 'icon-add',
						cls : 'x-sp-main-top-right-btn-menu',
						overCls : 'x-sp-main-top-right-btn-menu-hover',
						height : 40,
						//minWidth : 20,
						padding : '0 0 0 0',
						margin:'0 0 0 0',
						text : '退出',
						scope : this,
						handler : this.out
					}]
				});
								

				
				this.top = Ext.create('Ext.Container', {
							height : 50,
							width : '100%',
							layout : 'hbox',
							cls : 'x-sp-main-title',
							items : items
						});
				
				var task = { //Ext的定时器，每隔2秒刷新store。  
					    run : function() {
//					    	debugger
					    	pull.ssq();
					    	console.log(document.getElementById('dv'))
					    	console.log(vme.ssd)
					    	if (vme.ssd == 'message') {
					   							
					   					
					   							document.getElementById('dv').setAttribute('src','../images/message.png')
//					   							document.getElementById('dv').src("../images/message.png" )
					   							
											}else{
												
											
												
												document.getElementById('dv').setAttribute('src','../images/messageinfo.png')
												
											}
					    	
					    	/*this.top = Ext.create('Ext.Container', {
								height : 50,
								width : '100%',
								layout : 'hbox',
								cls : 'x-sp-main-title',
								items : items
							});*/
					
					
//					return this.top;
					    },   
					    interval : 5000   
					    // 2 second   
					} 

				/*var runner = new Ext.util.TaskRunner();
				runner.start(task);*/
				
				
				return this.top;
			},
			
			
			test : function() {
				Ext.create('App.framework.appraise', {
				}).show();
			},
			
			out:function(){
				document.location.href="../grfz/index"; 
			},
			
			
			changePassword : function(){
				Ext.create('App.framework.password', {
				}).show();
			},
			
			
			
			onFirstMenuClick : function(e) {
				var node = e.getTarget('.x-sp-main-top-btn');
				if (!node)
					return;
				node = Ext.getCmp(node.id);
				if (!node)
					return;
				this.changeWorkPanel(node);
			},
			changeWorkPanel : function(node) {
				if (this.firstmenuselitem)
					this.firstmenuselitem.removeCls('x-sp-main-top-btn-sel');
				this.firstmenuselitem = node;
				this.firstmenuselitem.addCls('x-sp-main-top-btn-sel');
				if (this.workpanel) {
					this.remove(this.workpanel);
				}
				this.workpanel = this.insert(this.items.length, Ext.create(
								node.url, {
									flex : 1,
									width : '100%',
									ss : this.ss
								}));
			}
		});
