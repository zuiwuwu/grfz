
//定义编辑对话框
Ext.define('App.SystemSetting.DWMng.showCZDWInfo', {
    extend: 'Ext.Container',
    layout: 'absolute',
    border: 1,
    width: 0,
    x: 0,
    y: 0,
    initComponent: function () {
        var me = this;
        this.addEvents('zbsp','ssgc','lsgc');
        this.showzbsp = Ext.create('Ext.Component',
        {
            cls: 'x-showdwinfo-text',
            width: 80,
            overCls: 'x-map-btn-over',
            html: '【周边视频】'
        });
//          this.showzbsp = Ext.create('Ext.Component',
//         {
//             cls: 'x-showdwinfo-text',
//             width: 80,
//             overCls: 'x-map-btn-over',
//             html: '【道路视频】'
//         });

        var cm = null;
        if(Ext.commonparams.PROJECT == 'changzhouwc')
        {
            //常州环卫

            cm = {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '面    积：' + (parseInt(this.CM)||'') + '平米'
            };
        }
        else{
            this.showssgc = Ext.create('Ext.Component',
            {
                cls: 'x-showdwinfo-text',
                width: 80,
                overCls: 'x-map-btn-over',
                html: '【实时过车】'
            });
            this.showlsgc = Ext.create('Ext.Component',
            {
                cls: 'x-showdwinfo-text',
                width: 80,
                overCls: 'x-map-btn-over',
                html: '【历史过车】'
            });
            
            cm = {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '备    注：' + (this.CM||'')
            };
        }
        

        this.items = [
        {
            layout: 'vbox',
            border: 1,
            //floating: true,
            width: 347,
            items: [{
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                cls: 'x-showdwinfo-top',
                height: 31,
                items: [{
                    xtype: 'component',
                    html: this.DWMC,
                    flex: 1
                },
            {
                xtype: 'container',
                layout: 'absolute',
                height: '100%',
                width: 40,
                items: [Ext.create('App.Common.ImageButtonEx',
        {
            btnCls: 'x-map-camera',
            width: 18,
            height: 18,
            y: 6,
            x: 0,
            tooltip: SPLanguage.getMessage("XSSP"),
            scope: this,
            handler: function () {
                me.layer.showDWVideo(me.DWBH, me.DWMC);
            }
        }),
        Ext.create('App.Common.ImageButtonEx',
        {
            btnCls: 'x-map-close',
            width: 10,
            height: 10,
            y: 10,
            x: 22,
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
            height: 265,
            items: [
            Ext.create('App.Common.Img',
            {
                width: '100%',
                height: 120,
                border: 0,
                padding: 8,
                src: '../DWMng/GetPic?DWBH=' + this.DWBH,
                onImageItemClick: function (imageitem) {
                    //me.layer.showDWMap(this.DWBH, this.DWMC);
                    window.open( '../DWMng/GetPic?DWBH=' + me.DWBH);
                }
            }),
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '点位位置：' + this.DWWZ
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '管辖单位：' + this.UNITNAME
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '联 系 人：' + this.LXR
            },
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '类    型：' + (this.PICNAME||'')
            },
            cm,
            {
                xtype: 'component',
                cls: 'x-showdwinfo-text',
                width: '100%',
                html: '摄 像 机：' + this.SXJ
            }]
        },
        {
            xtype: 'container',
            layout: 'hbox',
            width: '100%',
            cls: 'x-showdwinfo-bottom',
            height: 30,
            items: [
            {
                xtype: 'component',
                flex: 1,
            },
            this.showzbsp,
            this.showssgc,
            this.showlsgc,
            {
                xtype: 'component',
                flex: 1,
            }
            ]
        }]
    },
        {
            xtype: 'component',
            cls: 'x-showdwinfo-pos',
            width: 51,
            height: 31,
            y: 327,
            x: 150
        }
        

        ];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        if(this.showzbsp)
            this.mon(this.showzbsp.el, {
                scope: this,
                click: this.onShowZBSPClick
            });
            if(this.showssgc)
        this.mon(this.showssgc.el, {
            scope: this,
            click: this.onShowSSGCClick
        });
        if(this.showlsgc)
        this.mon(this.showlsgc.el, {
            scope: this,
            click: this.onShowLSGCClick
        });
    },
    onShowZBSPClick:function () {
        this.fireEvent('zbsp',this.DWBH,this.DWMC,this.lng,this.lat);
    },
    onShowSSGCClick:function () {
        this.fireEvent('ssgc',this.DWBH,this.DWMC,this.lng,this.lat);
    },
    onShowLSGCClick:function () {
        this.fireEvent('lsgc',this.DWBH,this.DWMC,this.lng,this.lat);
    }
});
