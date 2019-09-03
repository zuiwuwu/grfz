Ext.define('App.Common.Iframe', {
    extend: 'Ext.Component',
    alias: ['widget.iframe', 'widget.iframecomponent'],
    autoEl: 'iframe',
    //baseCls: Ext.baseCSSPrefix + 'img',
    src: '',
    initComponent: function () {
        this.callParent();
    },

    getElConfig: function () {
        var me = this,
            config = me.callParent(),
            glyphFontFamily = Ext._glyphFontFamily,
            glyph = me.glyph,
            img, glyphParts;

        // It is sometimes helpful (like in a panel header icon) to have the img wrapped
        // by a div. If our autoEl is not 'img' then we just add an img child to the el.
        if (me.autoEl == 'iframe') {
            img = config;
        }else {
            config.cn = [img = {
                tag: 'iframe',
                id: me.id + '-iframe'
            }];
        }

        if (img) {
            if (me.imgCls) {
                img.cls = (img.cls ? img.cls + ' ' : '') + me.imgCls;
            }

            img.src = me.src || Ext.BLANK_IMAGE_URL;
        }
        return config;
    },

    onRender: function () {
        var me = this,
            el;

        me.callParent(arguments);

        el = me.el;
        me.imgEl = (me.autoEl == 'iframe') ? el : el.getById(me.id + '-iframe');
    },

    onDestroy: function () {
        Ext.destroy(this.imgEl);
        this.imgEl = null;
        this.callParent();
    },

    /**
    * Updates the {@link #src} of the image.
    * @param {String} src
    */
    setSrc: function (src) {
        var me = this,
            imgEl = me.imgEl;

        me.src = src;

        if (imgEl) {
            imgEl.dom.src = src || Ext.BLANK_IMAGE_URL;
        }
    }
});