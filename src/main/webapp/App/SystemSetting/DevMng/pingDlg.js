
Ext.define('App.SystemSetting.DevMng.pingDlg', {
    extend: 'App.SystemSetting.DevMng.pingBaseDlg',
    initComponent: function () {


        this.showinfo = Ext.create('Ext.form.field.TextArea',
        {
            width: '100%',
            flex: 1,
            readOnly: true
        });

        this.ip = Ext.create('Ext.form.field.Text',
        {
            value: this.IP,
            vtype: 'IPAddress'
        });

        this.createBtn();
        this.tbar = ['IP地址', this.ip,
        '发送字节数', this.senddata,
        '等待时间', this.waittime,
        this.startbtn,
        this.stopbtn];
        this.items = [this.showinfo];


        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.startPing();
    },
    onMsgResult: function (result) {
        if (result.resultmsg) {
            for (var i = 0; i < result.resultmsg.length; i++) {
                if ('pingmsg' == result.resultmsg[i].msgtype)
                    this.insertText(result.resultmsg[i].msg + '\r\n');
            }

        }
        if (result.finished) {
            this.stopPing();
        }
    },
    getValues: function () {
        return { ips: [{ ip: this.ip.getValue()}], sendsize: this.senddata.getValue(), timeout: this.waittime.getValue() };
    }
});
