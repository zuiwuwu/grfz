
//管理自定义字段
Ext.define('App.SystemSetting.TransSvr.showChnDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '通道状态',
    width: 900,
    height: 500,
    initComponent: function () {
        var me = this;
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
        }, {
            name: 'GLOBALID',
            type: 'string'
        },
        {
            name: 'CHNNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("TDMC"),
                width: 360
            }
        },
        {
            name: 'RECBITRATE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '录像流量',
                width: 180,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + ' bps';
                    }
                    else if (value < 1024 * 1024) {
                        return (value / 1024).toFixed(2) + ' kbps';
                    }
                    else {
                        return (value / 1024 / 1024).toFixed(2) + ' mbps';
                    }
                }
            }
        },
        {
            name: 'REALBITRATE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '视频流量',
                width: 180,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '')
                        return value;
                    value = parseInt(value);
                    if (value < 1024) {
                        return value + ' bps';
                    }
                    else if (value < 1024 * 1024) {
                        return (value / 1024).toFixed(2) + ' kbps';
                    }
                    else {
                        return (value / 1024 / 1024).toFixed(2) + ' mbps';
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
            oldStyle: true,
            url: '../TransSvr/ListChnStatus',
            border: 0,
            columns: this.columns
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
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onSearch: function () {
        this.list.store.clearFilter(true);
        this.list.store.filter(this.getFilters());
    },
    getFilters: function () {
        var me = this;

        var filters = [{
            property: 'SVRID',
            value: this.SVRID
        }];
        me.searchFilters = filters;
        return filters;
    }
});


