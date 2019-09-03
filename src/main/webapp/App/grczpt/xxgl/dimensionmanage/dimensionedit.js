Ext.define('App.grczpt.xxgl.dimensionmanage.dimensionedit', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	title : '修改维度',
	id : 'aa',
	autoHigh:true,
	width : 700,
	height : 500,
	buttonAlign : 'center',
	sortable: true,
	initComponent : function() {
		
		var vme = this.rec;
		 this.items = [
		                Ext.create('Ext.form.FormPanel', {
		            	   layout: 'form',
		            	   bodyStyle: 'padding:35px 35px 35px 35px;',
		            	   buttonAlign: 'center',
		            	   
		                   items: [{
								xtype : 'textfield',
								allowBlank : false,
								fieldLabel : '修改维度名称',
								name : 'NAME',
								value : vme.data.NAME,
								
								
							},{
								xtype : 'textfield',
								allowBlank : false,
								fieldLabel : '修改维度信息',
								name : 'DESCRIBE',
								value : vme.data.DESCRIBE,
								
							},{
								xtype : 'textfield',
								allowBlank : false,
								fieldLabel : '修改人',
								name : 'UPDATEMAN',
								value : vme.data.UPDATEMAN,
							
							}],
		               
		             
		               })];
		 this.buttons = [

                     {
                         text: "确认保存",
                         scope:this, 
                         handler: this.getValues
                     },
                     {
                         text: "取消重置",
                         
                         handler: function(){
                      	   var win = Ext.getCmp('aa');
                 			win.close();
                         }
                     }]
		 this.callParent(arguments);
		},

	
	  
		getValues : function() {
			debugger;
		var vme = this.rec;
		var upID = vme.data.ID;
		var form = this.down('form');
		var values = form.getValues();
		this.save(values,upID)
       },
			
	
	
	save : function(values,upID){
		var vme = this.sss;
		Ext.Ajax
		.request({
			params : {
				values : values,
				ID:upID
			},
			url : '../dimension/updatedimension',
			method : 'POST',
			failure : function() {
				Ext.Msg.hide();			
				Ext.Msg.alert("警告","出现异常，请联系管理员！");					
			},
			success : function(response) {			
				Ext.Msg.alert("成功","保存成功！");
				var win = Ext.getCmp('aa');
				win.close();
				vme.reload();
			}	
		});
	}
	
	
});