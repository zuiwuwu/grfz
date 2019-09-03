//定义编辑对话框
Ext.define('App.SystemSetting.IPConvert.newDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    formWidth: 320,
    initComponent: function () {
        this.items = [
                        {
                            allowBlank: true,
                            name: 'ID',
                            hidden: true
                        },
                        {
                            allowBlank: false,
                            fieldLabel: '包含IP地址',
                            name: 'INCLUDEIP',
                            emptyText: '192.168.*.*',
                            vtype: 'IPSection'
                        },
                        {
                            allowBlank: true,
                            fieldLabel: '排除IP地址',
                            name: 'EXCLUDEIP',
                            emptyText: '',
                            vtype: 'IPSection'
                        },
                        {
                            allowBlank: false,
                            fieldLabel: '源IP地址',
                            name: 'SRCIP',
                            emptyText: '192.168.1.88',
                            vtype: 'IPAddress'
                        },
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: '源端口',
                            name: 'SRCPORT',
                            minValue:0,
                            value: 0
                        },
                        {
                            allowBlank: false,
                            fieldLabel: '目的IP地址',
                            name: 'DESTIP',
                            value: '127.0.0.1',
                            vtype: 'IPAddress'
                        },
                        {
                            xtype:'numberfield',
                            allowBlank: false,
                            fieldLabel: '目的端口',
                            name: 'DESTPORT',
                            minValue:0,
                            value: 0
                        }];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    }
});

