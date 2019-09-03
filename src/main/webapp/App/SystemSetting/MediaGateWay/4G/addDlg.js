//定义编辑对话框
Ext.define('App.SystemSetting.MediaGateWay.4G.addDlg', {
    extend: 'App.Common.EditDlg',
    title: '下级网关属相',
    initComponent: function () {

        var vwidth = 280;
        var vlabelWidth = 90;

        this.items = [
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'ID',
            width: vwidth,
            hidden: true,
            value: this.ID
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'LOWERSVR',
            width: vwidth,
            hidden: true,
            value: this.LOWERSVR
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'SVRID',
            width: vwidth,
            value: this.SVRID,
            fieldLabel: '编号',
            allowBlank: false
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'SVRNAME',
            width: vwidth,
            value: this.SVRNAME,
            fieldLabel: '名称',
            allowBlank: false
        }
        ];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent();
    }
});

