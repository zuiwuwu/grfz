
Ext.define('App.SystemSetting.DevMng.pingBatchDlg', {
    extend: 'App.SystemSetting.DevMng.pingBaseDlg',
    initComponent: function () {


        this.showinfo = Ext.create('Ext.form.field.TextArea',
        {
            title: '消息',
            width: '100%',
            height: 80
        });

        this.startip = Ext.create('Ext.form.field.Text',
        {
            value: '192.168.1.1',
            vtype: 'IPAddress'
        });
        this.stopip = Ext.create('Ext.form.field.Text',
        {
            value: '192.168.1.254',
            vtype: 'IPAddress'
        });
        this.createBtn();

        this.tbar = ['开始地址', this.startip,
        '结束地址', this.stopip,
        '发送字节数', this.senddata,
        '等待时间', this.waittime,
        this.startbtn,
        this.stopbtn];

        this.sucip = Ext.create('App.Common.ImagePreview',
        {
            title: '正常IP',
            gridautoLoad: false,
            showBarPager: false,
            oldStyle: true,
            gridremoteSort: false,
            gridremoteFilter: false,
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
            name: 'ip',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'IP',
                flex: 1
            }
        }]
        });

        this.errorip = Ext.create('App.Common.ImagePreview',
        {
            title: '异常IP',
            gridautoLoad: false,
            showBarPager: false,
            oldStyle: true,
            gridremoteSort: false,
            gridremoteFilter: false,
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
            name: 'ip',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'IP',
                flex: 1
            }
        }]
    })
    this.tabs = Ext.create('Ext.tab.Panel', {
        flex: 1,
        width: '100%',
        items: [this.sucip, this.errorip]
    });
    this.items = [this.tabs,this.showinfo];


        this.callParent(arguments);
    },
    onMsgResult: function (result) {
        if (result.resultmsg) {
            for (var i = 0; i < result.resultmsg.length; i++) {
                if ('pingmsg' == result.resultmsg[i].msgtype)
                    this.insertText('目的地：' + result.resultmsg[i].data.ip + '：' + result.resultmsg[i].msg + '\r\n');
                else if ('pingitem' == result.resultmsg[i].msgtype) {
                    var rec = { errornum: result.resultmsg[i].errornum, sucnum: result.resultmsg[i].sucnum };
                    rec = Ext.apply(rec, result.resultmsg[i].data);
                    if (rec.errornum == 0)
                        this.sucip.store.add(this.sucip.store.createModel(rec));
                    else
                        this.errorip.store.add(this.errorip.store.createModel(rec));
                }

            }

        }
        if (result.finished) {
            this.stopPing();
            this.insertText('完成！');
        }
    },
    getValues: function () {
        var vstart = this.startip.getValue();
        var vstop = this.stopip.getValue();


        if (vstart == ''
        || !vstart
        || vstop == ''
        || !vstop)
            return;
        vstart = vstart.split('.');
        vstop = vstop.split('.');
        if (vstart.length != 4
        || vstop.length != 4)
            return;
        if (vstart[0] != vstop[0]
        || vstart[1] != vstop[1]
        || vstart[2] != vstop[2]) {
            alert('开始地址和结束地址不在一个网段内！');
            return;
        }

        var ips = [];
        for (var i1 = parseInt(vstart[0]); i1 <= parseInt(vstop[0]); i1++) {
            for (var i2 = parseInt(vstart[1]); i2 <= parseInt(vstop[1]); i2++) {
                for (var i3 = parseInt(vstart[2]); i3 <= parseInt(vstop[2]); i3++) {
                    for (var i4 = parseInt(vstart[3]); i4 <= parseInt(vstop[3]); i4++) {
                        ips.push({ ip: i1.toString() + '.' + i2.toString() + '.' + i3.toString() + '.' + i4.toString() });
                    }
                }
            }
        }
        return { ips: ips, sendsize: this.senddata.getValue(), pingcount: 3, timeout: this.waittime.getValue() };
    },
    startPing: function () {

        var vstart = this.startip.getValue();
        var vstop = this.stopip.getValue();


        if (vstart == ''
        || !vstart
        || vstop == ''
        || !vstop)
            return;
        vstart = vstart.split('.');
        vstop = vstop.split('.');
        if (vstart.length != 4
        || vstop.length != 4)
            return;
        if (vstart[0] != vstop[0]
        || vstart[1] != vstop[1]
        || vstart[2] != vstop[2]) {
            alert('开始地址和结束地址不在一个网段内！');
            return;
        }

        this.callParent(arguments);
    }
});
