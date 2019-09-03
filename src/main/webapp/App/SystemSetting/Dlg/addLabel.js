Ext.define('App.SystemSetting.Dlg.addLabel', {
    extend: 'App.GIS.basePointTool',
    initComponent: function () {
        var vme = this;
        this.items = [
        {
            xtype: 'component',
            x: -6,
            y: -21,
            width: 23,
            height: 21,
            cls: 'x-map-addcase'
        },
        {
            xtype: 'component',
            x: 0,
            y: 16,
            html: '点击左键标记案件位置，右键或ESC退出',
            cls: 'x-map-addcasetip'
        }
        ];
        this.callParent(arguments);
    },
    processEvent: function (e) {
        this.callParent(arguments);

        if (e.type === 'mousedown') {
            if (e.button == 2) {
                //鼠标右击
                this.baseMap.destroyCursorTool();
            }
        }
        else if (e.type === 'click') {
            var v = this.baseMap.DisplayToLatLong(e.getX() - this.baseMap.getX(), e.getY() - this.baseMap.getY());
            this.baseMap.addMarker(Ext.create('App.SystemSetting.Dlg.labelMarker', {
                lng: v.longitude,
                lat: v.latitude,
                baseMap: this.baseMap
            }));
            this.baseMap.destroyCursorTool();
        }

        return true;
    }
});
