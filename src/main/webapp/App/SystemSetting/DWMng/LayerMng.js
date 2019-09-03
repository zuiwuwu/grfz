Ext.define('App.SystemSetting.DWMng.LayerMng', {
    extend: 'App.GIS.Main',
    modifyMod: true,
    initComponent: function () {
        this.fkq = [{
            shapeid: null,
            text: '一道堵控圈',
            fkqtype: 'baoweiquan1',
            points: []
        }, {
            shapeid: null,
            text: '二道堵控圈',
            fkqtype: 'baoweiquan2',
            points: []
        },
        {
            shapeid: null,
            text: '三道堵控圈',
            fkqtype: 'baoweiquan3',
            points: []
        },
        {
            shapeid: null,
            text: '关城门',
            fkqtype: 'guanchengmen',
            points: []
        }];


        var fkqmenu = [];
        for (var i = 0; i < this.fkq.length; i++) {
            fkqmenu.push({
                text: this.fkq[i].text,
                checked: false,
                menuid: this.fkq[i].fkqtype,
                scope: this,
                handler: function (btn) {
                    this.showFKQ(btn.menuid, btn.checked);
                },
                menu: [
                {
                    text: '重新绘制',
                    scope: this,
                    menuid: this.fkq[i].fkqtype,
                    handler: function (btn) {
                        if (this.selid)
                            this.clearShapeById(this.selid);
                        var fkq = this.getFKQ(btn.menuid);
                        if (fkq.shapeid)
                            this.clearShapeById(fkq.shapeid);
                        fkq.shapeid = null;
                        this.selid = this.drawPolygon(
                        {
                            scope: this,
                            onOverlayCreatedByUser: function (obj) {
                                if (fkq) {
                                    if (fkq.shapeid)
                                        this.clearShapeById(fkq.shapeid);
                                    fkq.shapeid = obj.shapeid;
                                }
                                this.selid = null;
                            }
                        });
                    }
                },
                {
                    text: SPLanguage.getMessage("SAVE"),
                    scope: this,
                    menuid: this.fkq[i].fkqtype,
                    handler: function (btn) {
                        this.onSaveFKQ(btn.menuid);
                    }
                },
                {
                    text: SPLanguage.getMessage("REZHI"),
                    menuid: this.fkq[i].fkqtype,
                    scope: this,
                    handler: function (btn) {
                        this.onResetFKQ(btn.menuid);
                    }
                }]
            });
        }


        this.tbar = [
        {
            iconCls: 'icon-refresh',
            text: SPLanguage.getMessage("REFRESH"),
            scope: this,
            handler: function () {
                this.layer.load();
            }
        },
        {
            iconCls: 'icon-add',
            text: '获取中心点',
            scope: this,
            handler: function () {
                var v = this.getCenter();

                Ext.MessageBox.alert('信息', '经度：' + v.longitude + '  纬度：' + v.latitude);
            }
        },
        {
            iconCls: 'icon-add',
            text: '平移',
            scope: this,
            handler: function () {
                this.layer.cleanSelectItem();
                if (this.selid)
                    this.clearShapeById(this.selid);
                this.selid = null;
            }
        },
        {
            iconCls: 'icon-add',
            text: '框选',
            scope: this,
            handler: function () {
                if (this.selid)
                    this.clearShapeById(this.selid);
                this.selid = this.drawRect(
                {
                    scope: this,
                    onOverlayCreatedByUser: this.onSel
                });
            }
        },
        {
			iconCls: 'icon-add',
			text : '点位类型',
			menu : Ext.create('App.SystemSetting.DWMng.menu', {
			listeners : {
							scope : this,
							selchange : function(sels, searchtext,
									onlyshowconnected) {
								this.layer.showdwtype = sels;
								this.layer.searchtext = searchtext;
								this.layer.onlyshowconnected = onlyshowconnected;
								this.layer.load();
							}
						}
			})
		},
        {
            iconCls: 'icon-add',
            text: '绘制堵控圈',
            scope: this,
            menu: fkqmenu
        }
        ];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);

        this.layer = this.addLayer('App.SystemSetting.DWMng.Layer', {
            width: 0,
            height: 0,
            showdwtype: '',
            parentTab: this.parentTab,
            modifyMod: this.modifyMod,
            style:
        {
            position: "absolute"
        }
        });

    },
    getFKQ: function (fkqtype) {
        for (var i = 0; i < this.fkq.length; i++) {
            if (this.fkq[i].fkqtype == fkqtype)
                return this.fkq[i];
        }

    },
    showFKQ: function (fkqtype, show) {
        var fkq = this.getFKQ(fkqtype);

        if (fkq) {
            if (!show) {
                if (fkq.shapeid)
                    this.clearShapeById(fkq.shapeid);
                fkq.shapeid = null;
            }
            else {
                if (!fkq.shapeid) {
                    fkq.shapeid = this.addPolygon(fkq.points, {
                        lineColor: fkq.LINECOL,
                        fillColor: fkq.FILLCOL,
                        lineOpacity: parseFloat(fkq.FILLOPACITY)
                    });
                }

            }
        }
    },
    onResetFKQ: function (fkqtype) {
        var fkq = this.getFKQ(fkqtype);

        if (fkq) {
            if (fkq.shapeid) {
                this.clearShapeById(fkq.shapeid);
                fkq.shapeid = null;
                fkq.shapeid = this.addPolygon(fkq.points, {
                    lineColor: fkq.LINECOL,
                    fillColor: fkq.FILLCOL,
                    lineOpacity: parseFloat(fkq.FILLOPACITY)
                });
            }
        }
    },
    onSaveFKQ: function (fkqtype) {
        var fkq = this.getFKQ(fkqtype);
        if (!fkq)
            return;
        obj = this.getShapeObject(fkq.shapeid);
        if (!obj)
            return;
        var v = obj.getValue();
        fkq.points = v.points;
        var myMask = new Ext.LoadMask(this, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        Ext.Ajax.request({
            url: '../GISDW/SaveFKQLine',
            params: { fkqtype: fkqtype, line: Ext.encode(v) },
            method: 'post',
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (!result.success) {
                        alert("保存失败！");
                    }

                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    },
    onLoadFKQ: function (fkqtype, line, LINECOL, FILLCOL, FILLOPACITY) {
        if (line
        && line != '')
            line = Ext.JSON.decode(line);
        else
            line = [];
        var obj = this.getFKQ(fkqtype);
        if (!obj)
            return;
        if (obj.shapeid) {
            this.clearShapeById(obj.shapeid);
        }
        obj.LINECOL = LINECOL;
        obj.FILLCOL = FILLCOL;
        obj.FILLOPACITY = FILLOPACITY;
        obj.points = line.points;
        //         obj.shapeid = this.addPolygon(line.points, {
        //             lineColor: LINECOL,
        //             fillColor: FILLCOL,
        //             lineOpacity: parseFloat(FILLOPACITY)
        //         });
    },
    onSel: function (obj, e) {
        if (!e.ctrlKey)
            this.layer.cleanSelectItem();
        var sels = this.layer.selectItem([{ lng: obj.leftTopPoint.lng, lat: obj.leftTopPoint.lat },
            { lng: obj.rightBottomPoint.lng, lat: obj.rightBottomPoint.lat}]);
        if (this.selid)
            this.clearShapeById(this.selid);
        this.layer.select(sels);
        this.selid = this.drawRect(
        {
            scope: this,
            onOverlayCreatedByUser: this.onSel
        });
    },
    onAddToType: function (button) {
        var me = this;
        var sel = this.layer.getSelectItem();
        if (!sel
        || sel.length == 0)
            return;
        var vids = '';
        for (var i = 0; i < sel.length; i++) {
            if (vids != '')
                vids += ',';
            vids += sel[i].DWBH;
        }
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要加入到点位分类中?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(me, { msg: '正在保存，请稍候！' });
            myMask.show();
            Ext.Ajax.request({
                url: '../GISDW/AddToGISType',
                method: 'post',
                params: { DWGISTYPE: button.menuid, IDS: vids },
                scope: me,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            me.layer.load();
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        });
    },
    onRemoveFromType: function (button) {
        var me = this;
        var sel = this.layer.getSelectItem();
        if (!sel
        || sel.length == 0)
            return;
        var vids = '';
        for (var i = 0; i < sel.length; i++) {
            if (vids != '')
                vids += ',';
            vids += sel[i].DWBH;
        }
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要加入到点位分类中?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(me, { msg: '正在保存，请稍候！' });
            myMask.show();
            Ext.Ajax.request({
                url: '../GISDW/RemoveFromGISType',
                method: 'post',
                params: { DWGISTYPE: button.menuid, IDS: vids },
                scope: me,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            me.layer.load();
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        });
    },
    onShowDWTypeChange: function () {
        var items = this.btnshowtype.menu.items;
        var showtype = '';
        for (var i = 0; i < items.length; i++) {
            var item = items.getAt(i);
            if (item.checked) {
                if (showtype != '')
                    showtype += ',';
                if (item.menuid) {
                    showtype += item.menuid;
                }
                else {
                    showtype += 'all';
                }
            }

        }
        this.layer.showdwtype = showtype;
        this.layer.load();
    }
});

