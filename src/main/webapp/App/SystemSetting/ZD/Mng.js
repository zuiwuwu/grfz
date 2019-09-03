Ext.define('App.SystemSetting.ZD.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    url: '../ZDGL/ListItems',
    showImagePreview: false,
    gridautoLoad: false,
    ZDTYPE: 0,
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
            name: 'ZDIDVALUE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("BIANHAO"),
                width: 100
            }
        },
        {
            name: 'ZDNAMEVALUE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("NAME"),
                width: 300
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
                            var vZDTYPE = this.ZDTYPE.getValue();
                            var v = Ext.create('App.SystemSetting.ZD.newDlg', {
                                url: '../ZDGL/Edit',
                                ZDTYPE: vZDTYPE,
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
        '字典类型：',
         {
             xtype: 'comboboxdroplist',
             width: 150,
             url: '../ZDGL/GetZDTypeList?id=' + this.ZDTYPE,
             name: 'ZDTYPE',
             listeners:
             {
                 scope: this,
                 select: this.onZDTypeSelectChange
             }
         },
         SPLanguage.getMessage("STORE"),
         {
             xtype: 'textfield',
             width: 150,
             name: 'ZDNAME'
         },
         {
             xtype: 'button',
             text: SPLanguage.getMessage("JS"),
             tooltip: SPLanguage.getMessage("JS"),
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
        this.ZDTYPE = this.down('comboboxdroplist[name=ZDTYPE]');
        this.ZDNAME = this.down('textfield[name=ZDNAME]');
    },
    delItems: function (vitems) {
        var vme = this;
        var vZDTYPE = this.ZDTYPE.getValue();
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: '../ZDGL/Delete', //查询案件详细信息
                method: 'post', //方法  
                params: { ZDIDVALUE: vitems, ZDTYPE: vZDTYPE },
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
                vchns += vsel[i].get('ZDIDVALUE');
            }
            this.delItems(vchns);
        }

    },
    onDelItem: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec) {
            this.delItems(rec.get('ZDIDVALUE'));
        }
    },
    onAddClick: function () {
        var vZDTYPE = this.ZDTYPE.getValue();
        if (vZDTYPE) {
            Ext.create('App.SystemSetting.ZD.newDlg', {
                url: '../ZDGL/Create',
                ZDTYPE: vZDTYPE,
                listeners: {
                    scope: this,
                    saveok: this.onSaveOK
                }
            }).show();
        }
    },
    onSaveOK: function () {
        this.reLoad();
    },
    onSearchCase: function () {
        var vZDTYPE = this.ZDTYPE.getValue();
        var vZDNAME = this.ZDNAME.getValue();
        this.store.clearFilter(true);
        this.store.filter([
        {
            property: 'ZDLXID',
            value: vZDTYPE
        },
        {
            property: 'ZDNAME',
            value: vZDNAME
        }]);
        this.updateLayout();
    }
});



