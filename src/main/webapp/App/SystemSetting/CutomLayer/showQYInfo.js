
//定义编辑对话框
Ext.define('App.SystemSetting.CutomLayer.showQYInfo', {
    extend: 'Ext.Container',
    layout: 'absolute',
    border: 1,
    width: 0,
    x: 0,
    y: 0,
    initComponent: function () {
        var me = this;
        var info;
        if (this.LAYERTYPE == 2) {
            //行政
            info = [{
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '地址：' + this.CM
            },
            {
                xtype: 'container',
                width: '100%',
                layout: 'hbox',
                items: [{
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [{
                        xtype: 'component',
                        cls: 'x-showdwinfo-text',
                        width: '100%',
                        html: '联系人：' + this.LXR
                    },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '组织机构代码：' + this.JGDM
            }]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '联系电话：' + this.LXDH
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '技防设施：' + this.getStatusText(this.SFYJF)
            }]
                }]
            }];
}
else if (this.LAYERTYPE == 3) {
    //小区
    info = [{
        xtype: 'component',
        cls: 'x-showdwinfo-text',
        width: '100%',
        html: '地址：' + this.CM
    },
            {
                xtype: 'container',
                width: '100%',
                layout: 'hbox',
                items: [{
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [{
                        xtype: 'component',
                        cls: 'x-showdwinfo-text',
                        width: '100%',
                        html: '联系人：' + this.LXR
                    },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '联动单位：' + this.getStatusText(this.SFLD)
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '巡逻区域：' + this.getStatusText(this.SFXLQ)
            }]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '联系电话：' + this.LXDH
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '技防设施：' + this.getStatusText(this.SFYJF)
            }]
                }]
            }];
}
else if (this.LAYERTYPE == 4) {
    //小区
    info = [{
        xtype: 'component',
        cls: 'x-showdwinfo-text',
        width: '100%',
        html: '地址：' + this.CM
    },
            {
                xtype: 'container',
                width: '100%',
                layout: 'hbox',
                items: [{
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [{
                        xtype: 'component',
                        cls: 'x-showdwinfo-text',
                        width: '100%',
                        html: '法人：' + this.LXR
                    },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '涉毒企业：' + ((this.SFSD == 1) ? ('<a style="color:red;">' + this.getStatusText(this.SFSD) + '</a>') : this.getStatusText(this.SFSD))
            }]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '联系电话：' + this.LXDH
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '消防级别：' + this.XFDJ
            }]
                }]
            }];
}
        else {
            info = [{
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '地址：' + this.CM
            },
            {
                xtype: 'container',
                width: '100%',
                layout: 'hbox',
                items: [{
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [{
                        xtype: 'component',
                        cls: 'x-showdwinfo-text',
                        width: '100%',
                        html: '联系人：' + this.LXR
                    },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '安保负责人：' + this.ABFZR
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '员工数：' + this.YGRS
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '技防设施：' + this.getStatusText(this.SFYJF)
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '涉毒企业：' + ((this.SFSD == 1) ? ('<a style="color:red;">' + this.getStatusText(this.SFSD) + '</a>') : this.getStatusText(this.SFSD))
            }]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    layout: 'vbox',
                    items: [
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '联系电话：' + this.LXDH
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '安保负责人电话：' + this.ABFZRDH
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '消防级别：' + this.XFDJ
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '联动单位：' + this.getStatusText(this.SFLD)
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '视频实战平台单位：' + this.getStatusText(this.SFSZPTDW)
            }]
                }]
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '是否签署消防、危险品等责任书：' + this.getStatusText(this.SFQSXF)
            }];
        }
        this.items = [
        {
            xtype: 'container',
            layout: 'vbox',
            cls: 'x-showdwinfo',
            x: 0,
            y: 0,
            width: 478,
            height: 273,
            items: [{
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                cls: 'x-showdwinfo-top',
                height: 31,
                style: {
                    position: 'absolute'
                },
                items: [{
                    xtype: 'component',
                    html: this.NM,
                    flex: 1
                },
            {
                xtype: 'container',
                layout: 'absolute',
                height: '100%',
                width: 18,
                items: [Ext.create('App.Common.ImageButtonEx',
        {
            btnCls: 'x-map-close',
            width: 10,
            height: 10,
            y: 10,
            x: 0,
            tooltip: SPLanguage.getMessage("GB"),
            handler: function () {
                me.layer.closeShowInfo();
            }
        })]
            }
            ]
            },
        {
            xtype: 'container',
            layout: 'vbox',
            width: '100%',
            height: 164,
            items: info
        },
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            cls: 'x-showdwinfo-bottom',
            height: 75,
            items: [
            Ext.create('App.Common.Img',
            {
                width: 74,
                height: 70,
                margin: '2 4 2 4',
                style: {
                    'border-width': '1px',
                    'border-style': 'solid',
                    'border-color': '#d0d0d0'
                },
                src: '../CustomLayer/GetPic?filename=' + this.DAYPICURL,
                onImageItemClick: function (imageitem) {
                    //me.layer.showDWMap(this.DWBH, this.DWMC);
                    window.open('../CustomLayer/GetPic?filename=' + me.DAYPICURL);
                }
            }),
            Ext.create('App.Common.Img',
            {
                width: 74,
                height: 70,
                margin: '2 4 2 0',
                style: {
                    'border-width': '1px',
                    'border-style': 'solid',
                    'border-color': '#d0d0d0'
                },
                src: '../CustomLayer/GetPic?filename=' + this.NIGHTPICURL,
                onImageItemClick: function (imageitem) {
                    window.open('../CustomLayer/GetPic?filename=' + me.NIGHTPICURL);
                }
            })
            ]
        }]
        },
        {
            xtype: 'component',
            cls: 'x-showdwinfo-pos',
            width: 51,
            height: 31,
            y: 272,
            x: 214
        }

        ];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        //this.combDWTYPE.setValue('0');
    },
    getStatusText: function (stat) {
        if (stat == 1)
            return SPLanguage.getMessage("YES");
        return SPLanguage.getMessage("NO");
    }
});
