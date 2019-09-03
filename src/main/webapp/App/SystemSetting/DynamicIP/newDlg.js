//定义编辑对话框
Ext.define('App.SystemSetting.DynamicIP.newDlg', {
    extend: 'Ext.window.Window',
    title: SPLanguage.getMessage("PROPERTY"),
    layout: 'fit',
    modal: true,
    initComponent: function () {
        this.addEvents('saveok');
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
                            fieldLabel: '域名',
                            name: 'NM',
                            emptyText: '域名'
                        },
                        {
                            allowBlank: true,
                            fieldLabel: '设备序列号',
                            name: 'SN',
                            emptyText: ''
                        },
                        {
                            allowBlank: true,
                            fieldLabel: SPLanguage.getMessage("REMARK"),
                            name: 'IPDESC',
                            emptyText: ''
                        },
                        {
                            allowBlank: true,
                            fieldLabel: '注册用户',
                            name: 'USERNAME',
                            emptyText: ''
                        },
                        {
                            allowBlank: true,
                            fieldLabel: '注册密码',
                            name: 'PSW'
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
        var form = win.down('form');
        var record = form.getRecord();
        var values = form.getValues();

        var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();

        var url = '';
        if (record) {
            url = '../DynamicIP/Edit';
            values.ID = record.get('ID');
        }
        else {
            url = '../DynamicIP/Add';
        }
        Ext.Ajax.request({
            url: url, //请求地址  
            params: values,
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        vme.fireEvent('saveok');
                        win.close();
                    }
                    else {
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

