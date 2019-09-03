Ext.define('App.SystemSetting.TVWall.Monitor', {
    extend: 'Ext.container.Container',
    alias: 'widget.tvwallmonitor',
    baseCls: 'x-tvwallmonitor',
    focusOnToFront: true,
    layout: 'vbox',
    initComponent: function () {
        var me = this;
        this.addEvents('updatemonitorposition', 'updatemonitorsize');
        this.resizable =
        {
            listeners:
            {
                scope: this,
                resize: function (drag, width, height, e, eOpts) {
                    this.fireEvent('updatemonitorsize', this, width, height);
                }
            }
        };
        this.draggable = {
            constrain: false,
            trackOver: true,
            listeners:
            {
                scope: this,
                dragend: function (drag, e, eOpts) {
                    //if(this.dd.disabled)
                    //    this.dd.disabled = false;
                    //else
                    //    this.dd.disabled = true;
                    //this.enableResize(!this.isEnableResize());
                    this.fireEvent('updatemonitorposition', this);
                }
            }
        };

        this.enableModify = function (enable) {
            me.resizer.resizeTracker.disabled = !enable;
            me.dd.disabled = !enable;
            if (enable)
                me.addCls('x-cursor-dragme');
            else
                me.removeCls('x-cursor-dragme');
        };

        this.vCNM = Ext.create('Ext.Component', {
            html: this.CNM,
            width: '100%'
        });
        this.vMNM = Ext.create('Ext.Component', {
            html: this.MNM,
            width: '100%'
        });
        this.items = [
        this.vCNM,
        {
            xtype: 'component',
            flex: 1
        },
        this.vMNM];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        if (this.modifyMod)
            this.addCls('x-cursor-dragme');
        else
            this.removeCls('x-cursor-dragme');
    },
    initResizable: function (resizable) {
        this.callParent(arguments);
        if (this.resizer)
            this.resizer.resizeTracker.disabled = !this.modifyMod;
    },
    initDraggable: function () {
        this.callParent(arguments);
        if (this.dd)
            this.dd.disabled = !this.modifyMod;
    },
    onRender: function () {
        this.callParent(arguments);

        var btn = this.el;
        var btnListeners = {
            scope: this,
            mouseover: this.onMonitorMouseOver,
            mouseout: this.onMonitorMouseOut
        };
        this.mon(btn, btnListeners);
    },
    onMonitorMouseOver: function () {
        this.addCls('x-tvwallmonitor-seloverme');
    },
    onMonitorMouseOut: function () {
        this.removeCls('x-tvwallmonitor-seloverme');
    },
    setMonitorName: function (MNM, CNM) {
        this.vCNM.update(CNM);
        this.vMNM.update(MNM);
    }

});
