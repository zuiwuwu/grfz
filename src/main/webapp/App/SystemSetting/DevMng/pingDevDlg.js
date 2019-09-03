
Ext.define('App.SystemSetting.DevMng.pingDevDlg', {
    extend: 'App.SystemSetting.DevMng.pingBaseDlg',
    initComponent: function () {


        this.showinfo = Ext.create('Ext.form.field.TextArea',
        {
            title: '消息',
            width: '100%',
            height: 80
        });

        this.createBtn();

        this.tbar = ['发送字节数', this.senddata,
        '等待时间', this.waittime,
        this.startbtn,
        this.stopbtn];

        this.sucip = Ext.create('App.Common.ImagePreview',
        {
            title: '正常设备',
            gridautoLoad: false,
            showBarPager: false,
            gridremoteSort: false,
            gridremoteFilter: false,
            oldStyle: true,
            columns: [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 60
            }
        },
        {
            name: 'ID'
        },
        {
            name: 'ip',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'IP',
                width: 100
            }
        },
        {
            name: 'NAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("SBMXM"),
                width: 200
            }
        },
        {
            name: 'errornum',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '错误',
                width: 60
            }
        },
        {
            name: 'sucnum',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '成功',
                width: 60
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                minWidth: 80,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                items: [{
                    iconCls: 'icon-details',
                    tooltip: SPLanguage.getMessage("CHECK"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        var msg = rec.raw.msg;
                        if (msg) {
                            var v = '';
                            for (var i = 0; i < msg.length; i++) {
                                if (v != '')
                                    v += '<br>';
                                v += msg[i].msg;
                            }
                            Ext.MessageBox.alert('信息', v);
                        }
                    }
                }]
            }
        }]
        });

        this.errorip = Ext.create('App.Common.ImagePreview',
        {
            title: '异常设备',
            gridautoLoad: false,
            showBarPager: false,
            gridremoteSort: false,
            gridremoteFilter: false,
            oldStyle: true,
            columns: [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 60
            }
        },
        {
            name: 'ID'
        },
        {
            name: 'ip',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'IP',
                width: 100
            }
        },
        {
            name: 'NAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("SBMXM"),
                width: 200
            }
        },
        {
            name: 'errornum',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '错误',
                width: 60
            }
        },
        {
            name: 'sucnum',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '成功',
                width: 60
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                minWidth: 80,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                items: [{
                    iconCls: 'icon-details',
                    tooltip: SPLanguage.getMessage("CHECK"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        var msg = rec.raw.msg;
                        if (msg) {
                            var v = '';
                            for (var i = 0; i < msg.length; i++) {
                                if (v != '')
                                    v += '<br>';
                                v += msg[i].msg;
                            }
                            Ext.MessageBox.alert('信息', v);
                        }


                    }
                }]
            }
        }]
        })
        this.tabs = Ext.create('Ext.tab.Panel', {
            flex: 1,
            width: '100%',
            items: [this.sucip, this.errorip]
        });
        this.pro = Ext.create('Ext.ProgressBar',
        {
            width: '100%'
        });
        this.items = [this.pro, this.tabs, this.showinfo];
        this.finishedcount = 0;

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.getDev();
    },
    getDev: function () {
        var myMask = new Ext.LoadMask(this, { msg: "正在查询设备，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../DevMng/ListGroupDev', //请求地址  
            params: { filter: encodeURIComponent(Ext.encode(this.filters)), limit: 10000, page: 1, start: 1 },
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    if (!response.responseText
                    || response.responseText == '') {
                        alert("查询不到设备！");
                    }
                    else {
                        var result = Ext.JSON.decode(response.responseText);
                        this.ips = [];
                        for (var i = 0; i < result.rows.length; i++) {
                            var row = result.rows[i];
                            this.ips.push({ ip: row.ADDR, ID: row.DEVICEID, NAME: row.DEVICENAME });
                        }
                        this.finishedcount = 0;
                        this.pro.updateText('已Ping设备 0 （总共：' + this.ips.length + '）');
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    },
    onMsgResult: function (result) {
        if (result.resultmsg) {
            for (var i = 0; i < result.resultmsg.length; i++) {
                if ('pingmsg' == result.resultmsg[i].msgtype) {
                    if (!this.lastdevmsg)
                        this.lastdevmsg = [];
                    this.lastdevmsg.push({ msg: result.resultmsg[i].msg });
                    this.insertText('目的地：' + result.resultmsg[i].data.ip + '：' + result.resultmsg[i].msg + '\r\n');
                }
                else if ('pingitem' == result.resultmsg[i].msgtype) {
                    var rec = { errornum: result.resultmsg[i].errornum, sucnum: result.resultmsg[i].sucnum, msg: this.lastdevmsg };
                    rec = Ext.apply(rec, result.resultmsg[i].data);
                    if (rec.errornum == 0)
                        this.sucip.store.add(this.sucip.store.createModel(rec));
                    else
                        this.errorip.store.add(this.errorip.store.createModel(rec));
                    this.finishedcount++;
                    var n = 0;
                    if (this.ips.length != 0) {
                        n = this.finishedcount / this.ips.length;
                    }
                    this.pro.updateProgress(n, '已Ping设备 ' + this.finishedcount + ' （总共：' + this.ips.length + '）');
                    //this.pro.updateText('已Ping设备 ' + this.finishedcount + ' （总共：' + this.ips.length + '）');
                    this.lastdevmsg = [];
                    if (this.showinfo)
                        this.showinfo.setValue("");
                }

            }

        }
        if (result.finished) {
            this.stopPing();
            this.insertText('完成！');
        }
    },
    getValues: function () {
        return { ips: this.ips, sendsize: this.senddata.getValue(), pingcount: 3, timeout: this.waittime.getValue() };
    },
    startPing: function () {
        if (!this.ips
        || this.ips.length == 0)
            return;
        this.callParent(arguments);
    }
});
