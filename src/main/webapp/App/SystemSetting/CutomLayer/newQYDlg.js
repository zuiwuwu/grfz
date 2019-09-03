//定义编辑对话框
Ext.define('App.SystemSetting.CutomLayer.newQYDlg', {
    extend: 'App.Common.EditDlg',
    title: '企业属性',
    initComponent: function () {

        this.imageday = Ext.create('Ext.Img', {
            src: '',
            width: '100%',
            height: 140,
            style: {
                'border-width': '1px',
                'border-style': 'solid',
                'border-color': '#d0d0d0'
            }
        });
        this.imagedayrul = Ext.create('Ext.form.field.Text', {
            name: 'DAYPICURL',
            allowBlank: true,
            hidden: true
        });
        this.daypic =
        {
            padding: '10 0 0 10',
            xtype: 'container',
            layout: 'vbox',
            width: 200,
            height: 200,
            items: [
                {
                    xtype: 'component',
                    html: '白天图片'
                },
                this.imageday,
                this.imagedayrul,
                {
                    xtype: 'container',
                    layout: 'vbox',
                    width: '100%',
                    padding: '10 0 0 0',
                    items: [
                    {
                        xtype: 'component',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        text: SPLanguage.getMessage("SCTP"),
                        height: 20,
                        width: 60,
                        scope: this,
                        handler: this.onUploadDayImage
                    }
                    ]
                }]
        };

        this.imagenight = Ext.create('Ext.Img', {
            src: '',
            width: '100%',
            height: 140,
            style: {
                'border-width': '1px',
                'border-style': 'solid',
                'border-color': '#d0d0d0'
            }
        });
        this.imagenightrul = Ext.create('Ext.form.field.Text', {
            name: 'NIGHTPICURL',
            allowBlank: true,
            hidden: true
        });
        this.nightpic =
        {
            padding: '10 0 0 10',
            xtype: 'container',
            layout: 'vbox',
            width: 200,
            height: 200,
            items: [
            {
                xtype: 'component',
                html: '晚上图片'
            },
            this.imagenight,
            this.imagenightrul,
                {
                    xtype: 'container',
                    layout: 'vbox',
                    width: '100%',
                    padding: '10 0 0 0',
                    items: [
                    {
                        xtype: 'component',
                        flex: 1
                    },
                    {
                        xtype: 'button',
                        text: SPLanguage.getMessage("SCTP"),
                        height: 20,
                        width: 60,
                        scope: this,
                        handler: this.onUploadNightImage
                    }
                    ]
                }]
        };

        var labelWidth = 120;
        var width = 350;
        this.PIC = Ext.create('Ext.form.ComboBox', {
            fieldLabel: '图片',
            width: width,
            labelWidth: labelWidth,
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
            fieldLabel: SPLanguage.getMessage("ADDR"),
            name: 'CM',
            value: '',
            width: width + width + 10,
            labelWidth: labelWidth
        });

        var vdefaultcomb = {
            labelWidth: labelWidth,
            xtype: 'combobox',
            width: width,
            editable: false,
            value: '0',
            store: Ext.create('Ext.data.Store', {
                fields: ['value', 'name'],
                data: [{ "value": "0", "name": SPLanguage.getMessage("NO") },
                 { "value": "1", "name": SPLanguage.getMessage("YES")}]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value'
        };

        if (this.LAYERTYPE == 1) {
            this.title = '企业属性';
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
                            width: width + width + 10,
                            labelWidth: labelWidth
                        },
                        this.editDWWZ,
                        {
                            hidden: true,
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("LONGITUDE"),
                            name: 'X',
                            value: this.lng,
                            decimalPrecision: 6,
                            minValue: -180,
                            maxValue: 180,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            width: width,
                            labelWidth: labelWidth
                        },
                        {
                            hidden: true,
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("LATITUDE"),
                            name: 'Y',
                            value: this.lat,
                            decimalPrecision: 6,
                            minValue: -90,
                            maxValue: 90,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            width: width,
                            labelWidth: labelWidth
                        },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                {
                                    xtype: 'container',
                                    layout: 'anchor',
                                    padding: '0 10 0 0',
                                    items: [
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '负责人',
                            name: 'LXR',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '安保负责人',
                            name: 'ABFZR',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        {
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: '员工数',
                            name: 'YGRS',
                            value: 0,
                            width: width,
                            labelWidth: labelWidth
                        },
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '是否有技防设施',
                            name: 'SFYJF'
                        }, vdefaultcomb),
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '是否是涉毒企业',
                            name: 'SFSD'
                        }, vdefaultcomb),
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '是否签署消防、危险品等责任书',
                            name: 'SFQSXF'
                        }, vdefaultcomb)]
                                }, {
                                    xtype: 'container',
                                    layout: 'anchor',
                                    items: [
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '负责人电话',
                            name: 'LXDH',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '安保负责人电话',
                            name: 'ABFZRDH',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        {
                            labelWidth: labelWidth,
                            xtype: 'combobox',
                            width: width,
                            editable: false,
                            value: '1',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['value', 'name'],
                                data: [{ "value": "1", "name": "一级" },
                 { "value": "2", "name": "二级" },
                 { "value": "3", "name": "三级" },
                 { "value": "4", "name": "四级" },
                 { "value": "5", "name": "五级"}]
                            }),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            allowBlank: true,
                            fieldLabel: '消防级别',
                            name: 'XFDJ'
                        },
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '是否参加联动单位',
                            name: 'SFLD'
                        }, vdefaultcomb),
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '是否是视频实战平台单位',
                            name: 'SFSZPTDW'
                        }, vdefaultcomb),
                        this.PIC]
                                }]
                            },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            width: 400,
                            height: 200,
                            items: [this.daypic, this.nightpic]
                        }];

        }
                    else if (this.LAYERTYPE == 2) {
                        this.title = '行政属性';
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
                            width: width + width + 10,
                            labelWidth: labelWidth
                        },
                        this.editDWWZ,
                        {
                            hidden: true,
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("LONGITUDE"),
                            name: 'X',
                            value: this.lng,
                            decimalPrecision: 6,
                            minValue: -180,
                            maxValue: 180,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            width: width,
                            labelWidth: labelWidth
                        },
                        {
                            hidden: true,
                            xtype: 'numberfield',
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("LATITUDE"),
                            name: 'Y',
                            value: this.lat,
                            decimalPrecision: 6,
                            minValue: -90,
                            maxValue: 90,
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            width: width,
                            labelWidth: labelWidth
                        },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                {
                                    xtype: 'container',
                                    layout: 'anchor',
                                    padding: '0 10 0 0',
                                    items: [
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '负责人',
                            name: 'LXR',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '组织机构代码',
                            name: 'JGDM',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '是否有技防设施',
                            name: 'SFYJF'
                        }, vdefaultcomb)]
                                }, {
                                    xtype: 'container',
                                    layout: 'anchor',
                                    items: [
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '负责人电话',
                            name: 'LXDH',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        this.PIC]
                                }]
                            },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            width: 400,
                            height: 200,
                            items: [this.daypic, this.nightpic]
                        }];

                    }
                    else if (this.LAYERTYPE == 3) {
                        this.title = '小区属性';
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
                            width: width + width + 10,
                            labelWidth: labelWidth
                        },
                        this.editDWWZ,
                       
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                {
                                    xtype: 'container',
                                    layout: 'anchor',
                                    padding: '0 10 0 0',
                                    items: [
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '负责人',
                            name: 'LXR',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '是否有技防设施',
                            name: 'SFYJF'
                        }, vdefaultcomb),
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '巡逻区域',
                            name: 'SFXLQ'
                        }, vdefaultcomb)]
                                }, {
                                    xtype: 'container',
                                    layout: 'anchor',
                                    items: [
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '负责人电话',
                            name: 'LXDH',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '是否参加联动单位',
                            name: 'SFLD'
                        }, vdefaultcomb),
                        this.PIC]
                                }]
                            },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            width: 400,
                            height: 200,
                            items: [this.daypic, this.nightpic]
                        }];
                    }
                    else if (this.LAYERTYPE == 4) {
                        this.title = '场所属性';
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
                            width: width + width + 10,
                            labelWidth: labelWidth
                        },
                        this.editDWWZ,
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                {
                                    xtype: 'container',
                                    layout: 'anchor',
                                    padding: '0 10 0 0',
                                    items: [
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '法人',
                            name: 'LXR',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        Ext.apply({
                            allowBlank: true,
                            fieldLabel: '是否是涉毒企业',
                            name: 'SFSD'
                        }, vdefaultcomb)]
                                }, {
                                    xtype: 'container',
                                    layout: 'anchor',
                                    items: [
                        {
                            xtype: 'textfield',
                            allowBlank: true,
                            fieldLabel: '负责人电话',
                            name: 'LXDH',
                            value: '',
                            width: width,
                            labelWidth: labelWidth
                        },
                        {
                            labelWidth: labelWidth,
                            xtype: 'combobox',
                            width: width,
                            editable: false,
                            value: '1',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['value', 'name'],
                                data: [{ "value": "1", "name": "一级" },
                 { "value": "2", "name": "二级" },
                 { "value": "3", "name": "三级" },
                 { "value": "4", "name": "四级" },
                 { "value": "5", "name": "五级"}]
                            }),
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'value',
                            allowBlank: true,
                            fieldLabel: '消防级别',
                            name: 'XFDJ'
                        },
                        this.PIC]
                                }]
                            },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            width: 400,
                            height: 200,
                            items: [this.daypic, this.nightpic]
                        }];
                    }




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

                        form.loadRecord(Ext.create('App.SystemSetting.CutomLayer.layerIconModel', result));
                        vme.imageday.setSrc('../CustomLayer/GetPic?filename=' + result.DAYPICURL);
                        vme.imagenight.setSrc('../CustomLayer/GetPic?filename=' + result.NIGHTPICURL);
                    }
                    else {
                    }
                }
            });
        }
    },
    onUploadDayImage: function () {
        var vme = this;
        Ext.create('App.Common.UploadFileDlg', {
            url: '../CustomLayer/UploadFile',
            ID: '',
            listeners: {
                scope: this,
                saveok: function (result) {
                    vme.imageday.setSrc('../CustomLayer/GetPic?filename=' + result.filename);
                    vme.imagedayrul.setValue(result.filename);
                }
            }
        }).show();
    },
    onUploadNightImage: function () {
        var vme = this;
        Ext.create('App.Common.UploadFileDlg', {
            url: '../CustomLayer/UploadFile',
            ID: '',
            listeners: {
                scope: this,
                saveok: function (result) {
                    vme.imagenight.setSrc('../CustomLayer/GetPic?filename=' + result.filename);
                    vme.imagenightrul.setValue(result.filename);
                }
            }
        }).show();
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
