
//管理自定义字段
Ext.define('App.SystemSetting.TransSvr.showNetDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '网络状态',
    width: 900,
    height: 500,
    initComponent: function () {
        var me = this;
        this.columns = [{
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                autoSizable: true,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 60
            }
        },
        {
            name: 'Name',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '网卡名称',
                width: 260,
                renderer: function (value) {
                    return '<a title="' + Ext.htmlEncode(value) + '">' + Ext.htmlEncode(value) + '</a>';
                }
            }
        },
        {
            name: 'IP',
            type: 'string',
            gridcol: {
                sortable: false,
                header: 'IP地址',
                width: 120,
                align: 'center'
            }
        },
        {
            name: 'Mac',
            type: 'string',
            gridcol: {
                sortable: false,
                header: 'MAC地址',
                width: 120,
                align: 'center'
            }
        },
        {
            name: 'NetSpeed',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '带宽',
                width: 60,
                align: 'center',
                renderer: function (value) {
                    return parseInt(value) + 'M';

                }
            }
        },
        {
            name: 'Status',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("STATE"),
                width: 60,
                align: 'center',
                renderer: function (value) {
                    if (value == 0) {
                        return '<a style="color:red;">未连接</a>';
                    }
                    else if (value == 1) {
                        return SPLanguage.getMessage("NORMAL");
                    }
                    else
                        return '<a style="color:red;" title="其它异常错误">未连接</a>';

                }
            }
        },
        {
            name: 'InSpeed',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '下行流量',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '')
                        return value;
                    value = parseFloat(value);
                    if (value < 1) {
                        return (value*1024).toFixed(2) + ' kbps';
                    }
                    else {
                        return value.toFixed(2) + ' mbps';
                    }
                }
            }
        },
        {
            name: 'OutSpeed',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '上行流量',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '')
                        return value;
                    value = parseFloat(value);
                    if (value < 1) {
                        return (value * 1024).toFixed(2) + ' kbps';
                    }
                    else {
                        return value.toFixed(2) + ' mbps';
                    }
                }
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                //hidden: true,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                minWidth: 0,
                items: []
            }
        }];

        this.list = Ext.create('App.Common.ImagePreview',
        {
            gridautoLoad: false,
            showImagePreview: false,
            showBarPager: false,
            oldStyle: true,
            url: '../TransSvrAsyn/GetSvrSystemStatus',
            border: 0,
            columns: this.columns
        });

        this.items = [this.list];


        this.tbar = [
        {
            xtype: 'button',
            text: SPLanguage.getMessage("REFRESH"),
            tooltip: SPLanguage.getMessage("REFRESH"),
            iconCls: 'icon-refresh',
            scope: me,
            handler: me.onSearch
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onSearch: function () {
        var myMask = new Ext.LoadMask(this, { msg: "正在查询网卡信息，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../TransSvrAsyn/GetSvrSystemStatus?ID=' + this.SVRID, //请求地址  
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    if (response.responseText != '') {
                        var result = Ext.JSON.decode(response.responseText);
                        this.list.store.loadData(result.NET);
                    }


                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    }
});


