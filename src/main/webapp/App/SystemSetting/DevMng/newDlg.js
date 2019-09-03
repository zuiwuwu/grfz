
//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.newDlg', {
    extend: 'App.Common.Wizard',
    title: '添加设备',
    modifyMod: false,
    initComponent: function () {
        this.wizardItems = ['App.SystemSetting.DevMng.DevInfo',
        'App.SystemSetting.DevMng.DevChns'];
        this.callParent(arguments);
    }
});
