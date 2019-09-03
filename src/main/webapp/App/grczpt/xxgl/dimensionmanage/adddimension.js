Ext.define('App.grczpt.xxgl.dimensionmanage.adddimension', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	id : 'aa',
	title : '添加维度',
	autoHigh:true,
	width : 700,
	height : 500,
	buttonAlign : 'center',
	sortable: true,
	initComponent : function() {
		 this.items = [
		                Ext.create('Ext.form.FormPanel', {
		            	   layout: 'form',
		            	   bodyStyle: 'padding:35px 35px 35px 35px;',
		            	   buttonAlign: 'center',
		            	   
		                   items: [{
		                       xtype: 'textfield',
		                       fieldLabel: '维度名称',
		                       name: 'NAME',
		                       allowBlank: false,
		                     

		                   }, {
		                	  
		                       xtype: 'textarea',
		                       fieldLabel: "维度描述",
		                       name: 'DESCRIBE ',
		                       height: 60

		                   },/*{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'创建人',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				id: 'myFieldId',
		            				text: '赵先生'
		            				}]
		            		},{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'创建时间',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				id: 'myFieldId2',
		            				text: '2017.9.18'
		            				}]
		            		},{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'创建单位',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				id: 'myFieldId3',
		            				text: '高新区公安局'
		            				}]
		            		} */],
		               
		             
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
		var vme = this;
		var form = this.down('form');
		var values = form.getValues();
		this.save(values)
       },
			
	
	
	save : function(values){
	
		var vme = this.sss;
		Ext.Ajax
		.request({
			params : {
				values : values
			},
			url : '../dimension/adddimension',
			method : 'POST',
			failure : function() {
				Ext.Msg.hide();			
				Ext.Msg.alert("警告","出现异常，请联系管理员！");					
			},
			success : function(response) {		
				Ext.Msg.alert("成功","保存成功！");
				/*vme.list.store.reload();*/
				var win = Ext.getCmp('aa');
				win.close();
				vme.reload();
			}	
		});
	}
	
	
});