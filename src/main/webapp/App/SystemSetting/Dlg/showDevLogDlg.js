Ext.define('App.SystemSetting.Dlg.showDevLogDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: false,
    title: '设备日志',
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
            name: 'CHNNAME',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: SPLanguage.getMessage("SBMXM"),
                width: 180,
                handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //vme.devicename.setValue(rec.get('CHNNAME'));
                    vme.commonparams.GLOBALID = rec.get('GLOBALID');
                    vme.onSearch();
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
         this.datetimeStartBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: SPLanguage.getMessage("TIMEFORMAT3")
        });

        this.datetimeEndBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: SPLanguage.getMessage("TIMEFORMAT3")
        });


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [SPLanguage.getMessage("STARTTIME"), this.datetimeStartBox, SPLanguage.getMessage("OVERTIME"), this.datetimeEndBox, '设备名：', this.devicename, {
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
        var vdeviceid = this.commonparams.GLOBALID;
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
            vme.store.clearFilter(true);
            vme.store.filter(vfilters);
            vme.updateLayout();
        }
        else {
            vme.store.clearFilter(false);
            vme.updateLayout();
        }
    }
});


