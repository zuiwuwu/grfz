Ext.define('App.SystemSetting.SystemParams.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    url: '../SystemParam/ListItems',
    showImagePreview: false,
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
            name: 'PARAMNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '参数名',
                width: 180
            }
        },
        {
            name: 'PARAMDESC',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '参数备注',
                width: 200
            }
        },
        {
            name: 'PARAMVALUE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("NUM"),
                width: 200
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
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: SPLanguage.getMessage("EDIT"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        if (rec) {
                            var v = Ext.create('App.SystemSetting.SystemParams.newDlg', {
                                url: '../SystemParam/Edit',
                                listeners: {
                                    scope: vme,
                                    saveok: vme.onSaveOK
                                }
                            });
                            v.show();
                            v.down('form').loadRecord(rec);
                        }

                    }
                }, {
                    iconCls: 'icon-del',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: this.onDelItem
                }]
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
             handler: this.onSearchCase,
             scope: this
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
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    delItems: function (vitems) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: '../SystemParam/Delete', //查询案件详细信息
                method: 'post', //方法  
                params: { id: vitems },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.store.load();
                    }
                    else {
                        alert(SPLanguage.getMessage("DelFail"));
                    }
                }
            });
        });

    },
    onZDTypeSelectChange: function (combo, records, eOpts) {
        this.onSearchCase();
    },
    onDelClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vchns = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vchns != '')
                    vchns += ',';
                vchns += vsel[i].get('PARAMNAME');
            }
            this.delItems(vchns);
        }

    },
    onDelItem: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec) {
            this.delItems(rec.get('PARAMNAME'));
        }
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.SystemParams.newDlg', {
            url: '../SystemParam/Create',
            listeners: {
                scope: this,
                saveok: this.onSaveOK
            }
        }).show();
    },
    onSaveOK: function () {
        this.store.load();
    },
    onSearchCase: function () {
        this.store.load();
    }
});



