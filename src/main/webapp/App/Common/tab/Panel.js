Ext.define('App.Common.tab.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sptabpanel',
    alternateClassName: ['Ext.SPTabPanel'],

    tabCls: 'sptab-',

    requires: ['Ext.layout.container.Card', 'App.Common.tab.Bar'],

    /**
    * @cfg {"top"/"bottom"/"left"/"right"} tabPosition
    * The position where the tab strip should be rendered. Can be `top`, `bottom`,
    * `left` or `right`
    */
    tabPosition: 'top',

    /**
    * @cfg {String/Number} activeItem
    * Doesn't apply for {@link Ext.tab.Panel TabPanel}, use {@link #activeTab} instead.
    */

    /**
    * @cfg {String/Number/Ext.Component} activeTab
    * The tab to activate initially. Either an ID, index or the tab component itself.
    */

    /**
    * @cfg {Object} tabBar
    * Optional configuration object for the internal {@link Ext.tab.Bar}.
    * If present, this is passed straight through to the TabBar's constructor
    */

    /**
    * @cfg {Ext.enums.Layout/Object} layout
    * Optional configuration object for the internal {@link Ext.layout.container.Card card layout}.
    * If present, this is passed straight through to the layout's constructor
    */

    /**
    * @cfg {Boolean} removePanelHeader
    * True to instruct each Panel added to the TabContainer to not render its header element.
    * This is to ensure that the title of the panel does not appear twice.
    */
    removePanelHeader: true,

    /**
    * @cfg {Boolean} plain
    * True to not show the full background on the TabBar.
    */
    plain: false,

    /**
    * @cfg {String} [itemCls='x-tabpanel-child']
    * The class added to each child item of this TabPanel.
    */
    itemCls: Ext.baseCSSPrefix + 'tabpanel-child',

    /**
    * @cfg {Number} minTabWidth
    * The minimum width for a tab in the {@link #cfg-tabBar}.
    */
    minTabWidth: undefined,

    /**
    * @cfg {Number} maxTabWidth The maximum width for each tab.
    */
    maxTabWidth: undefined,

    /**
    * @cfg {Boolean} deferredRender
    *
    * True by default to defer the rendering of child {@link Ext.container.Container#cfg-items items} to the browsers DOM
    * until a tab is activated. False will render all contained {@link Ext.container.Container#cfg-items items} as soon as
    * the {@link Ext.layout.container.Card layout} is rendered. If there is a significant amount of content or a lot of
    * heavy controls being rendered into panels that are not displayed by default, setting this to true might improve
    * performance.
    *
    * The deferredRender property is internally passed to the layout manager for TabPanels ({@link
    * Ext.layout.container.Card}) as its {@link Ext.layout.container.Card#deferredRender} configuration value.
    *
    * **Note**: leaving deferredRender as true means that the content within an unactivated tab will not be available
    */
    deferredRender: true,

    //inherit docs
    initComponent: function () {
        var me = this,
            dockedItems = [].concat(me.dockedItems || []),
            activeTab = me.activeTab || (me.activeTab = 0),
            tabPosition = me.tabPosition;

        // Configure the layout with our deferredRender, and with our activeTeb
        me.layout = new Ext.layout.container.Card(Ext.apply({
            owner: me,
            deferredRender: me.deferredRender,
            itemCls: me.itemCls,
            activeItem: activeTab
        }, me.layout));

        /**
        * @property {Ext.tab.Bar} tabBar Internal reference to the docked TabBar
        */
        me.tabBar = new App.Common.tab.Bar(Ext.apply({
            ui: me.ui,
            dock: me.tabPosition,
            orientation: (tabPosition == 'top' || tabPosition == 'bottom') ? 'horizontal' : 'vertical',
            plain: me.plain,
            cardLayout: me.layout,
            tabPanel: me,
            tabCls: me.tabCls
        }, me.tabBar));

        dockedItems.push(me.tabBar);
        me.dockedItems = dockedItems;

        me.addEvents(
        /**
        * @event
        * Fires before a tab change (activated by {@link #setActiveTab}). Return false in any listener to cancel
        * the tabchange
        * @param {Ext.tab.Panel} tabPanel The TabPanel
        * @param {Ext.Component} newCard The card that is about to be activated
        * @param {Ext.Component} oldCard The card that is currently active
        */
            'beforetabchange',

        /**
        * @event
        * Fires when a new tab has been activated (activated by {@link #setActiveTab}).
        * @param {Ext.tab.Panel} tabPanel The TabPanel
        * @param {Ext.Component} newCard The newly activated item
        * @param {Ext.Component} oldCard The previously active item
        */
            'tabchange'
        );

        me.callParent(arguments);

        // We have to convert the numeric index/string ID config into its component reference
        activeTab = me.activeTab = me.getComponent(activeTab);

        // Ensure that the active child's tab is rendered in the active UI state
        if (activeTab) {
            me.tabBar.setActiveTab(activeTab.tab, true);
        }
    },

    /**
    * Makes the given card active. Makes it the visible card in the TabPanel's CardLayout and highlights the Tab.
    * @param {String/Number/Ext.Component} card The card to make active. Either an ID, index or the component itself.
    * @return {Ext.Component} The resulting active child Component. The call may have been vetoed, or otherwise
    * modified by an event listener.
    */
    setActiveTab: function (card) {
        var me = this,
            previous;

        card = me.getComponent(card);
        if (card) {
            previous = me.getActiveTab();

            if (previous !== card && me.fireEvent('beforetabchange', me, card, previous) === false) {
                return false;
            }

            // We may be passed a config object, so add it.
            // Without doing a layout!
            if (!card.isComponent) {
                Ext.suspendLayouts();
                card = me.add(card);
                Ext.resumeLayouts();
            }

            // MUST set the activeTab first so that the machinery which listens for show doesn't
            // think that the show is "driving" the activation and attempt to recurse into here.
            me.activeTab = card;

            // Attempt to switch to the requested card. Suspend layouts because if that was successful
            // we have to also update the active tab in the tab bar which is another layout operation
            // and we must coalesce them.
            Ext.suspendLayouts();
            me.layout.setActiveItem(card);

            // Read the result of the card layout. Events dear boy, events!
            card = me.activeTab = me.layout.getActiveItem();

            // Card switch was not vetoed by an event listener
            if (card && card !== previous) {

                // Update the active tab in the tab bar and resume layouts.
                me.tabBar.setActiveTab(card.tab);
                Ext.resumeLayouts(true);

                // previous will be undefined or this.activeTab at instantiation
                if (previous !== card) {
                    me.fireEvent('tabchange', me, card, previous);
                }
            }
            // Card switch was vetoed by an event listener. Resume layouts (Nothing should have changed on a veto).
            else {
                Ext.resumeLayouts(true);
            }
            return card;
        }
    },

    /**
    * Returns the item that is currently active inside this TabPanel.
    * @return {Ext.Component} The currently active item.
    */
    getActiveTab: function () {
        var me = this,
        // Ensure the calculated result references a Component
            result = me.getComponent(me.activeTab);

        // Sanitize the result in case the active tab is no longer there.
        if (result && me.items.indexOf(result) != -1) {
            me.activeTab = result;
        } else {
            me.activeTab = null;
        }

        return me.activeTab;
    },

    /**
    * Returns the {@link Ext.tab.Bar} currently used in this TabPanel
    * @return {Ext.tab.Bar} The TabBar
    */
    getTabBar: function () {
        return this.tabBar;
    },

    /**
    * @protected
    * Makes sure we have a Tab for each item added to the TabPanel
    */
    onAdd: function (item, index) {
        var me = this,
            cfg = item.tabConfig || {},
            defaultConfig = {
                xtype: 'sptab',
                ui: me.tabBar.ui,
                card: item,
                disabled: item.disabled,
                closable: item.closable,
                hidden: item.hidden && !item.hiddenByLayout, // only hide if it wasn't hidden by the layout itself
                tooltip: item.tooltip,
                tabBar: me.tabBar,
                position: me.tabPosition,
                closeText: item.closeText,
                tabCls: me.tabCls
            };

        cfg = Ext.applyIf(cfg, defaultConfig);

        // Create the correspondiong tab in the tab bar
        item.tab = me.tabBar.insert(index, cfg);

        item.on({
            scope: me,
            enable: me.onItemEnable,
            disable: me.onItemDisable,
            beforeshow: me.onItemBeforeShow,
            iconchange: me.onItemIconChange,
            iconclschange: me.onItemIconClsChange,
            titlechange: me.onItemTitleChange,
            close: me.onItemClose
        });

        if (item.isPanel) {
            if (me.removePanelHeader) {
                if (item.rendered) {
                    if (item.header) {
                        item.header.hide();
                    }
                } else {
                    item.header = false;
                }
            }
            if (item.isPanel && me.border) {
                item.setBorder(false);
            }
        }
    },

    /**
    * @private
    * Enable corresponding tab when item is enabled.
    */
    onItemEnable: function (item) {
        item.tab.enable();
    },

    /**
    * @private
    * Disable corresponding tab when item is enabled.
    */
    onItemDisable: function (item) {
        item.tab.disable();
    },

    /**
    * @private
    * Sets activeTab before item is shown.
    */
    onItemBeforeShow: function (item) {
        if (item !== this.activeTab) {
            this.setActiveTab(item);
            return false;
        }
    },

    /**
    * @private
    * Update the tab icon when panel icon has been set or changed.
    */
    onItemIconChange: function (item, newIcon) {
        item.tab.setIcon(newIcon);
    },

    /**
    * @private
    * Update the tab iconCls when panel iconCls has been set or changed.
    */
    onItemIconClsChange: function (item, newIconCls) {
        item.tab.setIconCls(newIconCls);
    },

    /**
    * @private
    * Update the tab title when panel title has been set or changed.
    */
    onItemTitleChange: function (item, newTitle) {
        item.tab.setText(newTitle);
    },

    onItemClose: function (item) {
        //alert('');
    },

    /**
    * @private
    * Unlink the removed child item from its (@link Ext.tab.Tab Tab}.
    * 
    * If we're removing the currently active tab, activate the nearest one. The item is removed when we call super,
    * so we can do preprocessing before then to find the card's index
    */
    doRemove: function (item, autoDestroy) {
        var me = this,
            toActivate;

        // Destroying, or removing the last item, nothing to activate
        if (me.destroying || me.items.getCount() == 1) {
            me.activeTab = null;
        }

        // Ask the TabBar which tab to activate next.
        // Set the active child panel using the index of that tab
        else if ((toActivate = me.tabBar.items.indexOf(me.tabBar.findNextActivatable(item.tab))) !== -1) {
            me.setActiveTab(toActivate);
        }
        this.callParent(arguments);

        // Remove the two references
        delete item.tab.card;
        delete item.tab;
    },

    /**
    * @private
    * Makes sure we remove the corresponding Tab when an item is removed
    */
    onRemove: function (item, destroying) {
        var me = this;

        item.un({
            scope: me,
            enable: me.onItemEnable,
            disable: me.onItemDisable,
            beforeshow: me.onItemBeforeShow
        });
        if (!me.destroying && item.tab.ownerCt === me.tabBar) {
            me.tabBar.remove(item.tab);
        }
    }
});
