Ext.define('App.framework.appraise', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	id : 'id',
	title : '自我评价',
	autoHigh:true,
	width : 400,
	height : 300,
	buttonAlign : 'center',
	sortable: true,
	initComponent : function() {
		 this.items = [
		                Ext.create('Ext.form.FormPanel', {
		            	   layout: 'form',
		            	   bodyStyle: 'padding:20px 20px 20px 20px;',
		            	   buttonAlign: 'center',
		            	   
		                   items: [{
		                       xtype: 'textarea',
		                      /* fieldLabel: "自我评价",*/
		                       name: 'DESCRIBE ',
		                       height:180
		                          }],
		               
		             
		               })];
		 
		 this.buttons = [{
                         text: "提交",
                         scope:this, 
                         handler: this.getValues
                     }]
		 this.callParent(arguments);
		},

	
	  
		getValues : function() {
		
		var form = this.down('form');
		var values = form.getValues();
		this.save(values)
       },
			
	
	
	save : function(values){
		Ext.Ajax
		.request({
			params : {
				TEXT : values
			},
			url : '../GRFZ/myAppraise',
			method : 'POST',
			failure : function() {
				Ext.Msg.hide();			
				Ext.Msg.alert("警告","出现异常，请联系管理员！");					
			},
			success : function(response) {		
				Ext.Msg.alert("成功","提交成功！");
				var win = Ext.getCmp('id');
				win.close();
			}	
		});
	}
	
	
});