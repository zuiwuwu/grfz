//接收服务器
Ext.define('App.SystemSetting.JKXTMng.Index', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../RcvSvrMng/ListItems',
    requires: ['App.Common.HyperLinkColumn'],
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
            name: 'UNITNAME',
            type: 'string'
        },
        {
            name: 'TXLJ',
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
            name: 'UNITID',
            type: 'string'
        },
        {
            name: 'JKXTPORT',
            type: 'string'
        },
        {
            name: 'JKXTUSER',
            type: 'string'
        },
        {
            name: 'JKXTPSW',
            type: 'string'
        },
        {
            name: 'JKXTBH',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '监控系统编号',
                width: 150
            }
        },
        {
            name: 'JKXTSZD',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '监控系统所在地',
                width: 150
            }
        },
        {
            name: 'WLFWM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("NAME"),
                width: 150
            }
        },
        {
            name: 'IPDZ',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'IP地址',
                width: 100
            }
        },
        {
            name: 'JKXTZT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STATE"),
                width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1')
                        return '在线';
                    return '<a style="color:Red">断线</a>';
                }
            }
        },
        {
            name: 'C',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: '设备数量',
                width: 60,
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var rec = grid.getStore().getAt(rowIndex);
                    if (vme.parentTab) {
                        vme.parentTab.addFeed('接收服务器通道', 'App.SystemSetting.JKXTMng.Chn', true, { JKXTBH: rec.get('JKXTBH') });
                    }
                    else {
                        window.open('../Main/CommonView?class=App.SystemSetting.JKXTMng.Chn&JKXTBH=' + rec.get('JKXTBH'), "_blank");
                    }
                    //this.delChn(rec.get('JKXTBH'));
                }
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
                minWidth: 300,
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
                        this.delChn(rec.get('JKXTBH'));
                    }
                },
                {
                    iconCls: 'icon-del',
                    tooltip: '重启系统',
                    scope: this,
                    handler: this.onRestartOSClick
                },
                {
                    iconCls: 'icon-del',
                    tooltip: '重启服务',
                    scope: this,
                    handler: this.onRestartServiceClick
                }]
            }
        }];



        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCH"),
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
         },
         '-',
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
        },
        '-',
        {
            iconCls: 'icon-del',
            text: '重新加载布控',
            scope: this,
            handler: this.onReloadClick
        },
        '-',
        {
            iconCls: 'icon-del',
            text: '升级包管理',
            scope: this,
            handler: this.onUpdateMng
        },
        {
            iconCls: 'icon-del',
            text: '升级服务器',
            scope: this,
            handler: this.onUpdateClick
        }];

        this.callParent(arguments);
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.JKXTMng.newDlg', {
            url: '../RcvSvrMng/Create',
            modifyMod: false,
            listeners: {
                scope: this,
                saveok: this.onFinished
            }
        }).show();
    },
    onUpdateMng: function () {
        Ext.create('App.SystemSetting.Dlg.UpdateDlg', {
            //url: '../RcvSvrMng/Create'
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.JKXTMng.newDlg', {
            url: '../RcvSvrMng/Edit',
            modifyMod: true,
            JKXTBH: rec.get('JKXTBH'),
            listeners: {
                scope: this,
                saveok: this.onFinished
            }
        });
        v.show();
        v.down('form').loadRecord(rec);
    },
    onRestartOSClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要重启系统?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "是否确定要重启系统，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../RcvSvrMng/RestartOS', //查询案件详细信息
                method: 'post', //方法  
                params: { JKXTBH: rec.get('JKXTBH') },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.onSearch();
                    }
                    else {
                        alert(SPLanguage.getMessage("SB"));
                    }
                }
            });
        });
    },
    onRestartServiceClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要重启服务?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "是否确定要重启服务，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../RcvSvrMng/RestartService', //查询案件详细信息
                method: 'post', //方法  
                params: { JKXTBH: rec.get('JKXTBH') },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.onSearch();
                    }
                    else {
                        alert(SPLanguage.getMessage("SB"));
                    }
                }
            });
        });
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../RcvSvrMng/Delete', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.onSearch();
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
                vchns += vsel[i].get('JKXTBH');
            }
            this.delChn(vchns);
        }

    },
    onReloadClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vchns = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vchns != '')
                    vchns += ',';
                vchns += vsel[i].get('JKXTBH');
            }
           var vme = this;
        	Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要重新加载布控?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在加载，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../RcvSvrMng/reloaddetect', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.onSearch();
                    }
                    else {
                        
                    }
                }
            });
        });
        }

    },
    onUpdateClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vchns = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vchns != '')
                    vchns += ',';
                vchns += vsel[i].get('JKXTBH');
            }
           var vme = this;
        	Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要重新加载布控?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在加载，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../RcvSvrMng/Update', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                    }
                    else {
                        
                    }
                }
            });
        });
        }

    },
    onSearch: function () {
        var vme = this;
        vme.store.load();
    },
    onFinished: function () {
        var vme = this;
        vme.onSearch();
    }
});
