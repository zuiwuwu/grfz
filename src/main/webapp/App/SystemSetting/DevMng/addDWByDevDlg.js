
//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.addDWByDevDlg', {
    extend: 'Ext.window.Window',
    title: '点位属性',
    layout: 'fit',
    modal: true,
    url: '../DevMng/CreateDWByDev',
    initComponent: function () {
        this.addEvents(
            'saveok'
        );

        var defaultvalues = Ext.getConfig('addDWByDevDlg', 'default');
        if (!defaultvalues)
            defaultvalues = { DWJD: 0, DWWD: 0 };
        /////////////////////////////////////////////////////////
        //初始化参数
        this.combLDZX = Ext.create('App.Common.ComboBoxDropList', {
            allowBlank: false,
            fieldLabel: '路段走向',
            name: 'LDZX',
            labelWidth: 90,
            value: defaultvalues.LDZX,
            url: '../DWMng/GetLDZXCombo'
        });

        this.combGISPIC = Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: '表现图片',
            name: 'GISPIC',
            labelWidth: 90,
            value: defaultvalues.GISPIC,
            url: '../DWMng/GetDWGISPICCombo'
        });


        this.combDWTYPE = Ext.create('App.Common.ComboBoxDropList', {
            fieldLabel: '点位关联',
            name: 'DWTYPE',
            labelWidth: 90,
            allowBlank: false,
            value: defaultvalues.DWTYPE,
            url: '../DWMng/GetDWTYPECombo'
        });
        this.combDWLX = Ext.create('App.Common.ComboBoxDropList', {
            allowBlank: false,
            fieldLabel: '点位类型',
            name: 'DWLX',
            labelWidth: 90,
            value: defaultvalues.DWLX,
            url: '../DWMng/GetDWLXCombo'
        });
        this.combUNIT = Ext.create('App.Common.ComboBoxDropList', {
            allowBlank: false,
            fieldLabel: SPLanguage.getMessage("GXDW"),
            name: 'GXDWDM',
            labelWidth: 90,
            value: defaultvalues.GXDWDM,
            url: '../UNIT/GetUNITCombo'
        });
        this.items = [
                {
                    xtype: 'form',
                    width: 524,
                    bodyPadding: 10,
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        items: [{
                            xtype: 'container',
                            layout: 'vbox',
                            defaultType: 'textfield',
                            defaults: {
                                width: 320,
                                labelWidth: 90
                            },
                            items: [this.combUNIT,
                        this.combLDZX,
                        this.combGISPIC,
                        this.combDWTYPE,
                        this.combDWLX,
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: '默认经度',
                            name: 'DWJD',
                            value: defaultvalues.DWJD,
                            decimalPrecision: 6,
                            minValue: -180,
                            maxValue: 180,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                        },
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: '默认纬度',
                            name: 'DWWD',
                            value: defaultvalues.DWWD,
                            decimalPrecision: 6,
                            minValue: -90,
                            maxValue: 90,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false
                        },
                        {
                            allowBlank: false,
                            fieldLabel: '联系人',
                            name: 'LXR',
                            value: defaultvalues.LXR
                        },
                        {
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("LXDH"),
                            name: 'LXDH',
                            value: defaultvalues.LXDH
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '24小时有警卡口',
                            name: 'ZBKK',
                            editable: false,
                            value: defaultvalues.ZBKK || '0',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['value', 'name'],
                                data: [{ "value": "0", "name": SPLanguage.getMessage("NO") },
                 { "value": "1", "name": SPLanguage.getMessage("YES")}]
                            }),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value'
                        },
                        {
                            allowBlank: true,
                            fieldLabel: '值班人',
                            name: 'ZBR',
                            value: defaultvalues.ZBR
                        },
                        {
                            allowBlank: true,
                            fieldLabel: SPLanguage.getMessage("ZBDH"),
                            name: 'ZBDH',
                            value: defaultvalues.ZBDH
                        }]
                        }]
                    }
                        ]

                }];

        this.buttons = [
                {
                    text: SPLanguage.getMessage("SURE"),
                    action: 'save',
                    scope: this,
                    handler: this.onOK
                },
                {
                    text: SPLanguage.getMessage("CANCLE"),
                    scope: this,
                    handler: this.close
                }];


        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);

    },
    onOK: function (button) {
        var vme = this;
        var win = button.up('window');
        form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();
        if (!form.isValid())
            return;

        Ext.saveConfig('addDWByDevDlg', 'default', values);
        var myMask = null;

        var url = vme.url;
        var vparams = {};
        myMask = new Ext.LoadMask(vme, { msg: "正在创建点位，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: this.url, //请求地址  
            jsonData: { DEVS: vme.DEVS, CHNS: vme.CHNS, PARAMS: values },
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        vme.fireEvent('saveok', vme);
                        win.close();
                    }
                    else {
                        alert(result.msg);
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    },
    getValues: function () {
        var form = this.down('form');
        var v = form.getValues();
        return v;
    }
});
