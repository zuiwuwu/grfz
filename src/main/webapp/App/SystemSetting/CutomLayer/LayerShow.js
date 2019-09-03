Ext.define('App.SystemSetting.CutomLayer.LayerShow', {
    extend: 'App.GIS.Layers.LayerHouse',
    extend: 'App.GIS.Layers.Layer',
    url: '../CustomLayer/ListAllItem',
    createTpl: function () {
        return new Ext.XTemplate(
                                     '<tpl for=".">',
                                    '<div class="' + this.itemCls + ' {ICONCLS}" title="名称：{NM:htmlEncode}\r\n备注：{CM:htmlEncode}\r\n联系人：{LXR:htmlEncode}\r\n联系电话：{LXDH:htmlEncode}" style="position: absolute; left: {DX}px; top: {DY}px;cursor:pointer;"></div>',
                                    '</tpl>'
                );
    },
    getFilter: function () {
        return [{ "property": "longitude", "value": this.baseMap.CenterX },
            { "property": "latitude", "value": this.baseMap.CenterY },
            { "property": "zoomlevel", "value": this.baseMap.zoomlevel },
            { "property": "LAYERIDS", "value": this.LAYERIDS},
            { "property": "searchtext", "value": this.searchtext}];
    },
    onSetJWD: function (data, lng, lat) {
        data.X = lng;
        data.Y = lat;
    },
    getSaveData: function (data) {
        return { ID: data.ID,
            X: data.X,
            Y: data.Y
        };
    },
    getData: function () {
        var data = this.layerdata;
        var v;
        var item;
        if (!data)
            return;
        var baseMap = this.baseMap;
        for (var i = 0; i < data.length; i++) {
            item = data[i];
            v = baseMap.LatLongToDisplay(item.X, item.Y);
            item.DX = v.X;
            item.DY = v.Y;
            item.IconCls = item.ICONCLS;
        }
        return this.layerdata;
    },
    onBeforeStart: function (e) {
		return false;
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
});

