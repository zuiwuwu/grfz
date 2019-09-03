Ext.define('App.SystemSetting.MediaGateWay.GB28181.DevMng.groupTree', {
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
            root: { expanded: true, text: '所有点位', id: '', attributes: { TYPE: 0} },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.urlGetGroupTree,
                reader: {
                    type: 'json'
                }
            }
        });
        this.refreshTree = function () {
            vme.store.load();
        };

        this.callParent(arguments);
    }
});


Ext.define('App.SystemSetting.MediaGateWay.GB28181.DevMng.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    lastGID: '',
    lastType: 0,
    requires: ['App.Common.HyperLinkColumn'],
    pageitemselectkey: 'ID',
    initComponent: function () {
        var vme = this;
        this.viewConfig = {

        };
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: '序号',
                width: 60
            }
        },
        {
            name: 'ID',
            type: 'string'
        },
        {
            name: 'DEVICEID',
            type: 'string',
            gridcol: {
                sortable: true,
                autoSizable: true,
                header: '设备编号',
                width: 160
            }
        },
        {
            name: 'NAME',
            type: 'string',
            gridcol: {
                sortable: true,
                autoSizable: true,
                header: '设备名',
                width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + value + '">' + value + '</a>';
                }
            }
        },
        {
            name: 'SVRNAME',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                autoSizable: true,
                header: '网关名称',
                width: 150,
                //                 renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                //                     return '<a title="' + value + '">' + value + '</a>';
                //                 },
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    vme.SVRNAME.setValue(rec.get('SVRNAME'));
                    vme.onSearch();
                }
            }
        },
        {
            name: 'MANUFACTURER',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '厂家',
                width: 200,
                hidden: true
            }
        },
        {
            name: 'MODEL',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '型号',
                width: 100,
                hidden: true
            }
        },
        {
            name: 'IPADDRESS',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'IP地址',
                width: 100
            }
        },
        {
            name: 'PORT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '端口',
                width: 50
            }
        },
        {
            name: 'SVRID',
            type: 'string'
        },
        {
            name: 'STATUS',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '状态',
                width: 50,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1') {
                        return '在线';
                    }
                    return '<a style="color:Red">断线</a>';
                }
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: '操作',
                minWidth: 260,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                items: [
                {
                    iconCls: 'icon-del',
                    tooltip: '删除',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('ID'));
                    }
                },
                {
                    iconCls: 'icon-replay',
                    tooltip: '查询录像',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        
                       window.open('../Main/CommonView?class=App.SystemSetting.MediaGateWay.GB28181.SearchFile&ID=' + rec.get('DEVICEID') + '&MEDIAGATEWAYID=' + this.MEDIAGATEWAYID);
                    }
                },
                {
                    iconCls: 'icon-replay',
                    tooltip: '海康TCP查询',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        var myMask = new Ext.LoadMask(vme, { msg: "正在删除设备，请稍候！" });
                        myMask.show();
                        Ext.Ajax.request({
                            url: '../GB28181/GetHIKRealTCPUrl?id=' + this.MEDIAGATEWAYID, //查询案件详细信息
                            method: 'post', //方法  
                            params: { ID: rec.get('DEVICEID') },
                            callback: function (options, success, response) {
                                myMask.hide();
                                if (success) {
                                    var v = Ext.JSON.decode(response.responseText);
                                    Ext.MessageBox.alert('提示', v.msg);
                                }
                                else {
                                    Ext.MessageBox.alert('提示', '失败！');
                                }
                            }
                        });
                    }
                },
                {
                    iconCls: 'icon-add',
                    tooltip: '加入平台',
                    scope: this,
                    handler: this.onAddClick
                }]
            }
        }];

        this.devname = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 150,
            url: '../GB28181/GetDevAutoCompleteList?id=' + this.MEDIAGATEWAYID,
            displayField: 'NAME',
            valueField: 'ID',
            fields: [{
                name: 'ID'
            },
            {
                name: 'NAME'
            }]
        }
        );
        this.SVRNAME = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 150,
            url: '../GB28181/GetSvrAutoCompleteList?id=' + this.MEDIAGATEWAYID,
            displayField: 'NAME',
            valueField: 'ID',
            fields: [{
                name: 'ID'
            },
            {
                name: 'NAME'
            }]
        }
        );
        this.groupTitle = Ext.create('Ext.draw.Text', {
            text: '所有设备'
        });
        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        '设备名',
        this.devname,
        '网关',
        this.SVRNAME,
         {
             xtype: 'button',
             text: '搜索',
             tooltip: '搜索',
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
         },
         '-',
         {
             iconCls: 'icon-del',
             text: '删除',
             scope: this,
             handler: this.onDelClick
         },
         '-',
         {
             iconCls: 'icon-add',
             text: '选中设备加入平台',
             scope: this,
             handler: this.onSynClick
         },
         {
             iconCls: 'icon-add',
             text: '所有设备加入平台',
             scope: this,
             handler: this.onSynAllClick
         },
        '->',
        this.groupTitle];

        this.changeGroup = function (GID, text, type) {
            if (vme.lastGID != GID) {
                vme.lastType = type;
                vme.lastGID = GID;
                vme.refreshChn();
                //vme.setTitle(text);
                vme.groupTitle.setText(text);
            }
        };

        this.refreshChn = function () {
            vme.store.clearFilter(true);
            var vdevname = this.devname.getRawValue();
            vme.store.filter([{
                property: 'NAME',
                value: vdevname
            },
            {
                property: 'AREAID',
                value: vme.lastGID
            },
            {
                property: 'SVRNAME',
                value: this.SVRNAME.getRawValue()
            }]);
            vme.updateLayout();
        };
        this.callParent(arguments);
        vme.store.sorters.add(new Ext.util.Sorter({
            property: 'NAME',
            direction: 'ASC'
        }));
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm('提示', '是否确定要删除设备?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除设备，请稍候！" });
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
                            vme.reLoad();
                    }
                    else {
                        alert('删除失败！');
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
                vchns += vsel[i].get('ID');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        this.refreshChn();
    },
    onSynClick: function () {
        var v = this.getSelectedItems();
        if (v.length == 0) {
            alert('请选择设备！');
            return;
        }
        this.addToPlatform(v);
    },
    onSynAllClick: function () {
    	Ext.MessageBox.confirm('提示', '是否确定要把所有设备加入平台?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(this, { msg: "正在保存，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../GB28181/AddAllToPlatform', 
                method: 'post', //方法  
                params: { ID: this.MEDIAGATEWAYID },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                    }
                    else {
                        alert('保存失败！');
                    }
                }
            });
        },
        this);
    },
    onAddClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        this.addToPlatform([rec.raw]);
    },
    addToPlatform: function (chns) {
       Ext.MessageBox.confirm('提示', '是否确定要把设备加入平台?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(this, { msg: "正在保存，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../GB28181/AddToPlatform', 
                method: 'post', //方法  
                params: { ID: this.MEDIAGATEWAYID, CHNS: Ext.JSON.encode(chns) },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                    }
                    else {
                        alert('保存失败！');
                    }
                }
            });
        },
        this);
    }
});

Ext.define('App.SystemSetting.MediaGateWay.GB28181.DevMng', {
    extend: 'Ext.Panel',
    layout: 'border',
    forumId: '',
    border: 0,
    urlGetGroupTree: '../GB28181/GetDWTree',
    urlListGroupChn: '../GB28181/ListDev',
    urlDelGroupChn: '../GB28181/DelDev',
    initComponent: function () {
    	this.urlGetGroupTree = this.urlGetGroupTree + '?id=' + this.MEDIAGATEWAYID;
    	this.urlListGroupChn = this.urlListGroupChn + '?id=' + this.MEDIAGATEWAYID;
    	this.urlDelGroupChn = this.urlDelGroupChn + '?id=' + this.MEDIAGATEWAYID;
        this.items = [this.createRight(), this.createOCX()];
        // call the superclass's initComponent implementation
        this.callParent(arguments);
    },
    createOCX: function () {

        this.vchnlist = Ext.create('App.SystemSetting.MediaGateWay.GB28181.DevMng.List', {
            region: 'center',
            url: this.urlListGroupChn,
            urlDelGroupChn: this.urlDelGroupChn,
            parentTab: this.parentTab,
            MEDIAGATEWAYID: this.MEDIAGATEWAYID
        });

        return this.vchnlist;
    },
    createRight: function () {
        var v = Ext.create('App.SystemSetting.MediaGateWay.GB28181.DevMng.groupTree', {
            region: 'east',
            title: '点位树',
            width: 210,
            split: true,
            border: 1,
            minWidth: 230,
            maxWidth: 230,
            collapsible: true,
            urlGetGroupTree: this.urlGetGroupTree,
            listeners: {
                scope: this,
                selectionchange: this.onSelectionchange
            }
        });
        return v;
    },
    onSelectionchange: function (tree, selected, eOpts) {
        if (selected.length > 0) {
            this.vchnlist.changeGroup(selected[0].get('id'), selected[0].get('text'));
        }
    }
});

