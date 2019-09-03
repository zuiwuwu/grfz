Ext.define('App.SystemSetting.CustomDic.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    url: '../CustomDic/ListItems',
    showImagePreview: false,
    gridautoLoad: true,
    requires: ['App.Common.ComboBoxDropList'],
    initComponent: function () {
        var vme = this;
        this.ZDTYPE = this.commonparams?this.commonparams.ZDTYPE:null;
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
            name: 'SFXS',
            type: 'string'
        },
                {
            name: 'SFGL',
            type: 'string'
        },
                {
            name: 'BQDX',
            type: 'string'
        },
        {
            name: 'INDEXID',
            type: 'string'
        },
        {
            name: 'ZDLX',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'ID',
                width: 100
            }
        },
        {
            name: 'ZDLXNM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("NAME"),
                width: 300
            }
        },
        {
            name: 'GLLX',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '类型',
                width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return Ext.CustomDic.getGLLX(value);
                }
            }
        },
        {
            name: 'SRLX',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '输入类型',
                width: 100,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return Ext.CustomDic.getSRLX(value);
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
                            var v = Ext.create('App.SystemSetting.CustomDic.newDlg', {
                                url: '../CustomDic/Edit',
                                modifyMod: true,
                                listeners: {
                                    scope: this,
                                    saveok: function()
                                    {
                                    	this.reLoad();
                                    }
                                }
                            });
                            v.show();
                            v.down('form').loadRecord(rec);
                        }

                    }
                },
                {
                    iconCls: 'icon-edit',
                    tooltip: '字典数据',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        if (rec) {
                            var v = Ext.create('App.SystemSetting.CustomDic.setZDDataDlg', {
                                ZDLX: rec.get('ZDLX'),
                                title: rec.get('ZDLXNM')
                            });
                            v.show();
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
             text: '刷新',
             tooltip: '刷新',
             iconCls: 'icon-refresh',
             handler: this.onSearchCase,
             scope: this
         },
        {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("PUSH"),
            scope: this,
            handler: this.onAddClick
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearchCase();
    },
    delItems: function (vitems) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: '../CustomDic/Delete', //查询案件详细信息
                method: 'post', //方法  
                params: { ZDLX: vitems },
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
                vchns += vsel[i].get('ZDLX');
            }
            this.delItems(vchns);
        }

    },
    onDelItem: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec) {
            this.delItems(rec.get('ZDLX'));
        }
    },
    onAddClick: function () {
         Ext.create('App.SystemSetting.CustomDic.newDlg', {
                url: '../CustomDic/Create',
                listeners: {
                    scope: this,
                    saveok: this.onSaveOK
                }
            }).show();
    },
    onSaveOK: function () {
        this.reLoad();
    },
    onSearchCase: function () {
        this.store.load();
    }
});



