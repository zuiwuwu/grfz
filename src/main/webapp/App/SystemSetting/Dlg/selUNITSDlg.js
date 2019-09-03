
Ext.define('App.SystemSetting.Dlg.selUNITSDlg.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../UNIT/listItems',
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
            name: 'UNITID',
            type: 'string'
        },
        {
            name: 'UNITNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("USERNAME"),
                flex: 1
            }
        }];

        this.username = Ext.create('Ext.form.field.Text', {
            hideLabel: true,
            width: 200
        }
        );


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
       '名称',
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
                property: 'UNITNAME',
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
Ext.define('App.SystemSetting.Dlg.selUNITSDlg', {
    extend: 'Ext.window.Window',
    title: '单位选择',
    layout: 'fit',
    modal: true,
    groupid: 0,
    chnlist: null,
    initComponent: function () {
        this.addEvents('finished');
        this.userlist = Ext.create('App.SystemSetting.Dlg.selUNITSDlg.List', {
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

