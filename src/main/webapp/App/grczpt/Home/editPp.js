//定义编辑对话框
Ext.define('App.grczpt.Home.editPp', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	title : '编辑',
//	autoScroll: true,
	autoHigh:true,
	width : 800,
	height : 500,
	buttonAlign : 'center',
	sortable: true,
	initComponent : function() {
		
	
		 this.items = [{
	   			xtype : 'container',
				
				items : [{},Ext.create('App.grczpt.Home.mes',{
					        	
									NAME : this.NAME,
//									cls : 'scroll-1'
					         })
					]
					}
			];
		               
		
		this.callParent(arguments);
	}, 
		

		}

);
