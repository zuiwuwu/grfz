Ext.define('App.Common.image.Zoom', {
    extend: 'Ext.Img',
    autoEl: 'div', // 用div包含
    initComponent: function () {
        var me = this;    

        me.callParent(arguments);
    }
    
});
