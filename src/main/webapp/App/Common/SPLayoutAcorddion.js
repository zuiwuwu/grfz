Ext.define('App.Common.SPLayoutAcorddion', {
    extend: 'Ext.layout.container.VBox',
    alias: ['layout.splayoutacorddion'],
    alternateClassName: 'App.Common.SPLayoutAcorddion',

    targetCls: Ext.baseCSSPrefix + 'accordion-layout-ct',
    itemCls: [Ext.baseCSSPrefix + 'box-item', Ext.baseCSSPrefix + 'accordion-item'],

    align: 'stretch',
    fill: true,
    titleCollapse: true,
    hideCollapseTool: false,
    collapseFirst: undefined,
    animate: true,
    activeOnTop: false,
    multi: false,
    defaultAnimatePolicy: {
        y: true,
        height: true
    },

    constructor: function () {
        var me = this;

        me.callParent(arguments);

        if (!me.multi && me.animate) {
            me.animatePolicy = Ext.apply({}, me.defaultAnimatePolicy);
        } else {
            me.animatePolicy = null;
        }
    },

    beforeRenderItems: function (items) {
        var me = this,
            ln = items.length,
            i = 0,
            owner = me.owner,
            collapseFirst = me.collapseFirst,
            hasCollapseFirst = Ext.isDefined(collapseFirst),
            expandedItem = me.getExpanded(true)[0],
            multi = me.multi,
            comp;

        for (; i < ln; i++) {
            comp = items[i];
            if (!comp.rendered) {
                // Set up initial properties for Panels in an accordion.
                if (comp.itempanel.collapsible !== false) {
                    comp.itempanel.collapsible = true;
                }
                comp.collapsed = false


                //delete comp.hideHeader;
                delete comp.width;
                if (expandedItem) {
                    comp.itempanel.collapsed = expandedItem !== comp.itempanel;
                } else if (comp.itempanel.hasOwnProperty('collapsed') && comp.itempanel.collapsed === false) {
                    expandedItem = comp.itempanel;
                } else {
                    comp.itempanel.collapsed = true;
                }
            }
        }

        // If no collapsed:false Panels found, make the first one expanded.
        if (!multi) {
            if (!expandedItem) {
                if (ln) {
                    items[0].collapsed = false;
                }
            } else if (me.activeOnTop) {
                expandedItem.collapsed = false;
                me.configureItem(expandedItem);
                if (owner.items.indexOf(expandedItem) > 0) {
                    owner.insert(0, expandedItem);
                }
            }
        }
    },

    getItemsRenderTree: function (items) {
        this.beforeRenderItems(items);
        return this.callParent(arguments);
    },

    renderItems: function (items, target) {
        this.beforeRenderItems(items);

        this.callParent(arguments);
    },

    configureItem: function (item) {
        this.callParent(arguments);

        // We handle animations for the expand/collapse of items.
        // Items do not have individual borders
        item.animCollapse = item.border = false;

        // If filling available space, all Panels flex.
        if (this.fill) {
            item.flex = 1;
        }
    },

    beginLayout: function (ownerContext) {
        this.callParent(arguments);
        this.updatePanelClasses(ownerContext);
    },

    updatePanelClasses: function (ownerContext) {
        var children = ownerContext.visibleItems,
            ln = children.length,
            siblingCollapsed = true,
            i, child, header;

        for (i = 0; i < ln; i++) {
            child = children[i];
            header = child.header;
            continue;

            header.addCls(Ext.baseCSSPrefix + 'sp-acorddion-item');
            header.body.addCls(Ext.baseCSSPrefix + 'sp-acorddion-item-body');


            //            if (siblingCollapsed) {
            //                header.removeCls(Ext.baseCSSPrefix + 'accordion-hd-sibling-expanded');
            //            } else {
            //                header.addCls(Ext.baseCSSPrefix + 'accordion-hd-sibling-expanded');
            //            }

            //            if (i + 1 == ln && child.collapsed) {
            //                header.addCls(Ext.baseCSSPrefix + 'accordion-hd-last-collapsed');
            //            } else {
            //                header.removeCls(Ext.baseCSSPrefix + 'accordion-hd-last-collapsed');
            //            }

            siblingCollapsed = child.collapsed;
        }
    },

    // When a Component expands, adjust the heights of the other Components to be just enough to accommodate
    // their headers.
    // The expanded Component receives the only flex value, and so gets all remaining space.
    onComponentExpand: function (toExpand) {
        var me = this,
            owner = me.owner,
            multi = me.multi,
            animate = me.animate,
            moveToTop = !multi && !me.animate && me.activeOnTop,
            expanded,
            expandedCount, i,
            previousValue;

        if (!me.processing) {
            me.processing = true;
            previousValue = owner.deferLayouts;
            owner.deferLayouts = true;
            expanded = multi ? [] : me.getExpanded();
            expandedCount = expanded.length;

            // Collapse all other expanded child items (Won't loop if multi is true)
            for (i = 0; i < expandedCount; i++) {
                expanded[i].collapse();
            }

            if (moveToTop) {
                // Prevent extra layout when moving the item
                Ext.suspendLayouts();
                owner.insert(0, toExpand);
                Ext.resumeLayouts();
            }

            owner.deferLayouts = previousValue;
            me.processing = false;
        }
    },

    onComponentCollapse: function (comp) {
        var me = this,
            owner = me.owner,
            toExpand,
            expanded,
            previousValue;

        if (me.owner.items.getCount() === 1) {
            // do not allow collapse if there is only one item
            return false;
        }

        if (!me.processing) {
            me.processing = true;
            previousValue = owner.deferLayouts;
            owner.deferLayouts = true;
            toExpand = comp.next() || comp.prev();

            // If we are allowing multi, and the "toCollapse" component is NOT the only expanded Component,
            // then ask the box layout to collapse it to its header.
            if (me.multi) {
                expanded = me.getExpanded();

                // If the collapsing Panel is the only expanded one, expand the following Component.
                // All this is handling fill: true, so there must be at least one expanded,
                if (expanded.length === 1) {
                    toExpand.expand();
                }

            } else if (toExpand) {
                toExpand.expand();
            }
            owner.deferLayouts = previousValue;
            me.processing = false;
        }
    },

    onComponentShow: function (comp) {
        // Showing a Component means that you want to see it, so expand it.
        this.onComponentExpand(comp);
    },

    getExpanded: function (explicitCheck) {
        var items = this.owner.items.items,
            len = items.length,
            i = 0,
            out = [],
            add,
            item;

        for (; i < len; ++i) {
            item = items[i];
            if (explicitCheck) {
                add = item.hasOwnProperty('collapsed') && item.collapsed === false;
            } else {
                add = !item.collapsed;
            }
            if (add) {
                out.push(item);
            }
        }
        return out;

    }
});

