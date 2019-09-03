Ext.define('App.SystemSetting.TVWall.newTVWall.Model', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'TVWALLID', type: 'string' },
            { name: 'TVWALLNM', type: 'string' },
            { name: 'INDEXID', type: 'string' }
        ]
});


//定义编辑对话框
Ext.define('App.SystemSetting.TVWall.newTVWall', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    formWidth: 320,
    initComponent: function () {
        var vme = this;
        this.items = [
                {
                    allowBlank: true,
                    name: 'TVWALLID',
                    hidden: true
                },
                {
                    allowBlank: false,
                    fieldLabel: SPLanguage.getMessage("NAME"),
                    name: 'TVWALLNM',
                    emptyText: SPLanguage.getMessage("BNWK")
                },
                {
                    xtype: 'numberfield',
                    allowBlank: false,
                    fieldLabel: SPLanguage.getMessage("SERIALNUM"),
                    name: 'INDEXID',
                    value: 0

                }];
        this.loadRecord = function (rec) {
            var form = vme.down('form');
            form.loadRecord(Ext.create('App.SystemSetting.TVWall.newTVWall.Model', {
                'TVWALLNM': rec[0].get('text'),
                'INDEXID': rec[0].raw.attributes.INDEXID,
                'TVWALLID': rec[0].get('id')
            }));
        };
        this.callParent(arguments);
    }
});

