Ext.define('App.SystemSetting.CutomLayer.Index', {
    extend: 'Ext.Panel',
    layout: 'border',
    border: 0,
    initComponent: function () {
        var me = this;
        this.map = Ext.create('App.GIS.Main', {
            region: 'center',
            title: '请选择图层',
            titleAlign: 'center',
            tbar: [{
                text: SPLanguage.getMessage("REFRESH")
            }],
            onMapContextMenu: function (e) {
                me.onMapContextMenu(e);
            }
        });
        this.listlayers = Ext.create('App.Common.ImagePreview', {
            url: '../CustomLayer/List',
            hideHeaders: true,
            showBarPager: false,
            oldStyle: true,
            multiSelect: false, //是否多选
            selType: 'rowmodel',
            listeners:
                {
                    scope: this,
                    selectionchange: this.onSelectChange
                },
            tbar: [{
                text: SPLanguage.getMessage("REFRESH"),
                iconCls: 'icon-refresh',
                handler: function () {
                    me.listlayers.store.load();
                }
            }, {
                text: SPLanguage.getMessage("PUSH"),
                iconCls: 'icon-add',
                scope: this,
                handler: this.onAddClick
            }, {
                text: SPLanguage.getMessage("ALTER"),
                iconCls: 'icon-edit',
                scope: this,
                handler: this.onModifyClick
            }, {
                text: SPLanguage.getMessage("DELETE"),
                iconCls: 'icon-del',
                scope: this,
                handler: this.onDelClick
            }],
            columns: [
        {
            name: 'LAYERID',
            type: 'string'
        },
        {
            name: 'LAYERNM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '图层名称',
                flex: 1
            }
        },
        {
            name: 'LAYERTYPE',
            type: 'string'
        }]
        });
        this.items = [
         this.map,
        {
            xtype: 'panel',
            region: 'east',
            collapsible: true,
            border: 0,
            split: true,
            minWidth: 281,
            maxWidth: 281,
            width: 281,
            header: false,
            collapseMode: 'mini',
            layout: 'fit',
            items: [this.listlayers
            ]
        }
        ];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.layer = this.map.addLayer('App.SystemSetting.CutomLayer.Layer', {
            width: 0,
            height: 0,
            parentTab: this.parentTab,
            style:
        {
            position: "absolute"
        }
        });
    },
    showLayer: function (LAYERID, LAYERTYPE, LAYERNM) {
        this.map.setTitle(LAYERNM);
        if (LAYERTYPE == 6) {
            var v = this.map.getDockedItems('toolbar[dock="top"]');
            v[0].removeAll(true);
        }
        else {
            var v = this.map.getDockedItems('toolbar[dock="top"]');
            v[0].removeAll(true);
            v[0].add([{
                iconCls: 'icon-refresh',
                text: SPLanguage.getMessage("REFRESH"),
                scope: this,
                handler: function () {
                    this.layer.load();
                }
            },
                {
                    iconCls: 'icon-add',
                    text: SPLanguage.getMessage("PUSH"),
                    scope: this,
                    handler: function () {
                        var v = this.map.getCenter();
                        this.addLayerIcon(v.longitude, v.latitude);
                    }
                },
                {
                    iconCls: 'icon-edit',
                    text: '自定义图标',
                    scope: this,
                    handler: function () {
                        Ext.create('App.SystemSetting.CutomLayer.editIconDlg', {
                        }).show();
                    }
                }]);
            this.layer = this.map.addLayer('App.SystemSetting.CutomLayer.Layer', {
                width: 0,
                height: 0,
                parentTab: this.parentTab,
                LAYERID: LAYERID,
                LAYERTYPE: LAYERTYPE,
                style:
                {
                    position: "absolute"
                }
            });
        }
    },
    onSelectChange: function (grid, selected) {
        if (this.layer) {
            this.layer.closeShowInfo();
            this.map.removeGISLayer(this.layer);
        }
        if (selected.length > 0) {
            this.showLayer(selected[0].get('LAYERID'), selected[0].get('LAYERTYPE'), selected[0].get('LAYERNM'));
        }
        else {
            this.map.setTitle('请选择图层');
        }
    },
    onFinished: function () {
        this.layer.load();
    },
    onMapContextMenu: function (e) {
        var me = this;
        var x = e.getX() - this.layer.getX();
        var y = e.getY() - this.layer.getY();
        var v = me.map.map.DisplayToLatLong(x, y);
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [Ext.create('Ext.Action', {
                iconCls: 'icon-refresh',
                text: SPLanguage.getMessage("REFRESH"),
                scope: this,
                handler: function (widget, event) {
                    this.layer.load();
                }
            }),
        Ext.create('Ext.Action', {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("PUSH"),
            scope: this,
            handler: function (widget, event) {
                this.addLayerIcon(v.longitude, v.latitude);
            }
        })]
        });

        contextMenu.showAt(e.getXY());
    },
    addLayerIcon: function (longitude, latitude) {
        if (this.layer.LAYERID != 0) {
            if (this.layer.LAYERTYPE == 1
                    || this.layer.LAYERTYPE == 2
                    || this.layer.LAYERTYPE == 3
                    || this.layer.LAYERTYPE == 4) {
                Ext.create('App.SystemSetting.CutomLayer.newQYDlg', {
                    url: '../CustomLayer/AddItem',
                    modifyMod: false,
                    lng: longitude,
                    lat: latitude,
                    LAYERID: this.layer.LAYERID,
                    LAYERTYPE: this.layer.LAYERTYPE,
                    listeners: {
                        scope: this,
                        saveok: this.onFinished
                    }
                }).show();
            }
            else {
                Ext.create('App.SystemSetting.CutomLayer.newDlg', {
                    url: '../CustomLayer/AddItem',
                    modifyMod: false,
                    lng: longitude,
                    lat: latitude,
                    LAYERID: this.layer.LAYERID,
                    listeners: {
                        scope: this,
                        saveok: this.onFinished
                    }
                }).show();
            }
        }
        else {
            Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"),'请选择图层！');
            
        }
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.CutomLayer.newLayerDlg', {
            url: '../CustomLayer/Add',
            modifyMod: false,
            listeners: {
                scope: this,
                saveok: function () {
                    this.listlayers.store.load();
                }
            }
        }).show();
    },
    onModifyClick: function () {
        var vselected = this.listlayers.getSelectionModel().getSelection();
        if (vselected.length > 0) {
            Ext.create('App.SystemSetting.CutomLayer.newLayerDlg', {
                url: '../CustomLayer/Edit',
                modifyMod: true,
                LAYERID: vselected[0].get('LAYERID'),
                LAYERNM: vselected[0].get('LAYERNM'),
                LAYERTYPE: vselected[0].get('LAYERTYPE'),
                listeners: {
                    scope: this,
                    saveok: function () {
                        this.listlayers.store.load();
                    }
                }
            }).show();
        }

    },
    onDelClick: function () {
        var vme = this;
        var vselected = this.listlayers.getSelectionModel().getSelection();
        if (vselected.length > 0) {
            Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除图层？', function (result) {
                if (result != 'yes')
                    return;
                var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
                myMask.show();
                Ext.Ajax.request({
                    url: '../CustomLayer/Del',
                    method: 'post', //方法  
                    params: { ID: vselected[0].get('LAYERID') },
                    callback: function (options, success, response) {
                        myMask.hide();
                        if (success) {
                            var v = Ext.JSON.decode(response.responseText);
                            if (!v.success)
                                alert(v.msg);
                            else
                                vme.listlayers.store.load();
                        }
                        else {
                            alert(SPLanguage.getMessage("DelFail"));
                        }
                    }
                });
            });
        }

    }
});

