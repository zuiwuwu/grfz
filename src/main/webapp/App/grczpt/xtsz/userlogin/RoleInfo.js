//定义编辑对话框
Ext.define('App.grczpt.xtsz.userlogin.RoleInfo', {
    extend: 'App.Common.WizardForm',
//    flex: 1,
    layout :'fit',
    width: 600,
    height: 422,
    title: "用户信息",
    initComponent: function () {
        this.wizardId = 'userinfo';
        
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


		}) ];
        this.callParent(arguments);
    },
    onPrev: function () {
    },
    onNext: function () {
        if (this.isValid())
            this.wizard.onSetWizardItemActive('devright');
    },
    onWizardActive: function () {
        this.wizard.setWizardBtnDisabled('prev', true);
        this.wizard.setWizardBtnDisabled('next', false);
    }
});

