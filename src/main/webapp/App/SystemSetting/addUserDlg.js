
Ext.define('App.SystemSetting.addUserDlg.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    oldStyle: true,
    selType: 'rowmodel',
    gridpageSize: 20,
    gridautoLoad: false,
    initComponent: function () {
        var vme = this;
        this.columns = [
        {
            name: 'SEL',
            type: 'boolean',
            gridcol: {
                xtype: 'checkcolumn',
                sortable: true,
                header: '选择',
                width: 60,
                stopSelection: false
            }
        },
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
            name: 'USERID',
            type: 'string'
        },

        {
            name: 'USERNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("USERNAME"),
                width: 80
            }
        },
        {
            name: 'DESCRIPTION',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("ZSXM"),
                width: 80
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
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCH"),
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
         }];


        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onSearch: function () {
        this.store.clearFilter(true);
        var vusername = this.username.getRawValue();
        this.store.filter([{
            property: 'username',
            value: vusername
        },
        {
            property: 'ID',
            value: this.ID
        }]);
        this.updateLayout();
    }
});


Ext.define('App.SystemSetting.addUserDlg', {
    extend: 'Ext.window.Window',
    title: '设置用户',
    layout: 'fit',
    modal: true,
    urlSave: '',
    urlList: '../UserManage/List',
    initComponent: function () {
        this.addEvents('finished');
        this.userlist = Ext.create('App.SystemSetting.addUserDlg.List', {
            flex: 1,
            border: 1,
            height: 480,
            url: this.urlList,
            ID: this.ID
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
                    text: SPLanguage.getMessage("SAVE"),
                    action: 'save',
                    scope: this,
                    tooltip: '仅保存当前页的配置',
                    handler: this.newCase
                },
                {
                    text: SPLanguage.getMessage("GB"),
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

        var v = [];
        var varrayusers = this.userlist.store.getModifiedRecords();
        for (var i = 0; i < varrayusers.length; i++) {

            v.push({ ID: vme.ID, USERID: varrayusers[i].get('USERID'), SEL: varrayusers[i].get('SEL') });
        }


        Ext.Ajax.request({
            url: this.urlSave, //请求地址  
            jsonData: v,
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        this.userlist.reLoad();
                    }
                    else {
                        //$("#txtSearchAJBH").val(ajbh);
                        alert(result.msg);
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    }
});

