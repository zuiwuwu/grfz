
Ext.define('App.SystemSetting.CBZ.Client', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../CBZMng/List',
    initComponent: function () {
        var vme = this;
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
            name: 'DESCRIPTION',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("NAME"),
                width: 260,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + value + '">' + value + '</a>';
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
                items: [
                {
                    iconCls: 'icon-edit',
                    tooltip: '关联设备',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        Ext.create('App.SystemSetting.addDevDlg',
                        {
                            urlList: '../CBZMng/ListCBZDev',
                            urlSave: '../CBZMng/SaveCBZDev',
                            ID: rec.get('USERID')
                        }).show();
                    }
                }
                ]
            }
        }];

        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
         {
             xtype: 'button',
             text: SPLanguage.getMessage("REFRESH"),
             tooltip: SPLanguage.getMessage("REFRESH"),
             iconCls: 'icon-refresh',
             scope: this,
             handler: this.onSearch
         }];



        this.callParent(arguments);
    },
    onSearch: function () {
        this.store.load();
    }
});
