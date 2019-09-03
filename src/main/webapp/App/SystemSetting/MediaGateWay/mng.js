Ext.define('App.SystemSetting.MediaGateWay.mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../MediaGateWay/List',
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
            name: 'ID',
            type: 'string'
        },
        {
            name: 'TYPEID',
            type: 'string'
        },
        {
            name: 'CTRLURL',
            type: 'string'
        },
        {
            name: 'SETURL',
            type: 'string'
        },
        {
            name: 'NM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '名称',
                width: 200
            }
        },
        {
            name: 'TYPENM',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '类型',
                width: 200
            }
        },
        {
            name: 'IP',
            type: 'string',
            gridcol: {
                sortable: false,
                header: 'IP地址',
                width: 100
            }
        },
        {
            name: 'PORT',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '控制端口',
                width: 60
            }
        },
        {
            name: 'STREAMPORT',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '媒体端口',
                width: 60
            }
        },
        {
            name: 'STATUS',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '状态',
                width: 60
            }
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
                        this.delChn(rec.get('ID'));
                    }
                },
                {
                    iconCls: 'icon-edit',
                    tooltip: '远程设置',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        window.open('../Main/CommonView?class=' + rec.get('SETURL') + '&MEDIAGATEWAYID=' + rec.get('ID'));
                    }
                }]
            }
        }];



        //////////////////////////////////////////////////////////////////////////
        //工具栏

        this.tbar = [
        {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("PUSH"),
            scope: this,
            handler: this.onAddClick
        }];

        this.callParent(arguments);
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.MediaGateWay.newDlg', {
        	url: '../MediaGateWay/Add',
            listeners: {
                scope: this,
                saveok: function()
                {
                	this.reLoad();
                }
            }
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
         Ext.create('App.SystemSetting.MediaGateWay.newDlg', {
         	url: '../MediaGateWay/Edit',
         	MEDIAGATEWAYID: rec.get('ID'),
            listeners: {
                scope: this,
                saveok: function()
                {
                	this.reLoad();
                }
            }
        }).show();
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../MediaGateWay/Del', //查询案件详细信息
                method: 'post', //方法  
                params: { ID: vchns },
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
    onSearch: function () {
        this.store.load();
    }
});
