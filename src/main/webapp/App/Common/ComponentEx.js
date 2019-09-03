Ext.define('App.Common.ComponentEx', {
    extend: 'Ext.Component',
    tooltip: '',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    },
    getTipAttr: function () {
        return this.tooltipType == 'qtip' ? 'data-qtip' : 'title';
    },
    setTooltip: function (tooltip, initial) {
        var me = this;
        if (me.rendered) {
            if (!initial || !tooltip) {
                me.clearTip();
            }
            if (tooltip) {
                if (Ext.quickTipsActive && Ext.isObject(tooltip)) {
                    Ext.tip.QuickTipManager.register(Ext.apply({
                        target: me.el.id
                    },
                    tooltip));
                    me.tooltip = tooltip;
                } else {
                    me.el.dom.setAttribute(me.getTipAttr(), tooltip);
                }
            }
        } else {
            me.tooltip = tooltip;
        }
        return me;
    },
    clearTip: function () {
        var me = this,
            el = me.el;

        if (Ext.quickTipsActive && Ext.isObject(me.tooltip)) {
            Ext.tip.QuickTipManager.unregister(el);
        } else {
            el.dom.removeAttribute(me.getTipAttr());
        }
    },
    onRender: function () {
        var me = this;
        me.callParent(arguments);
        if (me.tooltip) {
            me.setTooltip(me.tooltip, true);
        }
    }
});