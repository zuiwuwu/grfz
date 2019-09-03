Ext.define('App.framework.mes', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	id : 'id',
	autoHigh:true,
	width : 200,
	height : 800,
	modal : false,
	x: 1402,  
	y: 60, 
	 draggable : false,
	style : {
		border : 'none',
			
	},
	
	sortable: true,
	initComponent : function() {

		 this.items = [{
		   			xtype : 'container',
					layout : 'hbox',
					items : [/*this.menus*/{xtype : 'container',
						height : 800,
						width : 200,
						items : [
						         {},Ext.create('App.framework.test',{
						        	 height : '100%',
										width : '100%',
										url : '../GRFZ/recMes?user='+this.sss,
									
										cls : 'scroll-1'
						         })
						]
						}, 
					    {/*
						xtype : 'container',
						height : '100%',
						margins : '0 4',				
						html:'<div style="background:#0D4E93;height:100%;width:1px;"/>'	
												
					*/},{/*xtype : 'container',
						height : '100%',
						width : '100%',
						html : sss,
						items : [
						         
						]
						*/}]}
				];
		 
		 this.callParent(arguments);
		},

	
		/*{
		xtype : 'container',
		width : 182,
		 layout:'vbox',
		height : 800,
			
	
		
		items:[{},Ext.create('App.framework.test', {
			width : '100%',
			
			cls : 'scroll-1',
			
			flex : 1
		})
		]
		
	}*/ 

			
	
	
	save : function(values){
		console.log(this.ss)

		Ext.Ajax
		.request({
			params : {
				CONTEXT:values.CONTEXT,
				RECEIVER:values.RECEIVER,
				SENDPP:this.ss
			}
			,
			url : '../GRFZ/sendMes',
			method : 'POST',
			failure : function() {
				Ext.Msg.hide();			
				Ext.Msg.alert("警告","出现异常，请联系管理员！");					
			},
			success : function(response) {
				Ext.Msg.alert("成功","提交成功！");
				/*var win = Ext.getCmp('id');
				win.close();*/
			}	
		});
		
	}
	
	
});