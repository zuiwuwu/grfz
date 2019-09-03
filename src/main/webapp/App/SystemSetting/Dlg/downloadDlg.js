//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.downloadDlg', {
    extend: 'Ext.window.Window',
    layout: 'anchor',
    modal: true,
    title: '正在下载文件',
    autoDestroy: true,
    bodyPadding: 10,
    urlStart: '../CLCXEX/StartDownloadPic',
    urlStop: '../CLCXEX/StopDownloadPic',
    urlKeepAlive: '../CLCXEX/GetDownloadPic',
    initComponent: function () {
        this.pro = Ext.create('Ext.ProgressBar', {
            width: 300
        });
        this.items = [this.pro];
        this.buttons = [
        {
            text: '取消',
            scope: this,
            handler: this.close
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.pro.wait({
            interval: 500, //bar will move fast!
            //duration: 50000,
            increment: 15,
            text: ''
        });
        this.startCreateWord();
    },
    onMsgResult: function (result) {
        if (result.resultmsg) {
            for (var i = 0; i < result.resultmsg.length; i++) {
                var msg = result.resultmsg[i];
                if ('msg' == msg.msgtype) {
                    this.pro.updateText(msg.msg);
                }
                else if ('failed' == msg.msgtype) {
                    this.pro.updateText(msg.msg);
                    this.stopCreateWord();
                    this.pro.clearTimer();
                    return;
                }
            }

        }
        if (result.finished) {
            this.stopCreateWord();
            this.pro.updateText('完成!');
            this.pro.clearTimer();
            Ext.saveframe.src = '/temp/downloadpictemp/' + result.filename;
            this.close();

        }
    },
    onGetMsg: function () {
        if (this.getmsging)
            return;
        this.getmsging = true;
        var me = this;
        this.getmsghandle = Ext.Ajax.request({
            url: this.urlKeepAlive,
            params: { id: this.workid },
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                this.getmsghandle = null;
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        this.getmsging = false;
                        this.onMsgResult(result);
                    }
                    else {
                        alert(result.msg);
                        this.getmsging = false;
                    }
                }
                else {
                    alert("网络错误！");
                    this.getmsging = false;
                }
            }
        });
    },
    startCreateWord: function () {
        if (this.pro)
            this.pro.updateProgress(0, '');
        this.stopCreateWord();
        var me = this;
        this.starthandle = Ext.Ajax.request({
            url: this.urlStart,
            params: { filter: Ext.JSON.encode(this.filters) },
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                this.starthandle = null;
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        me.workid = result.msg;
                        me.gettimerid = setInterval(function () {
                            me.onGetMsg();
                        },
                        1000);
                    }
                    else {
                        alert(result.msg);
                        this.close();
                    }
                }
                else {
                	this.close();
                    alert("网络错误！");
                }
            }
        });

    },
    stopCreateWord: function () {
        this.getmsging = false;
        if (this.gettimerid)
            clearInterval(this.gettimerid);
        this.gettimerid = null;
        if (this.workid) {
            Ext.Ajax.request({
                url: this.urlStop,
                params: { id: this.workid },
                method: 'post', //方法  
                callback: function (options, success, response) {
                }
            });
        }
        if (this.starthandle)
            Ext.Ajax.abort(this.starthandle);
        this.starthandle = null;
        if (this.getmsghandle)
            Ext.Ajax.abort(this.getmsghandle);
        this.getmsghandle = null;
        this.workid = null;
    },
    destroy: function () {
        this.stopCreateWord();
        this.callParent(arguments);
    }
});

