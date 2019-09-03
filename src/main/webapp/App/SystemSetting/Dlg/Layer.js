Ext.define('App.SystemSetting.Dlg.Layer', {
    extend: 'App.GIS.Layers.Layer',
    lng: 0,
    lat: 0,
    initComponent: function () {
        this.addEvents('positionchange','gpschange');
        this.callParent(arguments);
    },
    createTpl: function () {
        return new Ext.XTemplate(
                                     '<tpl for=".">',
                                    '<div class="' + this.itemCls + ' x-dw" title="名称：{NM:htmlEncode}" style="position: absolute; left: {x}px; top: {y}px;cursor:pointer;"></div>',
                                    '</tpl>'
                );
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    load: function () {
    },
    getFilter: function () {
        return [{ "property": "longitude", "value": this.baseMap.CenterX },
            { "property": "latitude", "value": this.baseMap.CenterY },
            { "property": "zoomlevel", "value": this.baseMap.zoomlevel}];
    },
    onSetJWD: function (data, lng, lat) {
        data.lng = lng;
        data.lat = lat;
        this.fireEvent('gpschange',data);
    },
    getSaveData: function (data) {
        return { ID: data.ID,
            lng: data.lng,
            lat: data.lat
        };
    },
    getData: function () {
        var data = [];
        var v;
        var item;
        if (!this.layerdata)
            return;
        var baseMap = this.baseMap;
        for (var i = 0; i < this.layerdata.length; i++) {
            item = this.layerdata[i];
            v = baseMap.LatLongToDisplay(item.lng, item.lat);
            item.x = v.X;
            item.y = v.Y;
            data.push(item);
        }
        return data;
    },
    onBeforeStart: function (e) {

        var me = this,
            target = e.getTarget();
        if (!(target && target.className.match(this.itemCls))) {
            return false;
        }
        if (!this.dragging) {
            //this.tracker.constrainTo = this.getConstrainRegion();
            return true;
        } else {
            this.dragging = false;
            return false;
        }
    },
    addData: function (bh, lng, lat, name) {
        if (!this.layerdata)
            this.layerdata = [];
        this.lng = lng;
        this.lat = lat;
        this.layerdata.push({ ID: bh, lng: lng, lat: lat, NM: name });

        //this.showDW();
    },
    onSaveDW: function (index) {
        var vme = this;
        this.gpslng = null;
        this.gpslat = null;
        if (!this.layerdata
        || index >= this.layerdata.length)
            return;
        var data = this.layerdata[index];
        this.lng = data.lng;
        this.lat = data.lat;

        this.fireEvent('positionchange', data);
    },
    setPosition: function (lng, lat) {
        this.lng = lng;
        this.lat = lat;
        var vme = this;
        if (!this.layerdata
        || 0 >= this.layerdata.length)
            return;
        var data = this.layerdata[0];
        data.lng = lng;
        data.lat = lat;
        this.showDW();
    }
});

