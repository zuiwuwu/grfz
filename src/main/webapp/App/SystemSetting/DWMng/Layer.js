Ext.define('App.SystemSetting.DWMng.Layer', {
    extend: 'App.GIS.Layers.LayerDW',
    showdwtype: 'all',
    initComponent: function () {
        this.callParent(arguments);
    },
    getFilter: function () {
        return [{ "property": "longitude", "value": this.baseMap.CenterX },
            { "property": "latitude", "value": this.baseMap.CenterY },
            { "property": "zoomlevel", "value": this.baseMap.zoomlevel },
            { "property": "DWGISTYPE", "value": this.showdwtype},
            { "property": "DWMC", "value": this.searchtext},
            { "property": "onlyshowconnected", "value": this.onlyshowconnected}];
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
        if (this.modifyMod) {

            if (this.parentTab) {
                this.parentTab.addFeed('点位地图管理', 'App.GIS.DWChn', true, { DWBH: DWBH, DWMC: DWMC });
            }

        }
        else {
            this.showDWVideo(DWBH, DWMC);
        }

    },
    ShowDWFocus:function(data){
    	 if(!this.layerdata)
    		this.layerdata = [];
    	if(!this.focusitems)
    		this.focusitems = {};
    	else
    	{
    		for (var item in this.focusitems) {
    			var itemdata = this.focusitems[item];
                if (typeof (itemdata) != 'function')
                {
                	itemdata.isfocus = false;
                	if(itemdata.istempitem)
                	{
                		this.layerdata.splice(itemdata.tempitemindex,1);
                	}
                	delete this.focusitems[item];
                }
            }
    	}
    	data.isfocus = true;
    	data.istempitem = true;
    	data.tempitemindex = this.layerdata.length;
    	this.focusitems[data.DWBH] = data;
    	this.layerdata.push(data);
    	this.showDW();
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
        this.showinfotimerid = setTimeout(function () {
        	var DEVCHNCOUNT = parseInt(data.DEVCHNCOUNT | 0);
        	var DEVCHNSTATCOUNT = parseInt(data.DEVCHNSTATCOUNT | 0);
            me.showdwinfo = Ext.create('App.SystemSetting.DWMng.showDWInfo', {
                centerx: 150,
                centery: 358,
                layer: me,
                DWBH: data.DWBH,
                lng: data.DWJD,
                lat: data.DWWD,
                DWMC: data.DWMC,
                DWWZ: data.DWWZ,
                UNITNAME: data.UNITNAME,
                CM: data.CM,
                PICNAME: data.PICNAME,
                LXR: data.LXR,
                SXJ: '<a>总共（' + DEVCHNCOUNT + '），在线（' + DEVCHNSTATCOUNT + '），断线（</a><a style="color:Red;">' +  (DEVCHNCOUNT - DEVCHNSTATCOUNT) + '</a><a>）</a>',
                listeners:
                {
                    scope: this,
                    zbsp: me.onShowZBSP,
                    ssgc: me.onShowSSGC,
                    lsgc: me.onShowLSGC
                }
            });
            me.baseMap.addDlg(me.showdwinfo);
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
    },
    onPosChangeIng: function () {
        this.callParent(arguments);
    },
    onSize: function (width, height) {
        this.callParent(arguments);
    },
    showDWVideo: function (DWBH, DWMC, detaultSplit, autoloop) {
        if (!this.showdwdlg
        || !this.showdwdlg.rendered) {
            this.showdwdlg = Ext.create('App.SystemSetting.Dlg.showVideoDlg',
            {
                showvideoparams: { DWBH: DWBH },
                url: '../DWMng/GetDWChn',
                title: DWMC,
                detaultSplit: detaultSplit,
                autoloop: autoloop
            });
            this.showdwdlg.show();
        }
        else {
            if (!this.showdwdlg.isVisible())
                this.showdwdlg.setVisible(true);
            this.showdwdlg.setTitle(DWMC);
            this.showdwdlg.showVideo('../DWMng/GetDWChn', { DWBH: this.DWBH }, detaultSplit, autoloop);
        }
    },
    showVideoDlg: function (url, params,title, detaultSplit, autoloop) {
        if (!this.showdwdlg
        || !this.showdwdlg.rendered) {
            this.showdwdlg = Ext.create('App.SystemSetting.Dlg.showVideoDlg',
            {
                showvideoparams: params,
                url: url,
                title: title,
                detaultSplit: detaultSplit,
                autoloop: autoloop
            });
            this.showdwdlg.show();
        }
        else {
            if (!this.showdwdlg.isVisible())
                this.showdwdlg.setVisible(true);
            this.showdwdlg.setTitle(title);
            this.showdwdlg.showVideo(url, params, detaultSplit, autoloop);
        }
    },
    onShowSSGC: function (DWBH, DWMC, lng, lat) {
        Ext.create('App.SystemSetting.Dlg.showRealTrafficDlg',
        {
            DWBH: DWBH
        }).show();
    },
    onShowLSGC: function (DWBH, DWMC, lng, lat) {
        Ext.create('App.SystemSetting.Dlg.showCLCXDlg',
        {
            DWBH: DWBH
        }).show();
    },
    onShowZBSP: function (DWBH, DWMC, lng, lat) {
        Ext.create('App.SystemSetting.DWMng.selDlg',
        {
            listeners:
            {
                scope: this,
                saveok: function (dlg, values) {
                    if (values.SHOWTYPE == '1') {
                        this.showdwdlg = Ext.create('App.SystemSetting.Dlg.showPlaybackDlg',
                                    {
                                        showvideoparams: { lng: lng, lat: lat, distance: values.DISTANCE, DWGISTYPE: values.DWGISTYPE },
                                        url: '../GISDW/ListVideoChnByDistance',
                                        title: DWMC,
                                        detaultSplit: 4,
                                        autoloop: false
                                    });
                        this.showdwdlg.show();
                    }
                    else {
                        if (!this.showdwdlg
                                || !this.showdwdlg.rendered) {
                            this.showdwdlg = Ext.create('App.SystemSetting.Dlg.showVideoDlg',
                                    {
                                        showvideoparams: { lng: lng, lat: lat, distance: values.DISTANCE, DWGISTYPE: values.DWGISTYPE },
                                        url: '../GISDW/ListVideoChnByDistance',
                                        title: DWMC,
                                        detaultSplit: 4,
                                        autoloop: false
                                    });
                            this.showdwdlg.show();
                        }
                        else {
                            if (!this.showdwdlg.isVisible())
                                this.showdwdlg.setVisible(true);
                            this.showdwdlg.setTitle(DWMC);
                            this.showdwdlg.showVideo('../GISDW/ListVideoChnByDistance', { lng: lng, lat: lat, distance: values.DISTANCE, DWGISTYPE: values.DWGISTYPE }, 4, false);
                        }
                    }
                }
            }
        }).show();


    }
});

