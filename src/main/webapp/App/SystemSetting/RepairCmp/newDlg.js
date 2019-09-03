//定义编辑对话框
Ext.define('App.SystemSetting.RepairCmp.newDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    formWidth: 320,
    initComponent: function () {
        this.items = [
                        {
                            allowBlank: true,
                            fieldLabel: '原编号',
                            name: 'OLDID',
                            hidden: true,
                            value: this.OLDID
                        },
                        {
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("BIANHAO"),
                            name: 'ID',
                            emptyText: SPLanguage.getMessage("BIANHAO")
                        },
                        {
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("NAME"),
                            name: 'CMPNM',
                            emptyText: SPLanguage.getMessage("NAME")
                        }];

        this.callParent(arguments);
    }
});

