Ext.define('App.Common.grid.Grid', {
    extend: 'Ext.panel.Table',
    requires: ['App.Common.grid.View',
    'App.Common.grid.CheckboxModel',
    'App.Common.grid.RowNumberer',
    'App.Common.grid.Action',
    'App.Common.grid.headerContainer',
    'App.Common.grid.Column',
    'App.Common.grid.CheckColumn'],
    alias: ['widget.spgridpanel', 'widget.spgrid'],
    viewType: 'spgridview',

    lockable: false,

    rowLines: true,
    gridCls: Ext.baseCSSPrefix + 'sp',
    initComponent: function () {

        if (!this.viewType) {
            Ext.Error.raise("You must specify a viewType config.");
        }
        if (this.headers) {
            Ext.Error.raise("The headers config is not supported. Please specify columns instead.");
        }
        //</debug>

        var me = this,
            headerCtCfg = me.columns || me.colModel,
            view,
            i, len,
        // Look up the configured Store. If none configured, use the fieldless, empty Store defined in Ext.data.Store.
            store = me.store = Ext.data.StoreManager.lookup(me.store || 'ext-empty-store'),
            columns;


        me.extraBaseCls = me.gridCls + 'grid';
        me.extraBodyCls = me.gridCls + 'grid-body';
        me.colLinesCls = me.gridCls + 'grid-with-col-lines';
        me.rowLinesCls = me.gridCls + 'grid-with-row-lines';
        me.noRowLinesCls = me.gridCls + 'grid-no-row-lines';
        me.hiddenHeaderCtCls = me.gridCls + 'grid-header-ct-hidden';
        me.hiddenHeaderCls = me.gridCls + 'grid-header-hidden';
        me.resizeMarkerCls = me.gridCls + 'grid-resize-marker';
        me.emptyCls = me.gridCls + 'grid-empty';
        if (headerCtCfg) {
            if (Ext.isArray(headerCtCfg)) {
                for (var i = 0; i < headerCtCfg.length; i++) {
                    var vcol = headerCtCfg[i];
                    var renderTpl =
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
                    if (vcol.xtype === 'rownumberer') {
                        vcol.xtype = 'sprownumberer';
                    }
                    else if (vcol.xtype === 'actioncolumn') {
                        vcol.xtype = 'spactioncolumn';
                    }
                    else if (vcol.xtype == 'checkcolumn') {
                        vcol.xtype = 'spcheckcolumn';
                    }
                    else if (typeof vcol.xtype === 'undefined') {
                        vcol.xtype = 'spcolumn';
                    }

                    Ext.apply(vcol, {
                        baseCls: me.gridCls + 'column-header',
                        hoverCls: me.gridCls + 'column-header-over',
                        ascSortCls: me.gridCls + 'column-header-sort-ASC',
                        descSortCls: me.gridCls + 'column-header-sort-DESC',
                        groupSubHeaderCls: me.gridCls + 'group-sub-header',
                        groupHeaderCls: me.gridCls + 'group-header',
                        renderTpl: renderTpl,
                        gridCls: me.gridCls
                    });
                }
                headerCtCfg = {
                    items: headerCtCfg
                };
            }
            Ext.apply(headerCtCfg, {
                gridCls: me.gridCls,
                baseCls: me.gridCls + 'grid-header-ct',
                headerOpenCls: me.gridCls + 'column-header-open',

                //menuSortAscCls: me.gridCls + 'hmenu-sort-asc',

                //menuSortDescCls: me.gridCls + 'hmenu-sort-desc',

                //menuColsIcon: me.gridCls + 'cols-icon',
                layout: {
                    firstHeaderCls: me.gridCls + 'column-header-first',
                    lastHeaderCls: me.gridCls + 'column-header-last'
                }
            });
            me.columns = headerCtCfg;
        }

        if (me.columnLines) {
            me.addCls(me.colLinesCls);
        }

        me.addCls(me.rowLines ? me.rowLinesCls : me.noRowLinesCls);

        //<debug>
        if (!headerCtCfg) {
            Ext.Error.raise("A column configuration must be specified");
        }
        //</debug>

        // The columns/colModel config may be either a fully instantiated HeaderContainer, or an array of Column definitions, or a config object of a HeaderContainer
        // Either way, we extract a columns property referencing an array of Column definitions.
        if (headerCtCfg instanceof App.Common.grid.headerContainer) {
            headerCtCfg.isRootHeader = true;
            me.headerCt = headerCtCfg;
        } else {

            // If any of the Column objects contain a locked property, and are not processed, this is a lockable TablePanel, a
            // special view will be injected by the Ext.grid.locking.Lockable mixin, so no processing of .
            if (me.enableLocking || me.hasLockedColumns(headerCtCfg)) {
                me.self.mixin('lockable', Ext.grid.locking.Lockable);
                me.injectLockable();
            }
            // Not lockable - create the HeaderContainer
            else {
                if (Ext.isArray(headerCtCfg)) {
                    headerCtCfg = {
                        items: headerCtCfg
                    };
                }
                Ext.apply(headerCtCfg, {
                    grid: me,
                    forceFit: me.forceFit,
                    sortable: me.sortableColumns,
                    enableColumnMove: me.enableColumnMove,
                    enableColumnResize: me.enableColumnResize,
                    sealed: me.sealedColumns,
                    isRootHeader: true
                });

                if (Ext.isDefined(me.enableColumnHide)) {
                    headerCtCfg.enableColumnHide = me.enableColumnHide;
                }

                // Create our HeaderCOntainer from the generated configuration
                if (!me.headerCt) {
                    me.headerCt = new App.Common.grid.headerContainer(headerCtCfg);
                }
            }
        }

        // Maintain backward compatibiliy by providing the initial column set as a property.
        me.columns = me.headerCt.getGridColumns();

        me.scrollTask = new Ext.util.DelayedTask(me.syncHorizontalScroll, me);

        me.addEvents(
        // documented on GridPanel
            'reconfigure',
        /**
        * @event viewready
        * Fires when the grid view is available (use this for selecting a default row).
        * @param {Ext.panel.Table} this
        */
            'viewready'
        );

        me.bodyCls = me.bodyCls || '';
        me.bodyCls += (' ' + me.extraBodyCls);

        me.cls = me.cls || '';
        me.cls += (' ' + me.extraBaseCls);

        // autoScroll is not a valid configuration
        delete me.autoScroll;

        // If this TablePanel is lockable (Either configured lockable, or any of the defined columns has a 'locked' property)
        // then a special lockable view containing 2 side-by-side grids will have been injected so we do not need to set up any UI.
        if (!me.hasView) {

            // Extract the array of leaf Column objects
            columns = me.headerCt.getGridColumns();

            // If the Store is paging blocks of the dataset in, then it can only be sorted remotely.
            if (store.buffered && !store.remoteSort) {
                for (i = 0, len = columns.length; i < len; i++) {
                    columns[i].sortable = false;
                }
            }

            if (me.hideHeaders) {
                me.headerCt.height = 0;
                // don't se the hidden property, we still need these to layout
                me.headerCt.hiddenHeaders = true;
                me.headerCt.addCls(me.hiddenHeaderCtCls);
                me.addCls(me.hiddenHeaderCls);
                // IE Quirks Mode fix
                // If hidden configuration option was used, several layout calculations will be bypassed.
                if (Ext.isIEQuirks) {
                    me.headerCt.style = {
                        display: 'none'
                    };
                }
            }

            me.relayHeaderCtEvents(me.headerCt);
            me.features = me.features || [];
            if (!Ext.isArray(me.features)) {
                me.features = [me.features];
            }
            me.dockedItems = [].concat(me.dockedItems || []);
            me.dockedItems.unshift(me.headerCt);
            me.viewConfig = me.viewConfig || {};

            // AbstractDataView will look up a Store configured as an object
            // getView converts viewConfig into a View instance
            view = me.getView();

            me.items = [view];
            me.hasView = true;

            // Add a listener to synchronize the horizontal scroll position of the headers
            // with the table view's element... Unless we are not showing headers!
            if (!me.hideHeaders) {
                view.on({
                    scroll: {
                        fn: me.onHorizontalScroll,
                        element: 'el',
                        scope: me
                    }
                });
            }

            // Attach this Panel to the Store
            me.bindStore(store, true);

            me.mon(view, {
                viewready: me.onViewReady,
                refresh: me.onRestoreHorzScroll,
                scope: me
            });
        }

        // Relay events from the View whether it be a LockingView, or a regular GridView
        me.relayEvents(me.view, [
        /**
        * @event beforeitemmousedown
        * @inheritdoc Ext.view.View#beforeitemmousedown
        */
            'beforeitemmousedown',
        /**
        * @event beforeitemmouseup
        * @inheritdoc Ext.view.View#beforeitemmouseup
        */
            'beforeitemmouseup',
        /**
        * @event beforeitemmouseenter
        * @inheritdoc Ext.view.View#beforeitemmouseenter
        */
            'beforeitemmouseenter',
        /**
        * @event beforeitemmouseleave
        * @inheritdoc Ext.view.View#beforeitemmouseleave
        */
            'beforeitemmouseleave',
        /**
        * @event beforeitemclick
        * @inheritdoc Ext.view.View#beforeitemclick
        */
            'beforeitemclick',
        /**
        * @event beforeitemdblclick
        * @inheritdoc Ext.view.View#beforeitemdblclick
        */
            'beforeitemdblclick',
        /**
        * @event beforeitemcontextmenu
        * @inheritdoc Ext.view.View#beforeitemcontextmenu
        */
            'beforeitemcontextmenu',
        /**
        * @event itemmousedown
        * @inheritdoc Ext.view.View#itemmousedown
        */
            'itemmousedown',
        /**
        * @event itemmouseup
        * @inheritdoc Ext.view.View#itemmouseup
        */
            'itemmouseup',
        /**
        * @event itemmouseenter
        * @inheritdoc Ext.view.View#itemmouseenter
        */
            'itemmouseenter',
        /**
        * @event itemmouseleave
        * @inheritdoc Ext.view.View#itemmouseleave
        */
            'itemmouseleave',
        /**
        * @event itemclick
        * @inheritdoc Ext.view.View#itemclick
        */
            'itemclick',
        /**
        * @event itemdblclick
        * @inheritdoc Ext.view.View#itemdblclick
        */
            'itemdblclick',
        /**
        * @event itemcontextmenu
        * @inheritdoc Ext.view.View#itemcontextmenu
        */
            'itemcontextmenu',
        /**
        * @event beforecellclick
        * @inheritdoc Ext.view.Table#beforecellclick
        */
            'beforecellclick',
        /**
        * @event cellclick
        * @inheritdoc Ext.view.Table#cellclick
        */
            'cellclick',
        /**
        * @event beforecelldblclick
        * @inheritdoc Ext.view.Table#beforecelldblclick
        */
            'beforecelldblclick',
        /**
        * @event celldblclick
        * @inheritdoc Ext.view.Table#celldblclick
        */
            'celldblclick',
        /**
        * @event beforecellcontextmenu
        * @inheritdoc Ext.view.Table#beforecellcontextmenu
        */
            'beforecellcontextmenu',
        /**
        * @event cellcontextmenu
        * @inheritdoc Ext.view.Table#cellcontextmenu
        */
            'cellcontextmenu',
        /**
        * @event beforecellmousedown
        * @inheritdoc Ext.view.Table#beforecellmousedown
        */
            'beforecellmousedown',
        /**
        * @event cellmousedown
        * @inheritdoc Ext.view.Table#cellmousedown
        */
            'cellmousedown',
        /**
        * @event beforecellmouseup
        * @inheritdoc Ext.view.Table#beforecellmouseup
        */
            'beforecellmouseup',
        /**
        * @event cellmouseup
        * @inheritdoc Ext.view.Table#cellmouseup
        */
            'cellmouseup',
        /**
        * @event beforecellkeydown
        * @inheritdoc Ext.view.Table#beforecellkeydown
        */
            'beforecellkeydown',
        /**
        * @event cellkeydown
        * @inheritdoc Ext.view.Table#cellkeydown
        */
            'cellkeydown',
        /**
        * @event beforecontainermousedown
        * @inheritdoc Ext.view.View#beforecontainermousedown
        */
            'beforecontainermousedown',
        /**
        * @event beforecontainermouseup
        * @inheritdoc Ext.view.View#beforecontainermouseup
        */
            'beforecontainermouseup',
        /**
        * @event beforecontainermouseover
        * @inheritdoc Ext.view.View#beforecontainermouseover
        */
            'beforecontainermouseover',
        /**
        * @event beforecontainermouseout
        * @inheritdoc Ext.view.View#beforecontainermouseout
        */
            'beforecontainermouseout',
        /**
        * @event beforecontainerclick
        * @inheritdoc Ext.view.View#beforecontainerclick
        */
            'beforecontainerclick',
        /**
        * @event beforecontainerdblclick
        * @inheritdoc Ext.view.View#beforecontainerdblclick
        */
            'beforecontainerdblclick',
        /**
        * @event beforecontainercontextmenu
        * @inheritdoc Ext.view.View#beforecontainercontextmenu
        */
            'beforecontainercontextmenu',
        /**
        * @event containermouseup
        * @inheritdoc Ext.view.View#containermouseup
        */
            'containermouseup',
        /**
        * @event containermouseover
        * @inheritdoc Ext.view.View#containermouseover
        */
            'containermouseover',
        /**
        * @event containermouseout
        * @inheritdoc Ext.view.View#containermouseout
        */
            'containermouseout',
        /**
        * @event containerclick
        * @inheritdoc Ext.view.View#containerclick
        */
            'containerclick',
        /**
        * @event containerdblclick
        * @inheritdoc Ext.view.View#containerdblclick
        */
            'containerdblclick',
        /**
        * @event containercontextmenu
        * @inheritdoc Ext.view.View#containercontextmenu
        */
            'containercontextmenu',
        /**
        * @event selectionchange
        * @inheritdoc Ext.selection.Model#selectionchange
        */
            'selectionchange',
        /**
        * @event beforeselect
        * @inheritdoc Ext.selection.RowModel#beforeselect
        */
            'beforeselect',
        /**
        * @event select
        * @inheritdoc Ext.selection.RowModel#select
        */
            'select',
        /**
        * @event beforedeselect
        * @inheritdoc Ext.selection.RowModel#beforedeselect
        */
            'beforedeselect',
        /**
        * @event deselect
        * @inheritdoc Ext.selection.RowModel#deselect
        */
            'deselect'
        ]);

        me.superclass.superclass.initComponent.apply(me);
        me.addStateEvents(['columnresize', 'columnmove', 'columnhide', 'columnshow', 'sortchange', 'filterchange']);

        // If lockable, the headerCt is just a collection of Columns, not a Container
        if (!me.lockable && me.headerCt) {
            me.headerCt.on('afterlayout', me.onRestoreHorzScroll, me);
        }

    },
    getView: function () {
        var me = this,
            sm;

        if (!me.view) {
            sm = me.getSelectionModel();

            // TableView injects the view reference into this grid so that we have a reference as early as possible
            Ext.widget(Ext.apply({

                // Features need a reference to the grid, so configure a reference into the View
                grid: me,
                deferInitialRefresh: me.deferRowRender !== false,
                trackOver: me.trackMouseOver !== false,
                scroll: me.scroll,
                xtype: me.viewType,
                store: me.store,
                headerCt: me.headerCt,
                columnLines: me.columnLines,
                rowLines: me.rowLines,
                selModel: sm,
                features: me.features,
                panel: me,
                emptyText: me.emptyText || '',
                gridCls: me.gridCls,
                baseCls: me.gridCls + 'grid-view'
            }, me.viewConfig));

            // Normalize the application of the markup wrapping the emptyText config.
            // `emptyText` can now be defined on the grid as well as on its viewConfig, and this led to the emptyText not
            // having the wrapping markup when it was defined in the viewConfig. It should be backwards compatible.
            // Note that in the unlikely event that emptyText is defined on both the grid config and the viewConfig that the viewConfig wins.
            if (me.view.emptyText) {
                me.view.emptyText = '<div class="' + me.emptyCls + '">' + me.view.emptyText + '</div>';
            }

            // TableView's custom component layout, Ext.view.TableLayout requires a reference to the headerCt because it depends on the headerCt doing its work.
            me.view.getComponentLayout().headerCt = me.headerCt;

            me.mon(me.view, {
                uievent: me.processEvent,
                scope: me
            });
            sm.view = me.view;
            me.headerCt.view = me.view;
        }
        return me.view;
    },
    getSelectionModel: function () {
        var me = this,
            selModel = me.selModel,
            applyMode, mode, type;

        if (!selModel) {
            selModel = {};
            // no config, set our own mode
            applyMode = true;
        }

        if (!selModel.events) {
            // only config provided, set our mode if one doesn't exist on the config
            type = selModel.selType || me.selType;
            applyMode = !selModel.mode;
            if (type == 'checkboxmodel') {
                selModel.gridCls = me.gridCls;
                selModel.checkSelector = '.' + me.gridCls + 'grid-row-checker';
                selModel.checkerOnCls = me.gridCls + 'grid-hd-checker-on';
                type = 'spcheckboxmodel';
                selModel = me.selModel = Ext.create('App.Common.grid.CheckboxModel', selModel);
            }
            else {
                selModel = me.selModel = Ext.create('selection.' + type, selModel);
            }
        }

        if (me.simpleSelect) {
            mode = 'SIMPLE';
        } else if (me.multiSelect) {
            mode = 'MULTI';
        }

        Ext.applyIf(selModel, {
            allowDeselect: me.allowDeselect
        });

        if (mode && applyMode) {
            selModel.setSelectionMode(mode);
        }

        if (!selModel.hasRelaySetup) {
            me.relayEvents(selModel, [
                'selectionchange', 'beforeselect', 'beforedeselect', 'select', 'deselect'
            ]);
            selModel.hasRelaySetup = true;
        }

        // lock the selection model if user
        // has disabled selection
        if (me.disableSelection) {
            selModel.locked = true;
        }
        return selModel;
    }
});