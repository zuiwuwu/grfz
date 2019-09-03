Ext.define('App.SystemSetting.MediaGateWay.GB28181.SearchFile', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    lastGID: '',
    lastType: 0,
    gridautoLoad: true,
    url: '../GB28181/RecordInfo',
    initComponent: function () {
        var vme = this;
        this.MEDIAGATEWAYID = this.commonparams?this.commonparams.MEDIAGATEWAYID:null;
        this.DEVICEID = this.commonparams?this.commonparams.ID:null;
        this.url = '../GB28181/RecordInfo?id=' + this.MEDIAGATEWAYID;
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: '序号',
                width: 60
            }
        },
        {
            name: 'FilePath',
            type: 'string',
            gridcol: {
                header: '文件名',
                width: 300
            }
        },
        {
            name: 'StartTime',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '开始时间',
                width: 200,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    var dt = new Date(value);
                    return Ext.Date.format(dt, 'Y年m月d日 H:i:s');
                }
            }
        },
        {
            name: 'EndTime',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '结束时间',
                width: 200,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    var dt = new Date(value);
                    return Ext.Date.format(dt, 'Y年m月d日 H:i:s');
                }
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: '操作',
                //hidden: true,
                sortable: false,
                minWidth: 360,
                xtype: 'actioncolumn',
                flex: 1,
                items: [{
                    iconCls: 'icon-replay',
                    tooltip: '播放录像',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        var starttime = new Date(rec.get('StartTime'));
                        var stoptime = new Date(rec.get('EndTime'));

                        window.open("rtsp://" + window.location.hostname + "/playback/" + this.commonparams.ID + "?StartTime=" + Ext.Date.format(starttime, 'YmdHis') + "&StopTime=" + Ext.Date.format(stoptime, 'YmdHis'))
                        this.delChn();
                    }
                }]
            }
        }];

        var now = new Date();
        this.datetimeStartBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: 'Y年m月d日',
            value: new Date(now.getTime() - 24 * 60 * 60 * 1000)
        });

        this.datetimeEndBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: 'Y年m月d日',
            value: now
        });
        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        '开始时间：', this.datetimeStartBox, '结束时间：', this.datetimeEndBox,
         {
             xtype: 'button',
             text: '搜索',
             tooltip: '搜索',
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
         },
        {
            iconCls: 'icon-replay',
            text: '海康TCP查询',
            scope: this,
            handler: function () {
                var vstarttime = this.datetimeStartBox.getValue();
                if (Ext.isString(vstarttime))
                    vstarttime = new Date(vstarttime);
                vstarttime = Ext.Date.format(vstarttime, 'Ymd') + 'T' + Ext.Date.format(vstarttime, 'His') + 'Z';
                var vstoptime = this.datetimeEndBox.getValue();
                if (Ext.isString(vstoptime))
                    vstoptime = new Date(vstoptime);
                vstoptime = Ext.Date.format(vstoptime, 'Ymd') + 'T' + Ext.Date.format(vstoptime, 'His') + 'Z';
                var myMask = new Ext.LoadMask(vme, { msg: "正在删除设备，请稍候！" });
                myMask.show();
                Ext.Ajax.request({
                    url: '../GB28181/GetHIKPlaybackTCPUrl?id=' + this.MEDIAGATEWAYID, //查询案件详细信息
                    method: 'post', //方法  
                    params: { ID: this.DEVICEID, BeginTime: vstarttime, EndTime: vstoptime },
                    callback: function (options, success, response) {
                        myMask.hide();
                        if (success) {
                            var v = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert('提示', v.msg);
                        }
                        else {
                            Ext.MessageBox.alert('提示', '失败！');
                        }
                    }
                });
            }
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onSearch: function () {
        var vme = this;
        vme.store.clearFilter(true);
        var vstarttime = this.datetimeStartBox.getValue();
        if (Ext.isString(vstarttime))
            vstarttime = new Date(vstarttime);
        vstarttime = Ext.Date.format(vstarttime, 'YmdHis');
        var vstoptime = this.datetimeEndBox.getValue();
        if (Ext.isString(vstoptime))
            vstoptime = new Date(vstoptime);
        vstoptime = Ext.Date.format(vstoptime, 'YmdHis');
        vme.store.filter([{
            property: 'ID',
            value: this.DEVICEID
        },
        {
            property: 'BeginTime',
            value: vstarttime
        },
        {
            property: 'EndTime',
            value: vstoptime
        }]);
        vme.updateLayout();
    },
    onParamsChanged: function (params) {
        this.commonparams = params;
        this.onSearch();
    }
});
