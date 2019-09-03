Ext.define('App.framework.password', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	
	title : '互动',
	autoHigh:true,
	width : 300,
	height : 800,
	modal : false,
	x: 1602,  
	y: 60, 
	 draggable : false,
	style : {
		border : 'none'
	},
	buttonAlign : 'center',
	sortable: true,
	initComponent : function() {
		
		this.RECEIVER = Ext.create('App.Common.AutoComplete',{
	        name : 'RECEIVER',
	        margin : '0 0 0 10',
	        labelWidth : 50,
			width : 150,
			height : 20,
	        hideLabel: false,
	        fieldLabel : '接收人',
	        url: '../listCombo/listUser',
	        displayField: 'XM',
	        valueField: 'XM',
	        hideTrigger: false,
	        queryPageSize: 10000,
	        fields: ['XM']
	    });
		
		 this.items = [
		                Ext.create('Ext.form.FormPanel', {
		            	   layout: 'form',
		            	   bodyStyle: 'padding:20px 20px 20px 20px;',
		            	   buttonAlign: 'center',
		            	   
		                   items: [{
		                       xtype: 'textarea',
		                       fieldLabel: '内容',
		                       name: 'CONTEXT',		                       

		                   },  this.RECEIVER,{
		                	   xtype: 'button',
	                    	   id:'saveok',
	                    	   margin : '30 0 0 190',
	                    	   width : 64,
	                    	   height:25,
	                           text: "提交",
	                           scope : this,
	                           handler: this.getValues
	                           
	                       }],
		               
		             
		               })];
		 
		 this.callParent(arguments);
		},

	
	  
		getValues : function() {
		var form = this.down('form');
		var values = form.getValues();
		this.save(values)
       },
			
	
	
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