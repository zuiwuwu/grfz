
Ext.define('App.SystemSetting.TVWall.MonitorView', {
    extend: 'Ext.panel.Panel',
    autoScroll: true,
    layout: 'absolute',
    itemSelector: 'div.' + Ext.baseCSSPrefix + 'tvwallmonitor',
    modifyMod: false,
    lastTVWallID: 0,
    initComponent: function () {
        var vme = this;
        this.backroudImage = Ext.create('Ext.Img', {
            src: '',
            x: 0,
            y: 0
        });
        this.items = [this.backroudImage,
        {
            xtype: 'component',
            x: 0,
            y: 0,
            width: '100%',
            height: '100%'
        }];
        this.monitors = [];
        if (this.enableEdit) {
            this.tbar = [{
                text: '刷新',
                iconCls: 'icon-refresh',
                handler: function () {
                    vme.load();
                }
            }, {
                text: '修改模式',
                iconCls: 'icon-edit',
                scope: this,
                handler: this.onModifyMod
            }, {
                text: '全选',
                iconCls: 'icon-add',
                scope: this,
                handler: this.onSelAllClick
            }, {
                text: '清除选择',
                iconCls: 'icon-del',
                scope: this,
                handler: this.onCleanSelAllClick
            }, {
                text: '锁定',
                iconCls: 'icon-lock',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.lockVideo(vmonitors, true);
                }
            }, {
                text: '解锁',
                iconCls: 'icon-unlock',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.lockVideo(vmonitors, false);
                }
            }, {
                text: '关闭图像',
                iconCls: 'icon-add',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.closeVideo(vmonitors);
                }
            }, {
                text: '开始轮巡',
                iconCls: 'icon-application-go',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.autoScrollVideo(vmonitors, true);
                }
            }, {
                text: '停止轮巡',
                iconCls: 'icon-add',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.autoScrollVideo(vmonitors, false);
                }
            }, {
                text: '修改背景',
                iconCls: 'icon-image-edit',
                scope: this,
                handler: this.onUploadBckImage
            }];
        }
        else {
            this.tbar = [{
                text: '刷新',
                iconCls: 'icon-refresh',
                handler: function () {
                    vme.load();
                }
            }, {
                text: '全选',
                iconCls: 'icon-add',
                scope: this,
                handler: this.onSelAllClick
            }, {
                text: '清除选择',
                iconCls: 'icon-del',
                scope: this,
                handler: this.onCleanSelAllClick
            }, {
                text: '锁定',
                iconCls: 'icon-lock',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.lockVideo(vmonitors, true);
                }
            }, {
                text: '解锁',
                iconCls: 'icon-unlock',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.lockVideo(vmonitors, false);
                }
            }, {
                text: '关闭图像',
                iconCls: 'icon-add',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.closeVideo(vmonitors);
                }
            }, {
                text: '开始轮巡',
                iconCls: 'icon-application-go',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.autoScrollVideo(vmonitors, true);
                }
            }, {
                text: '停止轮巡',
                iconCls: 'icon-add',
                scope: this,
                handler: function () {
                    var vmonitors = '';
                    for (var i = 0; i < vme.monitors.length; i++) {
                        if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                            if (vmonitors != '')
                                vmonitors += ',';
                            vmonitors += vme.monitors[i].MONITORID;
                        }
                    }
                    if (vmonitors == '') {
                        Ext.Msg.alert('提示', '请选择监视器！');
                        return;
                    }
                    this.autoScrollVideo(vmonitors, false);
                }
            }];
        }


        this.callParent(arguments);
    },
    onSelAllClick: function () {
        var vme = this;
        for (var i = 0; i < vme.monitors.length; i++) {
            vme.monitors[i].addCls('x-tvwallmonitor-selme');
        }
    },
    onCleanSelAllClick: function () {
        var vme = this;
        for (var i = 0; i < vme.monitors.length; i++) {
            vme.monitors[i].removeCls('x-tvwallmonitor-selme');
        }
    },
    onUploadBckImage: function () {
        var vme = this;
        Ext.create('App.Common.UploadFileDlg', {
            url: '../TVWall/UploadFile',
            ID: vme.lastTVWallID,
            listeners: {
                scope: this,
                saveok: function () {
                    vme.backroudImage.setSrc('../TVWall/GetPic?ID=' + vme.lastTVWallID);
                }
            }
        }).show();
    },
    onRender: function () {
        this.callParent(arguments);
        var btn = this.body.el;
        var btnListeners = {
            scope: this,
            mousedown: this.onMonitorMouseDown
        };
        this.mon(btn, btnListeners);
    },
    onMonitorMouseDown: function (e, t, eOpts) {
        var vme = this;
        //if (vme.modifyMod)
        //    return;

        var node = e.getTarget(vme.itemSelector);
        var vmonitor = null;
        if (node) {
            for (var i = 0; i < vme.monitors.length; i++) {
                if (vme.monitors[i].el.dom == node) {
                    vmonitor = vme.monitors[i];
                    break;
                }
            }
        }

        if (vmonitor) {
            if (e.ctrlKey) {
                if (vmonitor.hasCls('x-tvwallmonitor-selme'))
                    vmonitor.removeCls('x-tvwallmonitor-selme');
                else
                    vmonitor.addCls('x-tvwallmonitor-selme');
            }
            else {
                for (var i = 0; i < vme.monitors.length; i++) {
                    vme.monitors[i].removeCls('x-tvwallmonitor-selme');
                }
                vmonitor.addCls('x-tvwallmonitor-selme');
            }
        }
        else {
            for (var i = 0; i < vme.monitors.length; i++) {
                vme.monitors[i].removeCls('x-tvwallmonitor-selme');
            }
        }
    },
    afterRender: function () {
        this.callParent(arguments);
        var vme = this;
        //vme.load();
        this.refreshtimerid = setInterval(function () {
            vme.refreshMonitor();
        }, 5000);
    },
    afterFirstLayout: function () {
        this.callParent(arguments);
        var body = this.body;
        var vme = this;
        this.formPanelDropTarget = new Ext.dd.DropZone(body, {
            ddGroup: 'tvwalldrag',
            getTargetFromEvent: function (e) {
                var node = e.getTarget(vme.itemSelector);
                return node;
            },
            // On entry into a target node, highlight that node.
            onNodeEnter: function (target, dd, e, data) {
                Ext.fly(target).addCls('my-row-highlight-class');
            },

            // On exit from a target node, unhighlight that node.
            onNodeOut: function (target, dd, e, data) {
                Ext.fly(target).removeCls('my-row-highlight-class');
            },

            // While over a target node, return the default drop allowed class which
            // places a "tick" icon into the drag proxy.
            onNodeOver: function (target, dd, e, data) {
                var vrec = data.records[0];
                if (vrec.raw.attributes
                && vrec.raw.attributes.TYPE == 1) {
                    return Ext.dd.DropZone.prototype.dropAllowed;
                }
                else {
                    return Ext.dd.DropZone.prototype.dropNotAllowed;
                }
            },

            // On node drop we can interrogate the target to find the underlying
            // application object that is the real target of the dragged data.
            // In this case, it is a Record in the GridPanel's Store.
            // We can use the data set up by the DragZone's getDragData method to read
            // any data we decided to attach in the DragZone's getDragData method.
            onNodeDrop: function (target, dd, e, data) {
                var vmonitor = null;
                for (var i = 0; i < vme.monitors.length; i++) {
                    if (vme.monitors[i].el.dom == target) {
                        vmonitor = vme.monitors[i];
                        break;
                    }
                }
                if (vmonitor) {
                    var vrec = data.records[0];
                    if (vrec.raw.attributes
                && vrec.raw.attributes.TYPE == 1) {
                        vme.switchC2M(vrec.raw.attributes.GLOBALID, vmonitor.MONITORID);
                    }

                }
                return true;
            }
        });
    },
    beforeDestroy: function () {
        if (this.refreshtimerid) {
            clearInterval(this.refreshtimerid);
            this.refreshtimerid = null;
        }
        var target = this.formPanelDropTarget;
        if (target) {
            target.unreg();
            this.formPanelDropTarget = null;
        }
        this.callParent();
    },
    onModifyMod: function () {
        this.modifyMod = !this.modifyMod;
        var vme = this;
        for (var i = 0; i < vme.monitors.length; i++) {
            vme.monitors[i].enableModify(this.modifyMod);
        }
    },
    onMonitorMove: function (monitor) {
        var vme = this;
        var myMask = new Ext.LoadMask(vme, { msg: '正在设置。。。' });
        myMask.show();
        Ext.Ajax.request({
            url: '../TVWall/UpdateMonitorPosition',
            method: 'post', //方法  
            params: { MONITORID: monitor.MONITORID, X: monitor.getLocalX(), Y: monitor.getLocalY() },
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (v) {

                    }
                }
                else {
                    alert('网络错误');
                }
            }
        });
    },
    onMonitorResize: function (monitor, width, height) {
        var vme = this;
        var myMask = new Ext.LoadMask(vme, { msg: '正在设置。。。' });
        myMask.show();
        Ext.Ajax.request({
            url: '../TVWall/UpdateMonitorSize',
            method: 'post', //方法  
            params: { MONITORID: monitor.MONITORID, W: width, H: height },
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (v) {

                    }
                }
                else {
                    alert('网络错误');
                }
            }
        });
    },
    load: function () {
        var vme = this;
        for (var i = 0; i < vme.monitors.length; i++) {
            vme.remove(vme.monitors[i], true);
        }
        vme.monitors = [];
        vme.backroudImage.setSrc('../TVWall/GetPic?ID=' + vme.lastTVWallID);
        var myMask = new Ext.LoadMask(vme, { msg: "正在获取监视器，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../TVWall/GetMonitors',
            method: 'post', //方法  
            params: { TVWALLID: vme.lastTVWallID },
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    for (var i = 0; i < vme.monitors.length; i++) {
                        vme.remove(vme.monitors[i], true);
                    }
                    var v = Ext.JSON.decode(response.responseText);
                    if (v) {
                        for (var i = 0; i < v.rows.length; i++) {
                            var vitem = Ext.create('App.SystemSetting.TVWall.Monitor', {
                                x: parseInt(v.rows[i].X),
                                y: parseInt(v.rows[i].Y),
                                width: parseInt(v.rows[i].W),
                                height: parseInt(v.rows[i].H),
                                MONITORID: v.rows[i].MONITORID,
                                modifyMod: vme.modifyMod,
                                MNM: v.rows[i].MNM,
                                CNM: v.rows[i].CNM,
                                listeners: {
                                    scope: vme,
                                    updatemonitorposition: vme.onMonitorMove,
                                    updatemonitorsize: vme.onMonitorResize
                                }
                            });
                            vme.monitors.push(vitem);
                            vme.add(vitem);
                        }
                    }
                }
                else {
                    //alert('网络错误');
                }
            }
        });
    },
    refreshMonitor: function () {
        var vme = this;
        Ext.Ajax.request({
            url: '../TVWall/GetMonitors',
            method: 'post', //方法  
            params: { TVWALLID: vme.lastTVWallID },
            callback: function (options, success, response) {
                if (success) {
                    var voldmonitor = {};
                    for (var i = 0; i < vme.monitors.length; i++) {
                        voldmonitor[vme.monitors[i].MONITORID] = vme.monitors[i];
                    }
                    var vnewmonitor = {};
                    var v = Ext.JSON.decode(response.responseText);
                    if (v) {
                        for (var i = 0; i < v.rows.length; i++) {
                            vnewmonitor[v.rows[i].MONITORID] = v.rows[i];
                            if (typeof voldmonitor[v.rows[i].MONITORID] == 'undefined') {
                                var vitem = Ext.create('App.SystemSetting.TVWall.Monitor', {
                                    x: parseInt(v.rows[i].X),
                                    y: parseInt(v.rows[i].Y),
                                    width: parseInt(v.rows[i].W),
                                    height: parseInt(v.rows[i].H),
                                    MONITORID: v.rows[i].MONITORID,
                                    modifyMod: vme.modifyMod,
                                    MNM: v.rows[i].MNM,
                                    CNM: v.rows[i].CNM,
                                    listeners: {
                                        scope: vme,
                                        updatemonitorposition: vme.onMonitorMove,
                                        updatemonitorsize: vme.onMonitorResize
                                    }
                                });
                                vme.monitors.push(vitem);
                                vme.add(vitem);
                            }
                            else {
                                voldmonitor[v.rows[i].MONITORID].setMonitorName(v.rows[i].MNM, v.rows[i].CNM);
                            }
                        }
                    }
                }
                else {
                    //alert('网络错误');
                }
            }
        });
    },
    switchC2M: function (cameraid, monitorid) {
        var vme = this;
        var myMask = new Ext.LoadMask(vme, { msg: "正在切换，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../TVWall/SwitchC2M',
            method: 'post', //方法  
            jsonData: [{ CAMERAID: cameraid, MONITORID: monitorid}],
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (v) {
                        if (!v.success) {
                            alert(v.msg);
                        }
                    }
                }
                else {
                    Ext.Msg.alert('提示', '网络错误');
                }
            }
        });
    },
    closeVideo: function (vmonitors) {
        var vme = this;
        var myMask = new Ext.LoadMask(vme, { msg: "正在关闭，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../TVWall/CloseVideo',
            method: 'post', //方法  
            params: { MONITORS: vmonitors },
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (v) {
                        if (!v.success) {
                            alert(v.msg);
                        }
                    }
                }
                else {
                    Ext.Msg.alert('提示', '网络错误');
                }
            }
        });
    },
    lockVideo: function (vmonitors, lock) {
        var vme = this;
        var myMask = new Ext.LoadMask(vme, { msg: "正在设置，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../TVWall/lockVideo',
            method: 'post', //方法  
            params: { MONITORS: vmonitors, lock: lock },
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (v) {
                        if (!v.success) {
                            alert(v.msg);
                        }
                    }
                }
                else {
                    Ext.Msg.alert('提示', '网络错误');
                }
            }
        });
    },
    autoScrollVideo: function (vmonitors, bscroll) {
        var vme = this;
        var myMask = new Ext.LoadMask(vme, { msg: "正在设置，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../TVWall/autoScrollVideo',
            method: 'post', //方法  
            params: { MONITORS: vmonitors, bscroll: bscroll },
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (v) {
                        if (!v.success) {
                            alert(v.msg);
                        }
                    }
                }
                else {
                    Ext.Msg.alert('提示', '网络错误');
                }
            }
        });
    },
    chnageTVWall: function (tvwallid) {
        var vme = this;
        if (vme.lastTVWallID != tvwallid) {
            vme.lastTVWallID = tvwallid;
            vme.backroudImage.setSrc('../TVWall/GetPic?ID=' + vme.lastTVWallID);
            vme.load();
        }
    },
    getSelectedMonitors: function () {
        var vme = this;
        var vmonitors = [];
        for (var i = 0; i < vme.monitors.length; i++) {
            if (vme.monitors[i].hasCls('x-tvwallmonitor-selme')) {
                vmonitors.push(vme.monitors[i]);
            }
        }
        return vmonitors;
    },
    createVideoInSel:function(glocalid)
    {
    	 var vmonitors = this.getSelectedMonitors();
        if (vmonitors.length != 1)
            return;
        this.switchC2M(glocalid, vmonitors[0].MONITORID);
    }
});