Ext.define('App.grczpt.xxgl.dimensionmanage.dimensiondetailed', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	title : '维度详情',
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
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'维度名称',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',		    
		            				text: vme.data.NAME
		            				}]
		            		},{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'维度信息',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		           
		            				text: vme.data.DESCRIBE
		            				}]
		            		},{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'创建人',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				
		            				text: vme.data.UPDATEMAN
		            				}]
		            		},{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'创建时间',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				
		            				text: vme.data.CREATETIEM
		            				}]
		            		},{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'创建单位',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				
		            				text: vme.data.UPDATETIME
		            				}]
		            		} ],
		               
		             
		               })];
		
		 this.callParent(arguments);
		},


});