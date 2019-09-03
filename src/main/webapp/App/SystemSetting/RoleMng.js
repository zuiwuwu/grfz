Ext.define('App.SystemSetting.RoleMng.treeModel', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'ROLEID', type: 'string' },
            { name: 'ROLENM', type: 'string' },
            { name: 'PARENTID', type: 'string' }
        ]
});

//定义编辑对话框
Ext.define('App.SystemSetting.RoleMng.newDlg', {
    extend: 'App.Common.Wizard',
    title: '添加角色',
    initComponent: function () {
        this.wizardItems = [Ext.create('App.SystemSetting.RolePage.RoleInfo', {}),
        Ext.create('App.SystemSetting.UserPage.RightTypeSel', { showRoleSel: false }),
        Ext.create('App.SystemSetting.UserPage.FunctionRight', {}),
        Ext.create('App.SystemSetting.UserPage.DevRight', {}),
        Ext.create('App.SystemSetting.UserPage.MapRight', {}),
        'App.SystemSetting.UserPage.TVWall',
        Ext.create('App.SystemSetting.UserPage.RightMod', {}),
        'App.SystemSetting.UserPage.DWRight'];
        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.RoleMng', {
    extend: 'Ext.tree.Panel',
    //title: '拓扑结构',
    //animCollapse: true,
    rootVisible: true,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    enableDD: true,
    initComponent: function () {
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            root: { expanded: true, text: '根', id: 0 },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: '../RoleMng/GetRoleMngTree',
                reader: {
                    type: 'json'
                }
            }
        });

        var vme = this;

        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                ddGroup: 'rolemngdrag',
                appendOnly: true
            },
            listeners: {
                beforedrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
                    dropHandlers.wait = true;
                    var vroleid = 0;
                    if (data.records.length > 0) {
                        vroleid = data.records[0].get('id');
                    }
                    if (vroleid == 0) {
                        dropHandlers.cancelDrop();
                        return;
                    }
                    Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要移动角色?', function (btn) {
                        if (btn === 'yes') {
                            Ext.Ajax.request({
                                url: '../RoleMng/EditRoleParentID', //查询案件详细信息
                                method: 'post', //方法  
                                jsonData: { ROLEID: vroleid, PARENTID: overModel.get('id') },
                                callback: function (options, success, response) {

                                    if (success) {
                                        var v = Ext.JSON.decode(response.responseText);
                                        if (!v.success) {
                                            dropHandlers.cancelDrop();
                                            alert(v.msg);
                                        }
                                        else
                                            dropHandlers.processDrop();
                                    }
                                    else {
                                        dropHandlers.cancelDrop();
                                        alert(SPLanguage.getMessage("Net_Error"));
                                    }
                                }
                            });
                        } else {
                            dropHandlers.cancelDrop();
                        }

                    });
                },
                drop: function (node, data, overModel, dropPosition, eOpts) {
                }
            }
        };

        this.refreshTree = function () {
            vme.store.load();
        };

        this.tbar = [{
            text: SPLanguage.getMessage("REFRESH"),
            iconCls: 'icon-refresh',
            handler: function () {
                vme.store.load();
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
        }, {
            text: '设置角色用户',
            iconCls: 'icon-add',
            scope: this,
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                if (vsel.length > 0) {
                	Ext.create('App.SystemSetting.RoleUserMng',{
                	ROLEID: vsel[0].get('id')
                	}).show();

                }
            }
        }];
        this.callParent(arguments);
    },
    onAddClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        var vPARENTID = 0;
        if (vsel.length > 0)
            vPARENTID = vsel[0].get('id');
        Ext.create('App.SystemSetting.RoleMng.newDlg', {
            modifyMod: false,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'role',
                PARENTID: vPARENTID
            }
        }).show();
    },
    onModifyClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var v = Ext.create('App.SystemSetting.RoleMng.newDlg', {
                modifyMod: true,
                listeners: {
                    scope: this,
                    finished: this.onFinished
                },
                rightParams: { settype: 'role',
                    ID: vsel[0].get('id')
                }
            });
            v.show();
            v.down('form').loadRecord(Ext.create('App.SystemSetting.RoleMng.treeModel', {
                'ROLENM': vsel[0].get('text'),
                'ROLEID': vsel[0].get('id')
            }));
        }
    },
    onDelClick: function () {
        var vme = this;
        var vsel = vme.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除当前分组?', function (result) {
                if (result != 'yes')
                    return;
                var myMask = new Ext.LoadMask(vme, { msg: "正在删除分组，请稍候！" });
                myMask.show();

                Ext.Ajax.request({
                    url: '../RoleMng/DelRoleMng', //查询案件详细信息
                    method: 'post', //方法  
                    params: { ROLEID: vsel[0].get('id') },
                    callback: function (options, success, response) {
                        myMask.hide();
                        if (success) {
                            var v = Ext.JSON.decode(response.responseText);
                            if (!v.success)
                                alert(v.msg);
                            else
                                vme.refreshTree();
                        }
                        else {
                            alert(SPLanguage.getMessage("DelFail"));
                        }
                    }
                });
            });
        }
    },
    onFinished: function (wizard) {
        var vme = this;
        var myMask = new Ext.LoadMask(wizard, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        if (wizard.modifyMod) {
            //修改模式
            var vValues = wizard.getValues();
            var rec = wizard.getItemRecord(0);
            vValues.ROLEID = wizard.rightParams.ID;
            Ext.Ajax.request({
                url: '../RoleMng/EditRoleMng', //查询案件详细信息
                method: 'post', //方法  
                jsonData: vValues,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else {
                            wizard.close();
                            vme.refreshTree();
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
            vValues.PARENTID = wizard.rightParams.PARENTID;
            Ext.Ajax.request({
                url: '../RoleMng/AddRoleMng', //查询案件详细信息
                method: 'post', //方法  
                jsonData: vValues,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else {
                            wizard.close();
                            vme.refreshTree();
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
