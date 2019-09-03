Ext.define('App.SystemSetting.Dlg.showVideoDlg', {
    extend: 'Ext.window.Window',
    layout: 'border',
    modal: false,
    title: '显示视频',
    maximizable: true,
    //minimizable: true,
    width: 800,
    height: 500,
    requires: ['App.Common.ImageButtonEx'],
    initComponent: function () {
        var vme = this;
        this.videochn = [];
        this.showindex = 0;
        this.ptz = Ext.create('App.Common.PTZ.ControlPanel',
        {
            width: '100%',
            region: 'south',
            border: 0,
            split: true,
            collapsible: true,
            header: false,
            //collapsed: true,
            collapseMode: 'mini',
            maxHeight: 230,
            minHeight: 230,
            listeners: {
                scope: this,
                ptzcmdmsg: this.onPTZCmd
            }
        });

        this.chnlist = Ext.create('App.Common.ImagePreview',
        {
            gridautoLoad: false,
            showBarPager: false,
            oldStyle: true,
            hideHeaders: true,
            region: 'center',
            selType: 'rowmodel',
            border: 0,
            columns: [
            {
                name: 'GLOBALID',
                type: 'string'
            },
            {
                name: 'CHNNAME',
                type: 'string',
                gridcol: {
                    sortable: false,
                    header: '通道名',
                    flex: 1
                }
            }],
            listeners:
            {
                scope: this,
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    this.vocx.CtrlCmd('cmd=ShowChn&index=-1&chnid=' + record.get('GLOBALID') + '&stream=1');
                }
            }
        });
        this.vocx = Ext.create('App.Common.OCX', {
            width: 600,
            height: 400,
            DownLoad: '0',
            WebType: 'multview',
            CustomParam: 'SHOWTOOLBAR=0',
            listeners:
            {
                scope: this,
                OCXMsg: function (vcmd, values, vocx) {
                    if (vcmd == 'Logon') {
                        if (values['Logon'] == 'Success') {
                            this.onShowVideo();
                        }
                    }
                }
            }
        });

        this.autolooptime = Ext.create('Ext.form.field.Number',
        {
            width: 160,
            value: 15,
            hideLabel: false,
            fieldLabel: '轮巡时间（秒）',
            labelWidth: 90
        });
        this.items = [
        {
            xtype: 'panel',
            layout: 'fit',
            region: 'center',
            border: 0,
            items: [this.vocx],
            bbar: [{
                xtype: 'imagebuttonex',
                tooltip: '1分屏',
                btnCls: 'x-map-split1',
                scope: this,
                handler: function () {
                    this.vocx.CtrlCmd('cmd=SetViewNum&ViewNum=1&Row=1&Line=1');
                    this.detaultSplit = 1;
                }
            },
        {
            xtype: 'imagebuttonex',
            tooltip: '4分屏',
            btnCls: 'x-map-split4',
            scope: this,
            handler: function () {
                this.vocx.CtrlCmd('cmd=SetViewNum&ViewNum=4&Row=2&Line=2');
                this.detaultSplit = 4;
            }
        },
        {
            xtype: 'imagebuttonex',
            tooltip: '9分屏',
            btnCls: 'x-map-split9',
            scope: this,
            handler: function () {
                this.vocx.CtrlCmd('cmd=SetViewNum&ViewNum=9&Row=3&Line=3');
                this.detaultSplit = 9;
            }
        },
        {
            xtype: 'imagebuttonex',
            tooltip: '16分屏',
            btnCls: 'x-map-split16',
            scope: this,
            handler: function () {
                this.vocx.CtrlCmd('cmd=SetViewNum&ViewNum=16&Row=4&Line=4');
                this.detaultSplit = 16;
            }
        },
        {
            xtype: 'imagebuttonex',
            tooltip: '25分屏',
            btnCls: 'x-map-split25',
            scope: this,
            handler: function () {
                this.vocx.CtrlCmd('cmd=SetViewNum&ViewNum=25&Row=5&Line=5');
                this.detaultSplit = 25;
            }
        },
        {
            xtype: 'imagebuttonex',
            tooltip: '36分屏',
            btnCls: 'x-map-split36',
            scope: this,
            handler: function () {
                this.vocx.CtrlCmd('cmd=SetViewNum&ViewNum=36&Row=6&Line=6');
                this.detaultSplit = 36;
            }
        },
        '->',
        this.autolooptime,
        {
            text: '轮巡',
            scope: this,
            iconCls: 'icon-del',
            handler: function () {
                if (this.autolooptimerid) {
                    clearInterval(this.autolooptimerid);
                    this.autolooptimerid = null;
                }
                else {
                    this.autolooptimerid = setInterval(function () {
                        vme.showNext();
                    },
                    this.autolooptime.getValue() * 1000);
                }
            }
        },
        {
            text: '停止所有',
            scope: this,
            iconCls: 'icon-del',
            handler: function () {
                this.onStopAllChn();
            }
        }]
        }, {
            xtype: 'panel',
            layout: 'border',
            region: 'east',
            width: 228,
            maxWidth: 228,
            minWidth: 228,
            border: 0,
            split: true,
            collapsible: true,
            header: false,
            //collapsed: true,
            collapseMode: 'mini',
            height: '100%',
            items: [this.chnlist, this.ptz]
        }

        ];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.showVideo(this.url, this.showvideoparams);
        var me = this;
        if (this.autoloop) {
            if (!this.autolooptimerid) {
                this.autolooptimerid = setInterval(function () {
                    me.showNext();
                },
                    this.autolooptime.getValue() * 1000);
            }
        }

    },
    onShowVideo: function () {
        var v = this.videochn;
        var ViewNum = 1;
        var Row = 1;
        var Line = 1;
        if (this.detaultSplit) {
            if (this.detaultSplit <= 1) {
            }
            else if (this.detaultSplit <= 4) {
                ViewNum = 4;
                Row = 2;
                Line = 2;
            }
            else if (this.detaultSplit <= 9) {
                ViewNum = 9;
                Row = 3;
                Line = 3;
            }
            else if (this.detaultSplit <= 16) {
                ViewNum = 16;
                Row = 4;
                Line = 4;
            }
            else if (this.detaultSplit <= 25) {
                ViewNum = 25;
                Row = 5;
                Line = 5;
            }
            else if (this.detaultSplit <= 36) {
                ViewNum = 36;
                Row = 6;
                Line = 6;
            }
        }
        else {
            if (v.length <= 1) {
            }
            else if (v.length <= 4) {
                ViewNum = 4;
                Row = 2;
                Line = 2;
            }
            else if (v.length <= 9) {
                ViewNum = 9;
                Row = 3;
                Line = 3;
            }
            else if (v.length <= 16) {
                ViewNum = 16;
                Row = 4;
                Line = 4;
            }
            else if (v.length <= 25) {
                ViewNum = 25;
                Row = 5;
                Line = 5;
            }
            else if (v.length <= 36) {
                ViewNum = 36;
                Row = 6;
                Line = 6;
            }
        }




        this.vocx.CtrlCmd('cmd=SetViewNum&ViewNum=' + ViewNum + '&Row=' + Row + '&Line=' + Line);

        for (var i = 0; i < v.length; i++) {
            //alert('cmd=ShowChn&chnid=' + v[i].GLOBALID + '&stream=1' + '&index=' + i);
            if (this.detaultSplit
            && i >= this.detaultSplit)
                break;
            this.vocx.CtrlCmd('cmd=ShowChn&chnid=' + v[i].GLOBALID + '&stream=1' + '&index=' + i);
        }
        this.showindex = 0;
    },
    onStopAllChn: function () {
        for (var i = 0; i < 48; i++) {
            this.vocx.CtrlCmd('cmd=ShowChn&chnid=0&stream=1' + '&index=' + i);
        }
    },
    showNext: function () {
        if (!this.videochn)
            return;
        var vresult = this.vocx.CtrlCmd('cmd=GetViewNum');
        if(!vresult)
        	return ;
        this.detaultSplit = parseInt(vresult['viewnum']);
        this.showindex += this.detaultSplit;
        if (this.showindex >= this.videochn.length)
            this.showindex = 0;
        for (var i = this.showindex; i < this.videochn.length; i++) {
            if (this.detaultSplit
            && i - this.showindex >= this.detaultSplit)
                break;
            this.vocx.CtrlCmd('cmd=ShowChn&chnid=' + this.videochn[i].GLOBALID + '&stream=1' + '&index=' + (i - this.showindex));
        }
    },
    showVideo: function (url, params) {
        this.videochn = [];
        this.showvideoparams = params;
        this.url = url;
        this.onStopAllChn();
        this.chnlist.store.removeAll();
        Ext.Ajax.request({
            url: this.url, //请求地址  
            params: params,
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.rows) {
                        var v = [];
                        this.videochn = [];
                        for (var i = 0; i < result.rows.length; i++) {
                            if (result.rows[i].CHNTYPE <= 1000) {
                                v.push(result.rows[i]);
                            }
                        }
                        if (v.length == 0) {
                            return Ext.log('无视频通道！');
                        }
                        this.chnlist.store.loadData(v);
                        this.videochn = v;
                        this.onShowVideo();
                    }
                    else {
                        Ext.log(result.msg);
                    }
                }
                else {
                    Ext.log("网络错误！");
                }
            }
        });
    },
    onPTZCmd: function (cmd, down, speed) {
        if (!this.vocx)
            return;
        var vptzcmd = 'PTZ_STOP';
        var vptzparam = 0;
        if (cmd == 'lock') {
            return;
        }
        else if (cmd == 'left') {
            vptzcmd = 'PTZ_LEFT';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'right') {
            vptzcmd = 'PTZ_RIGHT';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'up') {
            vptzcmd = 'PTZ_UP';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'down') {
            vptzcmd = 'PTZ_DOWN';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'leftup') {
            vptzcmd = 'PTZ_UP_LEFT';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'leftdown') {
            vptzcmd = 'PTZ_DOWN_LEFT';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'rightup') {
            vptzcmd = 'PTZ_UP_RIGHT';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'rightdown') {
            vptzcmd = 'PTZ_DOWN_RIGHT';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'home') {
            vptzcmd = 'PTZ_HOME';
            vptzparam = 0;
        }
        else if (cmd == 'zoomin') {
            vptzcmd = 'PTZ_LENS_ZOOM_IN';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_LENS_ZOOM_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'zoomout') {
            vptzcmd = 'PTZ_LENS_ZOOM_OUT';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_LENS_ZOOM_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'telenear') {
            vptzcmd = 'PTZ_LENS_ZOOMFAR';
            if (down)
                vptzparam = speed;
        }
        else if (cmd == 'telefar') {
            vptzcmd = 'PTZ_LENS_ZOOMNEAR';
            if (down)
                vptzparam = speed;
        }
        else if (cmd == 'focusnear') {
            vptzcmd = 'PTZ_LENS_FOCAL_NEAR';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_LENS_FOCAL_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'focusfar') {
            vptzcmd = 'PTZ_LENS_FOCAL_FAR';
            if (down)
                vptzparam = speed;
            else {
                vptzcmd = 'PTZ_LENS_FOCAL_STOP';
                vptzparam = 0;
            }
        }
        else if (cmd == 'autofocus') {
            vptzcmd = 'PTZ_LENS_AUTOFOCUS';
            if (down)
                vptzparam = speed;
        }
        else if (cmd == 'irisopen') {
            vptzcmd = 'PTZ_LENS_IRISOPEN';
            if (down)
                vptzparam = speed;
            else
                vptzparam = 0;
        }
        else if (cmd == 'irisclose') {
            vptzcmd = 'PTZ_LENS_IRISCLOSE';
            if (down)
                vptzparam = speed;
            else
                vptzparam = 0;
        }
        else if (cmd == 'gotopreset') {
            vptzcmd = 'PTZ_PRESET';
            if (down)
                vptzparam = speed;
            else
                return;
        }
        else if (cmd == 'setreset') {
            vptzcmd = 'PTZ_PRESETSET';
            if (down)
                vptzparam = speed;
            else
                return;
        }
        else if (cmd == 'delpreset') {
            vptzcmd = 'PTZ_PRESETCLEAR';
            if (down)
                vptzparam = speed;
            else
                return;
        }
        var cmd = 'cmd=PTZControl&PTZCode=' + vptzcmd + '&PTZParam=' + vptzparam;
        this.vocx.CtrlCmd(cmd);
        Ext.log(cmd);

    }
});


