//警车管理
Ext.define('App.SystemSetting.PoliceCar.mng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../GISPoliceCar/ListItems',
    initComponent: function () {
        var vme = this;
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: '序号',
                width: 60
            }
        },
        {
            name: 'ID',
            type: 'string'
        },
        {
            name: 'RCVID',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '接收编号',
                width: 80,
                hidden: true
            }
        },
        {
            name: 'CLHP',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '车辆号牌',
                width: 80,
                align: 'center'
            }
        },
        {
            name: 'X',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '经度',
                width: 100,
                align: 'center'
            }
        },
        {
            name: 'Y',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '纬度',
                width: 100,
                align: 'center'
            }
        },
        {
            name: 'XSJD',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '角度',
                width: 60,
                align: 'center'
            }
        },
        {
            name: 'XSSD',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '速度',
                width: 60,
                align: 'center'
            }
        },
        {
            name: 'LASTUPDATETIME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '坐标更新时间',
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (!value
                    || value == '')
                        return value;
                    var dt = new Date(value);
                    return Ext.Date.format(dt, 'Y年m月d日 H:i:s');
                }
            }
        },
        {
            name: 'GLR',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '管理人',
                width: 100
            }
        },
        {
            name: 'PHONE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '电话',
                width: 100
            }
        },
        {
            name: 'GXDWBH',
            type: 'string'
        },
        {
            name: 'UNITNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '管辖单位',
                width: 100
            }
        },
        {
            name: 'CLLX',
            type: 'string'
        },
        {
            name: 'CLLXNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '图标',
                width: 80,
                align: 'center'
            }
        },
        {
            name: 'CLZT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '状态',
                width: 60,
                align: 'center'
            }
        },
        {
            name: 'GZZT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '故障状态',
                width: 60,
                align: 'center'
            }
        },
        {
            name: 'VIDEOCOUNT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '视频通道数',
                width: 60,
                align: 'center'
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: '操作',
                //hidden: true,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                minWidth: 300,
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: '编辑',
                    scope: this,
                    handler: this.onModifyClick
                },
                {
                    iconCls: 'icon-del',
                    tooltip: '删除',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('ID'));
                    }
                },
                {
                    iconCls: 'icon-edit',
                    tooltip: '视频设置',
                    scope: this,
                    handler: this.onSetVideoClick
                },
                {
                    iconCls: 'icon-details',
                    tooltip: '查看轨迹',
                    scope: this,
                    handler: this.onShowTrackClick
                }]
            }
        }];

        this.dwname = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 100,
            url: '../GISPoliceCar/GetAutoCompleteList',
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

        this.combDWTYPE = Ext.create('App.Common.ComboBoxDropList', {
            hideLabel: true,
            width: 160,
            value: '',
            editable: true,
            url: '../GISPoliceCar/GetGLLX'
        });
        
        
        this.combCLFL = Ext.create('App.Common.ComboBoxDropList', {
            hideLabel: true,
            width: 160,
            value: '',
            editable: true,
            multiSelect: true,
            url: '../GISPoliceCar/GetCLFL'
        });
        ////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        '车辆号牌',
        this.dwname,
        '图标',
        this.combDWTYPE,
         '类型',
        this.combCLFL,
         {
             xtype: 'button',
             text: '搜索',
             tooltip: '搜索',
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
         },
         '-',
        {
            iconCls: 'icon-add',
            text: '添加',
            scope: this,
            handler: this.onAddClick
        },
        {
            iconCls: 'icon-del',
            text: '删除',
            scope: this,
            handler: this.onDelClick
        },
        '-',
        {
            iconCls: 'icon-import',
            text: '导入',
            scope: this,
            handler: this.onImportAddClick
        },
        {
            iconCls: 'icon-export',
            text: '导出',
            scope: this,
            handler: this.onExportClick
        },'-',
        {
            iconCls: 'icon-web',
            text: '地图查看',
            scope: this,
            handler: function()
            {
            	window.open('../Main/CommonView?class=App.SystemSetting.PoliceCar.map');
            }
        }];
        this.callParent(arguments);
    },
    getFilters: function () {
        return [
            {
                property: 'CLHP',
                value: this.dwname.getRawValue()
            },
            {
                property: 'CLLX',
                value: this.combDWTYPE.getValue()
            },
            {
                property: 'CLFL',
                value: this.combCLFL.getSubmitValue()
            }];
    },
    onExportClick: function () {
        Ext.saveframe.src = '../GISPoliceCar/Export?filters=' + encodeURIComponent(Ext.encode(this.getFilters()));
    },
    onImportAddClick: function () {
        var vme = this;
        Ext.create('App.Common.UploadFileDlg', {
            url: '../GISPoliceCar/UploadExcel',
            title: '导入数据',
            //modurl: '../download/点位模板.xls',
            listeners: {
                scope: this,
                saveok: function (result) {
                    this.reLoad();
                }
            }
        }).show();
    },
    onAddClick: function () {
        Ext.create('App.SystemSetting.PoliceCar.newDlg', {
            url: '../GISPoliceCar/Add',
            listeners: {
                scope: this,
                saveok: function () {
                    this.reLoad();
                }
            }
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.PoliceCar.newDlg', {
            url: '../GISPoliceCar/Edit',
            CARID: rec.get('ID'),
            listeners: {
                scope: this,
                saveok: function () {
                    this.reLoad();
                }
            }
        });
        v.show();
    },
    onSetVideoClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.Dlg.selVideoDlg', {
            gridurl: '../GISPoliceCar/listSelChn',
            saveurl: '../GISPoliceCar/saveSelChn',
            SELID: rec.get('ID'),
            listeners: {
                scope: this,
                saveok: function () {
                    this.reLoad();
                }
            }
        });
        v.show();
    },
    onShowTrackClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.PoliceCar.Track', {
            CLID: rec.get('ID'),
            CLHP: rec.get('CLHP')
        });
        v.show();
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm('提示', '是否确定要删除?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../GISPoliceCar/Del', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.reLoad();
                    }
                    else {
                        alert('删除失败！');
                    }
                }
            });
        });

    },
    onDelClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var vchns = '';
            for (var i = 0; i < vsel.length; i++) {
                if (vchns != '')
                    vchns += ',';
                vchns += vsel[i].get('ID');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        this.store.clearFilter(true);
        this.store.filter(this.getFilters());
        this.updateLayout();
    }
});
