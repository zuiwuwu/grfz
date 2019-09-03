//Ext.util.CSS.swapStyleSheet('App.Common.ImagePreview', '../App/Common/ImagePreview.css');
Ext.define('App.framework.frm.ImagePreview', {
    extend: 'Ext.panel.Panel',
    layout: 'card',   
    listtype: 'grid', //默认显示类型
    dataviewItemSelector: 'div.imagepreview-thumb-wrap', //图标
    dataviewOverItemCls: 'x-imagepreview-item-over', //图标
    multiSelect: true, //是否多选
    selType: 'checkboxmodel', //选择类型
    mode: 'SIMPLE',
    gridautoLoad: true,
    gridpageSize: 25,
    gridremoteSort: true,
    gridremoteFilter: true,
    url: '', //查询url
    columns: [], //列
    urlSmallPic : '../CLLSXX/ShowSmallPic',
    imageSrcParam: 'src', //缩略图url字段
    imageCaptionParam: 'caption', //缩略图显示名称字段
    showImagePreview: true,
    showProgressBarPager: false,
    showBarPager: true,
    oldStyle: false,
    requires: ['App.Common.grid.SPPaging'],
    colomuModification: 10,
    hideHeaders: false,
    saveGridColumnInfo: true,
    saveGridColumnInfoUrl: '../Save',
    timeout: 30000,
    pageitemselectkey: null,
    stripeRows: true,
    columnLines: true,
    rowLines: true,
    bodyStyle: {
    	background : 'transparent'
    },
    initComponent: function () {
        var me = this;
        me.pageseleceditems = [];
        me.addEvents(
            'itemdblclick',
            'selectionchange',
            'select',
            'deselect'
        );
        //TODO:当showImagePreview=true的时候不进来
        Ext.apply(me.viewConfig, {
            oldStyle: me.oldStyle,
            colomuModification: me.colomuModification,
            /*listeners: {
            refresh: function (dataview) {
            Ext.each(dataview.panel.columns, function (column) {
            if (column.autoSizeColumn === true)
            column.autoSize();
            })
            }
            },会触发两次，所以放在store的load事件*/
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
            if (me.columns[i] == null)
                continue;
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
            autoLoad: me.gridautoLoad,
            pageSize: me.gridpageSize,
            remoteSort: me.gridremoteSort,
            remoteFilter: me.gridremoteFilter,
            groupField: me.groupField,
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                timeout: this.timeout,
                api: {
                    read: me.url
                },
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                }
            }
        });

        me.store.on('beforeload', function (store, operation, eOpts) {
            if (operation.start > 0) {
                me.totalCount = store.getTotalCount();
            }
            else {
                me.totalCount = 0;
            }
        });

        me.store.on('datachanged', function (store, eOpts) {
            if (0 != me.totalCount) {
                store.totalCount = me.totalCount;
            }
        });

        me.store.on('load', function () {
            if (me.listtype == 'grid') {
                var dataview = me.vdatagrid.getView();
                Ext.each(dataview.panel.columns, function (column) {
                    if (column.autoSizable === true) {
                        //column.autoSize();
                        dataview.autoSizeColumn(column);
                    }
                });
            }
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
                stripeRows: this.stripeRows,
                autoScroll: true,
                border: false,
                columnLines: this.columnLines, //显示网格竖线
                rowLines: this.rowLines,
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
                stripeRows: this.stripeRows,
                autoScroll: true,
                border: false,
                columnLines: this.columnLines, //显示网格竖线
                rowLines: this.rowLines,
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
                    me.bbar = {
                        xtype: 'pagingtoolbar',
                        store: me.store,
                        displayInfo: true,
                        plugins: me.createProgressBarPager()
                    };
                }
                else {
                    me.bbar = {
                        xtype: 'pagingtoolbar',
                        store: me.store,
                        displayInfo: true
                    };
                }
            }
            else {
                if (me.showProgressBarPager) {
                    me.bbar = {
                        xtype: 'sppagingtoolbar',
                        store: me.store,
                        displayInfo: true,
                        plugins: me.createProgressBarPager()
                    };
                }
                else {
                    me.bbar = {
                        xtype: 'sppagingtoolbar',
                        store: me.store,
                        displayInfo: true
                    };
                }
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
        var v = Ext.create('App.Common.ProgressBarPager', {
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
        if (!me.saveGridColumnInfo
        || me.oldStyle)
            return;

        var vname = me.$className;
        if (vname == 'App.Common.ImagePreview')
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
        if (Ext.commonparams&&Ext.commonparams.savetocookie) {
            if (window.localStorage) {
                window.localStorage[vname] = vtext;
            }
            else {
                Ext.log('浏览器不支持localStorage');
            }

            //            var Days = 365; //此 cookie 将被保存 365 天
            //            var exp = new Date();    //new Date("December 31, 9998");
            //            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            //            document.cookie = vname + "=" + escape(vtext) + ";expires=" + exp.toGMTString();
        }
        else {
        }
    },
    onInitSaveGridInfo: function () {
        var me = this;
        if (!me.saveGridColumnInfo
        || me.oldStyle)
            return;
        var vname = me.$className;
        if (vname == 'App.Common.ImagePreview')
            return;
        if (Ext.commonparams&&Ext.commonparams.savetocookie) {
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

            //            var arr = document.cookie.match(new RegExp("(^| )" + vname + "=([^;]*)(;|$)"));
            //            if (arr == null)
            //                return;

            //            var Days = 365; //此 cookie 将被保存 365 天
            //            var exp = new Date();    //new Date("December 31, 9998");
            //            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            //            document.cookie = vname + "=" + escape(unescape(arr[2])) + ";expires=" + exp.toGMTString();
            //            vtext = unescape(arr[2]);
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
        this.store.load();
    },
    search: function (filters) {
        var me = this;
        this.pageseleceditems = [];

        me.store.clearFilter(true);
        me.store.filter(filters);
        me.updateLayout();
    },
    getView:function()
    {
    	return this.vdatagrid.getView();
    }
});