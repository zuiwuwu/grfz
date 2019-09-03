
//定义编辑对话框
Ext.define('App.SystemSetting.YWSvr.CheckMod.newDlg', {
    extend: 'App.Common.Wizard',
    title: '巡检模板属性',
    modifyMod: false,
    initComponent: function () {
        this.wizardItems = ['App.SystemSetting.YWSvr.ModInfo',
        'App.SystemSetting.YWSvr.CheckProp'];
        this.callParent(arguments);
    }
});


Ext.define('App.SystemSetting.YWSvr.CheckMod', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    gridautoLoad: false,
    url: '../YWSvr/ListMod',
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
                width: 40
            }
        },
        {
            name: 'MODID',
            type: 'string'
        },
        {
            name: 'MODNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '模板名称',
                width: 200
            }
        },
        {
            name: 'MODCOMMENT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("REMARK"),
                width: 200
            }
        },
        {
            name: 'STARTTIME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STARTTIME"),
                width: 60
            }
        },
        {
            name: 'STOPTIME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("OVERTIME"),
                width: 60
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                //hidden: true,
                sortable: false,
                minWidth: 80,
                xtype: 'actioncolumn',
                flex: 1,
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
                        this.delChn(rec.get('MODID'));
                    }
                },
                {
                    iconCls: 'icon-details',
                    tooltip: '查看巡检通道',
                    scope: this,
                    handler: this.onShowCheckChn
                }]
            }
        }];

        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCH"),
             iconCls: 'icon-refresh',
             scope: this,
             handler: this.onSearch
         }, '-', {
             iconCls: 'icon-add',
             text: SPLanguage.getMessage("PUSH"),
             scope: this,
             handler: this.onAddClick
         }, {
             iconCls: 'icon-del',
             text: SPLanguage.getMessage("DELETE"),
             scope: this,
             handler: this.onDelClick
         }];



        this.callParent(arguments);
    },
    onShowCheckChn: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (vme.parentTab) {
            vme.parentTab.addFeed(rec.get('MODNAME'), 'App.SystemSetting.YWSvr.CheckChnView', true, { MODID: rec.get('MODID') });
        }
    },
    afterRender: function () {
        this.callParent(arguments);
        this.refreshChn();
    },
    refreshChn: function () {
        var vme = this;
        vme.store.clearFilter(true);
        vme.store.filter([{
            property: 'USERID',
            value: vme.commonparams.USERID
        }]);
        vme.updateLayout();
    },
    onAddClick: function () {
        var vme = this;
        var v = Ext.create('App.SystemSetting.YWSvr.CheckMod.newDlg', {
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { USERID: vme.commonparams.USERID }
        });
        v.show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.YWSvr.CheckMod.newDlg', {
            modifyMod: true,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { USERID: vme.commonparams.USERID, MODID: rec.get('MODID') }
        });
        v.show();
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../YWSvr/DelMod', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
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
                vchns += vsel[i].get('MODID');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        this.refreshChn();
    },
    onFinished: function (wizard) {
        var vme = this;
        var vValues = wizard.getValues();
        var myMask = new Ext.LoadMask(vme, { msg: "正在添加通道，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../YWSvr/AddMod', //查询案件详细信息
            method: 'post', //方法  
            jsonData: vValues,
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (!v.success)
                        alert(v.msg);
                    else {
                        wizard.close();
                        vme.refreshChn();
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    }
});
