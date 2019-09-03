//值班管理
Ext.define('App.SystemSetting.Duty.mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../Duty/ListItems',
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
            name: 'DUTYDATE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("DATE"),
                width: 160
            }
        },
        {
            name: 'LEADER',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '局领导',
                width: 200
            }
        },
        {
            name: 'MEMBER',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '值班长',
                width: 200,
                hidden: true
            }
        },
        {
            name: 'ZBRY',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '值班人员',
                width: 100
            }
        },
        {
            name: 'GB',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '国保',
                width: 100
            }
        },
        {
            name: 'XD',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '刑大',
                width: 100
            }
        },
        {
            name: 'JY',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '机要',
                width: 100
            }
        },
        {
            name: 'QBZX',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '情报中心',
                width: 100
            }
        },
        {
            name: 'FZ',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '法制',
                width: 100
            }
        },
        {
            name: 'KJ',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '科技',
                width: 100
            }
        },
        {
            name: 'WA',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '网安',
                width: 100
            }
        },
        {
            name: 'GWYZ',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '公文印章',
                width: 100
            }
        },
        {
            name: 'JSY',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '驾驶员',
                width: 100
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
                minWidth: 300,
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: SPLanguage.getMessage("EDIT"),
                    scope: this,
                    handler: this.onModifyClick
                },
                {
                    iconCls: 'icon-del',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('DWBH'));
                    }
                },
                {
                    iconCls: 'icon-web',
                    tooltip: '标注点位坐标',
                    text: '标注坐标',
                    scope: this,
                    handler: this.onSetPosClick
                },
                {
                    iconCls: 'icon-web',
                    tooltip: '点位示意图设置',
                    text: '点位示意图',
                    scope: this,
                    handler: this.onShowDWMap
                }]
            }
        }];

        this.dwname = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 200,
            url: 'DWMng/GetAutoCompleteList',
            displayField: 'NAME',
            valueField: 'ID',
            fields: [{
                name: 'ID'
            },
            {
                name: 'NAME'
            }]
        }
        );

        this.combDWTYPE = Ext.create('App.Common.ComboBoxDropList', {
            hideLabel: true,
            width: 80,
            value: '',
            url: '../DWMng/GetDWTYPEComboAll'
        });

        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        '点位名称',
        this.dwname,
        '点位关联',
        this.combDWTYPE,
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCH"),
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
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
        },
        '-',
        {
            iconCls: 'icon-import',
            text: SPLanguage.getMessage("IMPORT"),
            scope: this,
            handler: this.onImportAddClick
        },
        {
            iconCls: 'icon-export',
            text: SPLanguage.getMessage("EXPORT"),
            scope: this,
            handler: this.onExportClick
        }];


        this.callParent(arguments);
    },
    getFilters: function () {
        return [
            {
                property: 'DWMC',
                value: this.dwname.getRawValue()
            },
            {
                property: 'GXDWDM',
                value: this.lastGXDWDM
            },
            {
                property: 'DWTYPE',
                value: this.combDWTYPE.getValue()
            }];
    },
    onExportClick: function () {
        Ext.saveframe.src = '../Duty/Export?filters=' + encodeURIComponent(Ext.encode(this.getFilters()));
    },
    onImportAddClick: function () {
        var vme = this;
        Ext.create('App.Common.UploadFileDlg', {
            url: '../Duty/UploadExcel',
            title: SPLanguage.getMessage("IMPORTDATA"),
            ID: this.lastGXDWDM,
            //modurl: '../download/点位模板.xls',
            listeners: {
                scope: this,
                saveok: function (result) {
                    this.reLoad();
                }
            }
        }).show();
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.Duty.newDlg', {
            url: '../Duty/Add',
            listeners: {
                scope: this,
                saveok: function () {
                    this.reLoad();
                }
            }
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.DWMng.newDlg', {
            url: '../Duty/Edit',
            listeners: {
                scope: this,
                saveok: function () {
                    this.reLoad();
                }
            }
        });
        v.show();
        v.down('form').loadRecord(rec);
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: vme.urlDelGroupChn, //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.onSearch();
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
                vchns += vsel[i].get('DWBH');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        this.store.clearFilter(true);
        this.store.filter(this.getFilters());
        this.updateLayout();
    }
});
