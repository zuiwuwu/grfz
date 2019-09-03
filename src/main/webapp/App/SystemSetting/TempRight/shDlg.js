Ext.define('App.SystemSetting.TempRight.shDlg', {
    extend: 'App.Common.EditDlg',
    tile: '临时权限审核',
    initComponent: function () {
        var vwidth = 280;
        var vlabelWidth = 90;
        this.items = [
        {
            labelWidth: vlabelWidth,
            xtype: 'textfield',
            name: 'ID',
            hidden: true,
            value: this.ID
        },
        {
        	width: 200,
            xtype      : 'fieldcontainer',
            defaultType: 'radiofield',
            defaults: {
                flex: 1
            },
            layout: 'hbox',
            items: [
                {
                    boxLabel  : '同意',
                    name      : 'ZT',
                    inputValue: '1',
                    checked: true
                }, {
                    boxLabel  : '不同意',
                    name      : 'ZT',
                    inputValue: '0'
                }
            ]
        }];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent();
    }
});