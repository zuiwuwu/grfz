//定义编辑对话框
Ext.define('App.SystemSetting.CutomLayer.editIconDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '图标编辑',
    width: 800,
    height: 500,
    initComponent: function () {

        this.list = Ext.create('App.Common.ImagePreview',
        {
            border: 0,
            gridpageSize: 10000,
            showImagePreview: true,
            oldStyle: true,
            showBarPager: false,
            url: '../GIS/ListPIC',
            columns: [{
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
                name: 'GISPIC',
                type: 'string'
            }, {
                name: 'PICNAME',
                type: 'string',
                gridcol: {
                    sortable: false,
                    header: SPLanguage.getMessage("NAME"),
                    flex: 1
                }
            }, {
                name: '',
                type: 'string',
                gridcol: {
                    header: SPLanguage.getMessage("HANDLE"),
                    sortable: false,
                    xtype: 'actioncolumn',
                    width: 100,
                    items: [{
                        iconCls: 'icon-edit',
                        tooltip: SPLanguage.getMessage("ALTER"),
                        text: SPLanguage.getMessage("ALTER"),
                        scope: this,
                        handler: function (grid, rowIndex, colIndex) {
                            var store = grid.getStore();
                            var rec = store.getAt(rowIndex);
                            Ext.create('App.SystemSetting.CutomLayer.addIconDlg',
                            {
                                GISPIC: rec.get('GISPIC'),
                                listeners:
                                {
                                    scope: this,
                                    saveok: function () {
                                        this.list.reLoad();
                                    }
                                }
                            }).show();
                        }
                    }, {
                        iconCls: 'icon-del',
                        tooltip: SPLanguage.getMessage("DELETE"),
                        text: SPLanguage.getMessage("DELETE"),
                        scope: this,
                        handler: this.onQuickDeploy
                    }]
                }
            }]
        });
        this.items = [this.list];

        this.tbar = [{
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("PUSH"),
            scope: this,
            handler: function () {
                Ext.create('App.SystemSetting.CutomLayer.addIconDlg',
                {
                    listeners:
                    {
                        scope: this,
                        saveok: function () {

                            this.list.reLoad();
                            alert('需刷新网页才能生效！');
                        }
                    }
                }).show();
            }
        }];
        this.buttons = [

                {
                    text: SPLanguage.getMessage("GB"),
                    scope: this,
                    handler: function () {
                        //this.fireEvent('close', this);
                        this.close();
                    }
                }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);

    }
});
