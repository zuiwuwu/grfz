
Ext.define('App.Common.grid.Action', {
    extend: 'Ext.grid.column.Action',
    alias: 'widget.spactioncolumn',
    initComponent: function () {
        var me = this;
        this.innerCls = me.gridCls + 'grid-cell-inner-action-col';
        this.actionIdRe = new RegExp(me.gridCls + 'action-col-(\\d+)');
        me.callParent();
    },

    // Renderer closure iterates through items creating an <img> element for each and tagging with an identifying
    // class name x-action-col-{n}
    defaultRenderer: function (v, meta, record, rowIdx, colIdx, store, view) {
        var me = this,
            prefix = me.gridCls,
            scope = me.origScope || me,
            items = me.items,
            len = items.length,
            i = 0,
            item, ret, disabled, tooltip, text;

        // Allow a configured renderer to create initial value (And set the other values in the "metadata" argument!)
        // Assign a new variable here, since if we modify "v" it will also modify the arguments collection, meaning
        // we will pass an incorrect value to getClass/getTip
        ret = Ext.isFunction(me.origRenderer) ? me.origRenderer.apply(scope, arguments) || '' : '';

        meta.tdCls += ' ' + me.gridCls + 'action-col-cell';
        for (; i < len; i++) {
            item = items[i];

            if (me.isItemRender
            && !item.isItemRender.call(item.scope || scope, item, i, record, rowIdx, colIdx, store, view)) {
                continue;
            }

            disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || scope, view, rowIdx, colIdx, item, record) : false);
            disabled = true;
            tooltip = disabled ? null : (item.tooltip || (item.getTip ? item.getTip.apply(item.scope || scope, arguments) : null));
            text = item.text||'';

            // Only process the item action setup once.
            if (!item.hasActionConfiguration) {

                // Apply our documented default to all items
                item.stopSelection = me.stopSelection;
                item.disable = Ext.Function.bind(me.disableAction, me, [i], 0);
                item.enable = Ext.Function.bind(me.enableAction, me, [i], 0);
                item.hasActionConfiguration = true;
            }

            var iconCls = (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls));

            if(iconCls)
           {
           		iconCls += ' x-spaction-col-icon-image';
           }
           ret += '<span class="' + prefix + 'action-col-icon-span ' + prefix + 'action-col-' + String(i) + ' ' + iconCls + '" >';
//            if(item.iconCls)
//            {
//	            ret +=  '<img role="button" alt="' + (item.altText || me.altText) + '" src="' + (item.icon || Ext.BLANK_IMAGE_URL) +
//	                '" class="' + prefix + 'action-col-icon ' + prefix + 'action-col-' + String(i) + ' ' + (disabled ? prefix + 'item-disabled' : ' ') +
//	                ' ' + (Ext.isFunction(item.getClass) ? item.getClass.apply(item.scope || scope, arguments) : (item.iconCls || me.iconCls || '')) + '"' +
//	                (tooltip ? ' data-qtip="' + tooltip + '"' : '') + ' />';
//            	
//            }
            ret += '<a style="" class="' + prefix + 'action-col-icon-text ' + prefix + 'action-col-' + String(i) + '">' + text + '</a></span>';
        }
        return ret;
    },
    enableAction: function (index, silent) {
        var me = this;

        if (!index) {
            index = 0;
        } else if (!Ext.isNumber(index)) {
            index = Ext.Array.indexOf(me.items, index);
        }
        me.items[index].disabled = false;
        me.up('tablepanel').el.select('.' + me.gridCls + 'action-col-' + index).removeCls(me.disabledCls);
        if (!silent) {
            me.fireEvent('enable', me);
        }
    },
    disableAction: function (index, silent) {
        var me = this;

        if (!index) {
            index = 0;
        } else if (!Ext.isNumber(index)) {
            index = Ext.Array.indexOf(me.items, index);
        }
        me.items[index].disabled = true;
        me.up('tablepanel').el.select('.' + me.gridCls + 'action-col-' + index).addCls(me.disabledCls);
        if (!silent) {
            me.fireEvent('disable', me);
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
            target = Ext.fly(cell).down('.' + me.gridCls + 'action-col-icon_span', true);
            if (!target) {
                target = Ext.fly(cell).down('.' + me.gridCls + 'action-col-icon-text', true);
            }
        }

        // NOTE: The statement below tests the truthiness of an assignment.
        if (target && (match = target.className.match(me.actionIdRe))) {
            item = me.items[parseInt(match[1], 10)];
            disabled = item.disabled || (item.isDisabled ? item.isDisabled.call(item.scope || me.origScope || me, view, recordIndex, cellIndex, item, record) : false);
            if (item && !disabled) {
                if (type == 'click' || (key == e.ENTER || key == e.SPACE)) {
                    fn = item.handler || me.handler;
                    if (fn) {
                        fn.call(item.scope || me.origScope || me, view, recordIndex, cellIndex, item, e, record, row);
                    }
                } else if (type == 'mousedown' && item.stopSelection !== false) {
                    return false;
                }
            }
        }
        //return me.superclass.superclass.initComponent.apply(me, arguments);
        //return me.callParent(arguments);
    }
});
