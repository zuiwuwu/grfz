//定义编辑对话框
Ext.define('App.SystemSetting.CutomLayer.addIconDlg', {
    extend: 'App.Common.EditDlg',
    title: '图标属性',
    width: 764,
    url: '../GIS/AddPIC',
    initComponent: function () {

        var vstatus = ['normal', 'hover', 'dis', 'dishover'];

        this.statusimage = {};

        this.items = [
            {
                xtype: 'textfield',
                hidden: true,
                allowBlank: true,
                fieldLabel: 'GISPIC',
                name: 'GISPIC',
                value: this.GISPIC
            },
            {
                xtype: 'textfield',
                allowBlank: false,
                fieldLabel: SPLanguage.getMessage("NAME"),
                name: 'PICNAME',
                value: '',
                width: '100%',
                labelWidth: 70
            }];

        for (var i = 0; i < vstatus.length; i++) {
            this.statusimage[vstatus[i]] = { url: Ext.create('Ext.form.field.Text',
                {
                    allowBlank: false,
                    fieldLabel: '图片路径',
                    name: vstatus[i] + '_url',
                    value: '',
                    flex: 1,
                    labelWidth: 70
                }),
                img: Ext.create('Ext.Img',
                {
                })
            };
            this.items.push(
            {
                xtype: 'fieldset',
                title: vstatus[i],
                columnWidth: 0.5,
                layout: 'hbox',
                width: '100%',
                padding: 10,
                items: [
                {
                    xtype: 'container',
                    layout: 'anchor',
                    flex: 1,
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        width: '100%',
                        items: [this.statusimage[vstatus[i]].url,
                    {
                        xtype: 'button',
                        text: SPLanguage.getMessage("SCTP"),
                        scope: this,
                        statusid: vstatus[i],
                        handler: function (btn) {
                            var vme = this;
                            var statusid = btn.statusid;
                            Ext.create('App.Common.UploadFileDlg', {
                                url: '../GIS/UploadPIC',
                                ID: statusid,
                                listeners: {
                                    scope: this,
                                    saveok: function (result) {
                                        this.statusimage[statusid].img.setSrc(result.filename);
                                        this.statusimage[statusid].url.setValue(result.filename);
                                    }
                                }
                            }).show();
                        }
                    }]
                    },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: '大小',
                        labelWidth: 40,
                        layout: 'hbox',
                        width: 220,
                        padding: '8 0 0 0',
                        items: [{
                            xtype: 'component',
                            padding: '4 4 0 0',
                            html: '宽'
                        }, {
                            xtype: 'numberfield',
                            allowBlank: false,
                            name: vstatus[i] + '_width',
                            value: 40,
                            width: 60
                        },
                    {
                        xtype: 'component',
                        padding: '4 4 0 4',
                        html: '高'
                    },
                    {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: vstatus[i] + '_height',
                        value: 40,
                        width: 60
                    }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: '中心点',
                        labelWidth: 40,
                        layout: 'hbox',
                        width: 220,
                        padding: '8 0 0 0',
                        items: [{
                            xtype: 'component',
                            padding: '4 4 0 0',
                            html: 'X'
                        }, {
                            xtype: 'numberfield',
                            allowBlank: false,
                            name: vstatus[i] + '_centerx',
                            value: 16,
                            width: 60
                        },
                    {
                        xtype: 'component',
                        padding: '4 4 0 4',
                        html: 'Y'
                    },
                    {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: vstatus[i] + '_centery',
                        value: 16,
                        width: 60
                    }]
                    },
                    {
                        xtype: 'fieldcontainer',
                        fieldLabel: '位置',
                        labelWidth: 40,
                        layout: 'hbox',
                        width: 220,
                        padding: '8 0 0 0',
                        items: [{
                            xtype: 'component',
                            padding: '4 4 0 0',
                            html: 'X'
                        }, {
                            xtype: 'numberfield',
                            allowBlank: false,
                            name: vstatus[i] + '_x',
                            value: 0,
                            width: 60
                        },
                    {
                        xtype: 'component',
                        padding: '4 4 0 4',
                        html: 'Y'
                    },
                    {
                        xtype: 'numberfield',
                        allowBlank: false,
                        name: vstatus[i] + '_y',
                        value: 0,
                        width: 60
                    }]
                    }]
                }]
                },
                {
                    xtype: 'container',
                    layout: 'absolute',
                    width: 64,
                    margin: '0 0 0 15',
                    height: 64,
                    items: [this.statusimage[vstatus[i]].img]
                }


                ]
            });
        }
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        if (this.GISPIC) {
            var form = this.down('form');
            var vme = this;
            var myMask = new Ext.LoadMask(vme, { msg: "正在加载数据，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../GIS/GetPIC',
                params: { GISPIC: this.GISPIC },
                method: 'post', //方法  
                scope: this,
                callback: function (options, success, response) {
                    myMask.hide();
                    vme.loading = false;
                    if (success) {
                        var result = Ext.JSON.decode(response.responseText);

                        if (result.ICON) {
                            for (var item in result.ICON) {
                                var statusicon = result.ICON[item];
                                if (typeof statusicon != 'function'
                                && statusicon) {
                                    result[item + '_url'] = statusicon.url;
                                    result[item + '_width'] = statusicon.width;
                                    result[item + '_height'] = statusicon.height;
                                    result[item + '_centerx'] = statusicon.centerx;
                                    result[item + '_centery'] = statusicon.centery;
                                    result[item + '_x'] = statusicon.x;
                                    result[item + '_y'] = statusicon.y;
                                    if (this.statusimage[item]) {
                                        this.statusimage[item].img.setSrc(statusicon.url);
                                    }

                                }
                            }
                        }

                        form.getForm().setValues(result);
                    }
                    else {
                    }
                }
            });
        }
    },
    getValues: function () {
        var form = this.down('form');
        var v = {};
        var values = form.getValues();
        var ICON = {};
        for (var item in values) {
            var value = values[item];
            if (typeof value != 'function') {
                if (item.indexOf('_') != -1) {
                    item = item.split('_');
                    if (item.length == 2) {
                        if (!ICON[item[0]]) {
                            ICON[item[0]] = {};
                        }
                        var status = ICON[item[0]];
                        status[item[1]] = value;
                    }
                }
                else {
                    v[item] = value;
                }
            }
        }
        v.ICON = Ext.JSON.encode(ICON);
        return v;
    }
});
