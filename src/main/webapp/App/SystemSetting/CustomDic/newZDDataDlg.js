Ext.define('App.SystemSetting.CustomDic.newZDDataDlg', {
    extend: 'App.Common.EditDlg',
    title: SPLanguage.getMessage("PROPERTY"),
    formWidth: 320,
    requires: ['App.Common.ComboBoxDropList'],
    initComponent: function () {
        this.items = [
                        {
                            allowBlank: false,
                            fieldLabel: 'ID',
                            name: 'ZDLX',
                            hidden: true,
                            value: this.ZDLX
                        },
                        {
                            allowBlank: false,
                            fieldLabel: 'ID',
                            name: 'ID',
                            readOnly: this.modifyMod
                        },
                        {
                            allowBlank: false,
                            fieldLabel: '名称',
                            name: 'NM'
                        }];

        this.callParent(arguments);
    }
});

