Ext.define('App.Common.menu', {
	extend : 'Ext.panel.Panel',
	floating : true,
	ignoreParentClicks : false,
	isMenu : true,
	cls: 'x-menu',
	initComponent : function() {
		var me = this;
		
		Ext.menu.Manager.register(me);
		me.callParent(arguments);
	},
	getRefOwner : function() {
		return this.ownerButton
				|| this.callParent(arguments);
	},
	canActivateItem : function(item) {
		return item
				&& !item.isDisabled()
				&& item.isVisible()
				&& (item.canActivate || item.getXTypes().indexOf('menuitem') < 0);
	},
	deactivateActiveItem : function(andBlurFocusedItem) {
		var me = this, activeItem = me.activeItem, focusedItem = me.focusedItem;

		if (activeItem) {
			activeItem.deactivate();
			if (!activeItem.activated) {
				delete me.activeItem;
			}
		}

		// Blur the focused item if we are being asked to do that too
		// Only needed if we are being hidden - mouseout does not blur.
		if (focusedItem && andBlurFocusedItem) {
			focusedItem.blur();
			delete me.focusedItem;
		}
	},

	// @inheritdoc
	getFocusEl : function() {
		return this.focusedItem || this.el;
	},

	// @inheritdoc
	hide : function() {
		this.deactivateActiveItem(true);
		this.callParent(arguments);
	},
	onDestroy : function() {
		var me = this;

		Ext.menu.Manager.unregister(me);
		me.ownerButton = null;
		if (me.rendered) {
			me.el.un(me.mouseMonitor);
		}
		me.callParent(arguments);
	},
	setActiveItem : function(item) {
		var me = this;

		if (item && (item != me.activeItem)) {
			me.deactivateActiveItem();
			if (me.canActivateItem(item)) {
				if (item.activate) {
					item.activate();
					if (item.activated) {
						me.activeItem = item;
						me.focusedItem = item;
						me.focus();
					}
				} else {
					item.focus();
					me.focusedItem = item;
				}
			}
			item.el.scrollIntoView(me.layout.getRenderTarget());
		}
	}
});
