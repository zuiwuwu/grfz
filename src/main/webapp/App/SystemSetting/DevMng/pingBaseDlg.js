
Ext.define('App.SystemSetting.DevMng.pingBaseDlg', {
    extend: 'Ext.window.Window',
    layout: 'vbox',
    modal: true,
    title: 'Ping',
    urlStart: '../DevMng/StartPing',
    urlStop: '../DevMng/StopPing',
    urlKeepAlive: '../DevMng/GetPingMsg',
    width: 800,
    height: 580,
    initComponent: function () {

        this.callParent(arguments);
    },
    createBtn: function () {
        this.senddata = Ext.create('Ext.form.field.Number',
        {
            value: 30,
            width: 80
        });
        this.waittime = Ext.create('Ext.form.field.Number',
        {
            value: 1,
            width: 80
        });

        this.startbtn = Ext.create('Ext.Button',
        {
            text: '启动',
            scope: this,
            handler: function () {
                this.startPing();
            }
        });
        this.stopbtn = Ext.create('Ext.Button',
        {
            text: SPLanguage.getMessage("STOP"),
            scope: this,
            disabled: true,
            handler: function () {
                this.stopPing();
            }
        });
    },
    insertText: function (text) {
        if (!this.showinfo)
            return;
        var textinfo = this.showinfo,
            v = textinfo.getRawValue(),
            el = textinfo.inputEl.dom,
            range;
        if (v.length > 0) {
            if (el.setRangeText) {
                el.setSelectionRange(v.length, v.length);
                el.setRangeText(text);
            }
            else if (el.createTextRange) {
                range = el.createTextRange();
                range.moveStart('character', v.length);
                range.moveEnd('character', 0);
                range.text = text;
            }
        }
        else {
            textinfo.setValue(text);
        }
    },
    moveToEnd: function () {
        var textinfo = this.showinfo,
            v = textinfo.getRawValue(),
            el = textinfo.inputEl.dom,
            range;

        if (v.length > 0) {
            if (el.setSelectionRange) {
                el.setSelectionRange(v.length, v.length);
            }
            else if (el.createTextRange) {
                range = el.createTextRange();
                range.moveStart('character', v.length);
                range.moveEnd('character', 0);
                range.select();
            }
        }
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    onMsgResult: function (result) {
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
                    alert(SPLanguage.getMessage("Net_Error"));
                    this.getmsging = false;
                }
            }
        });
    },
    getValues: function () {
        return {};
    },
    startPing: function () {
        if (this.pro)
            this.pro.updateProgress(0, '');
        if (this.showinfo)
            this.showinfo.setValue("");
        this.stopPing();
        this.startbtn.setDisabled(true);
        this.stopbtn.setDisabled(false);
        var me = this;
        this.starthandle = Ext.Ajax.request({
            url: this.urlStart,
            jsonData: this.getValues(),
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
                        this.startbtn.setDisabled(false);
                        this.stopbtn.setDisabled(true);
                        alert(result.msg);
                    }
                }
                else {
                    this.startbtn.setDisabled(false);
                    this.stopbtn.setDisabled(true);
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });

    },
    stopPing: function () {
        this.startbtn.setDisabled(false);
        this.stopbtn.setDisabled(true);
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
        this.stopPing();
        this.callParent(arguments);
    }
});
