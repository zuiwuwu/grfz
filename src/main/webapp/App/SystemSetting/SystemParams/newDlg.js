//定义编辑对话框
Ext.define('App.SystemSetting.SystemParams.newDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    formWidth: 320,
    initComponent: function () {
        this.items = [
                        {
                            allowBlank: false,
                            fieldLabel: '参数名',
                            name: 'PARAMNAME',
                            emptyText: '参数名'
                        },
                        {
                            allowBlank: true,
                            fieldLabel: SPLanguage.getMessage("REMARK"),
                            name: 'PARAMDESC'
                        },
                        {
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("NUM"),
                            name: 'PARAMVALUE',
                            emptyText: SPLanguage.getMessage("NUM")
                        }];

        this.callParent(arguments);
    }
});

