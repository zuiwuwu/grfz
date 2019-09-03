//小图按钮定义
Ext.define('App.Common.ImageButtonEx', {
    extend: 'Ext.Component',
    alias: 'widget.imagebuttonex',
    btnCls: Ext.baseCSSPrefix + 'spbtn',
    checked: false,
    enable: true,
    menuActiveCls: '',
    overCls: Ext.baseCSSPrefix + 'imagebuttonhover',
    text: null,
    renderTpl: ['<tpl if="text">',
                '<a class="{textCls}">',
                '{text}',
                '</a>',
                '</tpl>'],
    initComponent: function () {
        var vme = this;
        if (vme.menu) {
            // retrieve menu by id or instantiate instance if needed
            vme.menu = Ext.menu.Manager.get(vme.menu);

            // Use ownerButton as the upward link. Menus *must have no ownerCt* - they are global floaters.
            // Upward navigation is done using the up() method.
            vme.menu.ownerButton = vme;
        }
        vme.hasImage = {};
        vme.setBtnCls(this.btnCls);

        vme.callParent(arguments);
    },
    beforeRender: function () {
        var me = this;
        me.callParent();
        var cls = me.textCls;
        if (me.checked) {
            cls += ' ' + me.hasImage.checked;
        }
        Ext.applyIf(me.renderData, { text: me.text, textCls: cls });
    },
    afterRender: function () {
        var me = this;
        if (me.html) {
            me.update(me.html);
        }
        me.callParent(arguments);
    },
    onRender: function () {
        this.callParent(arguments);

        if (this.checked) {
            this.addCls(this.hasImage.checked);
        }
        var btn = this.el;
        var btnListeners = {
            scope: this,
            mouseout: this.onMouseOut,
            mousedown: this.onMouseDown,
            mouseup: this.onMouseUp,
            mouseover: this.onMouseOver,
            click: this.onMouseClick
        };
        this.mon(btn, btnListeners);


        if (this.tooltip) {
            this.setTooltip(this.tooltip, true);
        }

        var me = this;
        if (me.menu) {
            me.mon(me.menu, {
                scope: me,
                show: me.onMenuShow,
                hide: me.onMenuHide
            });

            me.keyMap = new Ext.util.KeyMap({
                target: me.el,
                key: Ext.EventObject.DOWN,
                handler: me.onDownKey,
                scope: me
            });
        }

    },
    // @private
    onMenuShow: function (e) {
        var me = this;
        me.addClsWithUI(me.menuActiveCls);
    },

    // @private
    onMenuHide: function (e) {
        var me = this;
        me.removeClsWithUI(me.menuActiveCls);
        me.focus();
    },
    onMouseOver: function () {
        var vme = this;
        if (!vme.enable) {
            return;
        }
        var vcls = this.checked ? this.hasImage.checkedhover : this.hasImage.hover;
        if (!this.hasCls(vcls)) {
            this.addCls(vcls);
        }
        if (this.mouserOverHandler) {
            if (this.scope)
                this.mouserOverHandler.call(this.scope, this);
            else
                this.mouserOverHandler.call(this, this);
        }
    },
    onMouseOut: function () {

        var vme = this;
        if (!vme.enable)
            return;
        if (this.hasCls(this.hasImage.checkedhover)) {
            this.removeCls(this.hasImage.checkedhover);
        }
        if (this.hasCls(this.hasImage.hover)) {
            this.removeCls(this.hasImage.hover);
        }
        if (this.mouserOutHandler) {
            if (this.scope)
                this.mouserOutHandler.call(this.scope, this);
            else
                this.mouserOutHandler.call(this, this);
        }
    },
    onMouseDown: function () {
        var vme = this;
        if (!vme.enable)
            return;
        var vcls = this.checked ? this.hasImage.checkeddown : this.hasImage.down;
        if (!this.hasCls(vcls)) {
            this.addCls(vcls);
        }
    },
    onMouseUp: function () {
        var vme = this;
        if (!vme.enable)
            return;
        if (this.hasCls(this.hasImage.checkeddown)) {
            this.removeCls(this.hasImage.checkeddown);
        }
        if (this.hasCls(this.hasImage.down)) {
            this.removeCls(this.hasImage.down);
        }
    },
    onMouseClick: function (e, eOpts) {
        //this.fireEvent('btnclick', this);
        var me = this;
        me.maybeShowMenu();
        if (this.handler) {
            if (this.scope)
                this.handler.call(this.scope, e, eOpts);
            else
                this.handler.call(this, e, eOpts);
        }
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
    // @private
    clearTip: function () {
        var me = this,
            el = me.el;

        if (Ext.quickTipsActive && Ext.isObject(me.tooltip)) {
            Ext.tip.QuickTipManager.unregister(el);
        } else {
            el.dom.removeAttribute(me.getTipAttr());
        }
    },

    // @private
    beforeDestroy: function () {
        var me = this;
        if (me.rendered) {
            me.clearTip();
        }
        if (me.menu && me.destroyMenu !== false) {
            Ext.destroy(me.menu);
        }
        Ext.destroy(me.btnInnerEl, me.repeater);
        me.callParent();
    },

    // @private
    onDownKey: function (k, e) {
        var me = this;

        if (me.menu && !me.disabled) {
            me.showMenu();
            e.stopEvent();
            return false;
        }
    },
    showMenu: function (/* private */fromEvent) {
        var me = this,
            menu = me.menu;

        if (me.rendered) {
            if (me.tooltip && Ext.quickTipsActive && me.getTipAttr() != 'title') {
                Ext.tip.QuickTipManager.getQuickTip().cancelShow(me.el);
            }
            if (menu.isVisible()) {
                menu.hide();
            }

            if (!fromEvent || me.showEmptyMenu || menu.items.getCount() > 0) {
                menu.showBy(me.el, me.menuAlign);
            }
        }
        return me;
    },

    /**
    * Hides this button's menu (if it has one)
    */
    hideMenu: function () {
        if (this.hasVisibleMenu()) {
            this.menu.hide();
        }
        return this;
    },

    /**
    * Returns true if the button has a menu and it is visible
    * @return {Boolean}
    */
    hasVisibleMenu: function () {
        var menu = this.menu;
        return menu && menu.rendered && menu.isVisible();
    },
    maybeShowMenu: function () {
        var me = this;
        if (me.menu && !me.hasVisibleMenu()) {
            me.showMenu(true);
        }
    },
    setChecked: function (v) {
        var vme = this;
        vme.checked = v;
        if (vme.checked) {
            if (!this.hasCls(vme.hasImage.checked)) {
                this.addCls(vme.hasImage.checked);
            }
        }
        else {
            if (this.hasCls(vme.hasImage.checked)) {
                this.removeCls(vme.hasImage.checked);
            }
            if (this.hasCls(vme.hasImage.checkedhover)) {
                this.removeCls(vme.hasImage.checkedhover);
            }
        }
    },

    getChecked: function () {
        var vme = this;
        return vme.checked;
    },

    enableBtn: function (v) {
        var vme = this;
        vme.enable = v;
        if (vme.enable) {
            if (this.hasCls(vme.hasImage.checkeddisable)) {
                this.removeCls(vme.hasImage.checkeddisable);
            }
            if (this.hasCls(vme.hasImage.disable)) {
                this.removeCls(vme.hasImage.disable);
            }
        }
        else {
            if (vme.checked) {
                if (!this.hasCls(vme.hasImage.checkeddisable)) {
                    this.addCls(vme.hasImage.checkeddisable);
                }
            }
            else {
                if (!this.hasCls(vme.hasImage.disable)) {
                    this.addCls(vme.hasImage.disable);
                }
            }
        }
    },
    setBtnCls: function (cls) {
        var vme = this;
        this.btnCls = cls;
        var vhasImage = ['normal',
            'hover',
            'down',
            'disable',
            'checked',
            'checkedhover',
            'checkeddown',
            'checkeddisable'
            ];
        for (var i = 0; i < vhasImage.length; i++) {
            var vimage = this.btnCls;
            vimage = vimage + '-' + vhasImage[i];
            if (this.hasImage[vhasImage[i]]) {
                if (this.hasCls(this.hasImage[vhasImage[i]])) {
                    this.removeCls(this.hasImage[vhasImage[i]]);
                }
            }

            if (vhasImage[i] == 'normal')
                this.hasImage[vhasImage[i]] = this.btnCls;
            else
                this.hasImage[vhasImage[i]] = vimage;
        }

        this.cls = this.btnCls;
        if (vme.rendered) {
            vme.addCls(this.btnCls);
            vme.enableBtn(vme.enable);
            vme.setChecked(vme.checked);
        }
    },
    setText: function (text) {
        var me = this;
        me.text = text;
        if (me.rendered) {
            me.getEl().select("a").update(text);
        }

    }
});


