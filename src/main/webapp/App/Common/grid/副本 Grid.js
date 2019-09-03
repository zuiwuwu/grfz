Ext.define('App.Common.grid.Grid', {
    extend: 'Ext.panel.Table',
    requires: ['App.Common.grid.View',
    'App.Common.grid.CheckboxModel',
    'App.Common.grid.RowNumberer',
    'App.Common.grid.Action'],
    alias: ['widget.spgridpanel', 'widget.spgrid'],
    viewType: 'spgridview',

    lockable: false,

    rowLines: true,
    gridCls: Ext.baseCSSPrefix + 'sp',
    initComponent: function () {
        var me = this;
        var headerCtCfg = me.columns;

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
                baseCls: me.gridCls + 'grid-header-ct',
                headerOpenCls: me.gridCls + 'column-header-open',

                menuSortAscCls: me.gridCls + 'hmenu-sort-asc',

                menuSortDescCls: me.gridCls + 'hmenu-sort-desc',

                menuColsIcon: me.gridCls + 'cols-icon',
                layout: {
                    firstHeaderCls: me.gridCls + 'column-header-first',
                    lastHeaderCls: me.gridCls + 'column-header-last'
                }
            });
            me.columns = headerCtCfg;
        }
        me.callParent(arguments);

        if(me.headerCt.resizer)
            me.headerCt.resizer.colHeaderCls = me.gridCls + 'column-header';
       
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