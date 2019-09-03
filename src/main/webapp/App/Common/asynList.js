Ext.define('App.Common.asynList', {
    extend: 'Ext.panel.Panel',
    layout: 'card',
    listtype: 'grid', //默认显示类型
    dataviewItemSelector: 'div.imagepreview-thumb-wrap', //图标
    dataviewOverItemCls: 'x-imagepreview-item-over', //图标
    multiSelect: true, //是否多选
    selType: 'checkboxmodel', //选择类型
    mode: 'SIMPLE',
    gridpageSize: 25,
    columns: [], //列
    imageSrcParam: 'src', //缩略图url字段
    imageCaptionParam: 'caption', //缩略图显示名称字段
    showImagePreview: false,
    showProgressBarPager: true,
    showBarPager: true,
    oldStyle: false,
    requires: ['App.Common.grid.asynPaging'],
    colomuModification: 10,
    hideHeaders: false,
    timeout: 30000,
    filters: [],
    sorters: [],
    url: '',
    currentPage: 1,
    pageitemselectkey: null,
    initComponent: function () {
        var me = this;
        this.pageseleceditems = [];
        this.filters = [];
        me.addEvents(
            'itemdblclick',
            'selectionchange',
            'select',
            'deselect',
            'dataload',
            'afterload'
        );
        //TODO:当showImagePreview=true的时候不进来
        Ext.apply(me.viewConfig, {
            oldStyle: me.oldStyle,
            colomuModification: me.colomuModification,
            getMaxContentWidth: function (header) {
                var me = this,
            cells = me.el.query(header.getCellInnerSelector()),
            originalWidth = header.getWidth(),
            i = 0,
            ln = cells.length,
            hasPaddingBug = Ext.supports.ScrollWidthInlinePaddingBug,
            columnSizer = me.body.select(me.getColumnSizerSelector(header)),
            max = Math.max,
            paddingAdjust, maxWidth;

                if (hasPaddingBug && ln > 0) {
                    paddingAdjust = me.getCellPaddingAfter(cells[0]);
                }

                // Set column width to 1px so we can detect the content width by measuring scrollWidth
                columnSizer.setWidth(1);

                // Allow for padding round text of header
                maxWidth = header.textEl.dom.offsetWidth + header.titleEl.getPadding('lr');
                for (; i < ln; i++) {
                    maxWidth = max(maxWidth, cells[i].scrollWidth);
                }
                if (hasPaddingBug) {
                    // in some browsers, the "after" padding is not accounted for in the scrollWidth
                    maxWidth += paddingAdjust;
                }
                //修正加宽的像素
                if (!me.oldStyle) {
                    maxWidth += me.colomuModification;
                }
                // 40 is the minimum column width.  TODO: should this be configurable?
                maxWidth = max(maxWidth, 40);

                // Set column width back to original width
                columnSizer.setWidth(originalWidth);

                return maxWidth;
            }
        });

        me.lisenersObj = {
            scope: me,
            itemdblclick: function (grid, record, item, index, e, eOpts) {
                me.fireEvent('itemdblclick', grid, record, item, index, e, eOpts);
            },
            selectionchange: function (grid, selected, eOpts) {
                me.fireEvent('selectionchange', grid, selected, eOpts);
            },
            select: function (grid, record, index, eOpts) {
                if (this.pageitemselectkey) {
                    var id = record.get(this.pageitemselectkey);
                    if (!this.isItemSelected(id)) {
                        this.pageseleceditems.push(record.raw);
                    }
                }
                me.fireEvent('select', grid, record, index, eOpts);
            },
            deselect: function (grid, record, index, eOpts) {
                if (this.pageitemselectkey) {
                    var id = record.get(this.pageitemselectkey);
                    this.removeSelectedItem(id);
                }
                me.fireEvent('deselect', grid, record, index, eOpts);
            },
            sortchange: function (ct, column, direction, eOpts) {
                me.fireEvent('sortchange', ct, column, direction, eOpts);
                me.sorters = [{ "property": column.dataIndex, "direction": direction}];
                me.startSearch();
            }
        };
        var vfields = new Array();
        var vcolumns = new Array();

        if (!me.dataviewShowImageTpl) {
            me.dataviewShowImageTpl = new Ext.XTemplate(
                                '<tpl for=".">',
                                                '<div class="imagepreview-thumb-wrap" id="{name:stripTags}">',
                                                    Ext.String.format('<div class="imagepreview-thumb"><img src="{{0}}" title="{{1}:htmlEncode}"></div>', this.imageSrcParam, this.imageCaptionParam),
                                                    Ext.String.format('<span class="x-editable">{{0}:htmlEncode}</span>', this.imageCaptionParam),
                                                '</div>',
                                            '</tpl>',
                                            '<div class="x-clear"></div>'
                            );
        }

        if (!me.dataviewNotShowImageTpl) {
            me.dataviewNotShowImageTpl = new Ext.XTemplate(
                                 '<tpl for=".">',
                                '<div class="imagepreview-thumb-wrap" id="{name:stripTags}">',
                                                        Ext.String.format('<div class="imagepreview-thumb"><img src="" title="{{1}:htmlEncode}"></div>', this.imageCaptionParam),
                                                        Ext.String.format('<span class="x-editable">{{0}:htmlEncode}</span>', this.imageCaptionParam),
                                '</div>',
                                '</tpl>',
                                '<div class="x-clear"></div>'
            );
        }

        me.onInitSaveGridInfo();
        for (var i = 0; i < me.columns.length; i++) {
            if (typeof me.columns[i].name != 'undefined'
            && me.columns[i].name != '') {
                vfields.push({ name: me.columns[i].name, type: me.columns[i].type });
            }
            if (typeof me.columns[i].gridcol != 'undefined') {
                if (typeof me.columns[i].name != 'undefined'
                    && me.columns[i].name != '') {
                    me.columns[i].gridcol.dataIndex = me.columns[i].name;

                }
                if (me.columns[i].gridcol.flex == 1) {
                    me.columns[i].gridcol.hideable = false;
                }

                vcolumns.push(me.columns[i].gridcol);
            }
        }

        me.store = Ext.create('Ext.data.Store', {
            fields: vfields,
            autoLoad: false,
            pageSize: me.gridpageSize,
            remoteSort: false,
            remoteFilter: true,
            groupField: me.groupField
        });

        me.store.on('load', function () {
            if (this.pageitemselectkey) {
                var vsel = new Array();
                var store = this.store;
                for (var i = 0; i < store.getCount(); i++) {
                    var rec = store.getAt(i);
                    if (this.isItemSelected(rec.get(me.pageitemselectkey))) {
                        vsel.push(rec);
                    }

                }
                this.getSelectionModel().select(vsel);
            }
        }, me);
        me.items = new Array();
        Ext.apply(me.lisenersObj, {
            columnschanged: function (ct, eOpts) {
                if (me.savetimerid) {
                    clearTimeout(me.savetimerid);
                    me.savetimerid = null;
                }
                me.savetimerid = setTimeout(function () {
                    me.onSaveGridInfo();
                }, 1000);
            },
            columnmove: function (ct, column, fromIdx, toIdx, eOpts) {
                if (column.flex !== 1) {
                    if (me.savetimerid) {
                        clearTimeout(me.savetimerid);
                        me.savetimerid = null;
                    }
                    me.savetimerid = setTimeout(function () {
                        me.onSaveGridInfo();
                    }, 1000);
                }
            },
            columnresize: function (ct, column, width, eOpts) {
                if (column.flex !== 1) {
                    if (me.savetimerid) {
                        clearTimeout(me.savetimerid);
                        me.savetimerid = null;
                    }
                    me.savetimerid = setTimeout(function () {
                        me.onSaveGridInfo();
                    }, 1000);
                }
            }
        });

        if (me.oldStyle) {
            me.vdatagrid = Ext.create('Ext.grid.Panel', {
                selType: me.selType,
                store: me.store,
                mode: me.mode,
                columns: vcolumns,
                stripeRows: true,
                autoScroll: true,
                border: 0,
                columnLines: true, //显示网格竖线
                rowLines: true,
                viewConfig: me.viewConfig,
                features: me.gridfeatures,
                plugins: me.cellEditing ? [me.cellEditing] : null,
                listeners: me.lisenersObj,
                hideHeaders: me.hideHeaders
            });
        }
        else {
            me.vdatagrid = Ext.create('App.Common.grid.Grid', {
                selType: me.selType,
                store: me.store,
                mode: me.mode,
                columns: vcolumns,
                stripeRows: true,
                autoScroll: true,
                border: 0,
                columnLines: true, //显示网格竖线
                rowLines: true,
                viewConfig: me.viewConfig,
                features: me.gridfeatures,
                plugins: me.cellEditing ? [me.cellEditing] : null,
                listeners: me.lisenersObj,
                hideHeaders: me.hideHeaders
            });
        }

        me.items.push(me.vdatagrid);

        if (me.showImagePreview) {
            me.vdataview = Ext.create('Ext.view.View', Ext.apply({
                autoScroll: true,
                trackOver: true,
                itemSelector: me.dataviewItemSelector,
                multiSelect: me.multiSelect,
                overItemCls: me.dataviewOverItemCls,
                tpl: me.dataviewNotShowImageTpl,
                store: me.store,
                listeners: me.lisenersObj,
                processItemEvent: function (record, item, index, e) {
                    return me.processDataViewItemEvent(me.vdataview, record, item, index, e);
                }
            }, me.viewConfig));
            me.items.push(me.vdataview);
        }


        if (me.showBarPager) {
            if (me.oldStyle) {
                if (me.showProgressBarPager) {
                    me.pagingbar = Ext.create('App.Common.grid.asynPaging',
                    {
                        parentpanel: me,
                        displayInfo: true,
                        plugins: me.createProgressBarPager(),
                        url: this.url,
                        oldStyle: this.oldStyle,
                        baseCls: Ext.baseCSSPrefix + 'toolbar'
                    });

                }
                else {
                    me.pagingbar = Ext.create('App.Common.grid.asynPaging',
                    {
                        parentpanel: me,
                        displayInfo: true,
                        url: this.url,
                        oldStyle: this.oldStyle,
                        baseCls: Ext.baseCSSPrefix + 'toolbar'
                    });
                }
                me.bbar = me.pagingbar;
            }
            else {
                if (me.showProgressBarPager) {
                    me.pagingbar = Ext.create('App.Common.grid.asynPaging',
                    {
                        parentpanel: me,
                        displayInfo: true,
                        plugins: me.createProgressBarPager(),
                        url: this.url
                    });

                }
                else {
                    me.pagingbar = Ext.create('App.Common.grid.asynPaging',
                    {
                        parentpanel: me,
                        displayInfo: true,
                        url: this.url
                    });
                }
                me.bbar = me.pagingbar;
            }
        }


        me.callParent(arguments);
    },
    afterRender: function () {
        var me = this;
        me.callParent();
        var vtype = this.listtype;
        this.listtype = null;
        me.showListType(vtype);
    },
    isItemSelected: function (id) {
        var me = this;
        var items = this.pageseleceditems;
        var a;
        var key = this.pageitemselectkey;
        for (var i = 0; i < items.length; i++) {
            a = items[i];
            if (a[key] == id)
                return true;
        }
        return false;
    },
    removeSelectedItem: function (id) {
        var me = this;
        var items = this.pageseleceditems;
        var a;
        var key = this.pageitemselectkey;
        for (var i = 0; i < items.length; i++) {
            a = items[i];
            if (a[key] == id) {
                items.splice(i, 1);
                break;
            }
        }
    },
    getSelectedItems: function () {
        var v = [];
        var me = this;
        var items = this.pageseleceditems;
        for (var i = 0; i < items.length; i++) {
            v.push(items[i]);
        }
        return v;
    },
    getSelectedString: function () {
        var v = '';
        var me = this;
        var items = this.pageseleceditems;
        var key = this.pageitemselectkey;
        for (var i = 0; i < items.length; i++) {
            var rec = items[i];
            if (v != '')
                v += ',';
            v += rec[key];
        }
        return v;
    },
    createProgressBarPager: function () {
        var v = Ext.create('App.Common.grid.asynProgressBarPager', {
        });
        return v;
    },
    showListType: function (vtype) {
        var me = this;
        if (!me.showImagePreview)
            return;
        var vlasttype = me.listtype;
        if (me.listtype != vtype) {
            me.listtype = vtype;
            if (me.listtype == 'grid') {
                me.vdataview.tpl = me.dataviewNotShowImageTpl;
                me.getLayout().setActiveItem(0);
            }
            else if (me.listtype == 'dataview') {
                me.getLayout().setActiveItem(1);
                me.vdataview.tpl = me.dataviewShowImageTpl;
                me.vdataview.refresh();
            }
            if (vlasttype)
                me.onSaveGridInfo();
        }
    },
    getSelectionModel: function () {
        var me = this;
        if (!me.showImagePreview)
            return me.vdatagrid.getSelectionModel();
        if (me.listtype == 'grid') {
            return me.vdatagrid.getSelectionModel();
        }
        else if (me.listtype == 'dataview') {
            return me.vdataview.getSelectionModel();
        }
    },
    refresh: function () {
        var me = this,
            current = me.store.currentPage;
        if (me.fireEvent('beforechange', me, current) !== false) {
            me.store.loadPage(current);
        }
    },
    onSaveGridInfo: function () {
        var me = this;
        if (me.oldStyle)
            return;
        var vname = me.$className;
        if (vname == 'App.CLCX.ImagePreview')
            return;
        var vcols = [];
        var vgrid = me.vdatagrid;
        var vlastindex = 0;
        for (var i = 0; i < vgrid.columns.length; i++) {
            var vcol = vgrid.columns[i];
            if (typeof vcol.dataIndex != 'undefined'
            && vcol.dataIndex != ''
            && vcol.flex !== 1) {
                var vindex = vcol.getIndex();
                if (vindex == -1) {
                    vindex = vlastindex;
                }
                vlastindex = vindex;
                vcols.push({
                    name: vcol.dataIndex,
                    hidden: vcol.isHidden(),
                    width: vcol.width,
                    index: vindex
                });
            }
        }
        var vgridinfo = {
            name: vname,
            listtype: me.listtype,
            columns: vcols
        };
        var vtext = encodeURIComponent(JSON.stringify(vgridinfo));
        if (Ext.commonparams.savetocookie) {
            if (window.localStorage) {
                window.localStorage[vname] = vtext;
            }
            else {
                Ext.log('浏览器不支持localStorage');
            }
        }
        else {
        }
    },
    onInitSaveGridInfo: function () {
        var me = this;
        if (me.oldStyle)
            return;
        var vname = me.$className;
        if (vname == 'App.Common.ImagePreview')
            return;
        if (Ext.commonparams.savetocookie) {
            var vtext = '';
            if (window.localStorage) {
                vtext = window.localStorage[vname];
                if (typeof vtext == 'undefined')
                    return;
            }
            else {
                Ext.log('浏览器不支持localStorage');
                return;
            }
            try {
                var vgridinfo = Ext.JSON.decode(decodeURIComponent(vtext));
                me.listtype = vgridinfo.listtype;

                var vmapcols = {};
                for (var i = 0; i < vgridinfo.columns.length; i++) {
                    vmapcols[vgridinfo.columns[i].name] = vgridinfo.columns[i];
                }
                var vindex = -1;
                for (var i = 0; i < me.columns.length; i++) {
                    if (typeof me.columns[i].gridcol != 'undefined') {
                        if (me.columns[i].gridcol.flex == 1) {
                            me.columns[i].index = 1000;
                        }
                        else if (me.columns[i].name == '') {
                            me.columns[i].index = -2;
                        }
                        else {
                            var vcolname = me.columns[i].name;
                            var vsavecol = vmapcols[vcolname];
                            if (typeof vsavecol != 'undefined') {
                                if (!me.columns[i].gridcol.notsavehide) {
                                    me.columns[i].gridcol.hidden = vsavecol.hidden;
                                }
                                me.columns[i].gridcol.width = vsavecol.width;
                                me.columns[i].index = vsavecol.index;
                                if (me.columns[i].gridcol.width < 10)
                                    me.columns[i].gridcol.width = 10;
                                vindex = vsavecol.index;
                            }
                            else {
                                me.columns[i].index = vindex;
                            }
                        }

                    }
                    else {
                        me.columns[i].index = vindex;
                    }
                }

                me.columns.sort(function (a, b) {
                    return a.index - b.index;
                });
            }
            catch (err) {
                Ext.log(err);
            }
        }
        else {
        }
    },
    processDataViewItemEvent: function (grid, record, item, index, e) {
        return true;
    },
    reLoad: function () {
        this.startSearch();
    },
    onMsgResult: function (result) {
        if (result.resultmsg) {
            var data = [];
            for (var i = 0; i < result.resultmsg.length; i++) {
                if ('failed' == result.resultmsg[i].msgtype) {
                    //this.pro.updateProgress(1, result.resultmsg[i].msg);
                    this.stopSearch();
                    return;
                }
                else if ('data' == result.resultmsg[i].msgtype) {
                    data.push(result.resultmsg[i].data);
                }
                else {

                }

            }
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    this.fireEvent('dataload', this, data[i]);
                }
                this.store.add(data);
            }

        }
        //this.pro.updateText('已完成' + result.finishedcount);
        if (result.finished) {
            //this.pro.updateProgress(1, '完成');
            this.stopSearch();
            if (this.pagingbar)
                this.pagingbar.startGetCount();
            this.fireEvent('afterload', this);
        }
    },
    onGetMsg: function () {
        if (this.getmsging)
            return;
        this.getmsging = true;
        var me = this;
        this.getmsghandle = Ext.Ajax.request({
            url: this.url + 'GetSearchResult',
            params: { wndid: this.getId(), id: this.workid },
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
                    this.stopSearch();
                    Ext.log("网络错误！");
                    this.getmsging = false;
                }
            }
        });
    },
    startSearch: function () {
        if (this.pro)
            this.pro.updateProgress(0, '正在查询过车信息。。。');
        this.stopSearch();
        this.store.removeAll();
        var me = this;
        var vparams = {
            wndid: this.getId(),
            page: this.currentPage,
            start: (this.currentPage - 1) * this.gridpageSize,
            limit: this.gridpageSize,
            sort: Ext.JSON.encode(this.sorters),
            filter: Ext.JSON.encode(this.filters)
        };
        me.fireEvent('beforeload', me);
        this.loadMask = new Ext.LoadMask(this, { msg: "正在查询..." });
        this.loadMask.show();
        this.starthandle = Ext.Ajax.request({
            url: this.url + 'StartSearch',
            params: vparams,
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                this.starthandle = null;
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        me.tatolcount = result.total;
                        if (result.rows) {
                            //已经取到数据
                            for (var i = 0; i < result.rows.length; i++) {
                                this.fireEvent('dataload', this, result.rows[i]);
                            }

                            me.store.loadData(result.rows);
                            me.stopSearch();
                            if (me.pagingbar)
                                me.pagingbar.startGetCount();
                            me.fireEvent('afterload', me);
                        }
                        else {
                            me.workid = result.workid;
                            me.gettimerid = setInterval(function () {
                                me.onGetMsg();
                            },
                        1000);

                            me.protimerid = setInterval(function () {
                                me.lastvalue += 0.01;
                                if (me.lastvalue > 1.0)
                                    me.lastvalue = 0.0;
                                //me.pro.updateProgress(me.lastvalue);
                            },
                        100);
                        }

                    }
                    else {
                        this.stopSearch();
                        alert(result.msg);
                    }
                }
                else {
                    this.stopSearch();
                    if (response.status == 404)
                        alert("函数不存在！");
                    else if (response.status == 500)
                        alert("函数执行错误！");
                    else
                        alert("网络错误！");
                }
            }
        });

    },
    stopSearch: function () {
        this.getmsging = false;
        if (this.loadMask)
            this.loadMask.hide();
        this.loadMask = null;
        if (this.gettimerid)
            clearInterval(this.gettimerid);
        this.gettimerid = null;
        if (this.protimerid)
            clearInterval(this.protimerid);
        this.protimerid = null;
        if (this.workid) {
            Ext.Ajax.request({
                url: this.url + 'StopSearch',
                params: { wndid: this.getId(), id: this.workid },
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
    search: function (filters) {
        this.currentPage = 1;
        this.pageseleceditems = [];
        this.filters = filters;
        this.startSearch();
    },
    destroy: function () {
        this.stopSearch();
        this.callParent(arguments);
    },
    previousPage: function () {
        this.currentPage -= 1;
        this.startSearch();
    },
    nextPage: function () {
        this.currentPage += 1;
        this.startSearch();
    },
    loadPage: function (page) {
        this.currentPage = page;
        this.startSearch();
    },
    getCount: function () {
        return this.store.getCount();
    }
});