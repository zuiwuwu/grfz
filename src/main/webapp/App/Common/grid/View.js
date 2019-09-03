Ext.define('App.Common.grid.View', {
    extend: 'Ext.view.Table',
    alias: 'widget.spgridview',
    stripeRows: true,
    autoScroll: true,
    colomuModification: 10,
    initComponent: function () {
        var me = this;
        this.firstCls = this.gridCls + 'grid-cell-first';
        this.lastCls = this.gridCls + 'grid-cell-last';
        this.headerRowSelector = 'tr.' + this.gridCls + 'grid-header-row';
        this.selectedItemCls = this.gridCls + 'grid-row-selected';
        this.beforeSelectedItemCls = this.gridCls + 'grid-row-before-selected';
        this.selectedCellCls = this.gridCls + 'grid-cell-selected';
        this.focusedItemCls = this.gridCls + 'grid-row-focused';
        this.beforeFocusedItemCls = this.gridCls + 'grid-row-before-focused';
        this.tableFocusedFirstCls = this.gridCls + 'grid-table-focused-first';
        this.tableSelectedFirstCls = this.gridCls + 'grid-table-selected-first';
        this.tableOverFirstCls = this.gridCls + 'grid-table-over-first';
        this.overItemCls = this.gridCls + 'grid-row-over';
        this.beforeOverItemCls = this.gridCls + 'grid-row-before-over';
        this.altRowCls = this.gridCls + 'grid-row-alt';
        this.firstRowCls = this.gridCls + 'grid-row-first';
       	this.dirtyCls = this.gridCls + 'grid-dirty-cell';
        this.rowClsRe = new RegExp('(?:^|\\s*)' + this.gridCls + 'grid-row-(first|last|alt)(?:\\s+|$)', 'g');
        this.cellRe = new RegExp(this.gridCls + 'grid-cell-([^\\s]+) ', '');
        this.itemSelector = 'tr.' + this.gridCls + 'grid-row';
        this.dataRowSelector = 'tr.' + this.gridCls + 'grid-data-row';
        this.cellSelector = 'td.' + this.gridCls + 'grid-cell';
        this.sizerSelector = 'col.' + this.gridCls + 'grid-cell';
        this.innerSelector = 'div.' + this.gridCls + 'grid-cell-inner';
        this.cellValues =
        {
            classes: [
            this.gridCls + 'grid-cell ' + this.gridCls + 'grid-td' // for styles shared between cell and rowwrap 
        ]
        };
        this.cellTpl = [
        '<td role="gridcell" class="{tdCls}" {tdAttr} id="{[Ext.id()]}">',
            '<div {unselectableAttr} class="' + this.gridCls + 'grid-cell-inner {innerCls}"',
                'style="text-align:{align};<tpl if="style">{style}</tpl>">{value}</div>',
        '</td>', {
            priority: 0
        }
    ];

        this.tableTpl = [
        '{%',
        // Add the row/column line classes to the table element.
            'var view=values.view,tableCls=["' + Ext.baseCSSPrefix + '" + view.id + "-table ' + this.gridCls + 'grid-table"];',
             'if (view.columnLines) tableCls[tableCls.length]=view.ownerCt.colLinesCls;',
             'if (view.rowLines) tableCls[tableCls.length]=view.ownerCt.rowLinesCls;',
        '%}',
        '<table role="presentation" id="{view.id}-table" class="{[tableCls.join(" ")]}" border="0" cellspacing="0" cellpadding="0" style="{tableStyle}" tabIndex="-1">',
            '{[view.renderColumnSizer(out)]}',
            '{[view.renderTHead(values, out)]}',
            '{[view.renderTFoot(values, out)]}',
            '<tbody id="{view.id}-body">',
            '{%',
                'view.renderRows(values.rows, values.viewStartIndex, out);',
            '%}',
            '</tbody>',
        '</table>',
        {
            priority: 0
        }
    ];

        this.rowTpl = [
        '{%',
            'var dataRowCls = values.recordIndex === -1 ? "" : " ' + this.gridCls + 'grid-data-row";',
        '%}',
        '<tr role="row" {[values.rowId ? ("id=\\"" + values.rowId + "\\"") : ""]} ',
            'data-boundView="{view.id}" ',
            'data-recordId="{record.internalId}" ',
            'data-recordIndex="{recordIndex}" ',
            'class="{[values.itemClasses.join(" ")]} {[values.rowClasses.join(" ")]}{[dataRowCls]}" ',
            '{rowAttr:attributes} tabIndex="-1">',
            '<tpl for="columns">' +
                '{%',
                    'parent.view.renderCell(values, parent.record, parent.recordIndex, xindex - 1, out, parent)',
                 '%}',
            '</tpl>',
        '</tr>',
        {
            priority: 0
        }
    ];
        me.callParent();
    },
    renderColumnSizer: function (out) {
        var columns = this.getGridColumns(),
            len = columns.length, i,
            column, width;

        for (i = 0; i < len; i++) {
            column = columns[i];
            width = column.hidden ? 0 : (column.lastBox ? column.lastBox.width : Ext.grid.header.Container.prototype.defaultWidth);
            out.push('<colgroup><col class="', this.gridCls, 'grid-cell-', columns[i].getItemId(), '" style="width:' + width + 'px"></colgroup>');
        }
    },
    renderRow: function (record, rowIdx, out) {
        var me = this,
            isMetadataRecord = rowIdx === -1,
            selModel = me.selModel,
            rowValues = me.rowValues,
            itemClasses = rowValues.itemClasses,
            rowClasses = rowValues.rowClasses,
            cls,
            rowTpl = me.rowTpl;

        // Set up mandatory properties on rowValues
        rowValues.record = record;
        rowValues.recordId = record.internalId;
        rowValues.recordIndex = rowIdx;
        rowValues.rowId = me.getRowId(record);
        rowValues.itemCls = rowValues.rowCls = '';
        if (!rowValues.columns) {
            rowValues.columns = me.ownerCt.columnManager.getColumns();
        }

        itemClasses.length = rowClasses.length = 0;

        // If it's a metadata record such as a summary record.
        // So do not decorate it with the regular CSS.
        // The Feature which renders it must know how to decorate it.
        if (!isMetadataRecord) {
            itemClasses[0] = this.gridCls + "grid-row";
            if (selModel && selModel.isRowSelected) {
                if (selModel.isRowSelected(rowIdx + 1)) {
                    itemClasses.push(me.beforeSelectedItemCls);
                }
                if (selModel.isRowSelected(record)) {
                    itemClasses.push(me.selectedItemCls);
                }
            }

            if(rowIdx == 0)
            {
            	rowClasses.push(me.firstRowCls);
            }
            if (me.stripeRows && rowIdx % 2 !== 0) {
                rowClasses.push(me.altRowCls);
            }

            if (me.getRowClass) {
                cls = me.getRowClass(record, rowIdx, null, me.dataSource);
                if (cls) {
                    rowClasses.push(cls);
                }
            }
        }

        if (out) {
            rowTpl.applyOut(rowValues, out);
        } else {
            return rowTpl.apply(rowValues);
        }
    },
    renderCell: function (column, record, recordIndex, columnIndex, out) {
        var me = this,
            selModel = me.selModel,
            cellValues = me.cellValues,
            classes = cellValues.classes,
            fieldValue = record.data[column.dataIndex],
            cellTpl = me.cellTpl,
            value, clsInsertPoint;

        cellValues.record = record;
        cellValues.column = column;
        cellValues.recordIndex = recordIndex;
        cellValues.columnIndex = columnIndex;
        cellValues.cellIndex = columnIndex;
        cellValues.align = column.align;
        cellValues.tdCls = column.tdCls;
        cellValues.innerCls = column.innerCls;
        cellValues.style = cellValues.tdAttr = "";
        cellValues.unselectableAttr = me.enableTextSelection ? '' : 'unselectable="on"';

        if (column.renderer && column.renderer.call) {
            value = column.renderer.call(column.scope || me.ownerCt, fieldValue, cellValues, record, recordIndex, columnIndex, me.dataSource, me);
            if (cellValues.css) {
                // This warning attribute is used by the compat layer
                // TODO: remove when compat layer becomes deprecated
                record.cssWarning = true;
                cellValues.tdCls += ' ' + cellValues.css;
                delete cellValues.css;
            }
        } else {
            value = fieldValue;
        }
        cellValues.value = (value == null || value === '') ? '&#160;' : value;

        // Calculate classes to add to cell
        classes[1] = this.gridCls + 'grid-cell-' + column.getItemId();

        // On IE8, array[len] = 'foo' is twice as fast as array.push('foo')
        // So keep an insertion point and use assignment to help IE!
        clsInsertPoint = 2;

        if (column.tdCls) {
            classes[clsInsertPoint++] = column.tdCls;
        }
        if (me.markDirty && record.isModified(column.dataIndex)) {
            classes[clsInsertPoint++] = me.dirtyCls;
        }
        if (column.isFirstVisible) {
            classes[clsInsertPoint++] = me.firstCls;
        }
        if (column.isLastVisible) {
            classes[clsInsertPoint++] = me.lastCls;
        }
        if (!me.enableTextSelection) {
            classes[clsInsertPoint++] = Ext.baseCSSPrefix + 'unselectable';
        }

        classes[clsInsertPoint++] = cellValues.tdCls;
        if (selModel && selModel.isCellSelected && selModel.isCellSelected(me, recordIndex, columnIndex)) {
            classes[clsInsertPoint++] = (me.selectedCellCls);
        }

        // Chop back array to only what we've set
        classes.length = clsInsertPoint;

        cellValues.tdCls = classes.join(' ');

        cellTpl.applyOut(cellValues, out);

        // Dereference objects since cellValues is a persistent var in the XTemplate's scope chain
        cellValues.column = null;
    },
    isDataRow: function (row) {
        return Ext.fly(row).hasCls(this.gridCls + 'grid-data-row');
    },
    getRowStyleTableEl: function (item /* view item or row index */) {
        var me = this;

        if (!item.tagName) {
            item = this.getNode(item);
        }

        return (me.isGrouping ? Ext.fly(item) : this.el).down('table.' + me.gridCls + 'grid-table');
    },
    isRowStyleFirst: function (item /* view item or row index */) {
        var me = this,
            index;

        // An item not in the view
        if (item === -1) {
            return false;
        }

        if (!item.tagName) {
            index = item;
            item = this.getNode(item);
        } else {
            index = me.indexOf(item);
        }

        return (!index || me.isGrouping && Ext.fly(item).hasCls(me.gridCls + 'grid-group-row'));
    },
    getCell: function (record, column) {
        var row = this.getNode(record, true);
        return Ext.fly(row).down(column.getCellSelector());
    },
    getMaxContentWidth: function (header) {
        var me = this,
            cells = me.el.query(header.getCellInnerSelector()),
            originalWidth = header.getWidth(),
            i = 0,
            ln = cells.length,
            hasPaddingBug = Ext.supports.ScrollWidthInlinePaddingBug,
            columnSizer = me.body.select(me.getColumnSizerSelector(header)),
            max = Math.max,
            paddingAdjust, maxWidth;

        if (hasPaddingBug && ln > 0) {
            paddingAdjust = me.getCellPaddingAfter(cells[0]);
        }

        // Set column width to 1px so we can detect the content width by measuring scrollWidth
        columnSizer.setWidth(1);

        // Allow for padding round text of header
        maxWidth = header.textEl.dom.offsetWidth + header.titleEl.getPadding('lr');
        for (; i < ln; i++) {
            maxWidth = max(maxWidth, cells[i].scrollWidth);
        }
        if (hasPaddingBug) {
            // in some browsers, the "after" padding is not accounted for in the scrollWidth
            maxWidth += paddingAdjust;
        }
        //修正加宽的像素

        maxWidth += me.colomuModification;

        // 40 is the minimum column width.  TODO: should this be configurable?
        maxWidth = max(maxWidth, 40);

        // Set column width back to original width
        columnSizer.setWidth(originalWidth);

        return maxWidth;
    }
});