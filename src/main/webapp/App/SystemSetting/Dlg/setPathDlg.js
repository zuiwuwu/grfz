//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.setPathDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '编辑轨迹和标签',
    width: 900,
    height: 600,
    initComponent: function () {
        var me = this;
        this.addEvents('saveok');
        this.map = Ext.create('App.GIS.Main', {

        });
        this.items = [this.map];

        this.tbar = [
        {
            xtype: 'button',
            text: '添加路径',
            tooltip: '添加路径',
            iconCls: 'icon-add',
            scope: this,
            handler: function () {
                this.map.drawPolyline();
            }
        },
        {
            xtype: 'button',
            text: '添加标签',
            tooltip: '添加标签',
            iconCls: 'icon-add',
            scope: this,
            handler: function () {
                var me = this;
            },
            menu: [{
                text: '文字',
                iconCls: 'x-map-label01',
                scope: this,
                handler: function () {
                    this.map.createCursorTool('App.SystemSetting.Dlg.addLabel', {
                        map: this.map
                    });
                }
            }, {
                text: '标签1',
                iconCls: 'x-map-label01',
                scope: this,
                handler: function () {
                    this.map.createCursorTool('App.SystemSetting.Dlg.addLabel', {
                        map: this.map
                    });
                }
            }, {
                text: '标签2',
                iconCls: 'x-map-label01',
                scope: this,
                handler: function () {
                    this.map.createCursorTool('App.SystemSetting.Dlg.addLabel', {
                        map: this.map
                    });
                }
            }]
        },
        {
            xtype: 'button',
            text: '清除',
            tooltip: '清除',
            iconCls: 'icon-add',
            scope: this,
            handler: function () {
                this.map.clear();
                this.map.map.clearMarkers();
            }
        }
        ];

        this.buttons = [
                {
                    text: '确定',
                    action: 'save',
                    scope: this,
                    handler: this.onSave
                },
                {
                    text: '取消',
                    scope: this,
                    handler: function () {
                        //this.fireEvent('close', this);
                        this.close();
                    }
                }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.lng = this.lng || this.map.CenterX;
        this.lat = this.lat || this.map.CenterY;
        if (this.lng
    && this.lat)
            this.map.panTo(this.lng, this.lat);

        var me = this;
        if (this.getUrl) {
            var myMask = new Ext.LoadMask(this, { msg: "正在保存，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: this.getUrl, //请求地址  
                params: { id: this.bh },
                method: 'post', //方法  
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var result = Ext.JSON.decode(response.responseText);

                        for (var i = 0; i < result.length; i++) {
                            if (result[i].ShapeType == 'polyline') {
                                var id = me.map.addPolyline([], {});
                                me.map.getObjectById(id).setValue(result[i]);
                            }
                            else if (result[i].ShapeType == 'marker') {
                                var id = me.map.addPolyline([], {});
                                var vmarker = Ext.create('App.SystemSetting.Dlg.labelMarker', Ext.apply(result[i], {
                                    baseMap: this.baseMap
                                }));
                                me.map.map.addMarker(vmarker);
                            }
                        }

                    }
                    else {
                        alert("网络错误！");
                    }
                }
            });
        }

    },
    onSave: function () {
        var vme = this;
        var vdata = this.map.getValue();
        var params = { id: this.bh, data: Ext.JSON.encode(vdata) };
        if (this.params)
            params = Ext.apply(params, this.params);
        var myMask = new Ext.LoadMask(vme, { msg: "正在保存，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: vme.url, //请求地址  
            params: params,
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        vme.fireEvent('saveok', vme);
                        vme.close();
                    }
                    else {
                        alert(result.msg);
                    }
                }
                else {
                    alert("网络错误！");
                }
            }
        });
    }
});


