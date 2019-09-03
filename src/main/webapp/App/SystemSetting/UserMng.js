//定义编辑对话框
Ext.define('App.SystemSetting.UserMng.newDlg', {
    extend: 'App.Common.Wizard',
    title: SPLanguage.getMessage("TJYH"),
    modifyMod: false,
    initComponent: function () {
        this.wizardItems = ['App.SystemSetting.UserPage.UserInfo',
        'App.SystemSetting.UserPage.RightTypeSel',
        'App.SystemSetting.UserPage.FunctionRight',
        'App.SystemSetting.UserPage.DevRight',
        'App.SystemSetting.UserPage.MapRight',
        'App.SystemSetting.UserPage.TVWall',
        'App.SystemSetting.UserPage.RightMod',
        'App.SystemSetting.UserPage.RoleSel',
        'App.SystemSetting.UserPage.DWRight'];
        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.UserMng.setRoleDlg', {
    extend: 'App.Common.Wizard',
    title: '修改用户角色',
    modifyMod: true,
    initComponent: function () {
        this.wizardItems = ['App.SystemSetting.UserPage.RoleSel'];
        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.UserMng.groupTree', {
    extend: 'Ext.tree.Panel',
    //title: '拓扑结构',
    //animCollapse: true,
    rootVisible: true,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    enableDD: true,
    initComponent: function () {
        this.addEvents(
            'drapuserfinished'
        );
        var vme = this;
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            remoteFilter: true,
            root: { expanded: true, text: '所有部门', id: '' },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.urlGetGroupTree,
                reader: {
                    type: 'json'
                }
            }
        });
        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                dragGroup: 'group2',
                dropGroup: 'group1',
                enableDrag: false,
                enableDrop: true
            },
            listeners: {
                beforedrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
                    var vIDS = '';
                    for (var i = 0; i < data.records.length; i++) {
                        if (vIDS != '')
                            vIDS += ',';
                        vIDS += data.records[i].get('USERID');
                    }
                    dropHandlers.wait = true;
                    Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要把用户移动到该管辖单位?', function (btn) {
                        if (btn === 'yes') {
                            //dropHandlers.processDrop();

                            Ext.Ajax.request({
                                url: '../UserManage/EditUserUnit', //查询案件详细信息
                                method: 'post', //方法  
                                params: { USERID: vIDS, UNITID: overModel.get('id') },
                                callback: function (options, success, response) {
                                    dropHandlers.cancelDrop();
                                    if (success) {

                                        vme.fireEvent('drapuserfinished');
                                    }
                                    else {
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

        this.callParent(arguments);
    }
});


Ext.define('App.SystemSetting.UserMng.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    lastUNITID: '',
    requires: ['App.Common.HyperLinkColumn'],
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
                width: 60
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
                header: SPLanguage.getMessage("USERNAME"),
                width: 60
            }
        },
        {
            name: 'CARDNUM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '工作证号',
                width: 60
            }
        },
        {
            name: 'DESCRIPTION',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("ZSXM"),
                width: 60,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + value + '">' + value + '</a>';
                }
            }
        },
        {
            name: 'UNITNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("DEPARTMENT"),
                width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + value + '">' + value + '</a>';
                }
            }
        },
        {
            name: 'PHONE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("LXDH"),
                width: 100
            }
        },
        {
            name: 'ROLENAME',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: '角色',
                width: 100,
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.create('App.SystemSetting.UserMng.setRoleDlg', {
                        modifyMod: true,
                        listeners: {
                            scope: vme,
                            finished: vme.onFinishedModifyRole
                        },
                        rightParams: { settype: 'user',
                            ID: rec.get('USERID')
                        }
                    }).show();
                },
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (value == '') {
                        return "无";
                    }
                    return value;
                }
            }
        }
        ,
        {
            name: 'LASTERRORCOUNT',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: SPLanguage.getMessage("CWCS"),
                width: 70,
                align: 'center',
                handler: function (grid, rowIndex, colIndex) {
                    vme.onEnableUserErrorCount(grid, rowIndex, colIndex);
                },
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (parseInt(value) >= 5) {
                        vcol.col = 'Red';
                        return "解锁";
                    }
                    else if (parseInt(value) < 0)
                        return "限制";
                    else {
                        return "取消限制";
                    }
                }
            }
        },
        {
            name: 'ACT',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: SPLanguage.getMessage("QY_JY"),
                width: 70,
                align: 'center',
                handler: function (grid, rowIndex, colIndex) {
                    vme.onEnableUser(grid, rowIndex, colIndex);
                },
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (parseInt(value) == 0) {
                        vcol.col = 'Red';
                        return SPLanguage.getMessage("QIY");
                    }
                    return SPLanguage.getMessage("DISABLE");
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
                minWidth: 320,
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
                    tooltip: SPLanguage.getMessage("CZMM"),
                    scope: this,
                    handler: this.onResetPswClick
                },
                {
                    iconCls: 'icon-details',
                    tooltip: SPLanguage.getMessage("CKRZ"),
                    scope: this,
                    handler: this.onShowLoginLog
                }]
            }
        }];

        this.username = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 150,
            url: '../UserManage/GetAutoCompleteList',
            displayField: 'USERNAME',
            valueField: 'USERID',
            fields: [{
                name: 'USERID',
                mapping: function (raw) {
                    return raw.USERID;
                }
            },
            {
                name: 'USERNAME',
                mapping: function (raw) {
                    var result = raw.USERNAME;
                    return result;
                }
            }, {
                name: 'DESCRIPTION'
            }]
        }
        );
 		this.xm = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 150,
            url: '../UserManage/GetAutoCompleteList',
            displayField: 'DESCRIPTION',
            valueField: 'USERID',
            fields: [{
                name: 'USERID',
                mapping: function (raw) {
                    return raw.USERID;
                }
            },
            {
                name: 'DESCRIPTION',
                mapping: function (raw) {
                    var result = raw.DESCRIPTION;
                    return result;
                }
            }]
        }
        );

        //////////////////////////////////////////////////////////////////////////
        //工具栏

        this.groupTitle = Ext.create('Ext.draw.Text', {
            text: '所有用户'
        });
        this.tbar = [
        SPLanguage.getMessage("USERNAME"),
        this.username,
        '真实姓名',
        this.xm,
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
        '->',
        this.groupTitle];

        this.changeGroup = function (UNITID, text) {
            if (vme.lastUNITID != UNITID) {
                vme.lastUNITID = UNITID;
                vme.refreshChn();
                //vme.setTitle(text);
                vme.groupTitle.setText(text);
            }
        };

        this.refreshChn = function () {
            vme.store.clearFilter(true);
            var vusername = this.username.getRawValue();
            vme.store.filter([{
                property: 'username',
                value: vusername
            },{
                property: 'XM',
                value:  this.xm.getRawValue()
            },
            {
                property: 'UNITID',
                value: vme.lastUNITID
            }]);
            vme.updateLayout();
        };
        this.callParent(arguments);
        vme.store.sorters.add(new Ext.util.Sorter({
            property: 'USERNAME',
            direction: 'ASC'
        }));
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.UserMng.newDlg', {
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
            vme.parentTab.addFeed(SPLanguage.getMessage("YHDLRZ"), 'App.YWE.Log.LogonLog', true, { USERNAME: rec.get('USERNAME') });
        }
    },
    onEnableUser: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), (rec.get("ACT") == '1') ? SPLanguage.getMessage("SFQDYJYYH") : SPLanguage.getMessage("SFQDYQYYH"), function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: (rec.get("ACT") == '1') ? SPLanguage.getMessage("ZZJYYH") : SPLanguage.getMessage("ZZQYYH") });
            myMask.show();
            Ext.Ajax.request({
                url: '../UserManage/ActionUser',
                method: 'post', //方法  
                params: { id: rec.get("USERID"), act: (rec.get("ACT") == '1') ? '0' : '1' },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), v.msg);
                        else
                            vme.reLoad();
                    }
                    else {
                        Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SB"));
                    }
                }
            });
        });
    },
    onEnableUserErrorCount: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var value = rec.get("LASTERRORCOUNT");

        var vact = '0';
        var vtext = SPLanguage.getMessage("JCYHSD");
        if (parseInt(value) >= 5) {
        }
        else if (parseInt(value) < 0) {
            vtext = SPLanguage.getMessage("XZYHDLCWS");
            vact = '1';
        }
        else {
            vtext = SPLanguage.getMessage("QXYHDLCWCSXZ");
            vact = '2';
        }
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDY") + vtext + '?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ING") + vtext + SPLanguage.getMessage("WAITING") });
            myMask.show();
            Ext.Ajax.request({
                url: '../UserManage/EnableUserErrorCount',
                method: 'post', //方法  
                params: { id: rec.get("USERID"), act: vact },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), v.msg);
                        else
                            vme.reLoad();
                    }
                    else {
                        Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SB"));
                    }
                }
            });
        });
    },
    onResetPswClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '<div><a>是否确定要重置密码?重置后密码将被改为默认的(123456)。</a><br><span><a>重置密码后该用户第一次登录需修改密码。</a></span></div>', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZCZMM") });
            myMask.show();
            Ext.Ajax.request({
                url: '../UserManage/ResetUserPassword',
                method: 'post', //方法  
                params: { id: rec.get("USERID") },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), v.msg);
                    }
                    else {
                        Ext.MessageBox.alert(SPLanguage.getMessage("REMINDER"), '重置失败！');
                    }
                }
            });
        });
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.UserMng.newDlg', {
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
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除用户?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCYH") });
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
                vchns += vsel[i].get('USERID');
            }
            this.delChn(vchns);
        }

    },
    onDelAllClick: function () {
        this.delChn('all');
    },
    onSearch: function () {
        this.refreshChn();
    },
    onFinishedModifyRole: function (wizard) {
        var vme = this;
        var myMask = new Ext.LoadMask(wizard, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        var vValues = wizard.getValues();
        vValues.USERID = wizard.rightParams.ID;
        Ext.Ajax.request({
            url: '../UserManage/EditUserRole',
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
                        vme.reLoad();
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    },
    onFinished: function (wizard) {
        var vme = this;
        var myMask = new Ext.LoadMask(wizard, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        if (wizard.modifyMod) {
            //修改模式
            var vValues = wizard.getValues();
            var rec = wizard.getItemRecord(0);
            vValues.USERID = wizard.rightParams.ID;
            //vValues.USERNAME = rec.get('USERNAME');
            Ext.Ajax.request({
                url: '../UserManage/EditUser',
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
                            vme.reLoad();
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
                url: '../UserManage/AddUser',
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
                            vme.reLoad();
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

Ext.define('App.SystemSetting.UserMng', {
    extend: 'Ext.Panel',
    layout: 'border',
    forumId: '',
    border: 0,
    urlGetGroupTree: '../UNIT/GetUnitTree',
    initComponent: function () {
        this.items = [this.createRight(), this.createOCX()];
        // call the superclass's initComponent implementation
        this.callParent(arguments);
    },
    createOCX: function () {

        this.vchnlist = Ext.create('App.SystemSetting.UserMng.List', {
            region: 'center',
            //title: '根',
            url: '../UserManage/List',
            parentTab: this.parentTab
        });
        return this.vchnlist;
    },
    createRight: function () {
        var v = Ext.create('App.SystemSetting.UserMng.groupTree', {
            region: 'east',
            title: SPLanguage.getMessage("GXDW"),
            width: 210,
            split: true,
            border: 1,
            minWidth: 230,
            maxWidth: 230,
            collapsible: true,
            urlAddGroup: this.urlAddGroup,
            urlEditGroup: this.urlEditGroup,
            urlDelGroup: this.urlDelGroup,
            urlGetGroupTree: this.urlGetGroupTree,
            listeners: {
                scope: this,
                selectionchange: this.onSelectionchange,
                drapuserfinished: this.onDrapuserfinished
            }
        });
        return v;
    },
    onSelectionchange: function (tree, selected, eOpts) {
        if (selected.length > 0) {
            this.vchnlist.changeGroup(selected[0].get('id'), selected[0].get('text'));
        }
    },
    onDrapuserfinished: function () {
        this.vchnlist.reLoad();
    }
});

