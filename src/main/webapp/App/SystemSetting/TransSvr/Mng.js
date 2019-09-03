//定义编辑对话框
Ext.define('App.SystemSetting.TransSvr.newDlg', {
    extend: 'App.Common.Wizard',
    title: SPLanguage.getMessage("TJYH"),
    modifyMod: false,
    initComponent: function () {
        this.wizardItems = ['App.SystemSetting.TransSvr.UserInfo',
        'App.SystemSetting.TransSvr.RecChn',
        'App.SystemSetting.TransSvr.CreateTransRule'];
        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.TransSvr.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../TransSvr/ListItems',
    //pageitemselectkey: 'USERID',
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
                width: 32
            }
        },
        {
            name: 'USERID',
            type: 'string'
        },
        {
            name: 'USERNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '服务器名',
                width: 80
            }
        },
        {
            name: 'DESCRIPTION',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("REMARK"),
                width: 120
            }
        },
        {
            name: 'LASTLOGONIP',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '登录IP',
                width: 120,
                align: 'center'
            }
        },
        {
            name: 'UPTM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '最后更新时间',
                width: 160,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '')
                        return '';
                    var dt = new Date(value);
                    return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
                }
            }
        },
        {
            name: 'ZXZT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STATE"),
                width: 40,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1')
                        return SPLanguage.getMessage("NORMAL");
                    return '<a style="color:red;">断线</a>';
                }
            }
        },
        {
            name: 'TOTALCHN',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: '通道数',
                width: 80,
                align: 'center',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var vDESCRIPTION = rec.get('DESCRIPTION');
                    if (vDESCRIPTION == '')
                        vDESCRIPTION = rec.get('USERNAME');
                    Ext.create('App.SystemSetting.TransSvr.showChnDlg',
                    {
                        SVRID: rec.get('USERID'),
                        title: vDESCRIPTION
                    }).show();
                }
            }
        },
        {
            name: 'RECCOUNT',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: '正在录象',
                width: 80,
                align: 'center',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var vDESCRIPTION = rec.get('DESCRIPTION');
                    if (vDESCRIPTION == '')
                        vDESCRIPTION = rec.get('USERNAME');
                    Ext.create('App.SystemSetting.TransSvr.showChnDlg',
                    {
                        SVRID: rec.get('USERID'),
                        title: vDESCRIPTION
                    }).show();
                }
            }
        },
        {
            name: 'RECBITRATE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '录像流量',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + ' bps';
                    }
                    else if (value < 1024 * 1024) {
                        return (value / 1024).toFixed(2) + ' kbps';
                    }
                    else {
                        return (value / 1024 / 1024).toFixed(2) + ' mbps';
                    }
                }
            }
        },
        {
            name: 'REALBITRATE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '视频流量',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + ' bps';
                    }
                    else if (value < 1024 * 1024) {
                        return (value / 1024).toFixed(2) + ' kbps';
                    }
                    else {
                        return (value / 1024 / 1024).toFixed(2) + ' mbps';
                    }
                }
            }
        },
        {
            name: 'NETDOWN',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: '网卡下行流量',
                width: 80,
                align: 'center',
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + ' kbps';
                    }
                    else {
                        return (value / 1024).toFixed(2) + ' mbps';
                    }
                },
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var vDESCRIPTION = rec.get('DESCRIPTION');
                    if (vDESCRIPTION == '')
                        vDESCRIPTION = rec.get('USERNAME');
                    Ext.create('App.SystemSetting.TransSvr.showNetDlg',
                    {
                        SVRID: rec.get('USERID'),
                        title: vDESCRIPTION
                    }).show();
                }
            }
        },
        {
            name: 'NETUP',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: '网卡上行流量',
                width: 80,
                align: 'center',
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + ' kbps';
                    }
                    else {
                        return (value / 1024).toFixed(2) + ' mbps';
                    }
                },
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var vDESCRIPTION = rec.get('DESCRIPTION');
                    if (vDESCRIPTION == '')
                        vDESCRIPTION = rec.get('USERNAME');
                    Ext.create('App.SystemSetting.TransSvr.showNetDlg',
                    {
                        SVRID: rec.get('USERID'),
                        title: vDESCRIPTION
                    }).show();
                }
            }
        },
        {
            name: 'DISKSIZE',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: '磁盘大小',
                width: 80,
                align: 'center',
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + 'G';
                    }
                    else {
                        return (value / 1024).toFixed(2) + 'T';
                    }
                },
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var vDESCRIPTION = rec.get('DESCRIPTION');
                    if (vDESCRIPTION == '')
                        vDESCRIPTION = rec.get('USERNAME');
                    Ext.create('App.SystemSetting.TransSvr.showDiskDlg',
                    {
                        SVRID: rec.get('USERID'),
                        title: vDESCRIPTION
                    }).show();
                }
            }
        },
        {
            name: 'USEDSIZE',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: '已使用',
                width: 80,
                align: 'center',
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + 'G';
                    }
                    else {
                        return (value / 1024).toFixed(2) + 'T';
                    }
                },
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var vDESCRIPTION = rec.get('DESCRIPTION');
                    if (vDESCRIPTION == '')
                        vDESCRIPTION = rec.get('USERNAME');
                    Ext.create('App.SystemSetting.TransSvr.showDiskDlg',
                    {
                        SVRID: rec.get('USERID'),
                        title: vDESCRIPTION
                    }).show();
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
                minWidth: 70,
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
                        this.delChn(rec.get('USERID'));
                    }
                },
                {
                    iconCls: 'icon-edit',
                    tooltip: '远程设置',
                    scope: this,
                    handler: this.onRemoteSetClick
                },
//                {
//                    iconCls: 'icon-details',
//                    tooltip: '查看登陆日志',
//                    scope: this,
//                    hidden: true,
//                    handler: this.onShowLoginLog
//                },
                {
                    iconCls: 'icon-details',
                    tooltip: SPLanguage.getMessage("CKLX"),
                    scope: this,
                    handler: this.onShowVideoFile
                }]
            }
        }];



        //////////////////////////////////////////////////////////////////////////
        //工具栏

        this.tbar = [
        {
            iconCls: 'icon-refresh',
            text: SPLanguage.getMessage("REFRESH"),
            scope: this,
            handler: this.refreshChn
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
        },
        '-',
        {
            iconCls: 'icon-del',
            text: '同步文件',
            scope: this,
            hidden: true,
            handler: this.onSynFilesClick
        },
        {
            iconCls: 'icon-del',
            text: '重启系统',
            scope: this,
            handler: this.onRestartOSClick
        },
        {
            iconCls: 'icon-del',
            text: '重启服务',
            scope: this,
            handler: this.onRestartServiceClick
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
    refreshChn: function () {
        var vme = this;
        vme.store.clearFilter(true);
        vme.store.load();
        vme.updateLayout();
    },
    onShowLoginLog: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (vme.parentTab) {
            vme.parentTab.addFeed(rec.get('USERNAME') + '(' + rec.get('DESCRIPTION') + ')', 'App.YWE.Log.LogonLog', true, { USERID: rec.get('USERID') });
        }
    },
    onShowRecChn: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (vme.parentTab) {
            vme.parentTab.addFeed('录像通道-' + rec.get('USERNAME'), 'App.SystemSetting.TransSvr.RecChnView', true, { USERID: rec.get('USERID') });
        }
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.TransSvr.newDlg', {
            modifyMod: false,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'user',
                UNITID: this.lastUNITID
            }
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.TransSvr.newDlg', {
            modifyMod: true,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'user',
                ID: rec.get('USERID')
            }
        }).show();
    },
    onRemoteSetClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.TransSvr.remoteSetDlg', {
            USERID: rec.get('USERID')
        }).show();
    },
    onShowVideoFile: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.TransSvr.showVideoFileDlg', {
            USERID: rec.get('USERID')
        }).show();
    },
    onSynFilesClick: function () {
        var vme = this;
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vusers = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vusers != '')
                    vusers += ',';
                vusers += vsel[i].get('USERID');
            }
            Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要同步录像文件?', function (result) {
                if (result != 'yes')
                    return;
                var myMask = new Ext.LoadMask(vme, { msg: "正在同步录像文件，请稍候！" });
                myMask.show();
                Ext.Ajax.request({
                    url: '../TransSvr/SynFiles',
                    method: 'post',
                    params: { IDS: vusers },
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
                            alert(SPLanguage.getMessage("SB"));
                        }
                    }
                });
            });
        }
        
    },
    onRestartOSClick: function () {
        var vme = this;
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vusers = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vusers != '')
                    vusers += ',';
                vusers += vsel[i].get('USERID');
            }
            Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要同步录像文件?', function (result) {
                if (result != 'yes')
                    return;
                var myMask = new Ext.LoadMask(vme, { msg: "正在同步录像文件，请稍候！" });
                myMask.show();
                Ext.Ajax.request({
                    url: '../TransSvr/RestartOS',
                    method: 'post',
                    params: { IDS: vusers },
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
                            alert(SPLanguage.getMessage("SB"));
                        }
                    }
                });
            });
        }
        
    },
    onRestartServiceClick: function () {
        var vme = this;
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vusers = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vusers != '')
                    vusers += ',';
                vusers += vsel[i].get('USERID');
            }
            Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要同步录像文件?', function (result) {
                if (result != 'yes')
                    return;
                var myMask = new Ext.LoadMask(vme, { msg: "正在同步录像文件，请稍候！" });
                myMask.show();
                Ext.Ajax.request({
                    url: '../TransSvr/RestartService',
                    method: 'post',
                    params: { IDS: vusers },
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
                            alert(SPLanguage.getMessage("SB"));
                        }
                    }
                });
            });
        }
        
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: '../TransSvr/Del', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.refreshChn();
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
                vchns += vsel[i].get('USERID');
            }
            this.delChn(vchns);
        }

    },
    onDelAllClick: function () {
        this.delChn('all');
    },
    onSearch: function () {
        var vuserid = this.username.getValue();
        if (vuserid)
            this.lastUserID = vuserid;
        else
            this.lastUserID = '';
        this.refreshChn();
    },
    onFinished: function (wizard) {
        var vme = this;
        if (wizard.modifyMod) {
            //修改模式
            var vValues = wizard.getValues();
            var rec = wizard.getItemRecord(0);
            vValues.USERID = wizard.rightParams.ID;
            vValues.USERNAME = rec.get('USERNAME');
            Ext.Ajax.request({
                url: '../TransSvr/EditUser', //查询案件详细信息
                method: 'post', //方法  
                jsonData: vValues,
                callback: function (options, success, response) {
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else {
                            wizard.close();
                            vme.refreshChn();
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
        else {
            //添加模式
            var vValues = wizard.getValues();
            vValues.UNITID = null;
            Ext.Ajax.request({
                url: '../TransSvr/AddUser', //查询案件详细信息
                method: 'post', //方法  
                jsonData: vValues,
                callback: function (options, success, response) {
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else {
                            wizard.close();
                            vme.refreshChn();
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
    },
    onUpdateMng: function () {
        Ext.create('App.SystemSetting.Dlg.UpdateDlg', {
        	updatetype: 'updatetrans'
        }).show();
    },
    onUpdateClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vchns = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vchns != '')
                    vchns += ',';
                vchns += vsel[i].get('USERID');
            }
           var vme = this;
        	Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要进行升级操作?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在操作，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../TransSvr/Update', //查询案件详细信息
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

    }
});
