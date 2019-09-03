//定义编辑对话框
Ext.define('App.SystemSetting.RolePage.RoleInfo', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    height: 422,
    title: SPLanguage.getMessage("USERXX"),
    initComponent: function () {
        this.wizardId = 'userinfo';
        this.items = [
        {
            labelWidth: 80,
            xtype: 'textfield',
            width: 300,
            allowBlank: false,
            fieldLabel: '角色名',
            name: 'ROLENM',
            emptyText: SPLanguage.getMessage("BNWK")
        }];
        this.callParent(arguments);
    },
    onPrev: function () {
    },
    onNext: function () {
        if (this.isValid())
            this.wizard.onSetWizardItemActive('righttypesel');
    },
    onWizardActive: function () {
        this.wizard.setWizardBtnDisabled('prev', true);
        this.wizard.setWizardBtnDisabled('next', false);
    }
});

