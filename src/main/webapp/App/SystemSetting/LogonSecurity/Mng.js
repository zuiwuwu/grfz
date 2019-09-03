Ext.define('App.SystemSetting.LogonSecurity.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    url: '../LogonSecurity/ListItems',
    showImagePreview: false,
    requires: ['App.Common.ComboBoxDropList'],
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
                width: 32
            }
        },
        {
            name: 'SCID',
            type: 'string'
        },
        {
            name: 'BEGINIP',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '开始IP',
                width: 120
            }
        },
        {
            name: 'ENDIP',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '结束IP',
                width: 120
            }
        },
        {
            name: 'ENABLELOGON',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '允许/拒绝',
                width: 120,
                renderer: function (value) {
                    if (value == '1')
                        return '允许';
                    return SPLanguage.getMessage("REFUSE");
                }
            }
        },
        {
            name: 'ACT',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '启用/停用',
                width: 120,
                renderer: function (value) {
                    if (value == '1')
                        return SPLanguage.getMessage("QIY");
                    return SPLanguage.getMessage("STOPUSE");
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
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: SPLanguage.getMessage("EDIT"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        if (rec) {
                            var v = Ext.create('App.SystemSetting.LogonSecurity.newDlg', {
                                url: '../LogonSecurity/Edit',
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
             iconCls: 'icon-find',
             handler: this.onSearchCase,
             scope: this
         },
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
                url: '../LogonSecurity/Delete',
                method: 'post', //方法  
                params: { ids: vitems },
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
                vchns += vsel[i].get('SCID');
            }
            this.delItems(vchns);
        }

    },
    onDelItem: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec) {
            this.delItems(rec.get('SCID'));
        }
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.LogonSecurity.newDlg', {
            url: '../LogonSecurity/Create',
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



