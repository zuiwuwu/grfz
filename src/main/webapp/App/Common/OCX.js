

function hasChromePlugin(name) {
    name = name.toLowerCase();
    for (var i = 0; i < navigator.plugins.length; i++) {
        var v = navigator.plugins[i].Version;
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true;
        }
    }
    return false;
}

function hasIEPlugin(name) {
    try {
        new ActiveXObject(name);
        return true;
    } catch (ex) {
        return false;
    }
}

Ext.define('App.Common.OCX', {
    extend: 'Ext.Component',
    alias: 'widget.OCX',
    CustomParam: '',
    DownLoad: '1',
    DownLoadCab: '',
    WebType: '',
    childEls: [
        'ocxEl'
    ],
    renderTpl: [
            '<tpl if="isIE">',
            '<object classid="clsid:56EC1743-CEED-41E5-8978-E9D9A7D12FC4" id="{id}-ocxEl" codebase="../download/download.cab#version=3,0,0,14" style="width:0px;height:0px;">',
            '<param name="ServerName" value="{ServerName}" />',
            '<param name="ServerPort" value="{ServerPort}" />',
            '<param name="DownLoadCab" value="{DownLoadCab}" />',
            '<param name="DownLoad" value="{DownLoad}" />',
            '<param name="UserName" value="{UserName}" />',
            '<param name="PassWord" value="{PassWord}" />',
            '<param name="WebType" value="{WebType}" />',
            '<param name="CustomParam" value="{CustomParam}" />',
            '<param name="OCXID" value="{id}-ocxEl" />',
            '<div class="error" style="display: block; "><p>检测到控件异常,请先安装最新版本控件。<a href="../download/setup.exe" target="_blank">立即下载安装</a><br></p><span>安装完控件后请重启浏览器</span></div>',
            '</object>',
            '<tpl else>',
            '<embed type="application/sunpanel-plugin" id="{id}-ocxEl" style="width:0px;height:0px;" ServerName="{ServerName}" ServerPort="{ServerPort}" DownLoadCab="{DownLoadCab}" DownLoad="{DownLoad}" UserName="{UserName}" PassWord="{PassWord}" WebType="{WebType}" CustomParam="{CustomParam}" OCXID="{id}-ocxEl" spocxevent="OnOCXCtrlMsg"/>',
            '</tpl>'

    ],
    initComponent: function () {
        var vme = this;
        this.ocxid = null;
        if (typeof this.ServerName == 'undefined') {
            this.ServerName = Ext.commonparams.MONITORSVR;
        }
        if (typeof this.ServerPort == 'undefined') {
            this.ServerPort = Ext.commonparams.MONITORSVRPORT;
        }
        if (Ext.commonparams.isDebug) {
            if (typeof this.UserName == 'undefined') {
                this.UserName = 'admin';
            }
            if (typeof this.PassWord == 'undefined') {
                this.PassWord = 'admin';
            }
        }
        else {
            if (typeof this.UserName == 'undefined') {
                this.UserName = 'token:' + Ext.commonparams.token;
            }
            if (typeof this.PassWord == 'undefined') {
                this.PassWord = '';
            }
        }



        this.addEvents(
            'OCXMsg'
        );
        this.changeSize = function () {
            if (vme.changingsize)
                return;
            vme.changingsize = true;
            var width = vme.getWidth(true);
            var height = vme.getHeight(true);
            var vocx = vme.ocxEl.dom;
            vme.ocxEl = vme.el.getById(vme.id + '-ocxEl');

            if (vme.ocxEl) {
                //vme.ocxEl.setSize(0, 0);
                vme.ocxEl.setSize(width, height);
            }
            //vme.CtrlCmd('cmd=SizeChange&width=' + width + '&height=' + height);
            vme.changingsize = false;
            //Ext.log(width + ',' + height);
            if (vme.ocxEl.getWidth(true) != width
            || vme.ocxEl.getHeight(true) != height) {
                setTimeout(function () {
                    vme.changeSize();
                },
                100);
            }
        };
        if (!this.listeners) {
            this.listeners = {};
        }
        Ext.apply(this.listeners, {
            resize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
                //vme.ocxEl.setSize(0, 0);
                setTimeout(function () {
                    vme.changeSize();
                },
                100);
            }
        });
        vme.callParent(arguments);
    },
    // inherit docs
    getActionEl: function () {
        return this.el;
    },

    // inherit docs
    getFocusEl: function () {
        return this.el;
    },
    beforeRender: function () {
        var me = this,
            autoEl = me.autoEl;
        me.callParent();
        this.ocxid = this.getId() + '-ocxEl';

        Ext.listOCXCtrlMsgfun[this.ocxid] = { pfun: this.onOCXMsg, scope: this };
        Ext.applyIf(me.renderData, me.getTemplateArgs());
    },

    // @private
    onRender: function () {
        var me = this;

        me.doc = Ext.getDoc();
        me.callParent(arguments);
        if (Ext.isChrome) {
            if (!me.ocxEl.dom
            || typeof me.ocxEl.dom.CtrlCmd == 'undefined') {
                me.update('<div class="error" style="display: block; "><p>检测到控件异常,请先安装最新版本控件。<a href="../download/setup.exe" target="_blank">立即下载安装</a><br></p><span>安装完控件后请重启浏览器</span></div>');
            }
        }
    },
    getTemplateArgs: function () {
        var me = this;

        //var vhasPlugin = false;
        //if (Ext.isChrome)
        //    vhasPlugin = hasChromePlugin('Sunpanel Chrome 插件');
        //else
        //    vhasPlugin = hasIEPlugin('MWEBUPDATE.MWebUpdateCtrl.1');
        var isIE = Ext.isIE;
        //         if (Ext.isChrome)
        //             isIE = false;
        //         else if (Ext.isFi)
        //             isIE = false;
        return {
            ServerName: me.ServerName,
            ServerPort: me.ServerPort,
            DownLoadCab: me.DownLoadCab,
            DownLoad: me.DownLoad,
            UserName: me.UserName,
            PassWord: me.PassWord,
            WebType: me.WebType,
            CustomParam: me.CustomParam,
            isIE: isIE
        };
    },
    onDestroy: function () {
        if (this.ocxid)
            delete Ext.listOCXCtrlMsgfun[this.ocxid];
        this.callParent(arguments);
    },
    CtrlCmd: function (cmd) {
        var vme = this;
        if (vme.ocxEl
        && vme.ocxEl.dom
        && typeof vme.ocxEl.dom.CtrlCmd != 'undefined') {
        }
        else {
            if (vme.el)
                vme.ocxEl = vme.el.getById(vme.id + '-ocxEl');
        }
        if (!vme.ocxEl) {
            return;
        }
        var vocx = vme.ocxEl.dom;
        if (!vocx)
            return;
        if (vocx
            && typeof vocx.CtrlCmd != 'undefined') {
            vme.returnmsg = null;
            vocx.CtrlCmd(cmd);
            var vmsg = vme.returnmsg;
            vme.returnmsg = null;
            return vmsg;
        }
        return null;
    },
    ShowCamera: function (globalid) {
        var vme = this;
        if (vme.ocxEl
        && vme.ocxEl.dom
        && typeof vme.ocxEl.dom.ShowCamera != 'undefined') {
        }
        else {
            vme.ocxEl = vme.el.getById(vme.id + '-ocxEl');
        }
        var vocx = vme.ocxEl.dom;
        if (!vocx)
            return;

        if (vocx
            && typeof vocx.ShowCamera != 'undefined') {
            vme.returnmsg = null;
            vocx.ShowCamera(globalid, '', 0);
            var vmsg = vme.returnmsg;
            vme.returnmsg = null;
            return vmsg;
        }
        return null;
    },
    onOCXMsg: function (msg) {
    	Ext.log(msg);
        var cmds = msg.split('&');
        var values = new Array();
        if (cmds.length < 0)
            return;
        for (i = 0; i < cmds.length; i++) {
            var v = cmds[i].split('=');
            if (v.length < 2) {
                continue;
            }
            values[v[0]] = decodeURIComponent(v[1]);
        }
        this.returnmsg = values;
        var vcmd = values["cmd"];
        if (vcmd == 'TimerMouseChange') {
            Ext.log(vcmd);
            if (Ext.mainapp)
                Ext.mainapp.onMouseChange();
            return;
        }
        else if (vcmd == 'isPlaybackFileIng') {
            Ext.log(vcmd);
            if (Ext.mainapp)
                Ext.mainapp.onMouseChange();
            return;
        }

        this.fireEvent('OCXMsg', vcmd, values, this, msg);
    },
    setParams: function (name, value) {
        var vme = this;
        if (vme.ocxEl
        && vme.ocxEl.dom) {
        }
        else {
            if (vme.el)
                vme.ocxEl = vme.el.getById(vme.id + '-ocxEl');
        }
        var vocx = vme.ocxEl.dom;
        if (!vocx)
            return;
        vocx[name] = value;
    }
});
