//小图按钮定义
Ext.define('App.Common.ImageButton', {
    extend: 'Ext.Component',
    alias: 'widget.imagebutton',
    btnImage: '',
    hasImage: false,
    checked: false,
    enable: true,
    menuActiveCls: '',
    overCls: 'x-imagebuttonhover',
    initComponent: function () {
        var vme = this;
        //this.addEvents(
        //    'btnclick'
        //);

        if (vme.menu) {
            // retrieve menu by id or instantiate instance if needed
            vme.menu = Ext.menu.Manager.get(vme.menu);

            // Use ownerButton as the upward link. Menus *must have no ownerCt* - they are global floaters.
            // Upward navigation is done using the up() method.
            vme.menu.ownerButton = vme;
        }

        var vhasImage = this.hasImage;
        this.hasImage = {};
        if (vhasImage) {
            this.hasImage.normal = this.btnImage;
            for (var i = 0; i < vhasImage.length; i++) {
                if (Ext.isString(vhasImage[i])) {
                    var vimage = this.btnImage;
                    var nIndex = vimage.lastIndexOf('.');
                    if (nIndex != -1) {
                        vimage = vimage.substr(0, nIndex) + '_' + vhasImage[i] + vimage.substr(nIndex, vimage.length - nIndex);
                    }
                    this.hasImage[vhasImage[i]] = vimage;
                }
                else {
                    this.hasImage[vhasImage[i].name] = vhasImage[i];
                }
            }

            var vhover = this.hasImage.hover;
            if (!vhover) {
                vhover = this.hasImage.normal;
                this.hasImage.hover = vhover;
            }

            if (!this.hasImage.down) {
                this.hasImage.down = vhover;
            }

            if (!this.hasImage.disable) {
                this.hasImage.disable = this.hasImage.normal;
            }

            vhover = this.hasImage.checked;
            if (!vhover) {
                vhover = this.hasImage.down;
                this.hasImage.checked = vhover;
            }
            vhover = this.hasImage.checkedhover;
            if (!vhover) {
                vhover = this.hasImage.checked;
                this.hasImage.checkedhover = this.hasImage.checked;
            }

            if (!this.hasImage.checkeddown) {
                this.hasImage.checkeddown = vhover;
            }

            if (!this.hasImage.checkeddisable) {
                this.hasImage.checkeddisable = this.hasImage.disable;
            }
        }
        else {
            vhasImage = ['normal',
            'hover',
            'down',
            'disable',
            'checked',
            'checkedhover',
            'checkeddown',
            'checkeddisable'
            ];
            for (var i = 0; i < vhasImage.length; i++) {
                var vimage = this.btnImage;
                var nIndex = vimage.lastIndexOf('.');
                if (nIndex != -1) {
                    vimage = vimage.substr(0, nIndex) + '_' + vhasImage[i] + vimage.substr(nIndex, vimage.length - nIndex);
                }
                if (vhasImage[i] == 'normal')
                    this.hasImage[vhasImage[i]] = this.btnImage;
                else
                    this.hasImage[vhasImage[i]] = vimage;
            }
        }

        this.src = this.checked ? this.hasImage.checked : this.btnImage;

        


        this.callParent(arguments);
    },
    onRender: function () {
        this.callParent(arguments);
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

        this.setImage(this.hasImage.normal);

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
        if (!vme.enable)
            return;
        this.setImage(this.checked ? this.hasImage.checkedhover : this.hasImage.hover);
    },
    onMouseOut: function () {
        
        var vme = this;
        if (!vme.enable)
            return;
        this.setImage(this.checked ? this.hasImage.checked : this.hasImage.normal);
    },
    onMouseDown: function () {
        var vme = this;
        if (!vme.enable)
            return;
        this.setImage(this.checked ? this.hasImage.checkeddown : this.hasImage.down);
    },
    onMouseUp: function () {
        var vme = this;
        if (!vme.enable)
            return;
        this.setImage(this.checked ? this.hasImage.checkedhover : this.hasImage.hover);
    },
    onMouseClick: function () {
        //this.fireEvent('btnclick', this);
        var me = this;
        me.maybeShowMenu();
        if (this.handler) {
            if (this.scope)
                this.handler.call(this.scope, this);
            else
                this.handler.call(this, this);
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
    setImage: function (v) {
        var vme = this;
        if (Ext.isString(v)) {
            vme.el.setStyle("background-image", 'url(' + v + ')');
            if (vme.el)
                vme.el.setStyle("clip", '0px 0px');
        }
        else {
            vme.el.setStyle("background-image", 'url(' + v.src + ')');
            if (typeof v.position != 'undefined') {
                
                if (vme.el)
                    vme.el.setStyle("background-position", v.position.x + 'px ' + v.position.y + 'px');
            }
            else {
                if (vme.el)
                    vme.el.setStyle("background-position", '0px 0px');
            }
        }
    },

    setChecked: function (v) {
        var vme = this;
        vme.checked = v;
        vme.setImage(vme.checked ? vme.hasImage.checked : vme.hasImage.normal);
    },

    getChecked: function () {
        var vme = this;
        return vme.checked;
    },

    enableBtn: function (v) {
        var vme = this;
        vme.enable = v;
        if (vme.enable)
            vme.setImage(vme.checked ? vme.hasImage.checked : vme.hasImage.normal);
        else
            vme.setImage(vme.enable ? vme.hasImage.checkeddisable : vme.hasImage.disable);
    }
});


