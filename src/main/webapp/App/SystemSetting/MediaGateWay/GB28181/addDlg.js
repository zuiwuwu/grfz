//定义编辑对话框
Ext.define('App.SystemSetting.MediaGateWay.GB28181.addDlg', {
    extend: 'App.Common.EditDlg',
    title: '设备属性',
    initComponent: function () {

        var vwidth = 280;
        var vlabelWidth = 90;

        this.items = [
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'DEVICEID',
            fieldLabel: '设备编号',
            width: vwidth,
            value: this.DEVICEID
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            fieldLabel: '设备名称',
            name: 'NAME',
            width: vwidth,
            value: this.NAME
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'MANUFACTURER',
            width: vwidth,
            value: this.MANUFACTURER,
            fieldLabel: '厂家'
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'MODEL',
            width: vwidth,
            value: this.MODEL,
            fieldLabel: '型号'
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'IPADDRESS',
            width: vwidth,
            value: this.IPADDRESS,
            fieldLabel: 'IP地址'
        },
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'PORT',
            width: vwidth,
            value: this.PORT,
            fieldLabel: '端口号'
        }
        ];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent();
    }
});

