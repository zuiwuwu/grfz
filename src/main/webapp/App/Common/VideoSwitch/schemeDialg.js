
//定义数据模型
Ext.define('App.Common.VideoSwitch.schemeDialg.chn.model', {
    extend: 'Ext.data.Model',
    fields: ['TYPE', 'GLOBALID', 'QUEUEID', 'CHNNAME', 'LOOPNM', 'PRESETID']
});

Ext.define('App.Common.VideoSwitch.schemeDialg.chn.CellEditing', {
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

        var url = '../SPVideo_Loop/ListSchemeChn';
        if (this.schemeid) {
            url += '?schemeid=' + this.schemeid;
        }
        this.store = new Ext.data.Store({
            // destroy the store if the grid is destroyed
            autoDestroy: true,
            autoLoad: true,
            model: 'App.Common.VideoSwitch.schemeDialg.chn.model',
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
            sortable: false,
            xtype: 'rownumberer',
            width: 32,
            header: '序号'
        },
        {
            header: '类型',
            dataIndex: 'TYPE',
            width: 60,
            sortable: false,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if (record.get('TYPE') == '1') {
                    return '通道';
                }
                else if (record.get('TYPE') == '2') {
                    return '轮巡';
                }
                return '';
            }
        },
        {
            header: '通道/轮巡队列',
            dataIndex: 'CHNNAME',
            flex: 1,
            sortable: false,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                if (record.get('TYPE') == '1') {
                    return value;
                }
                else if (record.get('TYPE') == '2') {
                    return record.get('LOOPNM');
                }
                return '';
            }
        }];

        this.addItem = function (vchns) {

            var rec = new Array();
            for (var i = 0; i < vchns.length; i++) {
                rec.push(Ext.create('App.Common.VideoSwitch.schemeDialg.chn.model', {
                    TYPE: vchns[i].id,
                    GLOBALID: vchns[i].id,
                    CHNNAME: vchns[i].name,
                    GLOBALID: vchns[i].id,
                    GLOBALID: vchns[i].id,
                    PRESETID: 0
                }));
            }
            this.getStore().add(rec);
        };

        this.callParent(arguments);
    }
});


Ext.define('App.Common.VideoSwitch.schemeDialg.loopqueuelist', {
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
            fields: ['QUEUEID', 'NM'],
            autoLoad: true,
            pageSize: 1000,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                api: {
                    read: '../SPVideo_Loop/ListLoop'
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
            vchns.push({ id: rec.get('ID'), name: rec.get('NAME') });
        }
        return vchns;
    },
    getSelectedChn: function () {
        var vsel = this.getSelectionModel().getSelection();
        var vchns = new Array();
        for (var i = 0; i < vsel.length; i++) {
            var rec = vsel[i];
            vchns.push({ id: rec.get('ID'), name: rec.get('NAME') });
        }
        return vchns;
    }
});


//定义编辑对话框
Ext.define('App.Common.VideoSwitch.schemeDialg', {
    extend: 'App.Common.IframeBaseDialog',
    title: '显示方案属性',
    width: 600,
    height: 440,
    padding: '0 0 0 0',
    closable: true,
    initComponent: function () {
        var vme = this;
        this.vchntree = Ext.create('App.Common.ChnTree', {
            title: '组织结构树'
        });
        this.loopqueuelist = Ext.create('App.Common.VideoSwitch.schemeDialg.loopqueuelist', {
            title: '轮巡队列'
        });

        var vschemeid = null;
        var vnm = null;
        var vSPLITNUM = '4';
        if (this.dialogParams) {
            vschemeid = this.dialogParams.SCHEMEID;
            vnm = this.dialogParams.NM;
            if (typeof this.dialogParams.SPLITNUM != 'undefined')
                vSPLITNUM = this.dialogParams.SPLITNUM;
        }

        this.vchnList = Ext.create('App.Common.VideoSwitch.schemeDialg.chn.CellEditing', {
            height: '100%',
            flex: 1,
            schemeid: vschemeid
        });
        this.leftpanel = Ext.create('Ext.panel.Panel', {
            layout: 'accordion',
            width: 230,
            height: '100%',
            items: [this.vchntree, this.loopqueuelist]
        });


        // Create the combo box, attached to the states data store
        this.splitnum = Ext.create('App.Common.ComboBoxDropList', {
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            allowBlank: false,
            width: 180,
            labelWidth: 60,
            fieldLabel: '分屏数',
            name: 'SPLITNUM',
            value: vSPLITNUM,
            data: [
		        { "value": "1", "name": "1分屏" },
		        { "value": "4", "name": "4分屏" },
		        { "value": "9", "name": "9分屏" },
		        { "value": "16", "name": "16分屏" },
		        { "value": "25", "name": "25分屏" }
		    ]
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
                emptyText: '请输入轮巡队列名称',
                value: vnm
            },
            this.splitnum,
        {
            xtype: 'container',
            flex: 1,
            width: '100%',
            layout: 'hbox',
            items: [
            this.leftpanel
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
    onBtnAdd: function () {
        var store = this.vchnList.store;
        var vsel = this.vchnList.getSelectionModel().getSelection();
        store.suspendEvents();
        if (!this.vchntree.collapsed) {
            var vchns = this.vchntree.getSelectedChn();
            if (vchns.length == 0) {
                alert('请选择左边的视频通道！');
                return;
            }
            if (vsel.length == 0) {
                alert('请选择右边的显示通道！');
                return;
            }
            if (vchns.length > 0
            && vsel.length > 0) {
                var rec = vsel[0];
                rec.set('TYPE', '1');
                rec.set('GLOBALID', vchns[0].id);
                rec.set('QUEUEID', '0');
                rec.set('PRESETID', '0');
                rec.set('CHNNAME', vchns[0].name);
                
				var vindex = this.vchnList.store.indexOf(rec);
				vindex ++;
				if(vindex <  this.vchnList.store.getCount())
					this.vchnList.getSelectionModel().select(this.vchnList.store.getAt(vindex));
            }
           	vchns = this.vchntree.getSelectedItems();
            this.vchntree.selectNextItem(vchns[0]);
        }
        else {
            var vqueuesel = this.loopqueuelist.getSelectionModel().getSelection();
            if (vqueuesel.length == 0) {
                alert('请选择左边的轮巡队列！');
                return;
            }
            if (vsel.length == 0) {
                alert('请选择右边的显示通道！');
                return;
            }
            if (vqueuesel.length > 0
            && vsel.length > 0) {
                var rec = vsel[0];
                rec.set('TYPE', '2');
                rec.set('GLOBALID', '0');
                rec.set('QUEUEID', vqueuesel[0].get('QUEUEID'));
                rec.set('PRESETID', '0');
                rec.set('LOOPNM', vqueuesel[0].get('NM'));
                
                var vindex = this.vchnList.store.indexOf(rec);
				vindex ++;
				if(vindex <  this.vchnList.store.getCount())
					this.vchnList.getSelectionModel().select(this.vchnList.store.getAt(vindex));
            }
            
            vindex = this.loopqueuelist.store.indexOf(vqueuesel[0]);
			vindex ++;
			if(vindex <  this.loopqueuelist.store.getCount())
				this.loopqueuelist.getSelectionModel().select(this.loopqueuelist.store.getAt(vindex));
        }
        store.resumeEvents();
        this.vchnList.getView().refresh();
    },
    onBtnRemove: function () {
        var store = this.vchnList.store;
        var vsel = this.vchnList.getSelectionModel().getSelection();
        store.suspendEvents();
        for (var i = 0; i < vsel.length; i++) {
            var rec = vsel[i];
            rec.set('TYPE', '0');
            rec.set('GLOBALID', '0');
            rec.set('QUEUEID', '0');
            rec.set('PRESETID', '0');
        }
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

            vchns.push({ GLOBALID: rec.get('GLOBALID'),
                QUEUEID: rec.get('QUEUEID'),
                TYPE: rec.get('TYPE'),
                PRESETID: rec.get('PRESETID')
            });
        }
        values.chns = vchns;
        if (this.dialogParams) {
            values.SCHEMEID = this.dialogParams.SCHEMEID;
        }
        Ext.Ajax.request({
            url: '../SPVideo_Loop/EditScheme', //查询案件详细信息
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


