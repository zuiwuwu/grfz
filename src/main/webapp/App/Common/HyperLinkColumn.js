//超链接
Ext.define('App.Common.HyperLinkColumn', {
    extend: 'Ext.grid.column.Column',
    alias: ['widget.hyperlinkcolumn'],
    alternateClassName: 'Ext.grid.HyperLinkcolumn',
    initComponent: function () {
        var me = this;
        me.hasCustomRenderer = true;
        //me.customrender = me.render;
        me.callParent(arguments);
    },
    defaultRenderer: function (value, metaData, record, rowIndex, colIndex, store) {
        var me = this;
        var vcol = {};
        var v = value;
        if (me.customrender) {
            v = me.customrender(value, metaData, record, rowIndex, colIndex, store, vcol);
        }
        if (v == null) {
            return value;
        }
        else {
            if (vcol.showtip) {
                if (vcol.col) {
                    return Ext.String.format('<a href="#" title="{0}" class="x-hyperlink-col-icon" style="color:{1}">{0}</a>', v, vcol.col);
                }
                else
                    return Ext.String.format('<a href="#" title="{0}" class="x-hyperlink-col-icon">{0}</a>', v);
            }
            else {
                if (vcol.col) {
                    return Ext.String.format('<a href="#" class="x-hyperlink-col-icon" style="color:{1}">{0}</a>', v, vcol.col);
                }
                else
                    return Ext.String.format('<a href="#" class="x-hyperlink-col-icon">{0}</a>', v);
            }
            
        }
    },
    processEvent: function (type, view, cell, recordIndex, cellIndex, e, record, row) {
        var me = this,
            target = e.getTarget(),
            match,
            item, fn,
            key = type == 'keydown' && e.getKey(),
            disabled;

        // If the target was not within a cell (ie it's a keydown event from the View), then
        // rely on the selection data injected by View.processUIEvent to grab the
        // first action icon from the selected cell.
        if (key && !Ext.fly(target).findParent(view.getCellSelector())) {
            target = Ext.fly(cell).down('.x-hyperlink-col-icon', true);
        }

        // NOTE: The statement below tests the truthiness of an assignment.
        if (target && (match = target.className.match('x-hyperlink-col-icon'))) {
            if (type == 'click') {
                fn = me.handler;
                if (fn) {
                    fn.call(me.scope || me.origScope || me, view, recordIndex, cellIndex, null, e, record, row);
                }
                return false;
            } else if (type == 'mousedown') {
                return false;
            }
        }
        return me.callParent(arguments);
    }
});
