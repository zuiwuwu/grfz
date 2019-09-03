//定义编辑对话框
Ext.define('App.grczpt.xtsz.growevent.addGrow', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	title : '添加事件信息',
	id : 'aa',
	autoHigh:true,
	width : 700,
	height : 500,
	buttonAlign : 'center',
	sortable: true,
	initComponent : function() {
		console.log(this.ss)
		 this.items = [
		               newForm = Ext.create('Ext.form.FormPanel', {
		            	   layout: 'form',
		            	   bodyStyle: 'padding:35px 35px 35px 35px;',
		            	   buttonAlign: 'center',
		            	   
		                   items: [{
		                	    xtype:'radiogroup',//单选分组
		               			fieldLabel:'事件类型',
		               			columnWidth:'400',
		            			columns:4,
		            			items:[{
		            					xtype:'radiofield',
		            					boxLabel :'普通事件',
		            					inputValue:'普通事件',
		            					checked:true,
		            					name:'EVENTTYPE'
		            				},{
		            					xtype:'radiofield',
		            					boxLabel :'任务型事件',
		            					inputValue:'任务型事件',
		            					name:'EVENTTYPE'
		            				},{
		            					xtype:'radiofield',
		            					boxLabel :'里程碑事件',
		            					inputValue:'里程碑事件',
		            					name:'EVENTTYPE'
		            				},{
		            					xtype:'radiofield',
		            					boxLabel :'其他',
		            					inputValue:'其他',
		            					name:'EVENTTYPE'
		            				}]
		            			},{
		                       xtype: 'textfield',
		                       fieldLabel: '事件名称',
		                       name: 'EVENTNAME',		                       

		                   },  {
		                	  
		                       xtype: 'textarea',
		                       fieldLabel: "事件描述",
		                       name: 'EVENTDESC',
		                       height: 60

		                   },{
		                	   xtype: 'textfield',
		                       fieldLabel: '创建人',
		                       name: 'CREATEPEOPLE',	
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
		               
		               buttons : [
				                      
				                       {
				                    	   id:'saveok',
				                           text: "确认保存",
				                           scope : this,
				                           handler: this.getValues
				                           
				                       },
				                       {
				                           text: "取消重置",
				                           
				                           handler: function(){
				                        	   var win = Ext.getCmp('aa');
				                   			win.close();
				                           }
				                       }]
		               })];
		               
		
		this.callParent(arguments);
	}, 

	getValues:function()
		{
		var form = this.down('form');
		var vme = this;

		var values =  form.getValues();
		
		console.log(values);
		Ext.MessageBox.show({
			 msg:'正在请求数据，请稍后',
			 progressText:'正在请求数据',
			 width:300,
			 wait: true
		 });
		Ext.Ajax.request({
   			url : '../growevent/addField',
   			params : values,
   			method : 'post',
   			failure:function(){
         						Ext.MessageBox.hide();
         						Ext.Msg.alert("警告","出现异常，请联系管理员！");
         					},
         		success:function(){
         			        						
         						Ext.MessageBox.hide();
         						Ext.Msg.alert("成功","添加成功！");
         					}
	                        });
			var win = Ext.getCmp('aa');
			win.close();
			this.ss.reload();			

		}

});
