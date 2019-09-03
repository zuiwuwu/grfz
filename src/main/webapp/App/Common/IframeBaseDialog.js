
//定义编辑对话框
Ext.define('App.Common.IframeBaseDialog', {
    extend: 'Ext.Panel',
    title: '对话框',
    layout: 'fit',
    //width: 400,
    //height: 400,
    padding: '0 0 0 0',
    closable: true,
    closeParams: null,
    bok: false,
    initComponent: function () {
        var vme = this;

        var vItem = this.items;
        this.items = [
                {
                    xtype: 'form',
                    layout: 'fit',
                    bodyPadding: 10,
                    border: 0,
                    items: vItem

                }];
        if (typeof this.buttons != 'undefined'
        && this.buttons.length > 0) {
            this.padding = '0 0 5 0';
        }

        this.callParent(arguments);
    },

    // @private
    onEsc: function (k, e) {
        e.stopEvent();
        this.close();
    },

    // @private
    afterRender: function () {
        var me = this,
            header = me.header,
            keyMap;

        me.callParent(arguments);

        if (me.closable) {
            keyMap = me.getKeyMap();
            keyMap.on(27, me.onEsc, me);
        } else {
            keyMap = me.keyMap;
        }
    },

    // @private
    doClose: function () {
        this.callParent(arguments);
        CloseDialog(this.bok, this.closeParams);
    },
    isValid: function () {
        var vme = this;
        var form = vme.down('form');
        return form.isValid();
    },
    getValues: function () {
        var vme = this;
        var form = vme.down('form');
        return form.getValues();
    }
});

