Ext.define('App.SystemSetting.CutomLayer.DKQ', {
    extend: 'App.GIS.Layers.LayerHouse',
    initComponent: function () {
        this.callParent(arguments);
    },
    onLayerContextMenu: function (e) {
        var me = this,
            target = e.getTarget();
        if (!(target && target.className.match(this.itemCls))) {
            return;
        }
        var viewIndex = target.viewIndex;
        var data = me.getDW(target.viewIndex);
        if (!data)
            return;
        this.closeShowInfo();
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [
        Ext.create('Ext.Action', {
            iconCls: 'icon-edit',
            text: SPLanguage.getMessage("ALTER"),
            scope: this,
            handler: function (widget, event) {
                this.closeShowInfo();
                if (this.LAYERTYPE == 1
                || this.LAYERTYPE == 2
                || this.LAYERTYPE == 3
                || this.LAYERTYPE == 4) {
                    //企业
                    Ext.create('App.SystemSetting.CutomLayer.newQYDlg', {
                        url: '../CustomLayer/EditItem',
                        modifyMod: true,
                        HOUSEID: data.ID,
                        LAYERTYPE: this.LAYERTYPE,
                        listeners: {
                            scope: this,
                            saveok: this.onFinished
                        }
                    }).show();
                }
                else {
                    Ext.create('App.SystemSetting.CutomLayer.newDlg', {
                        url: '../CustomLayer/EditItem',
                        modifyMod: true,
                        HOUSEID: data.ID,
                        listeners: {
                            scope: this,
                            saveok: this.onFinished
                        }
                    }).show();
                }
            }
        }),
        Ext.create('Ext.Action', {
            iconCls: 'icon-del',
            text: SPLanguage.getMessage("DELETE"),
            scope: this,
            handler: function (widget, event) {
                Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
                    if (result != 'yes')
                        return;
                    var myMask = new Ext.LoadMask(me, { msg: SPLanguage.getMessage("ZZSCQSH") });
                    myMask.show();
                    Ext.Ajax.request({
                        url: '../CustomLayer/DelItem',
                        method: 'post', //方法  
                        params: { ID: data.ID },
                        callback: function (options, success, response) {
                            myMask.hide();
                            if (success) {
                                var v = Ext.JSON.decode(response.responseText);
                                if (!v.success)
                                    alert(v.msg);
                                else
                                    me.load();
                            }
                            else {
                                alert(SPLanguage.getMessage("DelFail"));
                            }
                        }
                    });
                });
            }
        }),
            {
                xtype: 'menuseparator'
            },
        Ext.create('Ext.Action', {
            iconCls: 'icon-edit',
            text: '移动',
            scope: this,
            handler: function (widget, event) {
                if (!target.viewMove)
                    target.viewMove = true;
                else
                    target.viewMove = false;
            }
        })]
        });

        contextMenu.showAt(e.getXY());
        e.stopEvent();
    },
    onFinished: function () {
        this.load();
    },
    onLayerDblclick: function (e) {
        var me = this,
            target = e.getTarget();
        if (!(target && target.className.match(this.itemCls))) {
            return;
        }
        var data = me.getDW(target.viewIndex);
        if (!data)
            return;
        if (this.showinfotimerid) {
            clearTimeout(this.showinfotimerid);
            this.showinfotimerid = null;
        }
        e.stopEvent();
        this.showDWMap(data.DWBH, data.DWMC);
    },
    showDWMap: function (DWBH, DWMC) {
        if (this.parentTab) {
            this.parentTab.addFeed('点位地图管理', 'App.GIS.DWChn', true, { DWBH: DWBH, DWMC: DWMC });
        }
    },
    onLayerClick: function (e) {
        var me = this,
            target = e.getTarget();
        this.closeShowInfo();

        if (!(target && target.className.match(this.itemCls))) {
            return;
        }
        if (target.viewMove)
            return;
        var data = me.getDW(target.viewIndex);
        if (!data)
            return;
        if (this.showinfotimerid) {
            clearTimeout(this.showinfotimerid);
            this.showinfotimerid = null;
        }

        var d = Ext.get(target);
        var offsety = d.getY() + (d.getLocalY() - d.getY());
        var offsetx = d.getX() + (d.getLocalX() - d.getX());
        this.showinfotimerid = setTimeout(function () {
            me.showdwinfo = Ext.create('App.SystemSetting.CutomLayer.showQYInfo', {
                LAYERTYPE: me.LAYERTYPE,
                x: offsetx - 214,
                y: offsety - 303,
                centerx: 214,
                centery: 303,
                dlgwidth: 478,
                dlgheight: 303,
                layer: me,
                DWBH: data.DWBH,
                DWJD: data.X,
                DWWD: data.Y,
                NM: data.NM,
                CM: data.CM,
                LXR: data.LXR,
                LXDH: data.LXDH,
                ABFZR: data.ABFZR,
                ABFZRDH: data.ABFZRDH,
                YGRS: data.YGRS,
                XFDJ: data.XFDJ,
                SFYJF: data.SFYJF,
                SFLD: data.SFLD,
                SFSD: data.SFSD,
                SFSZPTDW: data.SFSZPTDW,
                SFQSXF: data.SFQSXF,
                JGDM: data.JGDM,
                SFXLQ: data.SFXLQ,
                DAYPICURL: data.DAYPICURL,
                NIGHTPICURL: data.NIGHTPICURL
            });
            me.baseMap.addDlg(me.showdwinfo);

            if (offsety < me.showdwinfo.dlgheight) {
                offsety = me.showdwinfo.dlgheight - offsety;
            }
            else {
                offsety = 0;
            }
            if (offsetx < me.showdwinfo.dlgwidth)
                offsetx = (me.showdwinfo.dlgwidth - offsetx);
            else if (offsetx > me.baseMap.getWidth() - me.showdwinfo.dlgwidth)
                offsetx = -(offsetx - (me.baseMap.getWidth() - me.showdwinfo.dlgwidth));
            else
                offsetx = 0;
            if (offsety > 0
                || offsetx > 0)
                me.baseMap.offsetPoint(offsetx, offsety);
        },
        500);

        e.stopEvent();

    },
    closeShowInfo: function () {
        if (this.showdwinfo) {
            this.baseMap.removeDlg(this.showdwinfo);
            this.showdwinfo = null;
        }
        if (this.showinfotimerid) {
            clearTimeout(this.showinfotimerid);
            this.showinfotimerid = null;
        }

    },
    onPosChange: function () {
        this.callParent(arguments);
        this.changeInfoPos();
    },
    onPosChangeIng: function () {
        this.callParent(arguments);
        this.changeInfoPos();
    },
    onSize: function (width, height) {
        this.callParent(arguments);
        this.changeInfoPos();
    },
    changeInfoPos: function () {
        var basemap = this.baseMap;
        if (this.showdwinfo) {
            var v = basemap.LatLongToDisplay(this.showdwinfo.DWJD, this.showdwinfo.DWWD);
            this.showdwinfo.setXY([this.getX() + v.X - this.showdwinfo.centerx,
            this.getY() + v.Y - this.showdwinfo.centery]);
        }
    }
    //     ,
    //     onMapMoveing: function (x, y) {
    //         if (this.showdwinfo) {
    //             var v = this.showdwinfo.getXY();
    //             v[0] += x;
    //             v[1] += y;
    //             this.showdwinfo.setXY(v);
    //         } if (this.showdwinfopos) {
    //             var v = this.showdwinfopos.getXY();
    //             v[0] += x;
    //             v[1] += y;
    //             this.showdwinfopos.setXY(v);
    //         }
    //     }
});

