//定义编辑对话框
Ext.define('App.grczpt.xxgl.growevent.growContext', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	title : '事件详情',
	autoHigh:true,
	id : 'aa',
	width : 700,
	height : 500,
	buttonAlign : 'center',
	sortable: true,
	initComponent : function() {
		console.log(this.store)
		 this.items = [
		               newForm = Ext.create('Ext.form.FormPanel', {
		            	   layout: 'form',
		            	   bodyStyle: 'padding:35px 35px 35px 35px;',
		            	   buttonAlign: 'center',
		            	   
		                   items: [{
		                	    xtype:'radiogroup',
		               			fieldLabel:'事件类型',
		               			columnWidth:'400',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				text: this.rec.EVENTTYPE
		            				}]
		            			},{
		            				xtype:'radiogroup',
			               			fieldLabel:'事件名称',
			               			columnWidth:'400',
			            			columns:1,
			            			items:[{
			            				xtype: 'label',
			            				text: this.rec.EVENTNAME
			            				}]
		                   },  {
		                	  
		                	   xtype:'radiogroup',
		               			fieldLabel:'事件描述',
		               			columnWidth:'400',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				text: this.rec.EVENTDESC
		            				}]
		                   },{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'创建人',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				text: this.rec.CREATEPEOPLE
		            				}]
		            		},{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'创建时间',
		            			columns:1,
		            			items:[{
		            				xtype: 'label',
		            				text: this.rec.CREATETIME
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
		            		} ],
		               
		               buttons : [ {
				                           text: "确认",
				                           scope : this,
				                           handler: function(){
				                        	   var win = Ext.getCmp('aa');
				                        	   win.close();
				                           }
				                          
				                       }]
		               })];
		               
		
		this.callParent(arguments);
	}, 


});
