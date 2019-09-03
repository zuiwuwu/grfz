//定义编辑对话框
Ext.define('App.SystemSetting.TempRight.Info', {
			extend : 'App.Common.WizardForm',
			flex : 1,
			width : 600,
			height : 422,
			title : '申请信息',
			initComponent : function() {
				this.wizardId = 'userinfo';
				this.items = [Ext.create('SZPT.view.ui.DateTimeBox', {
									labelWidth : 80,
									width : 300,
									allowBlank : false,
									fieldLabel : '开始时间',
									name : 'KSSJ',
									value : new Date()
								}), Ext.create('SZPT.view.ui.DateTimeBox', {
									labelWidth : 80,
									width : 300,
									allowBlank : false,
									fieldLabel : '截止时间',
									name : 'JSSJ'
								}), {
							labelWidth : 80,
							width : 500,
							allowBlank : false,
							xtype : 'textareafield',
							name : 'SQYY',
							fieldLabel : '申请原因'
						}];
				this.callParent(arguments);
			},
			onPrev : function() {
			},
			onNext : function() {
				if (this.isValid())
					this.wizard.onSetWizardItemActive('functionright');
			},
			onWizardActive : function() {
				this.wizard.setWizardBtnDisabled('prev', true);
				this.wizard.setWizardBtnDisabled('next', false);
			}
		});
