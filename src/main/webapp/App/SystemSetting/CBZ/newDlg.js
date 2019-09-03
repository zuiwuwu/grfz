//定义编辑对话框
Ext.define('App.SystemSetting.CBZ.newDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    initComponent: function () {

        this.combGISPIC = Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: '表现图片',
            name: 'GISPIC',
            labelWidth: 70,
            width: 300,
            url: '../DWMng/GetDWGISPICCombo'
        });
        this.items = [
                            {
                                hidden: true,
                                allowBlank: true,
                                fieldLabel: 'CBZID',
                                name: 'CBZID',
                                value: this.CBZID
                            },
                        {
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("NAME"),
                            name: 'CBZNM',
                            width: 300,
                            labelWidth: 70
                        },
                        {
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("ADDR"),
                            name: 'CBZWZ',
                            width: 300,
                            labelWidth: 70
                        },
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("LONGITUDE"),
                            name: 'CBZJD',
                            value: 0,
                            decimalPrecision: 6,
                            minValue: -180,
                            maxValue: 180,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            width: 300,
                            labelWidth: 70
                        },
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("LONGITUDE"),
                            name: 'CBZWD',
                            value: 0,
                            decimalPrecision: 6,
                            minValue: -90,
                            maxValue: 90,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            width: 300,
                            labelWidth: 70
                        },
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '联系人',
                            name: 'LXR',
                            width: 300,
                            labelWidth: 70
                        },
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: SPLanguage.getMessage("LXDH"),
                            name: 'LXDH',
                            width: 300,
                            labelWidth: 70
                        },
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: '最小倍数',
                            name: 'MINZOOM',
                            value: 0,
                            minValue: 0,
                            maxValue: 20,
                            width: 300,
                            labelWidth: 70
                        },
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: '最大倍数',
                            name: 'MAXZOOM',
                            value: 20,
                            minValue: 0,
                            maxValue: 20,
                            width: 300,
                            labelWidth: 70
                        },
                        this.combGISPIC];


        this.callParent(arguments);
    }
});
