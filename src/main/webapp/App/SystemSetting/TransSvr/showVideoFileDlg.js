
//管理自定义字段
Ext.define('App.SystemSetting.TransSvr.showVideoFileDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '硬盘状态',
    width: 900,
    height: 500,
    maximizable: true,
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
            name: 'SVRID',
            type: 'string'
        },
        {
            name: 'FID',
            type: 'string'
        },
        {
            name: 'CHNID',
            type: 'string'
        },
        {
            name: 'CHNNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("TDMC"),
                width: 160,
                renderer: function (value) {
                    return '<a title="' + Ext.htmlEncode(value) + '">' + Ext.htmlEncode(value) + '</a>';
                }
            }
        },
        {
            name: 'FTIME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STARTTIME"),
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    var dt = new Date(value);
                    dt.setTime(dt.getTime() - dt.getTimezoneOffset()*60*1000);
                    return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
                }
            }
        },
        {
            name: 'ENDTIME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("OVERTIME"),
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    var dt = new Date(value);
                    dt.setTime(dt.getTime() - dt.getTimezoneOffset() * 60 * 1000);
                    return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
                }
            }
        },
        {
            name: 'DIR',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '分区',
                width: 40,
                align: 'center'
            }
        },
        {
            name: 'FN',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("WJMC"),
                width: 220,
                align: 'center'
            }
        },
        {
            name: 'STAT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '文件状态',
                width: 80,
                align: 'center',
                renderer: function (value) {
                    if (value == '0')
                        return SPLanguage.getMessage("NORMAL");
                    else if (value == '1')
                        return '<a style="color:red;">录像中</a>';
                    else if (value == '2')
                        return '<a style="color:green;">锁定</a>';
                    return value;
                }
            }
        },
        {
            name: 'FSIZE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '大小',
                width: 100,
                align: 'center',
                renderer: function (value) {
                    value = parseInt(value);
                    if (value < 1024)
                        return value + 'Byte';
                    else if (value < 1024 * 1024)
                        return (value / 1024).toFixed(2) + 'KByte';
                    else if (value < 1024 * 1024 * 1024)
                        return (value / 1024 / 1024).toFixed(2) + 'MByte';
                    else
                        return (value / 1024 / 1024 / 1024).toFixed(2) + 'GByte';
                }
            }
        },
        {
            name: 'RECTYPE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '录像类型',
                width: 80,
                align: 'center',
                renderer: function (value) {
                    if (value == '0'
                    || value == 'S')
                        return '计划录像';
                    else if (value == '1'
                    || value == 'A')
                        return '<a style="color:red;">报警录像</a>';
                    return value;
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
            showBarPager: true,
            oldStyle: true,
            url: '../TransSvr/ListSvrVideoFiles',
            border: 0,
            columns: this.columns
        });

        this.list.store.sorters.add(new Ext.util.Sorter({
            property: 'FTIME',
            direction: 'DESC'
        }));

        this.items = [this.list];

        this.datetimeStartBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: SPLanguage.getMessage("TIMEFORMAT3"),
            cls: 'x-sp-toolbar-left'
        });

        this.datetimeEndBox = Ext.create('SZPT.view.ui.DateTimeBox', {
            format: SPLanguage.getMessage("TIMEFORMAT3"),
            cls: 'x-sp-toolbar-left'
        });

        this.chnname = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            defaultListConfig: { loadingHeight: 70, minWidth: 370, maxHeight: 370, shadow: 'sides' },
            width: 100,
            cls: 'x-sp-toolbar-left',
            url: '../DevMng/GetChnNameAutoCompleteList',
            displayField: 'NAME',
            valueField: 'ID',
            fields: [{
                name: 'ID'
            },
            {
                name: 'NAME'
            }]
        }
        );
        this.tbar = [
        SPLanguage.getMessage("STARTTIME"),
        this.datetimeStartBox,
        SPLanguage.getMessage("OVERTIME"),
        this.datetimeEndBox,
        SPLanguage.getMessage("TDMC"),
        this.chnname,
        {
            xtype: 'button',
            text: SPLanguage.getMessage("JS"),
            tooltip: SPLanguage.getMessage("JS"),
            iconCls: 'icon-find',
            cls: 'x-sp-toolbar-left',
            scope: me,
            handler: me.onSearch
        },
        {
            xtype: 'button',
            text: '锁定文件',
            tooltip: '锁定文件',
            cls: 'x-sp-toolbar-left',
            iconCls: 'icon-lock',
            scope: me,
            handler: function () {
                this.lockFile(1);
            }
        },
        {
            xtype: 'button',
            text: '解锁文件',
            tooltip: '解锁文件',
            cls: 'x-sp-toolbar-left',
            iconCls: 'icon-unlock',
            scope: me,
            handler: function () {
                this.lockFile(0);
            }
        }];
        this.callParent(arguments);

    },
    afterRender: function () {
        this.callParent(arguments);
        this.onSearch();
    },
    onSearch: function () {
        var vme = this;
        vme.list.store.clearFilter(true);
        vme.list.store.filter([{
            property: 'SVRID',
            value: this.USERID
        },
        {
            property: 'STARTTIME',
            value: this.datetimeStartBox.getValue()
        },
        {
            property: 'STOPTIME',
            value: this.datetimeEndBox.getValue()
        },
        {
            property: 'CHNNAME',
            value: this.chnname.getRawValue()
        }]);
        vme.updateLayout();
    },
    lockFile: function (lock) {
        var vsel = this.list.getSelectionModel().getSelection();
        var v = [];
        for (var i = 0; i < vsel.length; i++) {
            var dt = new Date(vsel[i].get('FTIME'));
            v.push({ GLOBALID: vsel[i].get('CHNID'), FTIME: Ext.Date.format(dt, 'Y-m-d H:i:s'), LOCK: lock });
        }
        var text = '锁定';
        if (lock == 0)
            text = '解锁';
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDY") + text + '录像文件？', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ING") + text + '录像文件，请稍候！' });
            myMask.show();
            Ext.Ajax.request({
                url: '../TransSvr/LockVideoFiles', //查询案件详细信息
                method: 'post', //方法  
                params: { FILES: Ext.JSON.encode(v), SVRID: this.USERID },
                scope: this,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.list.reLoad();
                    }
                    else {
                        alert('锁定文件失败！');
                    }
                }
            });
        },
        this);
    }
});


