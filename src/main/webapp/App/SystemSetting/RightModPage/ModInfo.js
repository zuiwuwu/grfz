//定义编辑对话框
Ext.define('App.SystemSetting.RightModPage.ModInfo', {
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
            fieldLabel: '模板名',
            name: 'MODNM',
            emptyText: SPLanguage.getMessage("BNWK")
        },
        {
            labelWidth: 80,
            xtype: 'textfield',
            width: 300,
            allowBlank: true,
            fieldLabel: SPLanguage.getMessage("REMARK"),
            name: 'MODDESC',
            emptyText: ''
        }];
        this.callParent(arguments);
    },
    onPrev: function () {
    },
    onNext: function () {
        if (this.isValid())
            this.wizard.onSetWizardItemActive('functionright');
    },
    onWizardActive: function () {
        this.wizard.setWizardBtnDisabled('prev', true);
        this.wizard.setWizardBtnDisabled('next', false);
    }
});

