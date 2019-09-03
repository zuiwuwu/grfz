
//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.addPrefixDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("NAME"),
    initComponent: function () {

        this.items = [
                        {
                            xtype: 'textfield',
                            allowBlank: false,
                            fieldLabel: '前缀',
                            name: 'NM',
                            width: 300,
                            labelWidth: 50
                        }];


        this.callParent(arguments);
    },
    onSave: function (button) {
        var vme = this;
        //var win = button.up('window');
        if (!this.isValid())
            return;
        var values = vme.getValues();
        values.DEVS = this.DEVS;
        var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        Ext.Ajax.request({
            url: '../DevMng/AddDevPrefix', //请求地址  
            jsonData: values,
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        var saveOkClose = vme.saveOkClose;
                        vme.fireEvent('saveok', vme);
                        if (saveOkClose)
                            vme.close();

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
