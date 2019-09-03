Ext.define('App.Common.SPAcorddion', {
    extend: 'Ext.container.Container',
    alias: 'widget.spacorddion',
    width: 281,
    layout: 'vbox',
    title: '',
    cls: Ext.baseCSSPrefix + 'sp-acorddion',
    enableCollaps: true,
    requires: ['App.Common.SPLayoutAcorddion'],
    multi: false,
    full: true,
    initComponent: function () {
        var vme = this;
        var vitems = this.items;

        this.arrayPanel = [];
        this.vbodyitems = [];
        if (vitems) {

            for (var i = 0; i < vitems.length; i++) {
                var item = vitems[i];
                vme.addItem(item, item.imgCls);
            }

            var expanditem = null;
            for (var i = 0; i < vme.arrayPanel.length; i++) {
                var item = vme.arrayPanel[i];
                if (!vme.multi
                && item.collapsed == false
                && expanditem) {
                    item.collapsed = true;
                }
                if (!item.collapsed) {
                    expanditem = item;
                }
            }
            if (!expanditem
            && vme.arrayPanel.length > 0) {
                vme.arrayPanel[0].collapsed = false;
            }
        }

        this.vbody = Ext.create('Ext.container.Container',
        {
            flex: 1,
            width: '100%',
            layout: {
                type: 'vbox',
                animate: false
            },
            items: vme.vbodyitems
        });
        this.items = [
        {
            xtype: 'component',
            width: '100%',
            height: 45,
            cls: Ext.baseCSSPrefix + 'sp-acorddion-header',
            html: this.title
        },
        this.vbody
        ];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        for (var i = 0; i < this.vbody.items.length; i++) {
            var item = this.vbody.items.getAt(i);
            if (item.panel
            && !item.panel.collapsed)
                item.setChecked(true);
        }
    },
    addItem: function (itempanel, imgCls) {
        var vme = this;
        if (!Ext.isString(imgCls)
        || imgCls == '') {
            imgCls = 'x-sp-acorddion-item-img1';
        }

        var expanditem = null;
        for (var i = 0; i < vme.arrayPanel.length; i++) {
            var item = vme.arrayPanel[i];
            if (!item.collapsed) {
                expanditem = item;
            }
        }

        if (!Ext.isString(itempanel.$className)) {
            itempanel = Ext.widget(Ext.apply(itempanel,
            {
                width: '100%',
                header: false
            }));
        }

        var vcls = Ext.baseCSSPrefix + 'sp-acorddion-item-last';
        if (vme.arrayPanel.length == 0) {
            vcls = Ext.baseCSSPrefix + 'sp-acorddion-item-first';
        }
        else if (vme.arrayPanel.length > 1) {
            vme.arrayPanel[vme.arrayPanel.length - 1].btnitem.setBtnCls(Ext.baseCSSPrefix + 'sp-acorddion-item');
        }

        var vitem = Ext.create('App.Common.SPAcorddionBtn', {
            width: '100%',
            height: 39,
            btnCls: vcls,
            text: itempanel.title,
            panel: itempanel,
            scope: this,
            handler: vme.onCollapsClick,
            baseCls: Ext.baseCSSPrefix + 'sp-acorddion-item-base',
            imgCls: imgCls
        });


        itempanel.btnitem = vitem;
        itempanel.width = '100%';
        itempanel.title = null;
        itempanel.collapsible = true;
        itempanel.header = false;


        if (!vme.multi
        && vme.full) {
            itempanel.flex = 1;
        }

        if (!vme.multi
           && expanditem) {
            itempanel.collapsed = true;
        }


        vme.arrayPanel.push(itempanel);
        if (vme.rendered) {
            vme.vbody.add(vitem);
            vme.vbody.add(itempanel);
            if (!itempanel.collapsed)
                vitem.setChecked(true);
        }
        else {
            vme.vbodyitems.push(vitem);
            vme.vbodyitems.push(itempanel);
        }
    },
    onCollapsClick: function (btn) {
        var vme = this;
        if (!vme.enableCollaps)
            return;
        if (!vme.multi) {
            for (var i = 0; i < vme.arrayPanel.length; i++) {
                var item = vme.arrayPanel[i];
                if (!item.collapsed
                && btn.panel != item) {
                    item.btnitem.setChecked(false);
                    item.collapse();
                }
            }
        }
        if (btn.panel.collapsed) {
            btn.panel.expand(false);
            btn.setChecked(true);
        }
        else {
            if (vme.multi) {
                btn.panel.collapse(Ext.Component.DIRECTION_TOP, false);
                btn.setChecked(false);
            }
        }
    }
});

