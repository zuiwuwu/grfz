//定义编辑对话框
Ext.define('App.grczpt.xxgl.point.RoleInfo', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    height: 422,
    title: "维度信息",
    initComponent: function () {
        this.wizardId = 'userinfo';
//        console.log(this.wizard.rightParams.ID)
        this.items = [
        {
            labelWidth: 120,
            xtype: 'textfield',
            width: 300,
            allowBlank: false,
            fieldLabel: '事件积分规则名称',
            name: 'ROLENM',
            
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

