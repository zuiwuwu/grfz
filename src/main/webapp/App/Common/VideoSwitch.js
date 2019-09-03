//定义数据
Ext.define('App.Common.VideoSwitch.Store', {
    extend: 'Ext.data.TreeStore',
    autoLoad: true,
    root: {
        expanded: true
    },
    //root: { expanded: false },
    proxy: {
        type: 'ajax',
        actionMethods: 'post',
        url: '../SPVideo_Loop/GetTree',
        reader: {
            type: 'json'
        }
    }
});

Ext.define('App.Common.VideoSwitch', {
    extend: 'Ext.tree.Panel',
    rootVisible: false,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    initComponent: function () {
        var vme = this;
        this.addEvents('applyloopqueue', 'videoswitchshowchn');
        this.store = Ext.create('App.Common.VideoSwitch.Store', {
        });

        if (!this.listeners)
            this.listeners = {};
        this.listeners = Ext.apply(this.listeners, {
            itemdblclick: function (grid, record) {
                vme.onItemdblclick(grid, record);
            }
        });


        this.tbar = [{
            text: '刷新',
            scope: this,
            iconCls: 'icon-refresh',
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                if (vsel.length == 0) {
                    vme.store.load();
                }
                else if (vsel.length > 0) {
                    if (vsel[0].data.id == "loop"
                || vsel[0].data.id == "scheme"
                || vsel[0].data.id == "task") {
                        vme.store.load({
                            node: vsel[0]
                        });
                    }
                    else if (vsel[0].data.id.indexOf("loop") != -1
                || vsel[0].data.id.indexOf("scheme") != -1
                || vsel[0].data.id.indexOf("task") != -1) {
                        vme.store.load({
                            node: vsel[0].parentNode
                        });
                    }

                }

            }
        }, {
            text: '添加',
            iconCls: 'icon-add',
            scope: this,
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                if (vsel.length > 0) {
                    var node = vsel[0];
                    if (vsel[0].data.id.indexOf("loop") != -1) {
                        Ext.create('App.Common.IframeDialog', {
                            dialogClass: 'App.Common.VideoSwitch.loopDialg',
                            listeners:
                            {
                                scope: this,
                                close: function () {
                                    this.store.load({ node: node });
                                }
                            }
                        }).show();
                    }
                    else if (vsel[0].data.id.indexOf("scheme") != -1) {
                        Ext.create('App.Common.IframeDialog', {
                            dialogClass: 'App.Common.VideoSwitch.schemeDialg',
                            listeners:
                            {
                                scope: this,
                                close: function () {
                                    this.store.load({ node: node });
                                }
                            }
                        }).show();
                    }
                    else if (vsel[0].data.id.indexOf("task") != -1) {
                        Ext.create('App.Common.IframeDialog', {
                            dialogClass: 'App.Common.VideoSwitch.taskDialg',
                            listeners:
                            {
                                scope: this,
                                close: function () {
                                    this.store.load({ node: node });
                                }
                            }
                        }).show();
                    }
                }
            }
        }, {
            text: '修改',
            scope: this,
            iconCls: 'icon-edit',
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                if (vsel.length > 0
                && vsel[0].raw.attributes) {
                    var node = vsel[0];
                    if (vsel[0].raw.attributes.TYPE == 0) {
                        Ext.create('App.Common.IframeDialog', {
                            dialogClass: 'App.Common.VideoSwitch.loopDialg',
                            dialogParams: { NM: vsel[0].get('text'),
                                QUEUEID: vsel[0].raw.attributes.QUEUEID
                            },
                            listeners:
                            {
                                scope: this,
                                close: function () {
                                    this.store.load({ node: node.parentNode });
                                }
                            }
                        }).show();
                    }
                    else if (vsel[0].raw.attributes.TYPE == 1) {
                        Ext.create('App.Common.IframeDialog', {
                            dialogClass: 'App.Common.VideoSwitch.schemeDialg',
                            dialogParams: { NM: vsel[0].get('text'),
                                SCHEMEID: vsel[0].raw.attributes.SCHEMEID,
                                SPLITNUM: vsel[0].raw.attributes.SPLITNUM
                            },
                            listeners:
                            {
                                scope: this,
                                close: function () {
                                    this.store.load({ node: node.parentNode });
                                }
                            }
                        }).show();
                    }
                    else if (vsel[0].raw.attributes.TYPE == 2) {
                        Ext.create('App.Common.IframeDialog', {
                            dialogClass: 'App.Common.VideoSwitch.taskDialg',
                            dialogParams: {
                                NM: vsel[0].get('text'),
                                TASKID: vsel[0].raw.attributes.TASKID
                            },
                            listeners:
                            {
                                scope: this,
                                close: function () {
                                    this.store.load({ node: node.parentNode });
                                }
                            }
                        }).show();
                    }
                }
            }
        }, {
            text: '删除',
            iconCls: 'icon-del',
            scope: this,
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                if (vsel.length == 0)
                    return;
                var rec = vsel[0];

                if (rec.raw.attributes) {
                    var vmsg = '是否确定要删除轮巡队列?';
                    var vid = 0;
                    var looptype = 'loop';
                    if (rec.raw.attributes.TYPE == 0) {
                        vmsg = '是否确定要删除轮巡队列?';
                        vid = rec.raw.attributes.QUEUEID;
                        looptype = 'loop';
                    }
                    else if (rec.raw.attributes.TYPE == 1) {
                        vmsg = '是否确定要删除显示方案?';
                        vid = rec.raw.attributes.SCHEMEID;
                        looptype = 'scheme';
                    }
                    else if (rec.raw.attributes.TYPE == 2) {
                        vmsg = '是否确定要删除任务?';
                        vid = rec.raw.attributes.TASKID;
                        looptype = 'task';
                    }
                    if (confirm(vmsg)) {
                        Ext.Ajax.request({
                            url: '../SPVideo_Loop/Del', //查询案件详细信息
                            method: 'post', //方法  
                            params: { id: vid, looptype: looptype },
                            callback: function (options, success, response) {
                                if (success) {
                                    var v = Ext.JSON.decode(response.responseText);
                                    if (!v.success)
                                        alert(v.msg);
                                    else {
                                        vme.store.load({
                                            node: rec.parentNode
                                        });
                                    }
                                }
                                else {
                                    alert('删除失败！');
                                }
                            }
                        });
                    }
                    else {
                    }
                }


            }
        }, {
            text: '应用',
            iconCls: 'icon-details',
            scope: this,
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                if (vsel.length > 0
                && vsel[0].raw.attributes) {
                    if (vsel[0].raw.attributes.TYPE == 0) {
                        vme.applyLoopqueue(vsel[0].raw.attributes.QUEUEID);
                    }
                    else if (vsel[0].raw.attributes.TYPE == 1) {
                        vme.applyLoopScheme(vsel[0].raw.attributes.SCHEMEID);
                    }
                    else if (vsel[0].raw.attributes.TYPE == 2) {

                    }
                }
            }
        }];

        this.callParent(arguments);
    },
    onItemdblclick: function (grid, record) {
        if (record.raw.attributes) {
            if (record.raw.attributes.TYPE == 0) {
//                 if (record.raw.islooping) {
//                     record.set('text', record.raw.text);
//                     record.raw.islooping = false;
//                 }
//                 else {
//                     record.set('text', '<a style="color:red;">' + record.raw.text + '</a>');
//                     record.raw.islooping = true;
//                 }
                this.applyLoopqueue(record.raw.attributes.QUEUEID, record.raw.islooping);
            }
            else if (record.raw.attributes.TYPE == 1) {

                this.applyLoopScheme(record.raw.attributes.SCHEMEID);
            }
        }
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    applyLoopqueue: function (queueid, loop) {
        this.fireEvent('applyloopqueue', queueid, loop);
    },
    applyLoopScheme: function (schemeid) {
        var me = this;
        Ext.Ajax.request({
            url: '../SPVideo_Loop/ListSchemeChn?schemeid=' + schemeid,
            method: 'post', //方法  
            callback: function (options, success, response) {
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    for (var i = 0; i < v.rows.length; i++) {
                        var row = v.rows[i];
                        if (row.TYPE == '1') {
                            //切换通道
                            me.fireEvent('videoswitchshowchn', i, row.GLOBALID, row.PRESETID);
                        }
                        else if (row.TYPE == '2') {
                            //切换轮巡队列
                            this.fireEvent('applyloopqueue', queueid, i);
                        }
                        else {
                            me.fireEvent('videoswitchshowchn', i, 0, 0);
                        }
                    }
                }
                else {
                    alert('删除失败！');
                }
            }
        });
    }
});
