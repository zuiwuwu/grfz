
//管理自定义字段
Ext.define('App.SystemSetting.TransSvr.showDiskDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '硬盘状态',
    width: 900,
    height: 500,
    initComponent: function () {
        var me = this;
        var data = [{ "value": "-1", "text": "未使用"}];
        for (var i = 0; i < 16; i++) {
            data.push({ "value": i.toString(), "text": i.toString() });
        }
        var group = Ext.create('Ext.data.Store', {
            fields: ['value', 'text'],
            data: data
        });
        this.columns = [{
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                autoSizable: true,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 60
            }
        },
        {
            name: 'NAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '分区名',
                width: 60,
                align: 'center'
            }
        },
        {
            name: 'GroupID',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '磁盘分组',
                width: 60,
                align: 'center',
                editor: {
                    xtype: 'combo',
                    allowBlank: false,
                    store: group,
                    editable: false
                },
	            renderer: function (value) {
	                if(parseInt(value) < 0)
	                	return "未使用";
	                return value;
	            }
            }
        },
        {
            name: 'SIZE',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: false,
                header: '磁盘大小',
                width: 80,
                align: 'center',
                renderer: function (value) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + 'M';
                    }
                    else if (value < 1024 * 1024) {
                        return (value / 1024).toFixed(2) + 'G';
                    }
                    else {
                        return (value / 1024 / 1024).toFixed(2) + 'T';
                    }
                }
            }
        },
        {
            name: 'USED',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: false,
                header: '已使用大小',
                width: 80,
                align: 'center',
                renderer: function (value) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + 'M';
                    }
                    else if (value < 1024 * 1024) {
                        return (value / 1024).toFixed(2) + 'G';
                    }
                    else {
                        return (value / 1024 / 1024).toFixed(2) + 'T';
                    }
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
                minWidth: 0,
                items: []
            }
        }];

        this.list = Ext.create('App.Common.ImagePreview',
        {
            gridautoLoad: false,
            showImagePreview: false,
            showBarPager: false,
            oldStyle: true,
            url: '../TransSvrAsyn/ListDiskStatus',
            border: 0,
            columns: this.columns,
            cellEditing: new Ext.grid.plugin.CellEditing({
                clicksToEdit: 1
            })
        });

        this.items = [this.list];


        this.tbar = [
        {
            xtype: 'button',
            text: SPLanguage.getMessage("REFRESH"),
            tooltip: SPLanguage.getMessage("REFRESH"),
            iconCls: 'icon-refresh',
            scope: me,
            handler: me.onSearch
        },
        '-',
        {
            xtype: 'button',
            text: SPLanguage.getMessage("SAVE"),
            tooltip: SPLanguage.getMessage("SAVE"),
            iconCls: 'icon-save',
            scope: me,
            handler: me.onSave
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onSearch: function () {
        var myMask = new Ext.LoadMask(this, { msg: "正在查询硬盘信息，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../TransSvrAsyn/ListDiskStatus?ID=' + this.SVRID, //请求地址  
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    if (response.responseText != '') {
                        var result = Ext.JSON.decode(response.responseText);
                        this.list.store.loadData(result);
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    },
    onSave: function () {
        var store = this.list.store;
        var params = [];
        for (var i = 0; i < store.getCount(); i++) {
            var rec = store.getAt(i);
            params.push({
                DIR: rec.get('NAME'),
                GroupID: rec.get('GroupID')
            });
        }
        var myMask = new Ext.LoadMask(this, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        Ext.Ajax.request({
            url: '../TransSvr/SetSvrDisk', //请求地址  
            method: 'post', //方法  
            scope: this,
            params: { SVRID: this.SVRID, DISKS: Ext.JSON.encode(params) },
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    if (response.responseText != '') {
                        var result = Ext.JSON.decode(response.responseText);
                        this.onSearch();
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    }
});


