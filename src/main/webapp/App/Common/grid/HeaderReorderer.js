
Ext.define('App.Common.grid.HeaderReorderer', {
    extend: 'Ext.grid.plugin.HeaderReorderer',
    requires: ['App.Common.grid.DragZone',
    'App.Common.grid.DropZone'],
    onHeaderCtRender: function () {
        var me = this;
        var headerCt = Ext.apply(me.headerCt, {
            colHeaderSelector: '.' + me.gridCls + 'column-header',
            colInnerSelector: '.' + me.gridCls + 'column-header-inner',
            colHeaderCls: me.gridCls + 'column-header',
            gridCls: me.gridCls
        });
        me.dragZone = new App.Common.grid.DragZone(headerCt);
        me.dropZone = new App.Common.grid.DropZone(headerCt);
        if (me.disabled) {
            me.dragZone.disable();
        }
    }
});
