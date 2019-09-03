Ext.define('App.SystemSetting.DynamicIP.Mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    url: '../DynamicIP/GetList',
    showImagePreview: false,
    initComponent: function () {
        var vme = this;
        /*
        this.listeners = {
            scope: this,
            itemdblclick: this.showCase
        };
        */
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
            name: 'ID',
            type: 'string'
        },
        {
            name: 'NM',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '域名',
                width: 154
            }
        },
        {
            name: 'SN',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '设备序号',
                width: 150
            }
        },
        {
            name: 'IP',
            type: 'string',
            gridcol: {
                sortable: false,
                header: 'IP地址',
                width: 100
            }
        },
        {
            name: 'IPDESC',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("REMARK"),
                width: 200
            }
        },
        {
            name: 'LTIME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '最后注册时间',
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (typeof value != 'undefined'
                    && value != '') {
                        var dt = new Date(value);
                        return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
                    }
                    else {
                        return '';
                    }
                }
            }
        },
        {
            name: 'USERNAME',
            type: 'string'
        },
        {
            name: 'PSW',
            type: 'string'
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
                            var v = Ext.create('App.SystemSetting.DynamicIP.newDlg', {
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
    delItems: function (vitems) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: '../DynamicIP/Del', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vitems },
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
    onDelClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vchns = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vchns != '')
                    vchns += ',';
                vchns += vsel[i].get('ID');
            }
            this.delItems(vchns);
        }

    },
    onDelItem: function (grid, rowIndex, colIndex)
    {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec) {
            this.delItems(rec.get('ID'));
        }
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.DynamicIP.newDlg', {
            listeners: {
                scope: this,
                saveok: this.onSaveOK
            }
        }).show();
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    onSaveOK: function () {
        this.store.load();
    },
    onSearchCase: function () {
        this.store.load();
    }
});



