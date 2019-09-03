//定义编辑对话框
Ext.define('App.SystemSetting.ZD.newDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    formWidth: 320,
    initComponent: function () {
        this.items = [
                        {
                            allowBlank: false,
                            name: 'ZDTYPE',
                            hidden: true,
                            value: this.ZDTYPE
                        },
                        {
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("BIANHAO"),
                            name: 'ZDIDVALUE',
                            emptyText: SPLanguage.getMessage("BIANHAO")
                        },
                        {
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("NAME"),
                            name: 'ZDNAMEVALUE',
                            emptyText: SPLanguage.getMessage("NAME")
                        }];

        this.callParent(arguments);
    }
});

