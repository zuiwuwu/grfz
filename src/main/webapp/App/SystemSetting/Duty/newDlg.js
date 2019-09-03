Ext.define('App.SystemSetting.Duty.newDlg', {
    extend: 'App.Common.EditDlg',
    title: '值班属性',
    initComponent: function () {
        this.items = [{
            xtype: 'datefield',
            allowBlank: false,
            fieldLabel: '值班日期',
            name: 'DUTYDATE',
            labelWidth: 90,
            format: SPLanguage.getMessage("TIMEFORMAT3"),
            width: 580,
            value: new Date()
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: '领导人',
            name: 'LEADER',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: false,
            fieldLabel: '值班长',
            name: 'MEMBER',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: SPLanguage.getMessage("ZBDH"),
            name: 'DUTYTELEPHONE',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '值班人员',
            name: 'ZBRY',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '国保',
            name: 'GB',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '刑大',
            name: 'XD',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '机要',
            name: 'JY',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '情报中心',
            name: 'QBZX',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '法制',
            name: 'FZ',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '科技',
            name: 'KJ',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '网安',
            name: 'WA',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '公文印章',
            name: 'GWYZ',
            labelWidth: 90,
            width: 580
        },
        {
            xtype: 'textfield',
            allowBlank: true,
            fieldLabel: '驾驶员',
            name: 'JSY',
            labelWidth: 90,
            width: 580
        }];
        this.callParent(arguments);
    }
});
