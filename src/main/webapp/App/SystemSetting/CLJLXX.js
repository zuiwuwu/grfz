Ext.define('App.SystemSetting.CLJLXX.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    lastUNITID: '',
    initComponent: function () {
        var vme = this;
        this.viewConfig = {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'group1',
                dropGroup: 'group2',
                enableDrag: true,
                enableDrop: false
            },
            listeners: {
                drop: function (node, data, dropRec, dropPosition) {
                }
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
                width: 32
            }
        },
        {
            name: 'CLXXBH',
            type: 'string'
        },
        {
            name: 'CLJLXXDATE',
            type: 'string',
            gridcol: {
                sortable: true,
                xtype: 'datecolumn',
                header: SPLanguage.getMessage("JGSJ"),
                width: 200
            }
        },
        {
            name: 'KKBH',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("JLDD"),
                width: 200
            }
        },
        {
            name: 'XSFXNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("XSFX"),
                width: 120
            }
        },
        {
            name: 'CDBH',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("CDBH"),
                width: 32
            }
        },
        {
            name: 'HPHM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("HPHM"),
                width: 100
            }
        },
        {
            name: 'USERID',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("HPSLT"),
                width: 150,
                renderer: function (value) {
                    return Ext.String.format('<img class="smallpic" style="padding: 0px; margin: 0px; width:90px; height: 20px;" src="../Traffic/ShowSmallPic/{0}" alt="没有微缩图" />', value);
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
                    iconCls: 'icon-details',
                    tooltip: SPLanguage.getMessage("CKXXXX"),
                    scope: this,
                    handler: this.onDetails
                },
                {
                    iconCls: 'icon-del',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('USERID'));
                    }
                }]
            }
        }];
        var searchDataVale = new Date();
        this.beginDate = Ext.create('SZPT.view.ui.DateTimeBox', { value: searchDataVale, format: SPLanguage.getMessage("TIMEFORMAT3") });
        searchDataVale.setHours(searchDataVale.getHours() + 1);
        this.endDate = Ext.create('SZPT.view.ui.DateTimeBox', { value: searchDataVale, format: SPLanguage.getMessage("TIMEFORMAT3") });
        this.address = Ext.create('SZPT.view.ui.ComboTree', {
            rootId: -1,
            rootText: SPLanguage.getMessage("SYDW"),
            treeUrl: '../DWGroup/GetGroupRoadTree',
            width: 150,
            multiSelect: true,
            editable: true,
            rootVisible: true,
            matchFieldWidth: false,
            panelWidth: 200,
            fieldName: 'addressTree'
        });

        this.detailsDlg = Ext.create('App.CLCX.DetailsDialog', {});

        //////////////////////////////////////////////////////////////////////////
        //工具栏

        this.tbar = [
        this.beginDate,
        SPLanguage.getMessage("TO"),
        this.endDate,
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCH"),
             iconCls: 'icon-add',
             scope: this,
             handler: this.onSearch
         },
         '-',
         this.address,
         '-',
        {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("PUSH"),
            scope: this,
            handler: this.onAddClick
        },
         '-',
        {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("DELETE"),
            scope: this,
            handler: this.onDelClick
        },
        '-',
        {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("TEST"),
            scope: this,
            handler: this.onTest
        }];

        this.changeGroup = function (UNITID, text) {
            if (vme.lastUNITID != UNITID) {
                vme.lastUNITID = UNITID;
                vme.refreshChn();
                //vme.setTitle(text);
                vme.groupTitle.setText(text);
            }
        };

        this.refreshChn = function () {
            vme.store.clearFilter(true);
            //输入过滤的条件
            var beginDate = this.beginDate.getValue();
            var endDate = this.endDate.getValue();
            vme.store.filter([{
                property: 'BeginDate',
                value: beginDate
            },
            {
                property: 'EndDate',
                value: endDate
            }]);
            vme.updateLayout();
        };
        this.callParent(arguments);
    },
    onDetails: function () {
        this.detailsDlg.show();
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.CLJLXX.newDlg', {
            modifyMod: false,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'user',
                UNITID: this.lastUNITID
            }
        }).show();
    },
    onResetPswClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要重置密码?重置后密码将被改为默认的(123456)。', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZCZMM") });
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
                            vme.refreshChn();
                    }
                    else {
                        alert(SPLanguage.getMessage("DelFail"));
                    }
                }
            });
        });
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.CLJLXX.newDlg', {
            modifyMod: true,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'user',
                ID: rec.get('USERID')
            }
        }).show();
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
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
                vchns += vsel[i].get('USERID');
            }
            this.delChn(vchns);
        }

    },
    onDelAllClick: function () {
        this.delChn('all');
    },
    onSearch: function () {
        this.refreshChn();
    },
    onFinished: function (wizard) {
        //定义一个值指定this指针
        var vme = this;
        if (wizard.modifyMod) {
            //修改模式
            var vValues = wizard.getValues();
            var rec = wizard.getItemRecord(0);
            vValues.USERID = wizard.rightParams.ID;
            vValues.USERNAME = rec.get('USERNAME');
            Ext.Ajax.request({
                url: '../UserManage/EditUser', //查询案件详细信息
                method: 'post', //方法  
                jsonData: vValues,
                callback: function (options, success, response) {
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
        else {
            //添加模式
            var vValues = wizard.getValues();
            vValues.UNITID = wizard.rightParams.UNITID;
            Ext.Ajax.request({
                url: '../UserManage/AddUser', //查询案件详细信息
                method: 'post', //方法  
                jsonData: vValues,
                callback: function (options, success, response) {
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

    },
    onTest: function () {
        Ext.Ajax.request({
            url: '../Road/Create', //查询案件详细信息
            method: 'post', //方法  
            jsonData: {},
            callback: function (options, success, response) {
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

Ext.define('App.SystemSetting.CLJLXX', {
    extend: 'Ext.Panel',
    layout: 'border',
    forumId: '',
    border: 0,
    urlGetGroupTree: '../UNIT/GetUnitTree',
    urlAddGroupChn: '../JWDCVideo/AddGroupChn',
    urlListGroupChn: '../UserManage/List',
    urlDelGroupChn: '../JWDCVideo/DelGroupChn',
    initComponent: function () {
        this.items = [this.createDataGrid()];
        // call the superclass's initComponent implementation
        this.callParent(arguments);
    },
    createDataGrid: function () {
        this.vCLXXList = Ext.create('App.SystemSetting.CLJLXX.List', {
            region: 'center',
            urlAddGroupChn: this.urlAddGroupChn,
            url: this.urlListGroupChn,
            urlDelGroupChn: this.urlDelGroupChn
        });
        return this.vCLXXList;
    }
});

