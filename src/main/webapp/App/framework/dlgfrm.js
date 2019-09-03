Ext.define('App.framework.dlgfrm', {
			extend : 'Ext.Container',
			border : false,
			layout : {
				type : 'hbox',
				pack : 'center'
			},
			margin : '10 0 10 0',
			padding : '10 10 10 10',
			cls : 'x-sp-main-dlgbk',
			width: '100%',
			flex: 1,
			initComponent : function() {

				this.items = [{
					xtype : 'container',
					layout : 'vbox',
					width : 600,
					// height: 500,
					cls : 'x-sp-main-dlg',
					items : [{
								xtype : 'component',
								html : '对话框测试',
								cls : 'x-sp-main-dlg-title',
								height : 40,
								width : '100%'
							}, {
								xtype : 'form',
								bodyPadding : 10,
								border : false,
								width : '100%',
								defaultType : 'textfield',
								defaults : {
									anchor : '100%'
								},
								items : [Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '所属部门'
												}),
										Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '用户名'
												}),
										Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '真实姓名'
												}),
										Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '密码'
												}),
										Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '请重复密码'
												}),
										Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '职位'
												}),
										Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '分组'
												}),
										Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '邮箱'
												}),
										Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '源代码账号'
												}),
										Ext.create('Ext.form.field.Text', {
													width : '100%',
													labelAlign : 'right',
													fieldLabel : '性别'
												})]
							}, {
								xtype : 'container',
								padding : '0 0 20 0',
								layout : {
									type : 'hbox',
									pack : 'center'
								},
								width : '100%',
								cls : 'x-sp-main-dlg-bottom',
								items : [{
											xtype : 'button',
											width : 78,
											height : 26,
											margin : '0 10 0 10',
											text : '保存'
										}, {
											xtype : 'button',
											width : 78,
											height : 26,
											margin : '0 10 0 10',
											text : '返回'
										}]
							}]
				}];
				this.callParent(arguments);
			},
			afterRender : function() {
				this.callParent(arguments);
			}
		});
