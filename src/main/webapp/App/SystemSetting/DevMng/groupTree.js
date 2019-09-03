Ext.define('App.SystemSetting.DevMng.groupTree.treeModel', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'GNAME', type: 'string' },
            { name: 'INDEXID', type: 'number' },
            { name: 'GID', type: 'number' }
        ]
});

//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.groupTree.newDlg', {
    extend: 'App.Common.EditDlg',
    title: '分组属性',
    PARENTID: 0,
    initComponent: function () {
        this.items = [{
            allowBlank: true,
            name: 'PARENTID',
            value: this.PARENTID,
            hidden: true
        },
        {
            allowBlank: true,
            name: 'GID',
            value: this.GID,
            hidden: true
        },
                        {
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("NAME"),
                            name: 'GNAME',
                            value: this.GNAME,
                            emptyText: SPLanguage.getMessage("BNWK")
                        },
                        {
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("SERIALNUM"),
                            name: 'INDEXID',
                            value: this.INDEXID,
                            emptyText: SPLanguage.getMessage("SERIALNUM")
                        }];


        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.DevMng.groupTree', {
    extend: 'Ext.tree.Panel',
    rootVisible: true,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    enableDD: true,
    urlAddGroup: '../DevGroup/AddGroup',
    urlEditGroup: '../DevGroup/EditGroup',
    urlDelGroup: '../DevGroup/DelGroup',
    urlUpdateGroupParent: '../DevGroup/UpdateGroupParent',
    urlGetGroupTree: '../DevGroup/GetGroupTree',
    urlEditDevGID: '../DevMng/EditDevGID',
    initComponent: function () {
        this.addEvents(
            'drapuserfinished'
        );
        var vme = this;
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            remoteFilter: true,
            root: { expanded: true, text: '所有设备', id: '0' },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.urlGetGroupTree,
                reader: {
                    type: 'json'
                }
            }
        });


        this.tbar = [{
            iconCls: 'icon-refresh',
            text: SPLanguage.getMessage("REFRESH"),
            scope: this,
            handler: function () {
                var vsel = this.getSelectionModel().getSelection();
                if (vsel.length > 0)
                    vme.store.load({ node: vsel[0] });
                else
                    vme.store.load();
            }
        }, {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("PUSH"),
            scope: this,
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                var vPARENTID = 0;
                if (vsel.length > 0)
                    vPARENTID = vsel[0].get('id');
                else
                    return;
                Ext.create('App.SystemSetting.DevMng.groupTree.newDlg', {
                    PARENTID: vPARENTID,
                    url: vme.urlAddGroup,
                    listeners:
                    {
                        scope: this,
                        saveok: function () {
                            vme.refreshTree(vsel[0]);
                        }
                    }
                }).show();
            }
        }, {
            iconCls: 'icon-edit',
            text: SPLanguage.getMessage("ALTER"),
            scope: this,
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                if (vsel.length > 0
                &&vsel[0].raw.attributes) {
                    var v = Ext.create('App.SystemSetting.DevMng.groupTree.newDlg', {
                        url: vme.urlEditGroup,
                        PARENTID: vsel[0].raw.attributes.PARENTID,
                        GNAME: vsel[0].get('text'),
                        INDEXID: vsel[0].raw.attributes.INDEXID,
                        GID: vsel[0].get('id'),
                        listeners:
                        {
                            scope: this,
                            saveok: function () {
                                vme.refreshTree(vsel[0].parentNode);
                            }
                        }
                    }).show();
                }
            }
        }, {
            iconCls: 'icon-del',
            text: SPLanguage.getMessage("DELETE"),
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                if (vsel.length > 0
                && vsel[0].raw.attributes) {
                    Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除当前分组?', function (result) {
                        if (result != 'yes')
                            return;
                        var myMask = new Ext.LoadMask(vme, { msg: "正在删除分组，请稍候！" });
                        myMask.show();

                        Ext.Ajax.request({
                            url: vme.urlDelGroup, //查询案件详细信息
                            method: 'post', //方法  
                            params: { GID: vsel[0].get('id') },
                            callback: function (options, success, response) {
                                myMask.hide();
                                if (success) {
                                    var v = Ext.JSON.decode(response.responseText);
                                    if (!v.success)
                                        alert(v.msg);
                                    else
                                        vme.refreshTree(vsel[0].parentNode);
                                }
                                else {
                                    alert(SPLanguage.getMessage("DelFail"));
                                }
                            }
                        });
                    });
                }
            }
        }];
        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                dragGroup: 'group1',
                dropGroup: 'group1',
                enableDrag: true,
                enableDrop: true
            },
            listeners: {
                beforedrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
                    var view = data.view;
                    if (view.xtype == 'treeview') {
                        if (data.records.length == 0)
                            return;
                        var id = data.records[0].get('id');
                        dropHandlers.wait = true;
                        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要把移动分组?', function (btn) {
                            if (btn === 'yes') {
                                var url = vme.urlUpdateGroupParent;
                                var vparams = {};
                                vparams = {
                                    PARENTID: overModel.get('id'),
                                    GID: id
                                };
                                Ext.Ajax.request({
                                    url: url, //查询案件详细信息
                                    method: 'post', //方法  
                                    params: vparams,
                                    callback: function (options, success, response) {
                                        if (success) {
                                            var result = Ext.JSON.decode(response.responseText);
                                            if (result.success) {
                                                dropHandlers.processDrop();
                                            }
                                            else {
                                                dropHandlers.cancelDrop();
                                                alert(result.msg);
                                            }

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
                    }
                    else {
                        var vIDS = '';
                        for (var i = 0; i < data.records.length; i++) {
                            if (vIDS != '')
                                vIDS += ',';
                                if(data.records[i].get('DEVICEID'))
                            		vIDS += data.records[i].get('DEVICEID');
                            	else 
                            		vIDS += data.records[i].get('GLOBALID');
                        }
                        dropHandlers.wait = true;
                        if (overModel.get('id') != '') {
                            Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要把设备移动到分组?', function (btn) {
                                if (btn === 'yes') {
                                    Ext.Ajax.request({
                                        url: vme.urlEditDevGID,
                                        method: 'post', //方法  
                                        params: { DEVICEID: vIDS, GID: overModel.get('id') },
                                        callback: function (options, success, response) {
                                            dropHandlers.cancelDrop();

                                            if (success) {
                                                response = Ext.JSON.decode(response.responseText);
                                                if (response.success)
                                                    vme.fireEvent('drapuserfinished');
                                                else
                                                    alert(response.msg);
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
                        }
                        else {
                            dropHandlers.cancelDrop();
                        }

                    }


                },
                drop: function (node, data, overModel, dropPosition, eOpts) {
                }
            }
        };


        this.callParent(arguments);
    },
    refreshTree: function (node) {

        if (node) {
            this.store.load({
                node: node
            });
        }
        else
            this.store.load();
    }
});

