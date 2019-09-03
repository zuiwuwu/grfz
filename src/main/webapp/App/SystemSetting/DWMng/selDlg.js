Ext.define('App.SystemSetting.DWMng.selDlg.combo', {
    extend: 'App.Common.ComboBoxDropList',
    setValue: function (value, doSelect) {
        if (Ext.isString(value)
        && value.length > 0) {
            if (value[value.length - 1] == ',')
                value = value.substr(0, value.length - 1);
            value = value.split(',');
            arguments[0] = value;
        }

        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.DWMng.selDlg', {
    extend: 'App.Common.EditDlg',
    title: '周边视频',
    showsel: true,
    initComponent: function () {
        this.addEvents(
            'saveok'
        );

        var v = Ext.getConfig('DWMngnewDlg', 'zbsp');
        this.combDWGISTYPE = Ext.create('App.SystemSetting.DWMng.selDlg.combo', {
            allowBlank: true,
            fieldLabel: '点位分类',
            name: 'DWGISTYPE',
            width: 300,
            multiSelect: true,
            value: v ? v.DWGISTYPE : null,
            url: '../DWMng/GetDWGISTypeCombo'
        });
        this.items = [this.combDWGISTYPE,
        {
            xtype: 'numberfield',
            name: 'DISTANCE',
            width: 300,
            fieldLabel: SPLanguage.getMessage("DISTANCE"),
            value: v ? v.DISTANCE : 3
        },
        {
            xtype: 'fieldcontainer',
            defaultType: 'radiofield',
            width: 300,
            hidden: this.showsel ? false : true,
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel: '实时浏览视频',
                    name: 'SHOWTYPE',
                    inputValue: '0',
                    checked: true
                },
                {
                    boxLabel: '回放历史录像',
                    name: 'SHOWTYPE',
                    inputValue: '1'
                }
            ]
        }];

        this.callParent(arguments);
    },
    getValues: function () {
        var form = this.down('form');
        var values = form.getValues();
        Ext.saveConfig('DWMngnewDlg', 'zbsp', values);
        var v = values.DWGISTYPE;
        if (Ext.isArray(v)) {
            var DWGISTYPE = '';
            for (var i = 0; i < v.length; i++) {
                DWGISTYPE += v[i] + ',';
            }
            values.DWGISTYPE = DWGISTYPE;
        }
        return values;
    }
});
