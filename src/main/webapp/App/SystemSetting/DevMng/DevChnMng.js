Ext.define('App.SystemSetting.DevMng.DevChnMng.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    lastGID: '',
    gridautoLoad: false,
    title: '所有通道',
    titleAlign: 'center',
    requires: ['App.Common.HyperLinkColumn'],
    initComponent: function () {
        var vme = this;
        this.viewConfig = {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'group1',
                dropGroup: 'group2',
                enableDrag: true,
                enableDrop: false
            },
            listeners: {
                drop: function (node, data, dropRec, dropPosition) {
                    //var dropOn = dropRec ? ' ' + dropPosition + ' ' + dropRec.get('name') : ' on empty view';
                    //Ext.example.msg('Drag from right to left', 'Dropped ' + data.records[0].get('name') + dropOn);
                }
            }
        };
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: SPLanguage.getMessage("SERIALNUM"),
                width: 60
            }
        },
        {
            name: 'GLOBALID',
            type: 'string'
        },
        {
            name: 'CHNNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("TDMC"),
                width: 200,
                xtype: 'hyperlinkcolumn',
                handler: function (grid, rowIndex, colIndex, cellIndex, e) {
                    vme.onShowChnMenu(grid, rowIndex, colIndex, e);
                },
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    vcol.showtip = true;
                    return Ext.htmlEncode(value);
                }
            }
        },
        {
            name: 'CHNID',
            type: 'string'
        },
        {
            name: 'DEVICEID',
            type: 'string'
        },
        {
            name: 'DEVICENAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("SBMXM"),
                width: 150,
                xtype: 'hyperlinkcolumn',
                handler: function (grid, rowIndex, colIndex, cellIndex, e) {
                    vme.onShowDevMenu(grid, rowIndex, colIndex, e);
                },
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    vcol.showtip = true;
                    return Ext.htmlEncode(value);
                }
            }
        },
        {
            name: 'ADDR',
            type: 'string',
            gridcol: {
                sortable: true,
                hidden: true,
                header: '设备地址',
                width: 100,
                xtype: 'hyperlinkcolumn',
                handler: function (grid, rowIndex, colIndex, cellIndex, e) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.create('App.SystemSetting.DevMng.pingDlg', {
                        IP: rec.get('ADDR')
                    }).show();
                }
            }
        },
        {
            name: 'PORT',
            type: 'string',
            gridcol: {
                sortable: true,
                hidden: true,
                header: '端口',
                width: 60
            }
        },
        {
            name: 'KKBH',
            type: 'string'
        },
        {
            name: 'DWMC',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位名称',
                width: 150,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + Ext.htmlEncode(value) + '">' + Ext.htmlEncode(value) + '</a>';
                }
            }
        },
        {
            name: 'GID',
            type: 'string'
        },
        {
            name: 'GNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '分组名称',
                width: 150
            }
        },
        {
            name: 'PRODUCTNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '设备型号',
                width: 80,
                align: 'center'
            }
        },
        {
            name: 'CHNMODEL',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '通道型号',
                width: 80,
                align: 'center'
            }
        },
        {
            name: 'CHNTYPE',
            type: 'string'
        },
        {
            name: 'CHNTYPENM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STYLE"),
                align: 'center',
                width: 80
            }
        }];
        
        var vzd = Ext.CustomDic.getZD('0');
        for(var i = 0;i < vzd.length;i ++)
        {
        	if(vzd[i].SRLX == 3)
        	{
        	    this.columns.push(
		        {
		            name: 'CUSTOM_' + vzd[i].ZDLX + 'NAME',
		            type: 'string',
		            gridcol: {
		                sortable: true,
		                header: vzd[i].ZDLXNM,
		                width: 100
		            }
		        });	
        	}
        	else
        	{
        		this.columns.push(
		        {
		            name: 'CUSTOM_' + vzd[i].ZDLX,
		            type: 'string',
		            gridcol: {
		                sortable: true,
		                header: vzd[i].ZDLXNM,
		                width: 100
		            }
		        });
        	}
        }
        this.columns.push(
        {
            name: 'TZSC',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '上传上级',
                width: 60,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1') {
                        return '是';
                    }
                    return '否';
                }
            }
        },
        {
            name: 'JKSBZT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STATE"),
                width: 50,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1') {
                        return '在线';
                    }
                    return '<a style="color:Red">断线</a>';
                }
            }
        },
        {
            name: 'PINGMSG',
            type: 'string'
        },
        {
            name: 'PINGSTATUS',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '网络状态',
                width: 70,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1') {
                        return '<a style="color:Red" title="' + Ext.htmlEncode(record.get('PINGMSG')) + '">故障</a>';
                    }
                    return SPLanguage.getMessage("NORMAL");
                }
            }
        },
        {
            name: 'SJSJ',
            type: 'string'
        },
        {
            name: 'SJZT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '数据状态',
                width: 70,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '0') {
                        return '<a style="color:Red" title="' + Ext.htmlEncode('最后数据时间：' + record.get('SJSJ')) + '">无数据</a>';
                    }
                    return SPLanguage.getMessage("NORMAL");
                }
            }
        },
        {
            name: 'STAT',
            type: 'string',
            gridcol: {
                xtype: 'hyperlinkcolumn',
                sortable: true,
                header: '启用状态',
                width: 80,
                align: 'center',
                handler: function (grid, rowIndex, colIndex) {
                    vme.onEnableDev(grid, rowIndex, colIndex);
                },
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (value == '1') {
                        vcol.col = 'Black';
                        return SPLanguage.getMessage("DISABLE");
                    }
                    vcol.col = 'Red';
                    return SPLanguage.getMessage("QIY");
                }
            }
        },
        {
            name: 'CURVALUE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '当前值',
                width: 50,
                hidden: true
            }
        },
        {
            name: 'JKSBBH',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '设备编号',
                width: 100,
                hidden: true
            }
        });
        
        this.columns.push({
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                //hidden: true,
                sortable: false,
                minWidth: 360,
                xtype: 'actioncolumn',
                flex: 1,
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: SPLanguage.getMessage("EDIT"),
                    scope: this,
                    handler: this.onModifyClick
                },
                {
                    iconCls: 'icon-edit',
                    tooltip: '关联视频通道',
                    scope: this,
                    handler: this.onSetVideoClick
                },
                {
                    iconCls: 'icon-del',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('GLOBALID'));
                    }
                },
                {
                    iconCls: 'icon-details',
                    tooltip: '查看',
                    text: '查看',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex, item,e) {
                    	 vme.onShowChnMenu(grid, rowIndex, colIndex, e,false);
                    }
                }]
            }
        });

        this.chnname = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 200,
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


        this.chntype = Ext.create('App.Common.ComboBoxDropList', {
            hideLabel: false,
            width: 180,
            value: '',
            labelWidth: 60,
            fieldLabel: '通道类型',
            cls: 'x-sp-toolbar-left',
            url: '../DevMng/GetChnTypeList'
        });


        var states = Ext.create('Ext.data.Store', {
            fields: ['ID', 'NAME'],
            data: [
                { "ID": "0", "NAME": "通道名" },
                { "ID": "1", "NAME": "设备名" },
                { "ID": "2", "NAME": "点位名" }
            ]
        });


        this.searchType = Ext.create('Ext.form.ComboBox', {
            store: states,
            queryMode: 'local',
            displayField: 'NAME',
            valueField: 'ID',
            value: '0',
            editable: false,
            cls: 'x-sp-toolbar-left',
            width: 60
        });
        
       

        //////////////////////////////////////////////////////////////////////////
        //工具栏
		var vmenus =  {
             xtype: 'button',
             iconCls: 'icon-details',
             cls: 'x-sp-toolbar-left',
             text: '工具',
             menu: [{
                 iconCls: 'icon-add',
                 text: '批量添加',
                 scope: this,
                 handler: this.onAddClick
             },
             //              {
             //                  iconCls: 'icon-import',
             //                  text: SPLanguage.getMessage("IMPORT"),
             //                  scope: this,
             //                  handler: this.onImportClick
             //              },
             {
             iconCls: 'icon-import',
             text: '导入更改通道',
             scope: this,
             handler: this.onImportClick
         },
             {
                 iconCls: 'icon-export',
                 text: SPLanguage.getMessage("EXPORT"),
                 scope: this,
                 handler: this.onExportClick
             },
             {
                 iconCls: 'icon-import',
                 text: '从前端获取名称',
                 scope: this,
                 handler: this.onAddClick
             },
             {
                 iconCls: 'icon-import',
                 text: '生成点位',
                 scope: this,
                 handler: this.onCreateDW
             }]
     };
     var items = [this.searchType,
        this.chnname,
        this.chntype
        ];
        
        this.customdics = [];
        for(var i = 0;i < vzd.length;i ++)
        {
        	var item = Ext.CustomDic.createInput(vzd[i],{
        		cls: 'x-sp-toolbar-left',
        		 width: 200,
        		 editable: true,
        		 labelWidth: 60
        	});
        	 this.customdics.push(item);
        	items.push(item);
        }
         items.push({
             xtype: 'button',
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCH"),
             iconCls: 'icon-find',
             cls: 'x-sp-toolbar-left',
             scope: this,
             handler: this.onSearch
         });
//         	items.push({
//             xtype: 'button',
//             iconCls: 'icon-add',
//             cls: 'x-sp-toolbar-left',
//             text: SPLanguage.getMessage("PUSH"),
//             scope: this,
//             handler: this.onAddClick
//         });
         items.push({
             xtype: 'button',
             iconCls: 'icon-del',
             cls: 'x-sp-toolbar-left',
             text: SPLanguage.getMessage("DELETE"),
             scope: this,
             handler: this.onDelClick
         });
         items.push(vmenus);
        this.toolcontainer = Ext.create('Ext.Container',
        {
            width: '100%',
            layout: 'auto',
            items: items
        });

        this.tbar = [this.toolcontainer];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        this.refreshChn();
    },
    onEnableDev: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDY") + ((rec.get('STAT') != '1') ? SPLanguage.getMessage("QIY") : SPLanguage.getMessage("DISABLE")) + '通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZBCQSH") });
            myMask.show();
            Ext.Ajax.request({
                url: '../DevMng/enableChn',
                method: 'post', //方法  
                params: { GLOBALID: rec.get('GLOBALID'), bEnale: (rec.get('STAT') != '1') },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else {
                            vme.reLoad();
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        });
    },
    getFilters: function () {
        var vme = this;
        var vchnname = this.chnname.getRawValue();
        var vDeviceID = '';
        if (vme.commonparams) {
            vDeviceID = vme.commonparams.DEVICEID||'';
        }
        var filters = [{
            property: 'chnname',
            value: vchnname
        },
        {
            property: 'searchtype',
            value: this.searchType.getValue()
        },
        {
            property: 'GID',
            value: vme.lastGID
        },
        {
            property: 'DEVICEID',
            value: vDeviceID
        },
        {
            property: 'CHNTYPE',
            value: this.chntype.getValue()
        }];

        for (var i = 0; i < this.customdics.length; i++) {
            filters.push({
                property: this.customdics[i].name,
                value: this.customdics[i].getValue()
            });
        }
        return filters;
    },
    refreshChn: function () {
        var vme = this;
        vme.store.clearFilter(true);
        vme.store.filter(this.getFilters());
        vme.updateLayout();
    },
    changeGroup: function (GID, text, type) {
        if (this.lastGID != GID) {
            this.lastGID = GID;
            this.refreshChn();
            //vme.setTitle(text);
            this.setTitle(text);
        }
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.get('CHNTYPE') < 1000) {
            var v = Ext.create('App.SystemSetting.DevMng.DevVideoChnInfo', {
                GLOBALID: rec.get('GLOBALID'),
                url: '../DevMng/SetChnProp',
                listeners:
                {
                    scope: this,
                    saveok: function () {
                        this.reLoad();
                    }
                }
            });
            v.show();
        }
        else {
            var v = Ext.create('App.SystemSetting.DevMng.DevTrafficChnInfo', {
                GLOBALID: rec.get('GLOBALID'),
                url: '../DevMng/SetChnProp',
                listeners:
                {
                    scope: this,
                    saveok: function () {
                        this.reLoad();
                    }
                }
            });
            v.show();
        }
    },
    onSetVideoClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        if (rec.get('CHNTYPE') <= 9004
        &&rec.get('CHNTYPE') >= 9002) {
            Ext.create('App.SystemSetting.Dlg.selVideoDlg',{
            	gridurl: '../DevMng/listDevLinkVideoChn',
            	saveurl: '../DevMng/SetDevLinkVideoChn',
            	SELID: rec.get('JKSBBH'),
            	filters: [{property: 'JKSBBH',
            		value: rec.get('JKSBBH')}]
            }).show();
        }
        else
        {
        	Ext.MessageBox.alert('提示','只有抓拍设备能够关联通道！');
        }
        
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../DevMng/DelDevChn', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.refreshChn();
                    }
                    else {
                        alert(SPLanguage.getMessage("DelFail"));
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
                vchns += vsel[i].get('GLOBALID');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        this.refreshChn();
    },
    onFinished: function (wizard) {
        var vme = this;
        var vValues = wizard.getValues();
        vValues.DEVICEID = wizard.rightParams.ID;
        vValues.DWBH = wizard.rightParams.DWBH;
        var myMask = new Ext.LoadMask(vme, { msg: "正在添加通道，请稍候！" });
        myMask.show();
        Ext.Ajax.request({
            url: '../DevMng/AddDevChn', //查询案件详细信息
            method: 'post', //方法  
            jsonData: vValues,
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var v = Ext.JSON.decode(response.responseText);
                    if (!v.success)
                        alert(v.msg);
                    else {
                        wizard.close();
                        vme.refreshChn();
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    },
    onImportClick: function () {
        var vme = this;
        Ext.create('App.Common.UploadFileDlg', {
            url: '../DevMng/UploadChnExcel',
            title: '导入通道',
            modurl: '../download/DEVICE_CHN.xls',
            listeners: {
                scope: this,
                saveok: function (result) {
                }
            }
        }).show();
    },
    onExportClick: function () {
        Ext.saveframe.src = '../DevMng/ExportChn?filters=' + encodeURIComponent(Ext.encode(this.getFilters()));
    },
    onShowDevMenu: function (grid, rowIndex, colIndex, e) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        var x = e.getX() - this.getX();
        var y = e.getY() - this.getY();
        var DEVICEID = rec.get('DEVICEID');
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [{ iconCls: 'icon-car',
                text: '修改设备',
                scope: this,
                handler: function (widget, event) {
                    var v = Ext.create('App.SystemSetting.DevMng.newDlg', {
                        modifyMod: true,
                        listeners: {
                            scope: this,
                            finished: this.onFinished
                        },
                        rightParams: { ID: DEVICEID }
                    });
                    v.show();
                }
            }]
        });

        contextMenu.showAt(e.getXY());
    },
    onShowChnMenu: function (grid, rowIndex, colIndex, e,showedit) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        var x = e.getX() - this.getX();
        var y = e.getY() - this.getY();
        var DEVICEID = rec.get('DEVICEID');
        var CHNTYPE = parseInt(rec.get('CHNTYPE'));
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [{
                iconCls: 'icon-edit',
                text: SPLanguage.getMessage("EDIT"),
                scope: this,
                hidden: (showedit == false)?true:false,
                handler: function () {
                    this.onModifyClick(grid, rowIndex, colIndex);
                }
            },
                {
                    iconCls: 'icon-edit',
                    text: '设置关联视频通道',
                    scope: this,
                    hidden: (showedit == false)?true:false,
                    handler: function () {
                    	
                        Ext.create('App.SystemSetting.DevMng.setVideoChnDialg',
                        {
                            JKSBBH: rec.get('JKSBBH')
                        }).show();
                    }
                }, {
                    iconCls: 'icon-del',
                    text: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    hidden: (showedit == false)?true:false,
                    handler: function () {
                        this.delChn(rec.get('GLOBALID'));
                    }
                },
                {
                    iconCls: 'icon-replay',
                    tooltip: '查看实时视频',
                    text: '视频',
                    scope: this,
                   hidden: (CHNTYPE>1000)?true:false,
                    handler: function (grid, rowIndex, colIndex) {
                        Ext.create('App.AJZC.Real.showVideoDlg', {
                            GLOBALID: rec.get('GLOBALID')
                        }).show();
                    }
                },
                {
                    iconCls: 'icon-replay',
                    tooltip: '查看录像',
                    text: '录像',
                    scope: this,
                   hidden: (CHNTYPE>1000)?true:false,
                    handler: function (grid, rowIndex, colIndex) {
                        Ext.create('App.SystemSetting.Dlg.showPlaybackDlg', {
                           chns:  [{GLOBALID: rec.get('GLOBALID'),CHNNAME: rec.get('CHNNAME')}]
                        }).show();
                    }
                },
                {
                    iconCls: 'icon-replay',
                    tooltip: '查看实时过车',
                    text: '实时过车',
                    scope: this,
                    hidden: (CHNTYPE==9002||CHNTYPE==9003||CHNTYPE==9004)?false:true,
                    handler: function () {
                    	  var rec = grid.getStore().getAt(rowIndex);
                        Ext.create('App.SystemSetting.Dlg.showRealTrafficDlg',
                        {
                            title: rec.get('CHNNAME'),
                            JKSBBH: rec.get('JKSBBH')
                        }).show();
                    }
                },
                {
                    iconCls: 'icon-replay',
                    tooltip: '查看历史过车',
                    text: '历史过车',
                    scope: this,
                    hidden: (CHNTYPE==9002||CHNTYPE==9003||CHNTYPE==9004)?false:true,
                    handler: function () {
                         var rec = grid.getStore().getAt(rowIndex);
                        Ext.create('App.SystemSetting.Dlg.showCLCXDlg',
                        {
                            title: rec.get('CHNNAME'),
                            JKSBBH: rec.get('JKSBBH'),
                            showconditionbar: true
                        }).show();
                    }
                }]
        });

        contextMenu.showAt(e.getXY());
    },
    onCreateDW: function () {
        var vsel = this.getSelectionModel().getSelection();
        var v = new Array();
        for (var i = 0; i < vsel.length; i++) {
            v.push({ GLOBALID: vsel[i].get('GLOBALID'), CHNNAME: vsel[i].get('CHNNAME') });
        }

        Ext.create('App.SystemSetting.DevMng.addDWByDevDlg',
        {
            CHNS: v,
            url: '../DevMng/CreateDWByChn',
            listeners:
            {
                scope: this,
                saveok: function () {
                    this.reLoad();
                }
            }
        }).show();
    },
    onMngZDYZD: function () {
        Ext.create('App.SystemSetting.Dlg.setCustomKeyDlg',
        {
            KEYTYPE: 'DEVICE_CHN',
            listeners:
            {
                scope: this,
                close: function () {
                    this.getCustomKey();
                }
            }
        }).show();
    }
});

Ext.define('App.SystemSetting.DevMng.DevChnMng', {
    extend: 'Ext.Panel',
    layout: 'border',
    forumId: '',
    border: 0,
    urlGetGroupTree: '../DWMng/GetDWTree',
    urlListGroupChn: '../DevMng/ListDevChn',
    initComponent: function () {
        this.items = [this.createRight(), this.createOCX()];
        this.callParent(arguments);
    },
    createOCX: function () {
        this.vchnlist = Ext.create('App.SystemSetting.DevMng.DevChnMng.List', {
            region: 'center',
            url: this.urlListGroupChn,
            commonparams: this.commonparams,
            parentTab: this.parentTab
        });

        return this.vchnlist;
    },
    createRight: function () {
        var v = Ext.create('App.SystemSetting.DevMng.groupTree', {
            region: 'east',
            title: '点位树',
            width: 210,
            split: true,
            border: 1,
            minWidth: 230,
            maxWidth: 230,
            collapsible: true,
            urlEditDevGID: '../DevMng/EditChnGID',
            listeners: {
                scope: this,
                selectionchange: this.onSelectionchange,
                drapuserfinished: this.onDrapuserfinished
            }
        });
        return v;
    },
    onSelectionchange: function (tree, selected, eOpts) {
        if (selected.length > 0) {
            this.vchnlist.changeGroup(selected[0].get('id'), selected[0].get('text'));
        }
    },
    onDrapuserfinished: function () {
        this.vchnlist.refreshChn();
    }
});

