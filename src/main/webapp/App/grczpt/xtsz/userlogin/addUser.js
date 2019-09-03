//定义编辑对话框
Ext.define('App.grczpt.xtsz.userlogin.addUser', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	title : '添加用户信息',
	id : 'aa',
	autoHigh : true,
	width : 700,
	height : 500,
	buttonAlign : 'center',
	sortable : true,
	initComponent : function() {
		console.log(this.ss)
		this.items = [ newForm = Ext.create('Ext.form.FormPanel', {
			layout : 'form',
			bodyStyle : 'padding:35px 35px 35px 35px;',
			buttonAlign : 'center',

			items : [ {
				xtype : 'container',

				margin : '30 0 0 0',
				layout : 'hbox',

				items : [ {
					xtype : 'textfield',
					fieldLabel : '用户名',
					name : 'USERNAME',
					allowBlank : false,
					labelWidth : 50,
				}, {

					xtype : 'textfield',
					fieldLabel : "真实姓名",
					name : 'XM',
					margin : '0 0 0 40',
					labelWidth : 60,
					allowBlank : false,
				} ],
			}, {
				xtype : 'container',

				margin : '30 0 0 0',
				layout : 'vbox',

				items : [ {

					xtype : 'textfield',
					fieldLabel : '密码',
					name : 'password1',
					inputType : 'password',
					allowBlank : false,
					labelWidth : 50,
				}, {
					xtype : 'textfield',
					fieldLabel : '确认密码',
					margin : '30 0 0 0',
					inputType : 'password',
					allowBlank : false,
					labelWidth : 60,
					name : 'password2',
				} ]
			} ],

			buttons : [

			{
				id : 'saveok',
				text : "确认保存",
				scope : this,
				handler : this.getValues

			}, {
				text : "取消重置",

				handler : function() {
					var win = Ext.getCmp('aa');
					win.close();
				}
			} ]
		}) ];

		this.callParent(arguments);
	},

	getValues : function() {
		var form = this.down('form');
		var vme = this;

		var values = form.getValues();
		if (values.password1 !== values.password2) {

			Ext.Msg.alert("警告", "2次密码不一致，请重新输入！");
			return;
		}

		console.log(values);
		Ext.MessageBox.show({
			msg : '正在请求数据，请稍后',
			progressText : '正在请求数据',
			width : 300,
			wait : true
		});
		Ext.Ajax.request({
			url : '../user/addLists',
			params : values,
			method : 'post',
			failure : function(response) {
				console.log(response)
				Ext.MessageBox.hide();
				Ext.Msg.alert("警告", "出现异常，请联系管理员！");
			},
			success : function() {

				Ext.MessageBox.hide();
				Ext.Msg.alert("成功", "添加成功！");
			}
		});
		var win = Ext.getCmp('aa');
		win.close();
		this.store.reload();

	}

});
