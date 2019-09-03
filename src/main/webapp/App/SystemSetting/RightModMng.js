//定义编辑对话框
Ext.define('App.SystemSetting.RightModMng.newDlg', {
    extend: 'App.Common.Wizard',
    title: SPLanguage.getMessage("TJYH"),
    modifyMod: false,
    initComponent: function () {
        this.wizardItems = ['App.SystemSetting.RightModPage.ModInfo',
        'App.SystemSetting.UserPage.FunctionRight',
        'App.SystemSetting.UserPage.DevRight',
        'App.SystemSetting.UserPage.MapRight',
        'App.SystemSetting.UserPage.DWRight',
         Ext.create('App.SystemSetting.UserPage.TVWall', { isEnd: true })
        ];
        this.callParent(arguments);
    }
});


Ext.define('App.SystemSetting.RightModMng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../RightMod/List',
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
            name: 'MODID',
            type: 'string'
        },
        {
            name: 'MODNM',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '模板名',
                width: 150
            }
        },
        {
            name: 'MODDESC',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '描述',
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
                }
//                ,
//                {
//                    iconCls: 'icon-details',
//                    tooltip: '应用到用户',
//                    scope: this,
//                    handler: this.onResetPswClick
//                }
                ]
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
             scope: this,
             handler: this.onSearch
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
    onAddClick: function () {
        Ext.create('App.SystemSetting.RightModMng.newDlg', {
            modifyMod: false,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'mod'
            }
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.RightModMng.newDlg', {
            modifyMod: true,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'mod',
                ID: rec.get('MODID')
            }
        });
        v.show();

        v.down('form').loadRecord(rec);
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../RightMod/DelMod', //查询案件详细信息
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
                vchns += vsel[i].get('MODID');
            }
            this.delChn(vchns);
        }

    },
    onDelAllClick: function () {
        this.delChn('all');
    },
    onSearch: function () {
        this.store.load();
    },
    onFinished: function (wizard) {
        var vme = this;
        var myMask = new Ext.LoadMask(wizard, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        if (wizard.modifyMod) {
            //修改模式
            var vValues = wizard.getValues();
            var rec = wizard.getItemRecord(0);
            vValues.MODID = wizard.rightParams.ID;
            Ext.Ajax.request({
                url: '../RightMod/EditMod', //查询案件详细信息
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
                            vme.onSearch();
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
        else {
            //添加模式
            var vValues = wizard.getValues();
            Ext.Ajax.request({
                url: '../RightMod/AddMod', //查询案件详细信息
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
                            vme.onSearch();
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
    }
});
