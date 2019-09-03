
//定义数据模型
Ext.define('App.Common.VideoSwitch.taskDialg.chn.model', {
    extend: 'Ext.data.Model',
    fields: ['SCHEMEID', 'NM', 'DELAYTIME']
});

Ext.define('App.Common.VideoSwitch.taskDialg.chn.CellEditing', {
    extend: 'Ext.grid.Panel',
    frame: false,
    initComponent: function () {
        var vme = this;
        /*
        this.viewConfig = {
        plugins: {
        ptype: 'gridviewdragdropex',
        enableDrag: true,
        enableDrop: true,
        ddGroup: 'draggroup'
        },
        listeners: {
        drop: function (targetNode, position, dragData) {
        return false;
        }
        }
        };
        */
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        this.plugins = [this.cellEditing];

        var url = '../SPVideo_Loop/ListTaskScheme';
        if (this.taskid) {
            url += '?taskid=' + this.taskid;
        }
        this.store = new Ext.data.Store({
            // destroy the store if the grid is destroyed
            autoDestroy: true,
            autoLoad: true,
            model: 'App.Common.VideoSwitch.taskDialg.chn.model',
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: url,
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                }
            },
            sorters: [{
                property: 'common',
                direction: 'ASC'
            }]
        });

        this.columns = [
        {
            header: '通道/轮巡队列',
            dataIndex: 'NM',
            flex: 1,
            sortable: false
        }, {
            header: '延时时间',
            dataIndex: 'DELAYTIME',
            width: 70,
            editor: {
                xtype: 'numberfield',
                allowBlank: false,
                minValue: 0,
                maxValue: 100000
            }
        }];

        this.addItem = function (vchns) {

            var rec = new Array();
            for (var i = 0; i < vchns.length; i++) {
                rec.push(Ext.create('App.Common.VideoSwitch.taskDialg.chn.model', {
                    SCHEMEID: vchns[i].id,
                    NM: vchns[i].name,
                    DELAYTIME: 15
                }));
            }
            this.getStore().add(rec);
        };

        this.callParent(arguments);
    }
});


Ext.define('App.Common.VideoSwitch.taskDialg.loopqueuelist', {
    extend: 'Ext.grid.Panel',
    stripeRows: true,
    autoScroll: false,
    border: 0,
    columnLines: true, //显示网格竖线
    rowLines: true,
    hideHeaders: true,
    initComponent: function () {
        var vme = this;

        this.store = Ext.create('Ext.data.Store', {
            fields: ['SCHEMEID', 'NM'],
            autoLoad: true,
            pageSize: 1000,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                api: {
                    read: '../SPVideo_Loop/ListScheme'
                },
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                }
            }
        });

        this.columns = [
        {
            dataIndex: 'NM',
            sortable: false,
            header: '',
            flex: 1
        }];
        this.callParent(arguments);


    },
    afterRender: function () {
        this.callParent(arguments);
        //this.el.setStyle('border-radius', '5px 5px 0px 0px');
    },
    getCheckChn: function () {
        var vsel = this.getSelectionModel().getSelection();
        var vchns = new Array();
        for (var i = 0; i < vsel.length; i++) {
            var rec = vsel[i];
            vchns.push({ id: rec.get('SCHEMEID'), name: rec.get('NM') });
        }
        return vchns;
    },
    getSelectedChn: function () {
        var vsel = this.getSelectionModel().getSelection();
        var vchns = new Array();
        for (var i = 0; i < vsel.length; i++) {
            var rec = vsel[i];
            vchns.push({ id: rec.get('SCHEMEID'), name: rec.get('NM') });
        }
        return vchns;
    }
});


//定义编辑对话框
Ext.define('App.Common.VideoSwitch.taskDialg', {
    extend: 'App.Common.IframeBaseDialog',
    title: '任务属性',
    width: 600,
    height: 440,
    padding: '0 0 0 0',
    closable: true,
    initComponent: function () {
        var vme = this;
        this.loopqueuelist = Ext.create('App.Common.VideoSwitch.taskDialg.loopqueuelist', {
            title: '显示方案'
        });

        var vtaskid = null;
        var vnm = null;
        if (this.dialogParams) {
            vtaskid = this.dialogParams.TASKID;
            vnm = this.dialogParams.NM;
        }

        this.vchnList = Ext.create('App.Common.VideoSwitch.taskDialg.chn.CellEditing', {
            height: '100%',
            flex: 1,
            taskid: vtaskid
        });

        this.items = [
        {
            xtype: 'container',
            layout: 'vbox',
            width: '100%',
            height: '100%',
            items: [{
                xtype: 'textfield',
                allowBlank: false,
                width: '100%',
                labelWidth: 60,
                fieldLabel: '名称',
                name: 'NM',
                emptyText: '请输入任务名称',
                value: vnm
            },
        {
            xtype: 'container',
            flex: 1,
            width: '100%',
            layout: 'hbox',
            items: [
            {
                xtype: 'panel',
                layout: 'accordion',
                width: 230,
                height: '100%',
                items: [this.loopqueuelist]
            }
            ,
            {
                xtype: 'container',
                height: '100%',
                margins: '0 4',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                items: [{
                    xtype: 'button',
                    tooltip: '',
                    handler: vme.onBtnTop,
                    scope: this,
                    cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                    iconCls: Ext.baseCSSPrefix + 'form-itemselector-top',
                    navBtn: true,
                    margin: '4 0 0 0'
                }, {
                    xtype: 'button',
                    tooltip: '',
                    handler: vme.onBtnUp,
                    cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                    iconCls: Ext.baseCSSPrefix + 'form-itemselector-up',
                    navBtn: true,
                    scope: this,
                    margin: '4 0 0 0'
                }, {
                    xtype: 'button',
                    tooltip: '',
                    handler: vme.onBtnAdd,
                    cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                    iconCls: Ext.baseCSSPrefix + 'form-itemselector-add',
                    navBtn: true,
                    scope: this,
                    margin: '4 0 0 0'
                }, {
                    xtype: 'button',
                    tooltip: '',
                    handler: vme.onBtnRemove,
                    cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                    iconCls: Ext.baseCSSPrefix + 'form-itemselector-remove',
                    navBtn: true,
                    scope: this,
                    margin: '4 0 0 0'
                }, {
                    xtype: 'button',
                    tooltip: '',
                    handler: vme.onBtnDown,
                    cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                    iconCls: Ext.baseCSSPrefix + 'form-itemselector-down',
                    navBtn: true,
                    scope: this,
                    margin: '4 0 0 0'
                }, {
                    xtype: 'button',
                    tooltip: '',
                    handler: vme.onBtnBottom,
                    cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                    iconCls: Ext.baseCSSPrefix + 'form-itemselector-bottom',
                    navBtn: true,
                    scope: this,
                    margin: '4 0 0 0'
                }]
            },
            this.vchnList]
        }]
        }];



        this.buttons = [
        {
            text: '确定',
            action: 'save',
            scope: this,
            handler: this.onSave
        },
        {
            text: '取消',
            scope: this,
            handler: function () {
                vme.close();
            }
        }];


        this.callParent(arguments);
    },
    onBtnTop: function () {
        var store = this.vchnList.store;
        var selected = this.vchnList.getSelectionModel().getSelection();
        store.suspendEvents();
        store.remove(selected, true);
        store.insert(0, selected);
        store.resumeEvents();
        this.vchnList.getView().refresh();
    },
    onBtnUp: function () {
        var store = this.vchnList.store,
            selected = this.vchnList.getSelectionModel().getSelection(),
            rec,
            i = 0,
            len = selected.length,
            index = 0;
        store.suspendEvents();
        for (; i < len; ++i, index++) {
            rec = selected[i];
            index = Math.max(index, store.indexOf(rec) - 1);
            store.remove(rec, true);
            store.insert(index, rec);
        }
        store.resumeEvents();
        this.vchnList.getView().refresh();
    },
    onBtnAdd: function () {
        this.vchnList.addItem(this.loopqueuelist.getSelectedChn());
    },
    onBtnRemove: function () {
        var vsel = this.vchnList.getSelectionModel().getSelection();
        this.vchnList.store.remove(vsel);
    },
    onBtnDown: function () {
        var store = this.vchnList.store,
            selected = this.vchnList.getSelectionModel().getSelection(),
            rec,
            i = selected.length - 1,
            index = store.getCount() - 1;

        // Move each selection down by one place if possible
        store.suspendEvents();
        for (; i > -1; --i, index--) {
            rec = selected[i];
            index = Math.min(index, store.indexOf(rec) + 1);
            store.remove(rec, true);
            store.insert(index, rec);
        }
        store.resumeEvents();
        this.vchnList.getView().refresh();
    },
    onBtnBottom: function () {
        var store = this.vchnList.store;
        var selected = this.vchnList.getSelectionModel().getSelection();
        store.suspendEvents();
        store.remove(selected, true);
        store.add(selected);
        store.resumeEvents();
        this.vchnList.getView().refresh();
    },
    onSave: function () {
        var vme = this;
        if (!this.isValid())
            return;
        var values = this.getValues();

        var store = this.vchnList.store;

        var vchns = [];

        for (var i = 0; i < store.data.items.length; i++) {
            var rec = store.data.items[i];

            vchns.push({ SCHEMEID: rec.get('SCHEMEID'),
                DELAYTIME: rec.get('DELAYTIME')
            });
        }
        values.chns = vchns;
        if (this.dialogParams) {
            values.TASKID = this.dialogParams.TASKID;
        }
        Ext.Ajax.request({
            url: '../SPVideo_Loop/EditTask', //查询案件详细信息
            method: 'post', //方法  
            jsonData: values,
            callback: function (options, success, response) {
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (!v.success)
                        alert(v.msg);
                    else
                        vme.close();
                }
                else {
                    alert('网络错误！');
                }
            }
        });
    }
});


