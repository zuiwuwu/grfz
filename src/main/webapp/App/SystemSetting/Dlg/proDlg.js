//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.proDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '',
    bodyPadding: 10,
    initComponent: function () {
        var vme = this;
        this.pro = Ext.create('Ext.ProgressBar', {
            width: 300
        });
        this.items = [this.pro];
        this.buttons = [{
            text: '取消',
            scope: this,
            handler:this.close
        }]
        this.callParent(arguments);
    }
});


