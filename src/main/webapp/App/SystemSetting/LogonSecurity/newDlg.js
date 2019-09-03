//定义编辑对话框
Ext.define('App.SystemSetting.LogonSecurity.newDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    formWidth: 320,
    initComponent: function () {
        this.items = [
                        {
                            allowBlank: true,
                            name: 'SCID',
                            hidden: true
                        },
                        {
                            allowBlank: false,
                            fieldLabel: '开始地址',
                            name: 'BEGINIP',
                            emptyText: '192.168.*.*',
                            vtype: 'IPSection'
                        },
                        {
                            allowBlank: true,
                            fieldLabel: '结束地址',
                            name: 'ENDIP',
                            emptyText: '192.168.*.*',
                            vtype: 'IPSection'
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: '',
                            columns: 2,
                            items: [
                { boxLabel: '允许登录', name: 'ENABLELOGON', inputValue: 1, checked: true },
                { boxLabel: '拒绝登录', name: 'ENABLELOGON', inputValue: 0 }
            ]
                        },
                        {
                            xtype: 'radiogroup',
                            fieldLabel: '',
                            columns: 2,
                            items: [
                { boxLabel: SPLanguage.getMessage("QIY"), name: 'ACT', inputValue: 1, checked: true },
                { boxLabel: SPLanguage.getMessage("STOPUSE"), name: 'ACT', inputValue: 0 }
            ]
                        }];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    }
});

