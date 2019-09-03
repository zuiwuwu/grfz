//定义编辑对话框
Ext.define('App.SystemSetting.RTSPSvr.newDlg', {
    extend: 'App.Common.Wizard',
    title: SPLanguage.getMessage("TJYH"),
    modifyMod: false,
    initComponent: function () {
        this.wizardItems = [Ext.create('App.SystemSetting.RTSPSvr.UserInfo', {}),
        Ext.create('App.SystemSetting.UserPage.RightTypeSel', {}),
        Ext.create('App.SystemSetting.UserPage.FunctionRight', {}),
        Ext.create('App.SystemSetting.UserPage.DevRight', {}),
        Ext.create('App.SystemSetting.UserPage.MapRight', {}),
        Ext.create('App.SystemSetting.UserPage.RightMod', {}),
        Ext.create('App.SystemSetting.UserPage.RoleSel', {})];
        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.RTSPSvr.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../UserManage/ListRtspServer',
    initComponent: function () {
        var vme = this;
        this.viewConfig = {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'group1',
                dropGroup: 'group2',
                enableDrag: true,
                enableDrop: false
            },
            listeners: {
                drop: function (node, data, dropRec, dropPosition) {
                    //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                    //Ext.example.msg('Drag from right to left', 'Dropped ' + data.records[0].get('name') + dropOn);
                }
            }
        };
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
                sortable: false,
                header: '服务器名',
                width: 80
            }
        },
        {
            name: 'DESCRIPTION',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("REMARK"),
                width: 120
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
                        this.delChn(rec.get('USERID'));
                    }
                },
                {
                    iconCls: 'icon-details',
                    tooltip: '查看登陆日志',
                    scope: this,
                    handler: this.onShowLoginLog
                },
                {
                    iconCls: 'icon-details',
                    tooltip: '禁止用户登陆',
                    scope: this,
                    handler: this.onResetPswClick
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



        this.refreshChn = function () {
            vme.store.load();
        };
        this.callParent(arguments);
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.RTSPSvr.newDlg', {
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
    onShowLoginLog: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (vme.parentTab) {
            vme.parentTab.addFeed(rec.get('USERNAME') + '(' + rec.get('DESCRIPTION') + ')', 'App.YWE.Log.LogonLog', true, { USERID: rec.get('USERID') });
        }
    },
    onResetPswClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要重置密码?重置后密码将被改为默认的(123456)。', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZCZMM") });
            myMask.show();
            Ext.Ajax.request({
                url: vme.urlDelGroupChn, //查询案件详细信息
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
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.RTSPSvr.newDlg', {
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
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: vme.urlDelGroupChn, //查询案件详细信息
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
                url: '../UserManage/EditUser', //查询案件详细信息
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
            vValues.UNITID = wizard.rightParams.UNITID;
            Ext.Ajax.request({
                url: '../UserManage/AddUser', //查询案件详细信息
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
