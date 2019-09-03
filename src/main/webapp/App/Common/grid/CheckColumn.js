Ext.define('App.Common.grid.CheckColumn', {
    extend: 'Ext.grid.column.CheckColumn',
    alias: 'widget.spcheckcolumn',
    initComponent: function () {
        var me = this;
        this.tdCls = me.gridCls + 'grid-cell-checkcolumn';
        this.innerCls = me.gridCls + 'grid-cell-inner-checkcolumn';

        this.renderTpl =
        '<div id="{id}-titleEl" {tipMarkup}class="' + me.gridCls + 'column-header-inner">' +
            '<span id="{id}-textEl" class="' + me.gridCls + 'column-header-text' +
                '{childElCls}">' +
                '{text}' +
            '</span>' +
            '<tpl if="!menuDisabled">' +
                '<div id="{id}-triggerEl" class="' + me.gridCls + 'column-header-trigger' +
                '{childElCls}"></div>' +
            '</tpl>' +
        '</div>' +
        '{%this.renderContainer(out,values)%}';
        me.callParent();
    },

    /**
    * @private
    * Process and refire events routed from the GridView's processEvent method.
    */
    processEvent: function (type, view, cell, recordIndex, cellIndex, e, record, row) {
        var me = this,
            key = type === 'keydown' && e.getKey(),
            mousedown = type == 'mousedown';

        if (!me.disabled && (mousedown || (key == e.ENTER || key == e.SPACE))) {
            var dataIndex = me.dataIndex,
                checked = !record.get(dataIndex);

            // Allow apps to hook beforecheckchange
            if (me.fireEvent('beforecheckchange', me, recordIndex, checked) !== false) {
                record.set(dataIndex, checked);
                me.fireEvent('checkchange', me, recordIndex, checked);

                // Mousedown on the now nonexistent cell causes the view to blur, so stop it continuing.
                if (mousedown) {
                    e.stopEvent();
                }

                // Selection will not proceed after this because of the DOM update caused by the record modification
                // Invoke the SelectionModel unless configured not to do so
                if (!me.stopSelection) {
                    view.selModel.selectByPosition({
                        row: recordIndex,
                        column: cellIndex
                    });
                }

                // Prevent the view from propagating the event to the selection model - we have done that job.
                return false;
            } else {
                // Prevent the view from propagating the event to the selection model if configured to do so.
                return !me.stopSelection;
            }
        } else {
            return me.callParent(arguments);
        }
    },
    onEnable: function (silent) {
        var me = this;

        me.callParent(arguments);
        me.up('tablepanel').el.select('.' + me.gridCls + 'grid-cell-' + me.id).removeCls(me.disabledCls);
        if (!silent) {
            me.fireEvent('enable', me);
        }
    },

    /**
    * Disables this CheckColumn.
    * @param {Boolean} [silent=false]
    */
    onDisable: function (silent) {
        var me = this;

        me.callParent(arguments);
        me.up('tablepanel').el.select('.' + me.gridCls + 'grid-cell-' + me.id).addCls(me.disabledCls);
        if (!silent) {
            me.fireEvent('disable', me);
        }
    },

    // Note: class names are not placed on the prototype bc renderer scope
    // is not in the header.
    renderer: function (value, meta) {
        var cssPrefix = this.gridCls,
            cls = [cssPrefix + 'grid-checkcolumn'];

        if (this.disabled) {
            meta.tdCls += ' ' + this.disabledCls;
        }
        if (value) {
            cls.push(cssPrefix + 'grid-checkcolumn-checked');
        }
        return '<img class="' + cls.join(' ') + '" src="' + Ext.BLANK_IMAGE_URL + '"/>';
    }
});
