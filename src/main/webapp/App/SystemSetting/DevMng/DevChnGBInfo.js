Ext.define('App.SystemSetting.DevMng.DevChnGBInfo', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 400,
    height: 320,
    title: '设备信息',
    initComponent: function () {
        var me = this;
        var states1 = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [{
                "id": "32", "name": "江苏省"
            }]
        });
        var states2 = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [{
                "id": "00", "name": "南京市"
            }]
        });
        var states3 = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [{
                "id": "00", "name": "鼓楼区"
            }]
        });
        var states4 = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [{
                "id": "00", "name": "社会治安路面接入"
            }]
        });
        var states5 = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [{
                "id": "111", "name": "DVR编码"
            }]
        });
        // Create the combo box, attached to the states data store
        var combo1 = Ext.create('Ext.form.ComboBox', {
            labelWidth: 50,
            labelAlign: 'right',
            fieldLabel: '省/市',
            store: states1,
            allowBlank: false,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            width: 120
        });
        var combo2 = Ext.create('Ext.form.ComboBox', {
            labelWidth: 30,
            labelAlign: 'right',
            fieldLabel: '市',
            store: states2,
            queryMode: 'local',
            allowBlank: false,
            displayField: 'name',
            valueField: 'id',
            width: 120
        });
        var combo3 = Ext.create('Ext.form.ComboBox', {
            labelWidth: 30,
            labelAlign: 'right',
            fieldLabel: '区',
            store: states3,
            queryMode: 'local',
            allowBlank: false,
            displayField: 'name',
            valueField: 'id',
            width: 120
        });
        var combo4 = Ext.create('Ext.form.NumberField', {
            labelWidth: 60,
            labelAlign: 'right',
            fieldLabel: '基层代码',
            allowBlank: false,
            hideTrigger: true,
            width: 100,
            allowDecimals: false,
            allowNegative: false,                //不允许输入负数  
            maxValue: 99,
            minValue: 0
        });
        var combo5 = Ext.create('Ext.form.ComboBox', {
            labelWidth: 80,
            labelAlign: 'right',
            fieldLabel: '行业编号',
            store: states4,
            queryMode: 'local',
            allowBlank: false,
            displayField: 'name',
            valueField: 'id',
            width: 250
        });
        var combo6 = Ext.create('Ext.form.ComboBox', {
            labelWidth: 80,
            labelAlign: 'right',
            fieldLabel: '类型编号',
            store: states5,
            queryMode: 'local',
            allowBlank: false,
            displayField: 'name',
            valueField: 'id',
            width: 250
        });
        var combo7 = Ext.create('Ext.form.NumberField', {
            labelWidth: 80,
            labelAlign: 'right',
            fieldLabel: '自定义编号',
            allowBlank: false,
            hideTrigger: true,
            width: 250,
            allowDecimals: false,
            allowNegative: false,                //不允许输入负数  
            maxValue: 999999,
            minValue: 0
        });
        this.numberDlg = Ext.create('Ext.window.Window', {
            title: '设备编号',
            width: 500,
            height: 200,
            padding: 5,
            layout: 'fit',
            items: [{
                layout: 'form',
                items: [{
                    border: 0,
                    layout: 'column', items: [combo1, combo2, combo3, combo4]
                }, {
                    border: 0,
                    layout: 'column', items: [combo5]
                }, {
                    border: 0,
                    layout: 'column', items: [combo6]
                }, {
                    border: 0,
                    layout: 'column', items: [combo7]
                }]
            }],
            buttons: [{ text: SPLanguage.getMessage("SURE"), scope: this, handler: function () {
                this.numberDlg.close();
            }
            }],
            listeners: {
                scope: me,
                close: function () {
                    var jksbbh = combo1.getValue() + combo2.getValue() + combo3.getValue();
                    this.jksbbh.setValue(jksbbh);
                }
            },
            closeAction: 'hide'
        });
        this.jksbbh = Ext.create('Ext.form.field.Text', {
            labelWidth: 70,
            width: 300,
            allowBlank: false,
            fieldLabel: '设备编号',
            name: 'JKSBBH',
            listeners: {
                scope: me,
                focus: function () {
                    this.numberDlg.show();
                }
            }
        });
        this.items = [this.jksbbh, {
            labelWidth: 70,
            xtype: 'textfield',
            width: 300,
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("SBMC"),
            name: 'CHNNAME',
            emptyText: SPLanguage.getMessage("BNWK")
        }];
        this.callParent(arguments);
    },
    onPrev: function () {
    },
    onNext: function () {

    },
    onWizardInit: function () {

    },
    onWizardActive: function () {


    },
    onCompanySelect: function (combo, records, eOpts) {


    },
    onDevTypeSelect: function (combo, records, eOpts) {


    },
    onDevTypeLoad: function (store) {

    }
});