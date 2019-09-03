Ext.define('App.SystemSetting.TransRule.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    url: '../TransRule/List',
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
            name: 'RULEID',
            type: 'string'
        },
        {
            name: 'REALVIEW',
            type: 'bool'
        },
        {
            name: 'PLAYBACK',
            type: 'bool'
        },
        {
            name: 'LINKTYPE',
            type: 'string'
        },
        {
            name: 'LINKSVRID',
            type: 'string'
        },
        {
            name: 'LINKPRT',
            type: 'string'
        },
        {
            name: 'LINKIP',
            type: 'string'
        },
        {
            name: 'LINKPORT',
            type: 'string'
        },
        {
            name: 'PLAYSVRID',
            type: 'string'
        },
        {
            name: 'PLAYIP',
            type: 'string'
        },
        {
            name: 'PLAYPORT',
            type: 'string'
        },
        {
            name: 'RULENAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '规则名称',
                width: 120
            }
        },
        {
            name: 'INCD',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '包含地址',
                width: 120
            }
        },
        {
            name: 'OUTCD',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '排除地址',
                width: 120
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
                            var v = Ext.create('App.SystemSetting.TransRule.newDlg', {
                                url: '../TransRule/Edit',
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
                }, {
                    iconCls: 'icon-details',
                    tooltip: '查看/修改使用该转发规则的通道',
                    scope: this,
                    handler: this.onShowChn
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
                url: '../TransRule/Del', //查询案件详细信息
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
                vchns += vsel[i].get('RULEID');
            }
            this.delItems(vchns);
        }

    },
    onDelItem: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec) {
            this.delItems(rec.get('RULEID'));
        }
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.TransRule.newDlg', {
            url: '../TransRule/Add',
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
    },
    onShowChn: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (vme.parentTab) {
            vme.parentTab.addFeed(rec.get('RULENAME'), 'App.SystemSetting.TransRule.ChnMng', true, { RULEID: rec.get('RULEID') });
        }
    }
});



