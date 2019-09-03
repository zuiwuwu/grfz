
Ext.define('App.SystemSetting.Dlg.selUserDlg.List', {
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
                    var result = raw.USERNAME;
                    return result;
                }
            }, {
                name: 'DESCRIPTION'
            }]
        }
        );
this.jz = Ext.create('App.Common.ComboBoxDropList', {
					width : 100,
					url: '../RBZQYJ/getJZ'	
			});
        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        SPLanguage.getMessage("USERNAME"),
        this.username,
        '警种',
        this.jz,
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
Ext.define('App.SystemSetting.Dlg.selUserDlg', {
    extend: 'Ext.window.Window',
    title: SPLanguage.getMessage("TJYH"),
    layout: 'fit',
    modal: true,
    groupid: 0,
    chnlist: null,
    initComponent: function () {
        this.addEvents('finished');
        this.userlist = Ext.create('App.SystemSetting.Dlg.selUserDlg.List', {
            flex: 1,
            border: 1,
            height: 480
        });
        this.items = [
                {
                    xtype: 'form',
                    width: 800,
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
                    handler: this.onSave
                },
                {
                    text: SPLanguage.getMessage("CANCLE"),
                    scope: this,
                    handler: this.close
                }];


        this.callParent(arguments);
    },
    onSave: function (button) {
        var win = button.up('window');
        var vme = this;
        var varrayusers = this.userlist.getSelectionModel().getSelection();
        vme.fireEvent('saveok',varrayusers);
        vme.close();
    }
});

