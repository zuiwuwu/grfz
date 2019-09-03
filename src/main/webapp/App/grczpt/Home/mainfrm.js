Ext.define('App.grczpt.Home.mainfrm', {
			extend : 'Ext.Panel',
			border : false,
//			 autoScroll: true,
			layout : 'vbox',
			width : '100%',
			height : '100%',
			menus : [],
			// minHeight: 768,
			// minWidth: 1024,
			initComponent : function() {
				console.log(this.NAME+123)
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
			
				var items = [/*{
							xtype : 'component',
							cls : 'x-sp-main-title-logo',
							height : 50,
							width : 50
						},*/ 
						
						
						];
				
				for (var i = 0; i < this.menus.length; i++) {
					this.menus[i] = Ext.create('Ext.Component',{
								cls : 'x-sp-main-top-btn',
								overCls : 'x-sp-main-top-btn-hover',
								padding : '0 20 0 20',
								height : 50,
								minWidth : '100%',
								html : this.menus[i].text,
								url : this.menus[i].url
							});
					items.push(this.menus[i]);
				}
				
								

				
				this.top = Ext.create('Ext.Container', {
							height : 50,
							width : '100%',
							layout : 'hbox',
							cls : 'x-sp-main-title',
							items : items
						});
				
				
				return this.top;
			},
			
			
			
/*			out:function(){
				document.location.href="../grfz/index"; 
			},*/
			
			
			
			
			
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
									
									NAME : this.NAME
								}));
			}
		});
