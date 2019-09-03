
Ext.define('App.SystemSetting.DWMng.DWUserMng.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../UserManage/List',
    oldStyle: true,
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
            name: 'USERNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("USERNAME"),
                width: 120
            }
        },
        {
            name: 'DESCRIPTION',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("ZSXM"),
                width: 120
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
            name: 'PHONE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("LXDH"),
                width: 100,
                flex: 1
            }
        }];

        this.username = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 200,
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
                    var result = raw.USERNAME;
                    return result;
                }
            }, 
            {
                name: 'DESCRIPTION'
            }]
        }
        );


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        SPLanguage.getMessage("USERNAME"),
        this.username,
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCH"),
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
         }];

        this.refreshChn = function () {
            vme.store.clearFilter(true);
            var vusername = this.username.getRawValue();
            vme.store.filter([{
                property: 'username',
                value: vusername
            }]);
            vme.updateLayout();
        };
        this.callParent(arguments);
    },onSearch: function () {
        this.refreshChn();
    }
});

//定义编辑对话框
Ext.define('App.SystemSetting.DWMng.DWUserMng.addUserDlg', {
    extend: 'Ext.window.Window',
    title: SPLanguage.getMessage("TJYH"),
    layout: 'fit',
    modal: true,
    groupid: 0,
    chnlist: null,
    initComponent: function () {
        this.addEvents('finished');
        this.userlist = Ext.create('App.SystemSetting.DWMng.DWUserMng.List', {
            flex: 1,
            border: 1,
            height: 480
        });
        this.items = [
                {
                    xtype: 'form',
                    width: 600,
                    height: 500,
                    bodyPadding: 10,
                    defaults: {
                        anchor: '100%'
                    },
                    items: [this.userlist]

                }];

        this.buttons = [
                {
                    text: SPLanguage.getMessage("SURE"),
                    action: 'save',
                    scope: this,
                    handler: this.newCase
                },
                {
                    text: SPLanguage.getMessage("CANCLE"),
                    scope: this,
                    handler: this.close
                }];


        this.callParent(arguments);
    },
    newCase: function (button) {
        var win = button.up('window');
        var vme = this;
        var myMask = new Ext.LoadMask(vme, { msg: "正在添加维修用户，请稍候！" });
        myMask.show();
        var varrayusers = this.userlist.getSelectionModel().getSelection();
        var vusers = '';
        for (var i = 0; i < varrayusers.length; i++) {
            if (vusers != '')
                vusers += ',';
            vusers += varrayusers[i].get('USERID');
        }

        var vparams = {};
        vparams = {
            USERS: vusers,
            DWBH: vme.DWBH
        };
        Ext.Ajax.request({
            url: '../DWMng/AddUser', //请求地址  
            params: vparams,
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                    }
                    else {
                        //$("#txtSearchAJBH").val(ajbh);
                        alert(result.msg);
                    }

                    vme.fireEvent('finished');
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
                win.close();
            }
        });
    }
});


Ext.define('App.SystemSetting.DWMng.DWUserMng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../DWMng/ListUser',
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
            name: 'USERNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("USERNAME"),
                width: 120
            }
        },
        {
            name: 'CARDNUM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '工作证号',
                width: 120
            }
        },
        {
            name: 'DESCRIPTION',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("ZSXM"),
                width: 120
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
            name: 'PHONE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("LXDH"),
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
                minWidth: 80,
                xtype: 'actioncolumn',
                flex: 1,
                items: [
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

        this.username = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 200,
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
                    var result = raw.USERNAME;
                    return result;
                }
            }, {
                name: 'DESCRIPTION'
            }]
        }
        );
        //////////////////////////////////////////////////////////////////////////
        //工具栏

        this.tbar = [
        SPLanguage.getMessage("USERNAME"),
        this.username,
         {
             xtype: 'button',
             text: SPLanguage.getMessage("JS"),
             tooltip: SPLanguage.getMessage("JS"),
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
        }];


        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.DWMng.DWUserMng.addUserDlg', {
            DWBH: this.commonparams.DWBH,
            listeners: {
                scope: this,
                finished: this.onFinished
            }
        }).show();
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除维修人?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除维修人，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../DWMng/DelUser', //查询案件详细信息
                method: 'post', //方法  
                params: { USERS: vchns, DWBH: vme.commonparams.DWBH },
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
                vchns += vsel[i].get('USERID');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        var vme = this;
        vme.store.filter([{
            property: 'username',
            value: this.username.getValue()
        }, {
            property: 'DWBH',
            value: vme.commonparams.DWBH
        }]);
        vme.updateLayout();
    },
    onFinished: function () {
        var vme = this;
        vme.onSearch();
    }
});

