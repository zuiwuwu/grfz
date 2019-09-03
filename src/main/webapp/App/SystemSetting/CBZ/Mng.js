
Ext.define('App.SystemSetting.CBZ.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../CBZMng/List',
    initComponent: function () {
        var vme = this;
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 60
            }
        },
        {
            name: 'CBZID',
            type: 'string'
        },
        {
            name: 'CBZNM',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("NAME"),
                width: 150
            }
        },
        {
            name: 'CBZWZ',
            type: 'string',
            gridcol: {
                sortable: false,
                hidden: true,
                header: SPLanguage.getMessage("ADDR"),
                width: 300
            }
        },
        {
            name: 'CBZJD',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("LONGITUDE"),
                width: 80
            }
        },
        {
            name: 'CBZWD',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("LATITUDE"),
                width: 80
            }
        },
        {
            name: 'ROOMID',
            type: 'string'
        },
        {
            name: 'LXR',
            type: 'string'
        },
        {
            name: 'LXDH',
            type: 'string'
        },
        {
            name: 'MINZOOM',
            type: 'string'
        },
        {
            name: 'MAXZOOM',
            type: 'string'
        },
        {
            name: 'GISPIC',
            type: 'string'
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                //hidden: true,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: SPLanguage.getMessage("EDIT"),
                    scope: this,
                    handler: this.onModifyClick
                },
                {
                    iconCls: 'icon-del',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('CBZID'));
                    }
                },
                {
                    iconCls: 'icon-edit',
                    tooltip: '值班人',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                        Ext.create('App.SystemSetting.addUserDlg',
                        {
                            urlList: '../CBZMng/ListCBZUser',
                            urlSave: '../CBZMng/SaveCBZUser',
                            ID: rec.get('CBZID')
                        }).show();
                    }
                },
                {
                    iconCls: 'icon-edit',
                    tooltip: '值班人关联设备',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.create('App.SystemSetting.addDevDlg',
                        {
                            urlList: '../CBZMng/ListCBZDev',
                            urlSave: '../CBZMng/SaveCBZDev',
                            ID: rec.get('CBZID')
                        }).show();
                    }
                }
                ]
            }
        }];

        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
         {
             xtype: 'button',
             text: SPLanguage.getMessage("REFRESH"),
             tooltip: SPLanguage.getMessage("REFRESH"),
             iconCls: 'icon-refresh',
             scope: this,
             handler: this.onSearch
         },
        {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("PUSH"),
            scope: this,
            handler: this.onAddClick
        },
        {
            iconCls: 'icon-del',
            text: SPLanguage.getMessage("DELETE"),
            scope: this,
            handler: this.onDelClick
        }];



        this.callParent(arguments);
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.CBZ.newDlg', {
            url: '../CBZMng/Add',
            listeners: {
                scope: this,
                saveok: function () {
                    this.reLoad();
                }
            }
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.CBZ.newDlg', {
            CBZID: rec.get('CBZID'),
            url: '../CBZMng/Edit',
            listeners: {
                scope: this,
                saveok: function () {
                    this.reLoad();
                }
            }
        });
        v.show();

        v.down('form').loadRecord(rec);
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: '../CBZMng/Del', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.reLoad();
                    }
                    else {
                        alert(SPLanguage.getMessage("DelFail"));
                    }
                }
            });
        });

    },
    onDelClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vchns = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vchns != '')
                    vchns += ',';
                vchns += vsel[i].get('CBZID');
            }
            this.delChn(vchns);
        }

    },
    onDelAllClick: function () {
        this.delChn('all');
    },
    onSearch: function () {
        this.store.load();
    }
});
