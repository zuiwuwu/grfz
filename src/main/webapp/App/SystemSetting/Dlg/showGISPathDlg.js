//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.showGISPathDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '设置经纬度',
    width: 900,
    height: 600,
    initComponent: function () {
        var me = this;
        this.map = Ext.create('App.GIS.Main', {

        });
        this.items = [this.map];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        if (this.pathdata
        && this.pathdata.length > 0) {
            var minlng = this.pathdata[0].lng;
            var minlat = this.pathdata[0].lat;
            var maxlng = this.pathdata[0].lng;
            var maxlat = this.pathdata[0].lat;
            for (var i = 0; i < this.pathdata.length; i++) {
                minlng = Math.min(minlng, this.pathdata[i].lng);
                minlat = Math.min(minlat, this.pathdata[i].lat);
                maxlng = Math.max(maxlng, this.pathdata[i].lng);
                maxlat = Math.max(maxlat, this.pathdata[i].lat);
            }
            this.map.panTo((minlng + maxlng) / 2, (minlat + maxlat) / 2);
        }

        if (this.pathdata) {
            var pts = [];
            for (var i = 0; i < this.pathdata.length; i++) {
                var rec = this.pathdata[i];
                this.map.addMarker({ longitude: rec.lng, latitude: rec.lat },
                    rec.name,
                    {
                        centerx: 8,
                        centery: 16,
                        iconSrc: '../images/map/dw/trouble.png',
                        iconHoverSrc: '../images/map/dw/hover.png',
                        text: rec.text
                    });
                    pts.push({ longitude: rec.lng, latitude: rec.lat });
            }

                this.map.addPointTrack(pts,
                {
                    lineColor: 'blue',
                    getshortpath: false, //是否计算最短路径
                    trackImg: {
                        src: "../images/map/trackcar.png",
                        centerx: 8,
                        centery: 16,
                        width: 48,
                        height: 23
                    }
                });
        }



    }
});


