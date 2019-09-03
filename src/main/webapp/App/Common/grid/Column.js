
Ext.define('App.Common.grid.Column', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.spcolumn',
    initComponent: function () {
        var me = this;
        this.baseCls = me.gridCls + 'column-header';
        this.hoverCls = me.gridCls + 'column-header-over';
        this.ascSortCls = me.gridCls + 'column-header-sort-ASC';
        this.descSortCls = me.gridCls + 'column-header-sort-DESC';
        this.groupSubHeaderCls = me.gridCls + 'group-sub-header';
        this.groupHeaderCls = me.gridCls + 'group-header';
       this.headerOpenCls = me.gridCls + 'column-header-open';

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
    getCellSelector: function() {
        return '.' + this.gridCls + 'grid-cell-' + this.getItemId();
    },

    getCellInnerSelector: function() {
        return this.getCellSelector() + ' .' + this.gridCls + 'grid-cell-inner';
    }
});
