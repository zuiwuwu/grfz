//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.setPositionDlg', {
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

        this.editlng = Ext.create('Ext.form.field.Number',
        {
            maxValue: 180,
            minValue: -180,
            decimalPrecision: 6
        });
        this.editlat = Ext.create('Ext.form.field.Number',
        {
            maxValue: 90,
            minValue: -90,
            decimalPrecision: 6
        });
        this.tbar = ['经度：',
        this.editlng,
        '纬度：',
        this.editlat,
        {
            xtype: 'button',
            text: '设置',
            tooltip: '设置',
            //iconCls: 'icon-find',
            scope: this,
            handler: function () {
                var me = this;
                if (this.editlng.getValue()
                && this.editlat.getValue()) {
                    Ext.Ajax.request({
                        url: '../GIS/EarthToMars',
                        method: 'post', //方法  
                        params: { x: this.editlng.getValue(), y: this.editlat.getValue() },
                        callback: function (options, success, response) {
                            if (success) {
                                var v = Ext.JSON.decode(response.responseText);
                                me.layer.setPosition(v[0].lng, v[0].lat);
                                me.map.panTo(v[0].lng, v[0].lat);
                            }
                            else {
                                Ext.MessageBox.alert('提示', '失败！');
                            }
                        }
                    });

                }
            }
        }
        ];
        this.addEvents('saveok');
        this.buttons = [
                {
                    text: '确定',
                    action: 'save',
                    scope: this,
                    handler: this.onSave
                },
                {
                    text: '取消',
                    scope: this,
                    handler: function () {
                        //this.fireEvent('close', this);
                        this.close();
                    }
                }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.layer = this.map.addLayer('App.SystemSetting.Dlg.Layer', {
            width: 0,
            height: 0,
            urlSave: this.url,
            style:
            {
                position: "absolute"
            },
            listeners:
            {
                scope: this,
                gpschange: function (data) {
                    Ext.Ajax.request({
                        url: '../GIS/MarsToEarth',
                        method: 'post', //方法  
                        params: { x: data.lng, y: data.lat },
                        scope: this,
                        callback: function (options, success, response) {
                            if (success) {

                                var v = Ext.JSON.decode(response.responseText);
                                this.editlng.setValue(v[0].lng);
                                this.editlat.setValue(v[0].lat);
                            }
                            else {
                                Ext.MessageBox.alert('提示', '失败！');
                            }
                        }
                    });
                }
            }
        });

    if (this.isgpsmessure) {
        this.editlng.setValue(this.lng);
        this.editlat.setValue(this.lat);

            this.lng = this.lng || this.map.CenterX;
            this.lat = this.lat || this.map.CenterY;


            Ext.Ajax.request({
                url: '../GIS/EarthToMars',
                method: 'post', //方法  
                params: { x: this.lng, y: this.lat },
                scope: this,
                callback: function (options, success, response) {
                    if (success) {

                        var v = Ext.JSON.decode(response.responseText);

                        this.lng = v[0].lng;
                        this.lat = v[0].lat;
                        this.layer.addData(this.bh,
                            this.lng,
                            this.lat,
                            this.mc);

                        this.map.panTo(this.lng, this.lat);
                    }
                    else {
                        Ext.MessageBox.alert('提示', '失败！');
                    }
                }
            });
        }
        else {
            this.lng = this.lng || this.map.CenterX;
            this.lat = this.lat || this.map.CenterY;
            this.layer.addData(this.bh,
        this.lng,
        this.lat,
        this.mc);
            if (this.lng
    && this.lat)
                this.map.panTo(this.lng, this.lat);

            Ext.Ajax.request({
                url: '../GIS/MarsToEarth',
                method: 'post', //方法  
                params: { x: this.lng, y: this.lat },
                scope: this,
                callback: function (options, success, response) {
                    if (success) {

                        var v = Ext.JSON.decode(response.responseText);
                        this.editlng.setValue(v[0].lng);
                        this.editlat.setValue(v[0].lat);
                    }
                    else {
                        Ext.MessageBox.alert('提示', '失败！');
                    }
                }
            });
        }



    },
    onSave: function () {
        var vme = this;
        if (vme.url) {
            var myMask = new Ext.LoadMask(vme, { msg: "正在保存，请稍候！" });
            myMask.show();
            var params = { ID: this.bh, lng: this.editlng.getValue(), lat: this.editlat.getValue(), zblx: "gps" };

            Ext.Ajax.request({
                url: vme.url, //请求地址  
                params: params,
                method: 'post', //方法  
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.success) {
                            vme.close();

                        }
                        else {
                            alert(result.msg);
                        }
                    }
                    else {
                        alert("网络错误！");
                    }
                }
            });
        }
        else {
            var params = { ID: this.bh, lng: this.editlng.getValue(), lat: this.editlat.getValue(), zblx: "gps" };
            vme.fireEvent('saveok', params);
            vme.close();
        }

    }
});


