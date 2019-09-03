Ext.define('App.SystemSetting.Dlg.showCLCXDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: false,
    title: '查询过车',
    maximizable: true,
    width: 900,
    height: 500,
    requires: ['App.Common.HyperLinkColumn'],
    urlSmallPic: '../CLCXEX/ShowSmallPic',
    urlSaveExcel: '../CLCX/SaveExcel',
    url: '../CLCXEX/',
    urlShowNullSmallPic: '../CLCXEX/ShowNullSmallPic',
    showconditionbar: true,
    initComponent: function () {
        var me = this;
        this.columns = [{
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                autoSizable: true,
                xtype: 'rownumberer',
                header: '序号',
                width: 60
            }
        }, {
            name: 'CLXXBH',
            type: 'string'
        }, {
            name: 'URIPATH',
            type: 'string'
        }, {
            name: 'JGSJ',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '经过时间',
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return value.substr(0, 4) + '年' + value.substr(4, 2) + '月' + value.substr(6, 2) + '日 ' + value.substr(8, 2) + ':' + value.substr(10, 2) + ':' + value.substr(12, 2);
                }
            }
        }, {
            name: 'DWMC',
            type: 'string',
            gridcol: {
                sortable: false,
                autoSizable: true,
                header: '记录地点',
                width: 280,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + Ext.htmlEncode(value) + '">' + Ext.htmlEncode(value) + '</a>';
                }
            }
        }, {
            name: 'JSFXNAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '行驶方向',
                width: 64
            }
        }, {
            name: 'CDBH',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '车道',
                width: 32
            }
        }, {
            name: 'HPHM',
            type: 'string',
            gridcol: {
                header: '号牌号码',
                xtype: 'hyperlinkcolumn',
                sortable: true,
                width: 95,
                cls: 'clcx-hphm',
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var hphm = rec.get('HPHM');
                    var province = hphm.substr(0, hphm.length - 5);
                    var platechars = hphm.substr(hphm.length - 5, 5);
                    me.province.setRawValue(province);
                    me.platechars.setValue(platechars);
                    me.onSearch();
                }
            }
        },
        {
            name: 'PICURL',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '号牌缩略图',
                width: 105,
                renderer: function (value, metaData, record) {
                    if (value != '1') {
                        var src = me.urlSmallPic + '?ID=' + record.get('CLXXBH') + '&PICURL=' + encodeURIComponent(record.get('PICURL')) + '&PICTUREURL=' + encodeURIComponent(record.get('PICTUREURL'));
                        return '<img class="smallpic" style="padding: 0px; margin: -3px 0px -6px 0px; width:90px; height: 20px;" src="' + src + '" alt="" />';
                    }
                    else {
                        return '<img class="smallpic" style="padding: 0px; margin: -3px 0px -6px 0px; width:90px; height: 20px;" src="' + me.urlShowNullSmallPic + '" alt="没有微缩图" />';
                    }
                }
            }
        }, {
            name: 'PICTUREURL',
            type: 'string'
        }, {
            name: '',
            type: 'string',
            gridcol: {
                header: '操作',
                //hidden: true,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                minWidth: 160,
                items: [{
                    iconCls: 'icon-car',
                    tooltip: '查看详情',
                    text: '查看',
                    scope: this,
                    handler: this.onDetails
                }, {
                    iconCls: 'icon-car-bk',
                    tooltip: '快速布控',
                    text: '布控',
                    scope: this,
                    handler: this.onQuickDeploy
                }]
            }
        }];

        this.clxx = Ext.create('App.Common.asynList',
        {
            gridautoLoad: false,
            showBarPager: true,
            showImagePreview: true,
            //selType: 'rowmodel',
            oldStyle: true,
            url: this.url,
            border: 0,
            pageitemselectkey: 'CLXXBH',
            columns: this.columns,
            dataviewShowImageTpl: new Ext.XTemplate(
                                '<tpl for=".">',
                                '<div class="imagepreview-thumb-wrap" id="{name:stripTags}">',
                                Ext.String.format('<div class="imagepreview-thumb"><img src="/CLCXPIC/ShowBigPic?ID={CLXXBH:htmlEncode}&PICTUREURL={URIPATH:htmlEncode}" title="{HPHM:htmlEncode}"></div>'),
                                Ext.String.format('<span class="x-editable">{HPHM:htmlEncode}</span>'),
                                '</div>',
                                '</tpl>',
                                '<div class="x-clear"></div>'),
            listeners:
            {
                scope: this,
                itemdblclick: function (grid, record, item, index, e, eOpts) {
                    this.vocx.CtrlCmd('cmd=ShowChn&index=-1&chnid=' + record.get('GLOBALID') + '&stream=1');
                },
                dataload: function (grid, data) {
                    data.URIPATH = encodeURIComponent(data.PICTUREURL);
                }
            }
        });

        this.items = [this.clxx];

        //////////////////////////////////////////////////////////////////////////
        //工具栏
        var quickSearchList = Ext.create('Ext.data.Store', {
            fields: ['name', 'value'],
            data: [{ "name": "最近一小时", "value": "1" },
            { "name": "最近一天", "value": "24" },
            { "name": "最近七天", "value": "168" },
            { "name": "最近三十天", "value": "720"}]
        });

        me.quickBtn = Ext.create('Ext.form.ComboBox', {
            width: 100,
            store: quickSearchList,
            editable: false,
            forceSelection: true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'value',
            hidden: !this.showconditionbar,
            cls: 'x-sp-toolbar-left',
            listeners: {
                afterrender: function (combo) {
                    combo.setValue('1');
                },
                select: function (combo, records, eOpts) {
                    var value = records[0].get('value');
                    var type = records[0].get('type');
                    if ('cookie' == type) {
                    }
                    else {
                        var nowTime = new Date();
                        me.endDate.setValue(nowTime);
                        var hours = 0 - parseInt(value);
                        nowTime.setHours(nowTime.getHours() + hours);
                        me.beginDate.setValue(nowTime);
                    }
                }
            }
        });
        var nowTime = new Date();

        //结束时间
        me.endDate = Ext.create('SZPT.view.ui.DateTimeBox', { width: 170,
            value: this.STOPTIME || nowTime,
            format: 'Y年m月d日',
            hidden: !this.showconditionbar,
            cls: 'x-sp-toolbar-left'
        });
        nowTime.setHours(nowTime.getHours() - 1);

        //开始时间
        me.beginDate = Ext.create('SZPT.view.ui.DateTimeBox', {
            width: 170,
            value: this.STARTTIME||nowTime,
            format: 'Y年m月d日',
            hidden: !this.showconditionbar,
            cls: 'x-sp-toolbar-left'
        });

        me.province = Ext.create('App.Common.AutoCompleteEx', {
            name: 'province',
            url: '../Traffic/GetAutoCompleteCityExt',
            displayVlaue: true,
            forceSelection: false,
            labelWidth: 35,
            fieldLabel: '号牌',
            width: 80,
            pageSize: null,
            columnWidth: 180,
            hidden: !this.showconditionbar,
            value: this.HPHM ? this.HPHM.substring(0, 2) : '',
            valueNotFoundText: '没有找到对应城市',
            cls: 'x-sp-toolbar-left'
        });


        me.platechars = Ext.create('App.Common.spTextField', {
            name: 'platechars',
            vtype: 'HPHM',
            width: 60,
            hidden: !this.showconditionbar,
            value: this.HPHM ? this.HPHM.substr(2) : '',
            cls: 'x-sp-toolbar-left',
            tooltip: "请输入号牌后5位(可增减,少于5位表示后面模糊查询),支持模糊查询(模糊位用'<a style=\"color:red;\">*</a>'或'<a style=\"color:red;\">?</a>'代替),支持不确定位模糊查询(用'<a style=\"color:red;\">%</a>'代替)"
        });

        this.tbar = [
        {
            xtype: 'container',
            layout: 'auto',
            width: '100%',
            items: [me.quickBtn,
        me.beginDate,
        me.endDate,
        me.province,
        me.platechars,
        {
            xtype: 'button',
            text: '搜索',
            tooltip: '搜索',
            iconCls: 'icon-find',
            scope: me,
            cls: 'x-sp-toolbar-left',
            handler: me.onSearch
        },
        {
            xtype: 'button',
            tooltip: '搜索',
            iconCls: 'icon-details',
            scope: me,
            margin: '0 2 0 2',
            style: {
                float: 'left'
            },
            menu: [
            {
                text: '列表',
                scope: this,
                handler: function () {
                    this.clxx.showListType('grid');
                }
            },
            {
                text: '缩略图',
                scope: this,
                handler: function () {
                    this.clxx.showListType('dataview');
                }
            }
            ]
        },
        {
            xtype: 'button',
            iconCls: 'icon-grid',
            text: '显示轨迹',
            scope: me,
            margin: '0 2 0 2',
            cls: 'x-sp-toolbar-left',
            handler: function () {
                var province = me.province.getValue();
                if (province.length != 2
                    || province.indexOf('?') != -1
                    || province.indexOf('%') != -1
                    || province.indexOf('*') != -1) {
                    alert('请输入明确的号牌号码！');
                    return;
                }
                var platechars = me.platechars.getValue();
                if (platechars.length < 5
                    || platechars.indexOf('?') != -1
                    || platechars.indexOf('%') != -1
                    || platechars.indexOf('*') != -1) {
                    alert('请输入明确的号牌号码！');
                    return;
                }
                var filters = me.getFilters();
                Ext.create('App.CLCX.Track', {
                    filters: filters,
                    hphm: province + platechars
                }).show();
            }
        },
        {
            xtype: 'button',
            iconCls: 'icon-grid',
            text: '导出Excel',
            scope: me,
            cls: 'x-sp-toolbar-left',
            handler: function () {
                Ext.create('App.SystemSetting.Dlg.exportDlg',
                    {
                        fielters: me.getFilters(),
                        urlStart: me.urlSaveExcel + 'StartExport',
                        urlStop: me.urlSaveExcel + 'StopExport',
                        urlKeepAlive: me.urlSaveExcel + 'GetExportMsg',
                        urlDownload: me.urlSaveExcel + 'DownloadExcel'
                    }).show();
            }
        },
        {
            xtype: 'button',
            iconCls: 'icon-grid',
            text: '导出选中Excel',
            scope: this,
            cls: 'x-sp-toolbar-left',
            handler: function () {
                var me = this;
                var sel = this.clxx.getSelectedItems();
                if (sel.length == 0) {
                    Ext.MessageBox.alert('提示', '请选择要导出的记录！');
                    return;
                }
                var filters = this.getFilters();
                filters.push({
                    property: 'selectcljlxx',
                    value: this.clxx.getSelectedString()
                });

                Ext.create('App.SystemSetting.Dlg.exportDlg',
                    {
                        fielters: filters,
                        urlStart: me.urlSaveExcel + 'StartExport',
                        urlStop: me.urlSaveExcel + 'StopExport',
                        urlKeepAlive: me.urlSaveExcel + 'GetExportMsg',
                        urlDownload: me.urlSaveExcel + 'DownloadExcel'
                    }).show();
            }
        }, {
            xtype: 'button',
            iconCls: 'icon-grid',
            text: '批量导出图片',
            scope: me,
            cls: 'x-sp-toolbar-left',
            handler: function () {
                Ext.create('App.SystemSetting.Dlg.downloadDlg',
                    {
                        filters: me.getFilters()
                    }).show();
            }
        }, {
            xtype: 'button',
            iconCls: 'icon-grid',
            text: '导出选中图片',
            scope: me,
            cls: 'x-sp-toolbar-left',
            handler: function () {
                var sel = this.clxx.getSelectedItems();
                if (sel.length == 0) {
                    Ext.MessageBox.alert('提示', '请选择要导出的记录！');
                    return;
                }
                var filters = this.getFilters();
                filters.push({
                    property: 'selectcljlxx',
                    value: this.clxx.getSelectedString()
                });
                Ext.create('App.SystemSetting.Dlg.downloadDlg',
                    {
                        filters: filters
                    }).show();

            }
        }]
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onSearch: function () {
        this.clxx.search(this.getFilters());
    },
    getFilters: function () {
        var me = this;
        var beginDate = me.beginDate.getValue();
        var endDate = me.endDate.getValue();
        var province = me.province.getValue();
        var platechars = me.platechars.getValue();

        var filters = [{
            property: 'BeginDate',
            value: beginDate
        }, {
            property: 'EndDate',
            value: endDate
        }, {
            property: 'AddressPoints',
            value: this.DWBH
        }, {
            property: 'JKSBBH',
            value: this.JKSBBH
        }, {
            property: 'Province',
            value: province
        }, {
            property: 'Platechars',
            value: platechars
        }];
        me.searchFilters = filters;
        return filters;
    },
    onDetails: function (grid, rowIndex, colIndex) {
        var store = grid.getStore();
        var clxx = store.getAt(rowIndex);
        var index = (this.clxx.currentPage - 1) * this.clxx.gridpageSize + rowIndex;
        Ext.create('App.CLCX.detailDlg',
        {
            url: this.url,
            clxxIndex: index,
            clxx: clxx,
            filters: this.clxx.filters,
            sorters: this.clxx.sorters,
            wndid: this.getId(),
            gridpageSize: this.clxx.gridpageSize,
            urlSmallPic: this.urlSmallPic
        }).show();
    }, 
    onQuickDeploy: function (grid, rowIndex, colIndex) {
        var me = this;
        var store = grid.getStore();
        var clxx = store.getAt(rowIndex);

        Ext.create('App.BKGL.addDlg',
        {
            HPHM: clxx.get('HPHM'),
            HPYS: clxx.raw.HPYS,
            QUICKDETECT: true
        }).show();
    }
});


