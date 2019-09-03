Ext.define('App.SystemSetting.TVWall.SearchList', {
    extend: 'Ext.grid.Panel',
    stripeRows: true,
    autoScroll: false,
    //selType: 'checkboxmodel',
    border: 0,
    columnLines: true, //显示网格竖线
    rowLines: true,
    hideHeaders: true,
    initComponent: function () {
        var vme = this;

        this.store = Ext.create('Ext.data.Store', {
            fields: ['NAME', 'ID', 'ICON'],
            autoLoad: false,
            pageSize: 1000,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                api: {
                    read: this.urlChnSearch
                },
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                }
            }
        });

        this.columns = [
        {
            dataIndex: 'NAME',
            sortable: false,
            header: SPLanguage.getMessage("TDMC"),
            flex: 1,
            renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                var icon = record.get('ICON');
                if (typeof icon != 'undefined'
                && icon != '') {
                    return '<div class="' + icon + '" style="padding-left:18px;">' + value + '</div>';
                }
                return value;
            }
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        //this.el.setStyle('border-radius', '5px 5px 0px 0px');
    }
});


Ext.define('App.SystemSetting.TVWall.chnTree', {
    extend: 'Ext.tree.Panel',
    //title: '拓扑结构',
    //animCollapse: true,
    rootVisible: false,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    enableDD: true,
    initComponent: function () {
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            root: { expanded: false },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.urlChnTree,
                reader: {
                    type: 'json'
                }
            }
        });

        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                dropGroup: 'tvwalldrag',
                dragGroup: 'tvwalldrag',
                enableDrag: true,
                enableDrop: false
            }
        };
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    getClickChn: function (treepanel, node, vchns) {
        if (node.raw.attributes.TYPE == 1) {
            vchns.push({ id: node.raw.attributes.GLOBALID, name: node.data.text });
        }
        else if (node.childNodes) {
            for (var i = 0; i < node.childNodes.length; i++) {
                treepanel.getClickChn(treepanel, node.childNodes[i], vchns);
            }
        }
    },
    getNodeChn: function (node) {
        
        var treepanel = this;
        var vchns = new Array();
        if (node.raw.attributes.TYPE == 1) {
            vchns.push({ id: node.raw.attributes.GLOBALID, name: node.data.text });
        }
        else if (node.childNodes) {
            node.eachChild(function (child) {
                treepanel.getClickChn(treepanel, child, vchns);
            });
        }
        return vchns;
    } 
});


Ext.define('App.SystemSetting.TVWall.Search', {
    extend: 'Ext.container.Container',
    border: 0,
    width: '100%',
    height: 76,
    layout: 'absolute',
    style: {
        background: 'url(../images/real/realsearch.png) no-repeat 0px 0px;'
    },
    initComponent: function () {
        var vme = this;
        this.addEvents(
            'searchtextchange'
        );
        this.searchtext = Ext.create('Ext.form.field.Text', {
            y: 27,
            x: 28,
            width: 164,
            height: 25,
            border: false,
            fieldStyle: { border: 0 },
            emptyText: SPLanguage.getMessage("QSRGJZ"),
            listeners:
            {
                scope: this,
                change: function (textedit, newValue, oldValue, eOpts) {
                    if (oldValue != newValue) {
                        if (vme.searchtimerid) {
                            clearTimeout(vme.searchtimerid);
                            vme.searchtimerid = null;
                        }
                        vme.searchtimerid = setTimeout(function () {
                            vme.searchtimerid = null;
                            vme.fireEvent('searchtextchange', newValue);
                        }, 500);
                    }
                }
            }
        });
        this.items = [
        this.searchtext,
        Ext.create('App.Common.ImageButton', {
            x: 207,
            y: 24,
            border: 0,
            height: 30,
            width: 70,
            tooltip: SPLanguage.getMessage("DTXZ"),
            hasImage: [{ name: 'normal', src: '' },
                { name: 'hover', src: '../images/traffic/searchbtn_hover.png'}],
            scope: this,
            handler: function () {
                alert(SPLanguage.getMessage("DTXZ"));
            }
        })];
        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.TVWall.TabReal', {
    extend: 'Ext.container.Container',
    border: 0,
    layout: 'vbox',
    initComponent: function () {
        var vme = this;
        this.chns = null;
        this.searchchnlist = Ext.create('App.SystemSetting.TVWall.SearchList', {
            border: 0,
            urlChnSearch: this.urlChnSearch,
            listeners: {
                scope: this,
                itemdblclick: function (grid, record, item, index) {
                    var rec = grid.getStore().getAt(index); ;
                    var cmd = 'cmd=ShowChn&index=-1&chnid=' + rec.get('ID') + '&presetid=0';
                    vme.ocxobject.CtrlCmd(cmd);
                }
            }
        });
        this.chntree = Ext.create('App.SystemSetting.TVWall.chnTree', {
            border: 0,
            urlChnTree: this.urlChnTree,
            listeners: {
                scope: this,
                itemdblclick: function (grid, node) {
                    var vmonitors = vme.ocxobject.getSelectedMonitors();
                    if (node.raw.attributes.TYPE != 1) {
                        var vchns = vme.chntree.getNodeChn(node);
                        var vcount = vchns.length;
                        var vcount = vmonitors.length;
                        if (vcount > vchns.length)
                            vcount = vchns.length;
                        if (vcount > 0) {
                            var vcs = '';
                            var vms = '';
                            for (var i = 0; i < vcount; i++) {
                                if (vcs != '')
                                    vcs += ',';
                                vcs += vchns[i].id;

                                if (vms != '')
                                    vms += ',';
                                vms += vmonitors[i].MONITORID;
                            }
                            vme.ocxobject.switchC2M(vcs, vms);
                        }

                    }
                    else {
                        if (vmonitors.length > 0) {
                            vme.ocxobject.switchC2M(node.raw.attributes.GLOBALID, vmonitors[0].MONITORID);
                        }
                    }
                }
            }
        });

        this.chntree.store.on('load', function (store) {
            vme.chns = null;
        }, this);


        this.chntreepanel = Ext.create('Ext.container.Container', {
            border: 0,
            layout: 'card',
            flex: 1,
            width: '100%',
            items: [this.chntree,
            this.searchchnlist]
        });
        this.items = [Ext.create('App.SystemSetting.TVWall.Search', {
            listeners:
            {
                scope: this,
                searchtextchange: function (value) {
                    if (value == ''
                    || value == null
                    || typeof value == 'undifined') {

                        vme.chntreepanel.getLayout().setActiveItem(0);
                    }
                    else {
                        vme.searchchnlist.store.clearFilter(true);
                        vme.searchchnlist.store.filter([{
                            property: 'query',
                            value: value
                        }]);
                        vme.searchchnlist.updateLayout();
                        vme.chntreepanel.getLayout().setActiveItem(1);
                    }
                }
            }
        }),
        {
            xtype: 'container',
            border: 0,
            layout: 'hbox',
            width: '100%',
            height: 27,
            items: [Ext.create('App.Common.ImageButton', {
                border: 0,
                height: 27,
                width: 97,
                tooltip: SPLanguage.getMessage("XSFY"),
                hasImage: ['hover'],
                btnImage: '../images/real/autoscrollup.png',
                scope: this,
                handler: this.movePrevPage
            }),
            Ext.create('App.Common.ImageButton', {
                border: 0,
                height: 27,
                width: 98,
                tooltip: SPLanguage.getMessage("ZDFY"),
                hasImage: ['hover', 'checked'],
                btnImage: '../images/real/autoscroll.png',
                scope: this,
                handler: this.autoScrollVideo
            }),
            Ext.create('App.Common.ImageButton', {
                border: 0,
                height: 27,
                width: 100,
                tooltip: SPLanguage.getMessage("XXFY"),
                hasImage: ['hover'],
                btnImage: '../images/real/autoscrolldown.png',
                scope: this,
                handler: this.moveNextPage
            })]
        },
        this.chntreepanel];
        this.callParent(arguments);
    },
    getChnList: function () {
        var vchns = [];
        this.chntree.getRootNode().cascadeBy(function (rec) {
            if (rec.raw.attributes
            && rec.raw.attributes.TYPE == 1) {
                vchns.push(rec);
            }
        });
        return vchns;
    },
    //下一页
    moveNextPage: function () {
        if (!this.chns) {
            this.chns = this.getChnList();
            this.showIndex = 0;
        }
        var values = this.ocxobject.CtrlCmd('cmd=GetViewNum');
        if (values == null)
            return;
        var viewnum = 0;
        var vcmd = values["cmd"];
        if (vcmd == "result") {
            viewnum = parseInt(values['viewnum']);
        }
        var vshow = new Array();
        if (viewnum >= this.chns.length) {
            vshow = this.chns;
        }
        else {
            for (var i = 0; i < viewnum; i++) {
                if (this.showIndex >= this.chns.length)
                    this.showIndex = 0;
                vshow.push(this.chns[this.showIndex]);
                this.showIndex++;
            }
        }
        if (vshow.length > 0) {
            vrec = vshow[vshow.length - 1];
            this.chntree.getSelectionModel().select(vrec);

            var vparent = vrec.parentNode;
            while (vparent) {
                this.chntree.expandNode(vparent);
                vparent = vparent.parentNode;
            }
        }
        for (var i = 0; i < vshow.length; i++) {
            var cmd = 'cmd=ShowChn&index=' + i + '&chnid=' + vshow[i].raw.attributes.GLOBALID + '&presetid=0';
            this.ocxobject.CtrlCmd(cmd);
        }
    },
    //上一页
    movePrevPage: function () {
        if (!this.chns) {
            this.chns = this.getChnList();
            this.showIndex = 0;
        }
        var values = this.ocxobject.CtrlCmd('cmd=GetViewNum');
        if (values == null)
            return;
        var viewnum = 0;
        var vcmd = values["cmd"];
        if (vcmd == "result") {
            viewnum = parseInt(values['viewnum']);
        }
        var vshow = new Array();
        if (viewnum >= this.chns.length) {
            vshow = this.chns;
        }
        else {
            for (var i = 0; i < viewnum; i++) {
                if (this.showIndex < 0)
                    this.showIndex = this.chns.length - 1;
                vshow.push(this.chns[this.showIndex]);
                this.showIndex--;
            }
        }
        if (vshow.length > 0) {
            vrec = vshow[vshow.length - 1];
            this.chntree.getSelectionModel().select(vrec);

            var vparent = vrec.parentNode;
            while (vparent) {
                this.chntree.expandNode(vparent);
                vparent = vparent.parentNode;
            }
        }
        for (var i = 0; i < vshow.length; i++) {
            var cmd = 'cmd=ShowChn&index=' + i + '&chnid=' + vshow[i].raw.attributes.GLOBALID + '&presetid=0';
            this.ocxobject.CtrlCmd(cmd);
        }
    },
    autoScrollVideo: function (btn) {
        var vme = this;
        if (vme.autoscrolltimerid) {
            clearTimeout(vme.autoscrolltimerid);
            vme.autoscrolltimerid = null;
            btn.setChecked(false);
        }
        else {
            Ext.create('App.Common.IframeDialog', {
                dialogClass: 'App.AJZC.Real.AutoScrollTimeDialg',
                listeners:
            {
                scope: this,
                closedialog: function (dlg, ok, params) {
                    if (params) {
                        btn.setChecked(true);
                        vme.moveNextPage();

                        var vtime = parseInt(params.AUTOSCROLLTIME);
                        if (vtime <= 0)
                            vtime = 1;
                        vme.autoscrolltimerid = setInterval(function () {
                            vme.moveNextPage();
                        },
                             vtime * 1000);
                    }
                }
            }
            }).show();

        }
    }
});


Ext.define('App.SystemSetting.TVWall.Top', {
    extend: 'Ext.container.Container',
    border: 0,
    width: '100%',
    layout: 'vbox',
    initComponent: function () {
        var vme = this;
        if (this.enableEdit) {
            this.tabmonitor = Ext.create('App.Common.ImageButtonEx', {
                tooltip: SPLanguage.getMessage("DSQ"),
                btnCls: Ext.baseCSSPrefix + 'zhdd-tab-monitor',
                scope: this,
                html: SPLanguage.getMessage("DSQ"),
                handler: function () {
                    vme.tabmonitor.setChecked(true);
                    vme.tabreal.setChecked(false);
                    vme.tabswitch.setChecked(false);
                    vme.tabpanel.getLayout().setActiveItem(0);
                }
            });

            this.tabreal = Ext.create('App.Common.ImageButtonEx', {
                tooltip: SPLanguage.getMessage("SSLL"),
                btnCls: Ext.baseCSSPrefix + 'zhdd-tab-video',
                scope: this,
                html: SPLanguage.getMessage("SSLL"),
                handler: function () {
                    vme.tabmonitor.setChecked(false);
                    vme.tabreal.setChecked(true);
                    vme.tabswitch.setChecked(false);
                    vme.tabpanel.getLayout().setActiveItem(1);
                }
            });

            this.tabswitch = Ext.create('App.Common.ImageButtonEx', {
                tooltip: SPLanguage.getMessage("XLXL"),
                btnCls: Ext.baseCSSPrefix + 'zhdd-tab-switch',
                scope: this,
                html: SPLanguage.getMessage("XLXL"),
                handler: function () {
                    vme.tabmonitor.setChecked(false);
                    vme.tabreal.setChecked(false);
                    vme.tabswitch.setChecked(true);
                    vme.tabpanel.getLayout().setActiveItem(2);
                }
            });

            this.vtvwalllist = Ext.create('App.SystemSetting.TVWall.monitorTree', {
                listeners: {
                    scope: this,
                    selectionchange: function (tree, selected, eOpts) {
                        vme.fireEvent('tvwallselectchange', tree, selected, eOpts);
                    }
                }
            });

            this.tabpanelreal = Ext.create('App.SystemSetting.TVWall.TabReal', {
                urlChnTree: this.urlChnTree,
                urlChnSearch: this.urlChnSearch,
                ocxobject: this.ocxobject
            });

            this.tabpanelswitch = Ext.create('App.Common.VideoSwitch', {
            });

            this.tabpanel = Ext.create('Ext.panel.Panel', {
                width: '100%',
                flex: 1,
                border: 0,
                layout: 'card',
                items: [this.vtvwalllist, this.tabpanelreal, this.tabpanelswitch]
            });

            this.items = [
            {
                xtype: 'container',
                border: 0,
                layout: 'hbox',
                width: '100%',
                height: 38,
                items: [this.tabmonitor, this.tabreal, this.tabswitch]
            },
            this.tabpanel
        ];

        }
        else {
            this.tabreal = Ext.create('App.Common.ImageButtonEx', {
                tooltip: SPLanguage.getMessage("SSLL"),
                btnCls: Ext.baseCSSPrefix + 'real-tab-video',
                scope: this,
                html: SPLanguage.getMessage("SSLL"),
                handler: function () {
                    vme.tabreal.setChecked(true);
                    vme.tabswitch.setChecked(false);
                    vme.tabpanel.getLayout().setActiveItem(0);
                }
            });

            this.tabswitch = Ext.create('App.Common.ImageButtonEx', {
                tooltip: SPLanguage.getMessage("XLXL"),
                btnCls: Ext.baseCSSPrefix + 'real-tab-switch',
                scope: this,
                html: SPLanguage.getMessage("XLXL"),
                handler: function () {
                    vme.tabreal.setChecked(false);
                    vme.tabswitch.setChecked(true);
                    vme.tabpanel.getLayout().setActiveItem(1);
                }
            });

            this.tabpanelreal = Ext.create('App.SystemSetting.TVWall.TabReal', {
                urlChnTree: this.urlChnTree,
                urlChnSearch: this.urlChnSearch,
                ocxobject: this.ocxobject
            });

            this.tabpanelswitch = Ext.create('App.Common.VideoSwitch', {
            });

            this.tabpanel = Ext.create('Ext.panel.Panel', {
                width: '100%',
                flex: 1,
                border: 0,
                layout: 'card',
                items: [this.tabpanelreal, this.tabpanelswitch]
            });

            this.items = [
            {
                xtype: 'container',
                border: 0,
                layout: 'hbox',
                width: '100%',
                height: 38,
                items: [this.tabreal, this.tabswitch]
            },
            this.tabpanel
        ];

        }
        
        this.callParent(arguments);
    }
});

Ext.define('App.SystemSetting.TVWall.Tree', {
    extend: 'Ext.container.Container',
    border: 0,
    width: 295,
    layout: 'vbox',
    bodyStyle: {
        background: 'url(../images/traffic/main_r9_c1.png) 0px 0px;'
    },
    initComponent: function () {
        var vme = this;
        this.addEvents('sendocxcmd','tvwallselectchange');
        this.ptzpanel = Ext.create('App.AJZC.Real.PTZ', {
            collapsed: true,
            animCollapse: true,
            ocxobject: this.ocxobject,
            listeners: {
                scope: this,
                ptzcmdmsg: function (cmd, down, speed) {
                    vme.onPTZCmd(cmd, down, speed);
                }
            }
        });

        this.items = [
        Ext.create('App.SystemSetting.TVWall.Top', {
            flex: 1,
            urlChnTree: this.urlChnTree,
            urlChnSearch: this.urlChnSearch,
            ocxobject: this.ocxobject,
            enableEdit: this.enableEdit,
            listeners: {
                scope: this,
                tvwallselectchange: function (tree, selected, eOpts) {
                    vme.fireEvent('tvwallselectchange', tree, selected, eOpts);
                }
            }
        }),
        Ext.create('App.Common.ImageButtonEx', {
            border: 0,
            tooltip: SPLanguage.getMessage("YC_XSYTKZMB"),
            btnCls: Ext.baseCSSPrefix + 'ptz-showhide',
            scope: this,
            handler: function (btn) {
                if (vme.ptzpanel.getCollapsed()) {
                    vme.ptzpanel.expand(false);
                    btn.setChecked(true);
                }
                else {
                    vme.ptzpanel.collapse(Ext.Component.DIRECTION_BOTTOM, false);
                    btn.setChecked(false);
                }
                //vme.ptzpanel.setVisible(!vme.ptzpanel.isVisible());
            }
        }),
        this.ptzpanel];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    onPTZCmd: function (cmd, down, speed) {
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
        this.ocxobject.CtrlCmd(cmd);
        Ext.log(cmd);
    }
});
