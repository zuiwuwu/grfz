Ext.define('App.SystemSetting.Dlg.showDevChnLogDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: false,
    title: '设备通道日志',
    maximizable: true,
    //minimizable: true,
    width: 800,
    height: 500,
    requires: ['App.Common.ImageButtonEx'],
    initComponent: function () {
        var vme = this;

        this.chnlist = Ext.create('App.Common.ImagePreview',
        {
            gridautoLoad: false,
            showBarPager: false,
            oldStyle: true,
            selType: 'rowmodel',
            border: 0,
            url: '../DeviceChnLog/List',
            columns: [
            {
            name: 'ID',
            type: 'string'
        }, {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 32
            }
        }, {
            name: 'TIM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("TIME"),
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    var dt = new Date(value);
                    return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
                }
            }
        }, {
            name: 'GLOBALID',
            type: 'string'
        },
        {
            name: 'STAT',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '事件',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1')
                        return '登录';
                    return '登出';
                },
                flex: 1           //使该列自动填充剩余空间
            }
        }]
        });
        this.items = [this.chnlist];
        var now = new Date();
        now.setDate(now.getDate() - 1);
         this.datetimeStartBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: SPLanguage.getMessage("TIMEFORMAT3"),
            value: now
        });

        this.datetimeEndBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: SPLanguage.getMessage("TIMEFORMAT3"),
            value: new Date()
        });


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [SPLanguage.getMessage("STARTTIME"), this.datetimeStartBox, SPLanguage.getMessage("OVERTIME"), this.datetimeEndBox, {
            xtype: 'button',
            text: SPLanguage.getMessage("SEARCH"),
            tooltip: SPLanguage.getMessage("SEARCH"),
            iconCls: 'icon-find',
            scope: this,
            handler: function () {
                vme.onSearch();
            }
        }];
        this.callParent(arguments);
        this.chnlist.store.sorters.add(new Ext.util.Sorter({
            property: 'TIM',
            direction: 'DESC'
        }));
    },
    afterRender: function () {
        this.callParent(arguments);
         this.onSearch();
    },
    onSearch: function () {
        var vme = this;
        var vstarttime = this.datetimeStartBox.getValue();
        var vstoptime = this.datetimeEndBox.getValue();

        var vfilters = new Array();
        if (vstarttime) {
            vfilters.push({
                property: 'starttime',
                value: vstarttime
            });
        }
        if (vstoptime) {
            vfilters.push({
                property: 'stoptime',
                value: vstoptime
            });
        }
       vfilters.push({
                property: 'GLOBALID',
                value: this.GLOBALID
            });
        if (vfilters.length > 0) {
            this.chnlist.store.clearFilter(true);
            this.chnlist.store.filter(vfilters);
            this.chnlist.updateLayout();
        }
        else {
            this.chnlist.store.clearFilter(false);
            this.chnlist.updateLayout();
        }
    }
});


