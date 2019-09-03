Ext.define('App.SystemSetting.MediaGateWay.GB28181.svr', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../GB28181/ListLowerSvr',
    LOWERSVR: 1,
    gridautoLoad: false,
    initComponent: function () {
        var vme = this;
		this.url = this.url + '?id=' + this.MEDIAGATEWAYID;
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: '序号',
                width: 60
            }
        },
        {
            name: 'ID',
            type: 'string'
        },
        {
            name: 'SVRUSER',
            type: 'string'
        },
        {
            name: 'SVRPSW',
            type: 'string'
        },
        {
            name: 'CHECKUSER',
            type: 'string'
        },
        {
            name: 'SVRID',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '编号',
                width: 160
            }
        },
        {
            name: 'SVRNAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '名称',
                width: 160
            }
        },
        {
            name: 'SVRIP',
            type: 'string',
            gridcol: {
                sortable: false,
                header: 'IP地址',
                width: 120
            }
        },
        {
            name: 'SVRPORT',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '端口',
                width: 60
            }
        },
        {
            name: 'REGTIME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '注册时间',
                width: 120
            }
        },
        {
            name: 'SERVERTYPE',
            type: 'string'
        },
        {
            name: 'REGEXPTIME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '注册有效时间',
                width: 90
            }
        },
        {
            name: 'ONLINE',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '状态',
                width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1') {
                        return '在线';
                    }
                    return '<a style="color:Red">断线</a>';
                }
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: '操作',
                //hidden: true,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                minWidth: 300,
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: '编辑',
                    scope: this,
                    handler: this.onModifyClick
                },
                {
                    iconCls: 'icon-del',
                    tooltip: '删除',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('ID'));
                    }
                },
                {
                    iconCls: 'icon-details',
                    tooltip: '查询设备目录',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.Catalog(rec.get('SVRID'));
                    }
                }]
            }
        }];



        //////////////////////////////////////////////////////////////////////////
        //工具栏

        this.groupTitle = Ext.create('Ext.draw.Text', {
            text: '所有用户'
        });
        this.tbar = [
        {
            iconCls: 'icon-refresh',
            text: '刷新',
            scope: this,
            handler: this.onSearch
        },
        '-',
        {
            iconCls: 'icon-add',
            text: '添加',
            scope: this,
            handler: this.onAddClick
        },
        {
            iconCls: 'icon-del',
            text: '删除',
            scope: this,
            handler: this.onDelClick
        },
        '-',
        {
            iconCls: 'icon-find',
            text: '查询设备目录',
            scope: this,
            handler: this.onCatalog
        }];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.MediaGateWay.GB28181.addSvrDlg', {
            LOWERSVR: this.LOWERSVR,
            MEDIAGATEWAYID: this.MEDIAGATEWAYID,
            url: '../GB28181/AddLowerSvr?id=' + this.MEDIAGATEWAYID,
            listeners: {
                scope: this,
                close: function () {
                    this.reLoad();
                }
            }
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.MediaGateWay.GB28181.addSvrDlg', {
            modifyMod: true,
            MEDIAGATEWAYID: this.MEDIAGATEWAYID,
            listeners: {
                scope: this,
                close: function () {
                    this.reLoad();
                }
            },
            LOWERSVR: this.LOWERSVR,
            ID: rec.get('ID'),
            SVRID: rec.get('SVRID'),
            SVRNAME: rec.get('SVRNAME'),
            SVRUSER: rec.get('SVRUSER'),
            SVRPSW: rec.get('SVRPSW'),
            CHECKUSER: rec.get('CHECKUSER'),
            SERVERTYPE: rec.get('SERVERTYPE'),
            url: '../GB28181/EditLowerSvr?id=' + this.MEDIAGATEWAYID
        }).show();
    },
    onCatalog: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vchns = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vchns != '')
                    vchns += ',';
                vchns += vsel[i].get('SVRID');
            }
            this.Catalog(vchns);
        }
    },
    Catalog: function (id) {
        var vme = this;
        var myMask = new Ext.LoadMask(vme, { msg: "正在，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../GB28181/Catalog',
            method: 'post', //方法  
            params: {id:this.MEDIAGATEWAYID, GATEWAYIDID: id },
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (!v.success)
                        alert(v.msg);
                    else
                        vme.reLoad();
                }
            }
        });
    },
    onDelClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vchns = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vchns != '')
                    vchns += ',';
                vchns += vsel[i].get('ID');
            }
            this.delChn(vchns);
        }

    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm('提示', '是否确定要删除?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../GB28181/DelLowerSvr?id=' + vme.MEDIAGATEWAYID,
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
                        alert('删除失败！');
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
                vchns += vsel[i].get('ID');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        this.store.clearFilter(true);
        this.store.filter([{
            property: 'LOWERSVR',
            value: this.LOWERSVR
        }]);
        this.updateLayout();
    }
});
