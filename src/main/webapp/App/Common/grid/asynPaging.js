
Ext.define('App.Common.grid.asynPaging', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.asynpagingtoolbar',
    requires: ['Ext.toolbar.TextItem', 'Ext.form.field.Number'],
    mixins: {
        bindable: 'Ext.util.Bindable'
    },
    baseCls: Ext.baseCSSPrefix + 'sptoolbar',

    displayInfo: false,

    prependButtons: false,

    displayMsg: '显示 {0} - {1} 条，总共 {2} 条',
    emptyMsg: '没有数据显示',
    //</locale>

    //<locale>
    /**
    * @cfg {String} beforePageText
    * The text displayed before the input item.
    */
    beforePageText: '第',
    //</locale>

    //<locale>
    /**
    * @cfg {String} afterPageText
    * Customizable piece of the default paging text. Note that this string is formatted using
    * {0} as a token that is replaced by the number of total pages. This token should be preserved when overriding this
    * string if showing the total page count is desired.
    */
    afterPageText: '页，共 {0}页',
    //</locale>

    //<locale>
    /**
    * @cfg {String} firstText
    * The quicktip text displayed for the first page button.
    * **Note**: quick tips must be initialized for the quicktip to show.
    */
    firstText: '第一页',
    //</locale>

    //<locale>
    /**
    * @cfg {String} prevText
    * The quicktip text displayed for the previous page button.
    * **Note**: quick tips must be initialized for the quicktip to show.
    */
    prevText: '上一页',
    //</locale>

    //<locale>
    /**
    * @cfg {String} nextText
    * The quicktip text displayed for the next page button.
    * **Note**: quick tips must be initialized for the quicktip to show.
    */
    nextText: '下一页',
    //</locale>

    //<locale>
    /**
    * @cfg {String} lastText
    * The quicktip text displayed for the last page button.
    * **Note**: quick tips must be initialized for the quicktip to show.
    */
    lastText: '最后一页',
    //</locale>

    //<locale>
    /**
    * @cfg {String} refreshText
    * The quicktip text displayed for the Refresh button.
    * **Note**: quick tips must be initialized for the quicktip to show.
    */
    refreshText: '刷新',
    //</locale>

    /**
    * @cfg {Number} inputItemWidth
    * The width in pixels of the input field used to display and change the current page number.
    */
    inputItemWidth: 30,

    /**
    * Gets the standard paging items in the toolbar
    * @private
    */

    totalcount: 0,
    getPagingItems: function () {
        var me = this;

        return [{
            itemId: 'first',
            tooltip: me.firstText,
            overflowText: me.firstText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
            disabled: true,
            handler: me.moveFirst,
            scope: me
        }, {
            itemId: 'prev',
            tooltip: me.prevText,
            overflowText: me.prevText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
            disabled: true,
            handler: me.movePrevious,
            scope: me
        },
        '-',
        {
            xtype: 'tbtext',
            baseCls: Ext.baseCSSPrefix + (this.oldStyle ? 'sptoolbar-oldstyle-text' : 'sptoolbar-text'),
            text: me.beforePageText
        },
        {
            xtype: 'numberfield',
            itemId: 'inputItem',
            name: 'inputItem',
            cls: Ext.baseCSSPrefix + 'tbar-page-number',
            allowDecimals: false,
            minValue: 1,
            hideTrigger: true,
            enableKeyEvents: true,
            keyNavEnabled: false,
            selectOnFocus: true,
            submitValue: false,
            // mark it as not a field so the form will not catch it when getting fields
            isFormField: false,
            width: me.inputItemWidth,
            margins: '-1 2 3 2',
            listeners: {
                scope: me,
                keydown: me.onPagingKeyDown,
                blur: me.onPagingBlur
            }
        }, {
            xtype: 'tbtext',
            itemId: 'afterTextItem',
            baseCls: Ext.baseCSSPrefix + (this.oldStyle ? 'sptoolbar-oldstyle-text' : 'sptoolbar-text'),
            text: Ext.String.format(me.afterPageText, 1)
        },
        '-',
        {
            itemId: 'next',
            tooltip: me.nextText,
            overflowText: me.nextText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
            disabled: true,
            handler: me.moveNext,
            scope: me
        }, {
            itemId: 'last',
            tooltip: me.lastText,
            overflowText: me.lastText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
            disabled: true,
            handler: me.moveLast,
            scope: me
        },
        '-',
        {
            itemId: 'refresh',
            tooltip: me.refreshText,
            overflowText: me.refreshText,
            iconCls: Ext.baseCSSPrefix + 'tbar-loading',
            handler: me.doRefresh,
            scope: me
        }];
    },

    initComponent: function () {
        var me = this,
            pagingItems = me.getPagingItems(),
            userItems = me.items || me.buttons || [];

        if (me.prependButtons) {
            me.items = userItems.concat(pagingItems);
        } else {
            me.items = pagingItems.concat(userItems);
        }
        delete me.buttons;

        if (me.displayInfo) {
            me.items.push('->');
            me.items.push({ xtype: 'tbtext', itemId: 'displayItem' });
        }

        me.callParent();

        me.addEvents(
        /**
        * @event change
        * Fires after the active page has been changed.
        * @param {Ext.toolbar.Paging} this
        * @param {Object} pageData An object that has these properties:
        *
        * - `total` : Number
        *
        *   The total number of records in the dataset as returned by the server
        *
        * - `currentPage` : Number
        *
        *   The current page number
        *
        * - `pageCount` : Number
        *
        *   The total number of pages (calculated from the total number of records in the dataset as returned by the
        *   server and the current {@link Ext.data.Store#pageSize pageSize})
        *
        * - `toRecord` : Number
        *
        *   The starting record index for the current page
        *
        * - `fromRecord` : Number
        *
        *   The ending record index for the current page
        */
            'change',

        /**
        * @event beforechange
        * Fires just before the active page is changed. Return false to prevent the active page from being changed.
        * @param {Ext.toolbar.Paging} this
        * @param {Number} page The page number that will be loaded on change
        */
            'beforechange'
        );
        me.on('beforerender', me.onLoad, me, { single: true });

    },
    // @private
    updateInfo: function () {
        var me = this,
            displayItem = me.child('#displayItem'),
            pageData = me.getPageData(),
            count, msg;

        if (displayItem) {
            if (this.loadding) {
                msg = '正在查询';
            }
            else {
                count = this.parentpanel.getCount();
                if (count === 0) {
                    msg = me.emptyMsg;
                } else {
                    msg = Ext.String.format(
                    me.displayMsg,
                    pageData.fromRecord,
                    pageData.toRecord,
                    pageData.total
                );
                }
            }

            displayItem.setText(msg);
        }
    },

    // @private
    onLoad: function () {
        var me = this,
            pageData,
            currPage,
            pageCount,
            afterText,
            count,
            isEmpty,
            item;
        count = me.parentpanel.getCount();
        isEmpty = count === 0;
        if (!isEmpty) {
            pageData = me.getPageData();
            currPage = pageData.currentPage;
            pageCount = pageData.pageCount;
            afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
        } else {
            currPage = 0;
            pageCount = 0;
            afterText = Ext.String.format(me.afterPageText, 0);
        }

        Ext.suspendLayouts();
        item = me.child('#afterTextItem');
        if (item) {
            item.setText(afterText);
        }
        item = me.getInputItem();
        if (item) {
            item.setDisabled(isEmpty).setValue(currPage);
        }
        isEmpty = false;
        me.setChildDisabled('#first', currPage === 1 || isEmpty);
        me.setChildDisabled('#prev', currPage === 1 || isEmpty);
        me.setChildDisabled('#next', currPage === pageCount || isEmpty);
        me.setChildDisabled('#last', currPage === pageCount || isEmpty);
        me.setChildDisabled('#refresh', false);
        me.updateInfo();
        Ext.resumeLayouts(true);

        if (me.rendered) {
            me.fireEvent('change', me, pageData);
        }
    },

    setChildDisabled: function (selector, disabled) {
        var item = this.child(selector);
        if (item) {
            item.setDisabled(disabled);
        }
    },

    // @private
    getPageData: function () {
        var parentpanel = this.parentpanel,
            totalCount = this.totalcount;

        return {
            total: totalCount,
            currentPage: parentpanel.currentPage,
            pageCount: Math.ceil(totalCount / parentpanel.gridpageSize),
            fromRecord: ((parentpanel.currentPage - 1) * parentpanel.gridpageSize) + 1,
            toRecord: Math.min(parentpanel.currentPage * parentpanel.gridpageSize, totalCount)

        };
    },

    // @private
    onLoadError: function () {
        if (!this.rendered) {
            return;
        }
        this.setChildDisabled('#refresh', false);
    },

    getInputItem: function () {
        return this.child('#inputItem');
    },

    // @private
    readPageFromInput: function (pageData) {
        var inputItem = this.getInputItem(),
            pageNum = false,
            v;

        if (inputItem) {
            v = inputItem.getValue();
            pageNum = parseInt(v, 10);
            if (!v || isNaN(pageNum)) {
                inputItem.setValue(pageData.currentPage);
                return false;
            }
        }
        return pageNum;
    },

    onPagingFocus: function () {
        var inputItem = this.getInputItem();
        if (inputItem) {
            inputItem.select();
        }
    },

    // @private
    onPagingBlur: function (e) {
        var inputItem = this.getInputItem(),
            curPage;

        if (inputItem) {
            curPage = this.getPageData().currentPage;
            inputItem.setValue(curPage);
        }
    },

    // @private
    onPagingKeyDown: function (field, e) {
        var me = this,
            k = e.getKey(),
            pageData = me.getPageData(),
            increment = e.shiftKey ? 10 : 1,
            pageNum;

        if (k == e.RETURN) {
            e.stopEvent();
            pageNum = me.readPageFromInput(pageData);
            if (pageNum !== false) {
                pageNum = Math.min(Math.max(1, pageNum), pageData.pageCount);
                if (me.fireEvent('beforechange', me, pageNum) !== false) {
                    me.parentpanel.loadPage(pageNum);
                }
            }
        } else if (k == e.HOME || k == e.END) {
            e.stopEvent();
            pageNum = k == e.HOME ? 1 : pageData.pageCount;
            field.setValue(pageNum);
        } else if (k == e.UP || k == e.PAGE_UP || k == e.DOWN || k == e.PAGE_DOWN) {
            e.stopEvent();
            pageNum = me.readPageFromInput(pageData);
            if (pageNum) {
                if (k == e.DOWN || k == e.PAGE_DOWN) {
                    increment *= -1;
                }
                pageNum += increment;
                if (pageNum >= 1 && pageNum <= pageData.pageCount) {
                    field.setValue(pageNum);
                }
            }
        }
    },

    // @private
    beforeLoad: function () {
        if (this.rendered) {
            this.setChildDisabled('#refresh', true);
        }
    },

    /**
    * Move to the first page, has the same effect as clicking the 'first' button.
    */
    moveFirst: function () {
        if (this.fireEvent('beforechange', this, 1) !== false) {
            this.parentpanel.loadPage(1);
        }
    },

    /**
    * Move to the previous page, has the same effect as clicking the 'previous' button.
    */
    movePrevious: function () {
        var me = this,
            prev = me.parentpanel.currentPage - 1;

        if (prev > 0) {
            if (me.fireEvent('beforechange', me, prev) !== false) {
                me.parentpanel.previousPage();
            }
        }
    },

    /**
    * Move to the next page, has the same effect as clicking the 'next' button.
    */
    moveNext: function () {
        var me = this,
            total = me.getPageData().pageCount,
            next = me.parentpanel.currentPage + 1;

        if (next <= total
        || total <= 0) {
            if (me.fireEvent('beforechange', me, next) !== false) {
                me.parentpanel.nextPage();
            }
        }
    },

    /**
    * Move to the last page, has the same effect as clicking the 'last' button.
    */
    moveLast: function () {
        var me = this,
            last = me.getPageData().pageCount;

        if (me.fireEvent('beforechange', me, last) !== false) {
            me.parentpanel.loadPage(last);
        }
    },

    /**
    * Refresh the current page, has the same effect as clicking the 'refresh' button.
    */
    doRefresh: function () {
        var me = this,
            current = me.parentpanel.currentPage;

        if (me.fireEvent('beforechange', me, current) !== false) {
            me.parentpanel.loadPage(current);
        }
    },
    // @private
    onDestroy: function () {
        this.stopGetCount();
        this.callParent();
    },
    onMsgResult: function (result) {
        if (result.resultmsg) {
            for (var i = 0; i < result.resultmsg.length; i++) {
                if ('failed' == result.resultmsg[i].msgtype) {
                    this.stopGetCount();
                    return;
                }
            }
        }
        if (result.finished) {
            this.totalcount = result.totalcount;
            this.stopGetCount();
            this.onLoad();
        }
    },
    onGetMsg: function () {
        if (this.getmsging)
            return;
        this.getmsging = true;
        var me = this;
        this.getmsghandle = Ext.Ajax.request({
            url: this.url + 'GetCountResult',
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
                        Ext.log(result.msg);
                        this.getmsging = false;
                    }
                }
                else {
                    this.stopGetCount();
                    Ext.log("网络错误！");
                    this.getmsging = false;
                }
            }
        });
    },
    startGetCount: function () {
        this.onLoad();
        if (this.filterstext == Ext.JSON.encode(this.parentpanel.filters)) {
            return;
        }
        this.filterstext = Ext.JSON.encode(this.parentpanel.filters);
        this.stopGetCount();
        this.loadding = true;
        this.totalcount = 0;
        this.updateInfo();
        var me = this;
        var vparams = {
            page: this.parentpanel.currentPage,
            limit: this.parentpanel.gridpageSize,
            wndid: this.parentpanel.getId(),
            sort: Ext.JSON.encode([]),
            filter: this.filterstext
        };

        this.starthandle = Ext.Ajax.request({
            url: this.url + 'StartGetCount',
            params: vparams,
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                this.starthandle = null;
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        if (result.totalcount) {
                            //已经取到数据
                            me.totalcount = result.totalcount;
                            me.stopGetCount();
                            me.onLoad();
                        }
                        else {
                            me.workid = result.workid;
                            me.gettimerid = setInterval(function () {
                                me.onGetMsg();
                            },
                        1000);

                        }

                    }
                    else {
                        Ext.log(result.msg);
                    }
                }
                else {
                    this.stopGetCount();
                    if (response.status == 404)
                        Ext.log("函数不存在！");
                    else if (response.status == 500)
                        Ext.log("函数执行错误！");
                    else
                        Ext.log("网络错误！");
                }
            }
        });

    },
    stopGetCount: function () {
        this.getmsging = false;
        this.loadding = false;
        if (this.gettimerid)
            clearInterval(this.gettimerid);
        this.gettimerid = null;
        if (this.workid) {
            Ext.Ajax.request({
                url: this.url + 'StopGetCount',
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
    }
});
