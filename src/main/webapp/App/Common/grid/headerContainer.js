
Ext.define('App.Common.grid.headerContainer', {
    extend: 'Ext.grid.header.Container',
    requires: ['App.Common.grid.HeaderReorderer'],
    initComponent: function () {
        var me = this;

    	//this.menuSortAscCls: Ext.baseCSSPrefix + 'hmenu-sort-asc',

    	//this.menuSortDescCls: Ext.baseCSSPrefix + 'hmenu-sort-desc',

    	//this.menuColsIcon: Ext.baseCSSPrefix + 'cols-icon',

        me.headerCounter = 0;
        me.plugins = me.plugins || [];

        // TODO: Pass in configurations to turn on/off dynamic
        //       resizing and disable resizing all together

        // Only set up a Resizer and Reorderer for the topmost HeaderContainer.
        // Nested Group Headers are themselves HeaderContainers
        if (!me.isColumn) {
            if (me.enableColumnResize) {
                me.resizer = new Ext.grid.plugin.HeaderResizer(
                { colHeaderCls: me.gridCls + 'column-header' });
                me.plugins.push(me.resizer);
            }
            if (me.enableColumnMove) {
                me.reorderer = new App.Common.grid.HeaderReorderer({ gridCls: me.gridCls });
                me.plugins.push(me.reorderer);
            }
        }

        // If this is a leaf column header, and is NOT functioning as a container,
        // use Container layout with a no-op calculate method.
        if (me.isColumn && (!me.items || me.items.length === 0)) {
            me.isContainer = false;
            me.layout = {
                type: 'container',
                calculate: Ext.emptyFn
            };
        }

        // HeaderContainer and Group header needs a gridcolumn layout.
        else {
            me.layout = Ext.apply({
                type: 'gridcolumn',
                align: 'stretch'
            }, me.initialConfig.layout);

            // Create the owning grid's ColumnManager
            if (me.isRootHeader) {
                me.grid.columnManager = me.columnManager = new Ext.grid.ColumnManager(me);
            }
        }

        me.defaults = me.defaults || {};
        Ext.applyIf(me.defaults, {
            triStateSort: me.triStateSort,
            sortable: me.sortable
        });

        me.menuTask = new Ext.util.DelayedTask(me.updateMenuDisabledState, me);



        //me.callParent();
        me.superclass.superclass.initComponent.apply(me);




        me.addEvents(
        /**
        * @event columnresize
        * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
        * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
        * @param {Number} width
        */
            'columnresize',

        /**
        * @event headerclick
        * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
        * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
        * @param {Ext.EventObject} e
        * @param {HTMLElement} t
        */
            'headerclick',

        /**
        * @event headercontextmenu
        * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
        * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
        * @param {Ext.EventObject} e
        * @param {HTMLElement} t
        */
            'headercontextmenu',

        /**
        * @event headertriggerclick
        * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
        * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
        * @param {Ext.EventObject} e
        * @param {HTMLElement} t
        */
            'headertriggerclick',

        /**
        * @event columnmove
        * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
        * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
        * @param {Number} fromIdx
        * @param {Number} toIdx
        */
            'columnmove',
        /**
        * @event columnhide
        * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
        * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
        */
            'columnhide',
        /**
        * @event columnshow
        * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
        * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
        */
            'columnshow',
        /**
        * @event columnschanged
        * Fired after the columns change in any way, when a column has been hidden or shown, or when a column
        * is added to or removed from this header container.
        * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
        */
            'columnschanged',
        /**
        * @event sortchange
        * @param {Ext.grid.header.Container} ct The grid's header Container which encapsulates all column headers.
        * @param {Ext.grid.column.Column} column The Column header Component which provides the column definition
        * @param {String} direction
        */
            'sortchange',
        /**
        * @event menucreate
        * Fired immediately after the column header menu is created.
        * @param {Ext.grid.header.Container} ct This instance
        * @param {Ext.menu.Menu} menu The Menu that was created
        */
            'menucreate'
        );
    }
});
