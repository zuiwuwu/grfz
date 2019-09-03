
Ext.define('App.Common.grid.RowNumberer', {
    extend: 'Ext.grid.column.RowNumberer',
    alias: 'widget.sprownumberer',
    initComponent: function () {
        var me = this;
        this.cls = me.gridCls + 'row-numberer';
        this.tdCls = me.gridCls + 'grid-cell-row-numberer ' + me.gridCls + 'grid-cell-special';
        this.innerCls = me.gridCls + 'grid-cell-inner-row-numberer';

        me.callParent();
    }
});
