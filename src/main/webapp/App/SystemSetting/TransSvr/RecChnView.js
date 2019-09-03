

Ext.define('App.SystemSetting.TransSvr.RecChnView', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    lastGID: '',
    lastType: 0,
    url: '../TransSvr/ListTransSvrRecChn',
    gridautoLoad: false,
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
            name: 'USERID',
            type: 'string'
        },
        {
            name: 'GLOBALID',
            type: 'string'
        },
        {
            name: 'CHNNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("TDMC"),
                width: 150
            }
        },
        {
            name: 'DEVICENAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("SBMXM"),
                width: 150
            }
        },
        {
            name: 'DWMC',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '点位名',
                width: 150,
                hidden: true
            }
        },
        {
            name: 'PRODUCTNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '设备型号',
                width: 80,
                hidden: true
            }
        },
        {
            name: 'SUBSTREAM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '主/子码流',
                width: 80,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1') {
                        return '子码流';
                    }
                    return '主码流';
                }
            }
        },
        {
            name: 'USERNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '服务器名',
                width: 200
            }
        },
        {
            name: 'DESCRIPTION',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '服务器备注',
                width: 200,
                hidden: true
            }
        },
        {
            name: 'RCVBITRATE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '接收码流',
                width: 80,
                hidden: true
            }
        },
        {
            name: 'RECBITRATE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: ' 录像码流',
                width: 80
            }
        },
        {
            name: 'RECTOTALSIZE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: ' 录像大小',
                width: 80
            }
        },
        {
            name: 'RECDISK',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '录像盘符',
                width: 80,
                hidden: true
            }
        },
        {
            name: 'RECGROUP',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '录像分组',
                width: 80,
                hidden: true
            }
        },
        {
            name: 'STREAMCOUNT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '连接数',
                width: 80,
                hidden: true
            }
        },
        {
            name: 'LASTERROR',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '错误信息',
                width: 180
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
                    tooltip: SPLanguage.getMessage("EDIT"),
                    scope: this,
                    handler: this.onModifyClick
                },
                {
                    iconCls: 'icon-details',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('GLOBALID'));
                    }
                },
                {
                    iconCls: 'icon-details',
                    tooltip: '查看设备通道列表',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        window.open('../TransSvr/RecChnView?ID=' + rec.get('DEVICEID'), "_blank");
                    }
                }]
            }
        }];

        this.username = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 100,
            url: '../UserManage/GetAutoCompleteList',
            displayField: 'USERNAME',
            valueField: 'USERID',
            fields: [{
                name: 'USERID',
                mapping: function (raw) {
                    return raw.USERID;
                }
            },
            {
                name: 'USERNAME',
                mapping: function (raw) {
                    var result = raw.USERNAME + '(' + raw.DESCRIPTION + ')';
                    return result;
                }
            }, {
                name: 'DESCRIPTION'
            }]
        }
        );

        this.groupTitle = Ext.create('Ext.draw.Text', {
            text: '所有设备'
        });
        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        SPLanguage.getMessage("USERNAME"),
        this.username,
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCHCASE"),
             iconCls: 'icon-add',
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
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("DELETE"),
            scope: this,
            handler: this.onDelClick
        },
        '->',
        this.groupTitle];

        this.changeGroup = function (GID, text, type) {
            if (vme.lastGID != GID) {
                vme.lastType = type;
                vme.lastGID = GID;
                vme.refreshChn();
                //vme.setTitle(text);
                vme.groupTitle.setText(text);
            }
        };

        this.refreshChn = function () {
            vme.store.clearFilter(true);
            var vfilter = new Array();
            if (vme.commonparams) {
                vfilter.push({
                    property: 'USERID',
                    value: vme.commonparams.USERID
                });
            }
            vme.store.filter(vfilter);
            vme.updateLayout();
        };
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.refreshChn();
    },
    onAddClick: function () {
        var vme = this;
        if (this.lastType != 1) {
            Ext.Msg.alert(SPLanguage.getMessage("REMINDER"), '只有选择点位才能添加设备！请选择点位。');
            return;
        }
        var v = Ext.create('App.SystemSetting.TransSvr.RecChnView.newDlg', {
            modifyMod: true,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { ID: this.DEVICEID,
                DWBH: vme.lastGID,
                type: 'adddevchn'
            }
        });
        v.show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.TransSvr.RecChnView.newDlg', {
            modifyMod: true,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { ID: rec.get('GLOBALID')
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
                url: '../TransSvr/DelDevChn', //查询案件详细信息
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
                vchns += vsel[i].get('GLOBALID');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        var vuserid = this.username.getValue();
        if (vuserid)
            this.lastUserID = vuserid;
        else
            this.lastUserID = '';
        this.refreshChn();
    },
    onFinished: function (wizard) {
        var vme = this;
        var vValues = wizard.getValues();
        vValues.DEVICEID = wizard.rightParams.ID;
        vValues.DWBH = wizard.rightParams.DWBH;
        var myMask = new Ext.LoadMask(vme, { msg: "正在添加通道，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../TransSvr/AddDevChn', //查询案件详细信息
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
