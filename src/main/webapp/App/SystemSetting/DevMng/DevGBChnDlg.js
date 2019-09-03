Ext.define('App.SystemSetting.DevMng.DevGBChnDlg.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    forceSelection: true,
    editable: false,
    emptyText: '请选择',
    displayField: 'NAME',
    valueField: 'ID',
    queryMode: 'local',
    autoSelect: true,
    url: '',
    initComponent: function () {
        var vme = this;
        this.store = new Ext.data.Store({
            autoLoad: true,
            remoteFilter: true,
            listeners: {
                scope: this,
                load: function (store, records, successful, eOpts) {
                    this.setValue(this.lastValue);
                }
            },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.url,
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                }
            },
            fields: [{
                name: 'ID'
            }, {
                name: 'NAME'
            }]
        });

        this.callParent(arguments);
    },
    setFilter: function (id) {
        if (id == ''
        || !id) {
            this.store.clearFilter();
        }
        else {
            this.store.clearFilter(true);
            this.store.filter([{
                property: 'id',
                value: id
            }]);
        }

    }
});


Ext.define('App.SystemSetting.DevMng.DevGBChnDlg', {
    extend: 'App.Common.EditDlg',
    title: 'GB编号',
    initComponent: function () {
        var vdefault = Ext.commonparams.GB28181AREA + '00001320000000';
        if (!this.JKSBBH)
            this.JKSBBH = vdefault;

        if (this.JKSBBH.length < 20) {
            this.JKSBBH = vdefault.substr(0, 20 - this.JKSBBH.length) + this.JKSBBH;
        }

        var vwidth = 300;
        this.CJBH = Ext.create('App.SystemSetting.DevMng.DevGBChnDlg.ComboBox',
        {
            fieldLabel: '市级编号',
            url: '../DevMng/GetGB28181QJBH',
            name: 'CJBH',
            value: this.JKSBBH.substr(0, 4),
            width: vwidth,
            listeners:
            {
                scope: this,
                select: function (combo, records, eOpts) {
                    this.QJBH.setFilter((records.length > 0) ? records[0].get('ID') : '');
                    this.onBHChange();
                }
            }
        });

        this.QJBH = Ext.create('App.SystemSetting.DevMng.DevGBChnDlg.ComboBox',
        {
            fieldLabel: '区级编号',
            url: '../DevMng/GetGB28181QJBH',
            name: 'QXJBH',
            value: this.JKSBBH.substr(0, 6),
            width: vwidth,
            listeners:
            {
                scope: this,
                select: function (combo, records, eOpts) {
                    this.onBHChange();
                }
            }
        });


        var states = Ext.create('Ext.data.Store', {
            fields: ['ID', 'NAME'],
            data: [
        { "ID": "0", "NAME": "监控报警专网01" },
        { "ID": "1", "NAME": "监控报警专网02" },
        { "ID": "2", "NAME": "监控报警专网03" },
        { "ID": "3", "NAME": "监控报警专网04" },
        { "ID": "4", "NAME": "监控报警专网05" },
        { "ID": "5", "NAME": "公安信息网" },
        { "ID": "6", "NAME": "政务网" },
        { "ID": "7", "NAME": "Internet网" },
        { "ID": "8", "NAME": "社会资源接入网" },
        { "ID": "9", "NAME": SPLanguage.getMessage("QT") }
    ]
        });

        this.WLBS = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '网络标识',
            store: states,
            queryMode: 'local',
            valueField: 'ID',
            displayField: 'NAME',
            name: 'WLBS',
            value: this.JKSBBH.substr(13, 1),
            width: vwidth,
            listeners:
            {
                scope: this,
                select: function (combo, records, eOpts) {
                    this.onBHChange();
                }
            }
        });
        this.items = [
        Ext.create('App.SystemSetting.DevMng.DevGBChnDlg.ComboBox',
        {
            fieldLabel: '省级编号',
            url: '../DevMng/GetGB28181SJBH',
            name: 'SJBH',
            value: this.JKSBBH.substr(0, 2),
            width: vwidth,
            listeners:
            {
                scope: this,
                select: function (combo, records, eOpts) {
                    this.CJBH.setFilter((records.length > 0) ? records[0].get('ID') : '');

                    this.onBHChange();
                }
            }
        }),
        this.CJBH,
        this.QJBH,
        {
            xtype: 'textfield',
            fieldLabel: '基层编号',
            maxLength: 2,
            value: this.JKSBBH.substr(6, 2),
            width: vwidth,
            name: 'JCBH',
            vtype: 'BH',
            textlength: 2,
            vtypeText: '必须输入2位数字',
            listeners:
            {
                scope: this,
                blur: function (t, The, eOpts) {
                    if (parseInt(t.getValue()))
                        t.setValue(Ext.String.leftPad(parseInt(t.getValue()), 2, '0').substr(0, 2));
                    else
                        t.setValue('00');
                },
                change: function () {
                    this.onBHChange();
                }
            }
        },
        Ext.create('App.SystemSetting.DevMng.DevGBChnDlg.ComboBox',
        {
            fieldLabel: '行业编码',
            url: '../DevMng/GetGB28181HYBH',
            name: 'HYBH',
            value: this.JKSBBH.substr(8, 2),
            width: vwidth,
            listeners:
            {
                scope: this,
                select: function (combo, records, eOpts) {
                    this.onBHChange();
                }
            }
        }),
        Ext.create('App.SystemSetting.DevMng.DevGBChnDlg.ComboBox',
        {
            fieldLabel: '类型编码',
            url: '../DevMng/GetGB28181SBLXBH',
            name: 'SBLXBH',
            value: this.JKSBBH.substr(10, 3),
            width: vwidth,
            listeners:
            {
                scope: this,
                select: function (combo, records, eOpts) {
                    this.onBHChange();
                }
            }
        }),
        this.WLBS,
        {
            xtype: 'textfield',
            fieldLabel: '流水号',
            maxLength: 6,
            width: vwidth,
            value: this.JKSBBH.substr(14, 6),
            name: 'XH',
            vtype: 'BH',
            textlength: 6,
            vtypeText: '必须输入6位数字流水号',
            listeners:
            {
                scope: this,
                blur: function (t, The, eOpts) {
                    if (parseInt(t.getValue()))
                        t.setValue(Ext.String.leftPad(parseInt(t.getValue()), 6, '0').substr(0, 6));
                    else
                        t.setValue('000000');
                },
                change: function () {
                    this.onBHChange();
                }
            }
        }
        ];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);

        this.CJBH.setFilter(this.JKSBBH.substr(0, 2));
        this.QJBH.setFilter(this.JKSBBH.substr(0, 4));

        this.setTitle('GB28181编号（' + this.JKSBBH + '）');
    },
    onSave: function (button) {
        var vme = this;
        //var win = button.up('window');
        if (!this.isValid())
            return;
        var values = vme.getValues();
        vme.fireEvent('saveok', vme, this.getBH());
        vme.close();
    },
    getBH: function () {
        var values = this.getValues();

        var bh = '';
        if (values.SJBH)
            bh += values.SJBH;
        else
            bh += '00';
        if (values.CJBH)
            bh += values.CJBH.substr(2, 2);
        else
            bh += '00';
        if (values.QXJBH)
            bh += values.QXJBH.substr(4, 2);
        else
            bh += '00';
        if (values.JCBH) {
            if (parseInt(values.JCBH))
                bh += Ext.String.leftPad(parseInt(values.JCBH), 2, '0').substr(0, 2);
            else
                bh += '00';
        }
        else
            bh += '00';
        if (values.HYBH)
            bh += values.HYBH;
        else
            bh += '00';
        if (values.SBLXBH)
            bh += values.SBLXBH;
        else
            bh += '000';
        if (values.WLBS)
            bh += values.WLBS;
        else
            bh += '0';
        if (values.XH) {
            if (parseInt(values.XH))
                bh += Ext.String.leftPad(parseInt(values.XH), 6, '0').substr(0, 6);
            else
                bh += '000000';
        }
        else
            bh += '000000';
        return bh;
    },
    onBHChange: function () {
        this.setTitle('GB28181编号（' + this.getBH() + '）');
    }
});