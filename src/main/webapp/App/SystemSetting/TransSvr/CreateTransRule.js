//定义编辑对话框
Ext.define('App.SystemSetting.TransSvr.CreateTransRule', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    height: 422,
    title: '权限设置先择',
    showRoleSel: true,
    initComponent: function () {
        this.wizardId = 'createtransrule';
        this.items = [
        {
            xtype: 'checkbox',
            boxLabel: '自动创建转发规则',
            name: 'CREATETRANSRULE',
            inputValue: true,
            uncheckedValue: false,
        },
        {
            xtype: 'panel',
            border: 0,
            html: '自动从转发服务器的信息中创建转发规则，创建的规则名称将和转发服务器的名称形同。如果已存在相同名称的转发规则将跳过。实时浏览和录像回放都将自动设置为从转发服务器转发。',
            padding: '5 0 5 20'
        }, {
            xtype: 'checkbox',
            boxLabel: '自动关联转发规则',
            name: 'AUTOSETTANSRULE',
            inputValue: true,
            uncheckedValue: false,
        },
        {
            xtype: 'panel',
            border: 0,
            html: '流媒体的录像通道将自动关联使用该流媒体服务器进行实时视频转发和录像回放的转发规则。',
            padding: '5 0 5 20',
            hidden: !this.showRoleSel
        }];
        this.callParent(arguments);
    },
    onPrev: function () {
        this.wizard.onSetWizardItemActive('recchn');
    },
    onNext: function () {
        var values = this.getValues();
        if (values.righttypesel == 'custom') {
            this.wizard.onSetWizardItemActive('functionright');
        }
        else if (values.righttypesel == 'mod') {
            this.wizard.onSetWizardItemActive('rightmod');
        }
        else if (values.righttypesel == 'role') {
            this.wizard.onSetWizardItemActive('rolesel');
        }
    },
    onWizardActive: function () {
        this.wizard.setWizardBtnDisabled('prev', false);
        this.wizard.setWizardBtnDisabled('next', true);
    }
});

