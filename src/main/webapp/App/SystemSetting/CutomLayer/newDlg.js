Ext.define('App.SystemSetting.CutomLayer.newDlgModel', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'ID', type: 'string' },
            { name: 'NM', type: 'string' },
            { name: 'CM', type: 'string' },
            { name: 'LXR', type: 'string' },
            { name: 'LXDH', type: 'string' },
            { name: 'PIC', type: 'string' }
        ]
});
//定义编辑对话框
Ext.define('App.SystemSetting.CutomLayer.newDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    initComponent: function () {


        this.PIC = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '图片',
            width: 300,
            labelWidth: 70,
            queryMode: 'local',
            displayField: 'NAME',
            valueField: 'ID',
            editable: false,
            allowBlank: false,
            name: 'PIC',
            emptyText: '请选择',
            //             tpl: Ext.create('Ext.XTemplate',
            //                 '<tpl for=".">',
            //                     '<div class="x-boundlist-item {ICONCLS}">{NAME}</div>',
            //                 '</tpl>'
            //             ),
            //             // template for the content inside text field
            //             displayTpl: Ext.create('Ext.XTemplate',
            //                 '<tpl for=".">',
            //                     '{NAME}',
            //                 '</tpl>'
            //             ),
            store: Ext.create('Ext.data.Store', {
                fields: ['ID', 'NAME', 'ICONCLS'],
                autoLoad: true,
                proxy: {
                    type: 'ajax',
                    actionMethods: 'post',
                    url: '../GISDW/GetDWGISPICCombo',
                    reader: {
                        type: 'json',
                        root: 'rows',
                        successProperty: 'success',
                        totalProperty: 'total'
                    }
                }
            })
        });
        //         this.combGISPIC = Ext.create('App.Common.ComboBoxDropList', {
        //             fieldLabel: '表现图片',
        //             name: 'GISPIC',
        //             labelWidth: 70,
        //             value: Ext.dwmngnewParams.GISPIC,
        //             url: '../DWMng/GetDWGISPICCombo'
        //         });

        this.editDWWZ = Ext.create('Ext.form.field.Text', {
            allowBlank: true,
            fieldLabel: SPLanguage.getMessage("REMARK"),
            name: 'CM',
            value: '',
            width: 300,
            labelWidth: 70
        });


        this.items = [
                            {
                                hidden: true,
                                allowBlank: true,
                                fieldLabel: 'ID',
                                name: 'ID'
                            },
                            {
                                hidden: true,
                                fieldLabel: 'LAYERID',
                                name: 'LAYERID',
                                value: this.LAYERID
                            },
                        {
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("NAME"),
                            name: 'NM',
                            value: '',
                            width: 300,
                            labelWidth: 70
                        },
                        this.editDWWZ,
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '联系人',
                            name: 'LXR',
                            value: '',
                            width: 300,
                            labelWidth: 70
                        },
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: SPLanguage.getMessage("LXDH"),
                            name: 'LXDH',
                            value: '',
                            width: 300,
                            labelWidth: 70
                        },
                        this.PIC];


        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        if (this.modifyMod) {
            var form = this.down('form');
            var vme = this;
            var myMask = new Ext.LoadMask(vme, { msg: "正在加载数据，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../CustomLayer/GetItemInfo',
                params: { ID: this.HOUSEID },
                method: 'post', //方法  
                callback: function (options, success, response) {
                    myMask.hide();
                    vme.loading = false;
                    if (success) {
                        var result = Ext.JSON.decode(response.responseText);

                        form.loadRecord(Ext.create('App.SystemSetting.CutomLayer.newDlgModel',
                    result));
                    }
                    else {
                    }
                }
            });
        }


    },
    getValues: function () {
        var form = this.down('form');
        var values = form.getValues();
        if (this.lng)
            values.X = this.lng;
        if (this.lat)
            values.Y = this.lat;
        return values;
    }
});
