//定义编辑对话框
Ext.define('App.SystemSetting.UserPage.RightTypeSel', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    height: 422,
    title: '权限设置先择',
    showRoleSel: true,
    initComponent: function () {
        this.wizardId = 'righttypesel';
        this.items = [
        {
            xtype: 'radio',
            hideLabel: true,
            checked: true,
            fieldLabel: '',
            boxLabel: '自定义权限',
            name: 'righttypesel',
            inputValue: 'custom'
        },
        {
            xtype: 'panel',
            border: 0,
            html: '可以自定义每个通道和每个功能的权限。',
            padding: '5 0 5 20'
        },
        {
            xtype: 'radio',
            boxLabel: '权限模板',
            name: 'righttypesel',
            inputValue: 'mod'
        },
        {
            xtype: 'panel',
            border: 0,
            html: '从模板中加载用户所需要的权限。该权限为一次性设置。模板权限的改动不影响用户的权限。选择模板方式后将会把用户的权限改为所选模板的权限,而用户原有的权限将不保留。',
            padding: '5 0 5 20'
        }
//         , {
//             xtype: 'radio',
//             boxLabel: '角色权限',
//             name: 'righttypesel',
//             inputValue: 'role',
//             hidden: !this.showRoleSel
//         },
//         {
//             xtype: 'panel',
//             border: 0,
//             html: '设置用户相应的角色。用户可以选择多个角色。选中角色后用户即拥有角色所拥有的权限。当角色权限改动后用户的权限也相应的改动。',
//             padding: '5 0 5 20',
//             hidden: !this.showRoleSel
//         }
        ];
        this.callParent(arguments);
    },
    onPrev: function () {
        if (this.wizard.rightParams.settype == 'role')
            this.wizard.onSetWizardItemActive('userinfo');
        else
            this.wizard.onSetWizardItemActive('rolesel');
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
        this.wizard.setWizardBtnDisabled('next', false);
    }
});

