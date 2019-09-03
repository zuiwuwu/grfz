//定义编辑对话框
Ext.define('App.SystemSetting.YWSvr.newDlg', {
    extend: 'App.Common.Wizard',
    title: SPLanguage.getMessage("TJYH"),
    modifyMod: false,
    initComponent: function () {
        this.wizardItems = ['App.SystemSetting.YWSvr.UserInfo'];
        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.YWSvr.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../UserManage/ListCheckServer',
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
                width: 40
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
                sortable: false,
                header: '服务器名',
                width: 180
            }
        },
        {
            name: 'DESCRIPTION',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("REMARK"),
                width: 180
            }
        },
        {
            name: 'LASTLOGONIP',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '登录IP',
                width: 120
            }
        },
        {
            name: 'LASTLOGONTIME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '最后登录时间',
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '')
                        return '';
                    var dt = new Date(value);
                    return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
                }
            }
        },
        {
            name: 'LASTLOGOUTTIME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '最后登出时间',
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '')
                        return '';
                    var dt = new Date(value);
                    return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
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
                    iconCls: 'icon-details',
                    tooltip: '查看登陆日志',
                    text: '日志',
                    scope: this,
                    handler: this.onShowLogonLog
                },
                {
                    iconCls: 'icon-details',
                    tooltip: '巡检模板管理',
                    text: '模板管理',
                    scope: this,
                    handler: this.onShowCheckMod
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
        }];

        this.callParent(arguments);
    },
    refreshChn: function () {
        var vme = this;
        vme.store.clearFilter(true);
        vme.store.load();
        vme.updateLayout();
    },
    onShowLogonLog: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (vme.parentTab) {
            vme.parentTab.addFeed('质量巡检服务器-' + rec.get('USERNAME'), 'App.YWE.Log.LogonLog', true, { USERID: rec.get('USERID') });
        }
    },
    onShowCheckMod: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (vme.parentTab) {
            vme.parentTab.addFeed('模板-' + rec.get('USERNAME'), 'App.SystemSetting.YWSvr.CheckMod', true, { USERID: rec.get('USERID') });
        }
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.YWSvr.newDlg', {
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
        var v = Ext.create('App.SystemSetting.YWSvr.newDlg', {
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
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: '../UserManage/DelUser',
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
                url: '../YWSvr/EditUser', //查询案件详细信息
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
                url: '../YWSvr/AddUser', //查询案件详细信息
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
    }
});
