Ext.define('App.SystemSetting.Dlg.showPlaybackDlg', {
    extend: 'Ext.window.Window',
    layout: 'border',
    modal: false,
    title: '回放录像',
    maximizable: true,
    //minimizable: true,
    width: 800,
    height: 500,
    requires: ['App.Common.ImageButtonEx'],
    initComponent: function () {
        var vme = this;

        var now = new Date();
        this.datetimeStartBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: 'Y年m月d日',
            fieldLabel: '开始时间',
            width: '100%',
            labelWidth: 60,
            value: this.STARTTIME||(new Date(now.getTime() - 24 * 60 * 60 * 1000))
        });

        this.datetimeEndBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: 'Y年m月d日',
            fieldLabel: '结束时间',
            width: '100%',
            labelWidth: 60,
            value: this.STOPTIME||now
        });

        var dr = Ext.create('Ext.form.Panel', {
            frame: true,
            bodyPadding: 5,
            width: '100%',
            layout: 'vbox',
            border: 0,
            items: [this.datetimeStartBox, this.datetimeEndBox,
            {
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                items: [{
                    iconCls: 'icon-find',
                    xtype: 'button',
                    flex: 1,
                    text: '搜索服务器',
                    scope: this,
                    handler: this.onSearch
                }
                ]
            }
            ]
        });

        this.chnlist = Ext.create('App.Common.ImagePreview',
        {
            title: '通道列表',
            gridautoLoad: false,
            showBarPager: false,
            oldStyle: true,
            //hideHeaders: true,
            region: 'center',
            //selType: 'rowmodel',
            border: 0,
            tbar: [dr],
            iconCls: 'icon-details',
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
            }]
        });

        this.store = Ext.create('Ext.data.TreeStore', {
            root: {
                expanded: true,
                children: [
        ]
            }
        });
        this.searchfiles = Ext.create('App.Common.MultTree', {
            rootVisible: false,  //默认不显示根节点
            useArrows: true,
            border: 0,
            title: '检索结果',
            iconCls: 'icon-details',
            store: this.store,
            tbar: [
            {
                iconCls: 'icon-add',
                text: '下载勾选文件',
                scope: this,
                handler: this.onDownloadSelFiles
            },
            {
                iconCls: 'icon-add',
                text: '下载界面',
                scope: this,
                handler: function () {
                    this.vocx.CtrlCmd('cmd=ShowDownload');
                }
            }],
            listeners:
            {
                scope: this,
                itemdblclick: function (tree, record, item, index) {
                    if (!record.raw.attributes)
                        return;
                    var cmd = 'cmd=MultPlayFile&GLOBALID=' + record.raw.attributes.GLOBALID + '&FILE=' + encodeURIComponent(record.raw.attributes.params.FILE);
                    this.vocx.CtrlCmd(cmd);
                    //this.vocx.CtrlCmd('cmd=ShowChn&index=-1&chnid=' + record.get('GLOBALID') + '&stream=1');
                },
                itemcontextmenu: this.onItemContextmenu
            }
        });

        this.vocx = Ext.create('App.Common.OCX', {
            width: 600,
            height: 400,
            DownLoad: '0',
            WebType: 'multplayback',
            CustomParam: 'ShowLeftBar=0',
            listeners:
            {
                scope: this,
                OCXMsg: this.OCXMsg
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

        this.rightpanel = Ext.create('Ext.Panel',
        {
            layout: 'accordion',
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
            items: [this.chnlist, this.searchfiles]
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
        '->',
        {
            text: '停止所有',
            scope: this,
            iconCls: 'icon-del',
            handler: function () {
                this.onStopAllChn();
            }
        }]
        }, this.rightpanel

        ];

        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        if(this.chns)
        {
        	this.chnlist.store.loadData(this.chns);
        }
        else
        {
        	this.showVideo(this.url, this.showvideoparams);
        }
    },
    onStopAllChn: function () {
        for (var i = 0; i < 48; i++) {
            this.vocx.CtrlCmd('cmd=ShowChn&chnid=0&stream=1' + '&index=' + i);
        }
    },
    onSearch: function () {
        var selchn = this.chnlist.getSelectionModel().getSelection();
        var begintime = this.datetimeStartBox.getValue();
        var endtime = this.datetimeEndBox.getValue();
        if (begintime >= endtime) {
            Ext.MessageBox.alert('提示', '请输入正确的开始和结束时间!');
            return;
        }

        begintime = Ext.Date.format(begintime, 'Y-m-d H:i:s');
        endtime = Ext.Date.format(endtime, 'Y-m-d H:i:s');
        var chns = '';
        if (selchn.length == 0)
            return;
        this.searchtreedata = [];
        this.searchchndata = {};
        for (var i = 0; i < selchn.length; i++) {
            if (chns != '')
                chns += ',';
            chns += selchn[i].get('GLOBALID');

            var chn = {
                id: selchn[i].get('GLOBALID'),
                text: selchn[i].get('CHNNAME'),
                expanded: true,
                checked: 'none',
                children: []
            };
            this.searchchndata[chn.id] = chn;
            this.searchtreedata.push(chn);
        }

        var cmd = 'cmd=SearchChnsFiles&GLOBALS=' + chns + '&BeginTime=' + begintime + '&EndTime=' + endtime;
        //alert(cmd);
        this.vocx.CtrlCmd(cmd);
    },
    showVideo: function (url, params,STARTTIME, STOPTIME) {
        this.showvideoparams = params;

        if (STARTTIME)
            this.datetimeStartBox.setValue(STARTTIME);
        if (STOPTIME)
            this.datetimeEndBox.setValue(STOPTIME);

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
    OCXMsg: function (vcmd, values, ocx) {

        if ('SearchChnsFiles' == vcmd) {
            var beginTime = new Date(values['BEINTIME']);
            var endTime = new Date(values['ENDTIME']);
            var filetime = (endTime.getTime() - beginTime.getTime()) / 1000;
            if (filetime < 60)
                filetime = filetime + '秒';
            else if (filetime < 3600)
                filetime = parseInt(filetime / 60) + '分' + (filetime % 60) + '秒';
            else
                filetime = parseInt(filetime / 3660) + '时' + (parseInt(filetime / 60) % 60) + '分';
            var chn = this.searchchndata[values['GLOBALID']];
            if (chn) {
                chn.children.push(
                {
                    id: chn.id + '_' + chn.children.length,
                    text: values['BEINTIME'] + '<a style="color:green;">(' + filetime + ')</a>',
                    leaf: true,
                    expanded: true,
                    checked: 'none',
                    attributes:
                    {
                        ISFILE: true,
                        GLOBALID: values['GLOBALID'],
                        params: values
                    }
                });
            }

        }
        else if ('SearchChnsFilesEnd' == vcmd) {
            this.store.setRootNode({
                expanded: true,
                children: this.searchtreedata
            });
            var items = this.rightpanel.getLayout().getLayoutItems();
            items[1].expand();
        }
        else {
        }
    },
    onItemContextmenu: function (tree, record, item, index, e) {
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [
            {
                iconCls: 'icon-download',
                text: '下载当前',
                scope: this,
                handler: function (widget, event) {
                    this.vocx.CtrlCmd('cmd=DownloadFile&GLOBALID=' + record.raw.attributes.GLOBALID + '&FILE=' + encodeURIComponent(record.raw.attributes.params.FILE));
                }
            },
            {
                iconCls: 'icon-download',
                text: '下载勾选文件',
                scope: this,
                handler: this.onDownloadSelFiles
            }]
        });

        contextMenu.showAt(e.getXY());
        e.stopEvent();
    },
    onDownloadSelFiles: function () {
        var checkeditems = this.searchfiles.getChecked();
        var vchns = [];
        for (var i = 0; i < checkeditems.length; i++) {
            var node = checkeditems[i];
            if (node.raw.attributes) {
                vchns.push({ GLOBALID: node.raw.attributes.GLOBALID, FILE: node.raw.attributes.params.FILE });
            }
        }
       this.vocx.CtrlCmd('cmd=DownloadFiles&FILES=' + encodeURIComponent(Ext.JSON.encode(vchns)));
    }
});


