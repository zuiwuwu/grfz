
//定义编辑对话框
Ext.define('App.SystemSetting.ULevelMng.newDlg', {
    extend: 'Ext.window.Window',
    title: '等级属性',
    layout: 'fit',
    modal: true,
    PARENTID: 0,
    grouptree: null,
    disabledUNITID: false,
    initComponent: function () {
        this.items = [
                {
                    xtype: 'form',
                    width: 320,
                    bodyPadding: 10,
                    defaultType: 'textfield',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                    {
                        allowBlank: false,
                        fieldLabel: '等级',
                        name: 'ID',
                        emptyText: SPLanguage.getMessage("BNWK"),
                        disabled: this.disabledUNITID
                    },
                        {
                            allowBlank: false,
                            fieldLabel: SPLanguage.getMessage("NAME"),
                            name: 'NAME',
                            emptyText: SPLanguage.getMessage("BNWK")
                        }]

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
        var vme = this;
        var win = button.up('window');
        form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();

        var myMask = new Ext.LoadMask(vme, { msg: "正在保存分组，请稍候！" });
        myMask.show();
        var url = vme.url;
        var vparams = {};
        if (record) {

            vparams = {
                ID: record.get('ID'),
                NAME: values.NAME
            };
        }
        else {
            vparams = {
                ID: values.ID,
                NAME: values.NAME
            };
        }
        Ext.Ajax.request({
            url: url, //请求地址  
            params: vparams,
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                win.close();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                    }
                    else {
                        //$("#txtSearchAJBH").val(ajbh);
                        alert(result.msg);
                    }
                    if (vme.grouptree)
                        vme.grouptree.refreshUserLevel();
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    }
});

 //用户等级管理
Ext.define('App.SystemSetting.ULevelMng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../UserLevel/List',
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
            name: 'ID',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '等级',
                width: 40
            }
        },
        {
            name: 'NAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("NAME"),
                width: 200
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
                        this.delChn(rec.get('ID'));
                    }
                }]
            }
        }];


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
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

        this.refreshUserLevel = function () {
            vme.store.load();
        };
        this.callParent(arguments);
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.ULevelMng.newDlg', {
            grouptree: this,
            url: '../UserLevel/AddUserLevel'
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec) {
            var v = Ext.create('App.SystemSetting.ULevelMng.newDlg', {
                grouptree: this,
                url: '../UserLevel/EditUserLevel',
                disabledUNITID: true
            }).show();
            v.down('form').loadRecord(rec);
        }
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../UserLevel/DelUserLevel', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.refreshUserLevel();
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
            this.delChn(vchns);
        }
    },
    onDelAllClick: function () {
        this.delChn('all');
    }
});
