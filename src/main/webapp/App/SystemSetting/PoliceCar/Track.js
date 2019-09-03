//警车历史轨迹显示
Ext.define('App.SystemSetting.PoliceCar.Track', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    width: 1000,
    height: 600,
    border: 0,
    modal: true,
    resizable: true,
    maximizable: true,
    atuogotopasseddw: true,
    url: '../CLCXEX/TrackSearch',
    title: '警车轨迹查询',
    initComponent: function () {
        var me = this;
        this.title = '警车（' + me.CLHP + '）轨迹查询';
        me.colindex = 0;
        me.map = Ext.create('App.GIS.Main', {
        });

        me.items = [
        me.map
        ];

        var now = new Date();
        now.setDate(now.getDate() - 1);
        me.startTime = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: 'Y年m月d日',
            value: now,
            width: 180
        });
        me.stopTime = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: 'Y年m月d日',
            value: new Date(),
            width: 180
        });
        this.tbar = ['开始时间',
        me.startTime,
         '结束时间',
        me.stopTime,
        '-',
        {
            iconCls: 'icon-find',
            xtype: 'button',
            tooltip: '查询警车轨迹',
            text: '查询',
            scope: this,
            handler: this.onSearch
        },
        '-',
        {
            iconCls: 'icon-play',
            xtype: 'button',
            tooltip: '开始模拟行走',
            text: '开始',
            scope: this,
            handler: function () {
                if (this.trackid)
                    this.map.getShapeObject(this.trackid).startTrack();
            }
        },
        {
            iconCls: 'icon-stop',
            xtype: 'button',
            tooltip: '停止模拟行走',
            text: '停止',
            scope: this,
            handler: function () {
                if (this.trackid)
                    this.map.getShapeObject(this.trackid).stopTrack();
            }
        },
        {
            iconCls: 'icon-pause',
            xtype: 'button',
            tooltip: '暂停模拟行走',
            text: '暂停',
            scope: this,
            handler: function () {
                if (this.trackid)
                    this.map.getShapeObject(this.trackid).pauseTrack();
            }
        },
        {
            iconCls: 'icon-slow',
            xtype: 'button',
            tooltip: '减速',
            text: '减速',
            scope: this,
            handler: function () {
                if (this.trackid) {

                    var v = this.map.getShapeObject(this.trackid);
                    if (v.runspeed > 1)
                        v.setTrackSpeed(v.runspeed / 2);
                }

            }
        },
        {
            iconCls: 'icon-fast',
            xtype: 'button',
            tooltip: '加速',
            text: '加速',
            scope: this,
            handler: function () {
                if (this.trackid) {

                    var v = this.map.getShapeObject(this.trackid);
                    if (v.runspeed < 100)
                        v.setTrackSpeed(v.runspeed * 2);
                }
            }
        }];

        me.statuText = Ext.create('Ext.toolbar.TextItem', {
            text: '无数据'
        });

        me.curText = Ext.create('Ext.toolbar.TextItem', {
            text: ''
        });

        me.curTime = Ext.create('Ext.toolbar.TextItem', {
            text: ''
        });
        this.bbar = [me.statuText, me.curTime, me.curText];
        me.callParent(arguments);
    },
    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    },
    onSearch: function () {
        if (this.trackid)
            this.map.clearShapeById(this.trackid);
        this.trackid = null;
        this.statuText.setText('无数据');
        this.curText.setText('');
        this.curTime.setText('');
        var myMask = new Ext.LoadMask(this, { msg: "正在查询，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../GISPoliceCar/GetHistoryTrack', //请求地址  
            params: {
                CLID: this.CLID,
                STARTTIME: this.startTime.getValue(),
                STOPTIME: this.stopTime.getValue()
            },
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.rows.length == 0) {
                        Ext.MessageBox.alert('提示', '无历史轨迹数据！');
                    }
                    else {
                        var vminlng = result.rows[0].lng,
                        vminlat = result.rows[0].lat,
                        vmaxlng = result.rows[0].lng,
                        vmaxlat = result.rows[0].lat,
                        vlatlng = result.rows[0].lng,
                        vlatlat = result.rows[0].lat,
                        vdistance = 0.0;
                        for (var i = 0; i < result.rows.length; i++) {
                            result.rows[i].longitude = result.rows[i].lng;
                            result.rows[i].latitude = result.rows[i].lat;

                            vdistance += this.map.map.distance(vlatlat, vlatlng, result.rows[i].lat, result.rows[i].lng);
                            vlatlng = result.rows[i].lng;
                            vlatlat = result.rows[i].lat;
                            vminlng = Math.min(vminlng, vlatlng);
                            vminlat = Math.min(vminlat, vlatlat);
                            vmaxlng = Math.max(vmaxlng, vlatlng);
                            vmaxlat = Math.max(vmaxlat, vlatlat);
                        }
                        this.map.panTo(vminlng + (vmaxlng - vminlng) / 2, vminlat + (vmaxlat - vminlat) / 2);
                        this.distance = vdistance;

                        this.statuText.setText('总行驶距离：' + vdistance.toFixed(4) + '公里');

                        var me = this;
                        this.trackid = this.map.addPointTrack(result.rows,
                        {
                            getshortpath: false,
                            onLoadData: function (line, obj) {
                                //showinfo.innerHTML = "轨迹加载完成";
                                //obj.startTrack();
                            },
                            onPassPoint: function (index, userpt, linept, obj) {
                                me.curTime.setText('  时间：' + userpt.GPSTIME);

                                //if (me.atuogotopasseddw)
                                //    map.panTo(userpt.longitude, userpt.latitude);
                            },
                            onRunPosition: function (pt, distance, obj) {
                                me.curText.setText('  当前行驶距离：' + distance.toFixed(4) + '公里');
                            }
                        });
                    }
                }
                else {
                    alert("网络错误！");
                }
            }
        });
    }
});

