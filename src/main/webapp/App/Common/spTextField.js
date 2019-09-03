Ext.define('App.Common.spTextField', {
    extend: 'Ext.form.field.Text',
    alias: ['widget.sptextfield'],
    dismissDelay: 10000,
    onRender: function () {
        this.callParent(arguments);
        if (this.tooltip) {
            if (Ext.isString(this.tooltip)) {
                this.tipwnd = new Ext.ToolTip({
                    target: this.id,
                    trackMouse: false,
                    draggable: false,
                    maxWidth: 300,
                    minWidth: 100,
                    dismissDelay: this.dismissDelay,
                    html: this.tooltip
                });
            }
            else {
                this.tipwnd = new Ext.ToolTip({
                    target: this.id,
                    trackMouse: false,
                    draggable: false,
                    maxWidth: 300,
                    minWidth: 100,
                    title: this.tooltip.title || '信息提示',
                    html: this.tooltip.text,
                    dismissDelay: this.dismissDelay
                });
            }
        }
    },
    // @private
    beforeDestroy: function () {
        var me = this;
        if (this.tipwnd) {
            Ext.destroy(this.tipwnd);
            this.tipwnd = null;
        }
        me.callParent();
    }
});
