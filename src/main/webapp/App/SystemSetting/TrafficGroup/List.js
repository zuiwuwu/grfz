
Ext.define('App.SystemSetting.TrafficGroup.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    lastgroupid: '',
    initComponent: function () {
        var vme = this;
        this.cellEditing = new Ext.grid.plugin.CellEditing({
            clicksToEdit: 1
        });
        this.viewConfig = {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'groupmng',
                enableDrag: true,
                enableDrop: false
            }
        };
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
            name: 'DWBH',
            type: 'string'
        },
        {
            name: 'GNAME',
            type: 'string'
        },
        {
            name: 'DWMC',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位名称',
                width: 200
            }
        },
        {
            name: 'UNITNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("GXDW"),
                width: 200
            }
        },
        {
            name: 'DWTYPENM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位类型',
                width: 80
            }
        },
        {
            name: 'GROUPCOUNT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '关联分组',
                width: 180,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return record.get('GNAME');
                }
            }
        },
        {
            name: 'INDEXID',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '排序序号',
                width: 60,
                editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    minValue: 0
                }
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                items: [
                {
                    iconCls: 'icon-del',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('DWBH'));
                    }
                }]
            }
        }];

        this.groupTitle = Ext.create('Ext.draw.Text', {
            text: SPLanguage.getMessage("SYDW")
        });

        this.dwname = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 200,
            url: '../DWMng/GetAutoCompleteList',
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
            iconCls: 'icon-find',
            text: SPLanguage.getMessage("JS"),
            scope: this,
            handler: this.onRefresh
        },
        '-',
        {
            iconCls: 'icon-del',
            text: SPLanguage.getMessage("DELETE"),
            scope: this,
            handler: this.onDelClick
        },
        {
            iconCls: 'icon-save',
            text: SPLanguage.getMessage("SAVE"),
            scope: this,
            handler: this.onSaveModified
        },
        '->',
        this.groupTitle];


        this.callParent(arguments);
    },
    changeGroup: function (groupid, text) {
        var vme = this;
        if (vme.lastgroupid != groupid) {
            vme.lastgroupid = groupid;
            vme.refreshChn();
            vme.groupTitle.setText(text);
        }
    },
    refreshChn: function () {
        var vme = this;
        vme.store.clearFilter(true);
        vme.store.filter([{
            property: 'DWMC',
            value: vme.dwname.getRawValue()
        },
            {
                property: 'GID',
                value: vme.lastgroupid
            },
            {
                property: 'DWTYPE',
                value: vme.combDWTYPE.getValue()
            }]);
        vme.updateLayout();
    },
    onAddClick: function () {
        if (this.lastgroupid != '') {
            Ext.create('App.SystemSetting.TrafficGroup.Mng.addChnDlg', {
                groupid: this.lastgroupid,
                chnlist: this,
                urlAddGroupChn: this.urlAddGroupChn,
                listeners:
                {
                	scope: this,
                	saveok:function()
                	{
                		this.reLoad();
                	}
                }
            }).show();
        }
        else {
            alert('请选择分组！');
        }
    },
    delChn: function (vchns) {
        if (typeof this.lastgroupid == 'undefined'
        || this.lastgroupid == '')
            return;
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: vme.urlDelGroupChn, //查询案件详细信息
                method: 'post', //方法  
                params: { GID: vme.lastgroupid, CHNS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.refreshChn();
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
    onDelAllClick: function () {
        this.delChn('all');
    },
    onRefresh: function () {
        this.refreshChn();
    },
    onSaveModified: function () {
        if (typeof this.lastgroupid == 'undefined'
        || this.lastgroupid == '')
            return;
        var vme = this;
        var vrecords = this.store.getModifiedRecords();
        if (vrecords.length == 0)
            return;
        var vchns = new Array();
        for (var i = 0; i < vrecords.length; i++) {
            vchns.push({ GID: vme.lastgroupid, DWBH: vrecords[i].get('DWBH'), INDEXID: vrecords[i].get('INDEXID') });
        }

        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要保存点位?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZBCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: vme.urlUpdateGroupChn, //查询案件详细信息
                method: 'post', //方法  
                jsonData: vchns,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.refreshChn();
                    }
                    else {
                        alert(SPLanguage.getMessage("SAVESB"));
                    }
                }
            });
        });
    }
});
