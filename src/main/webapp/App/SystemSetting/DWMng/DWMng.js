
Ext.define('App.SystemSetting.DWMng.DWMng.groupTree', {
    extend: 'Ext.tree.Panel',
    //title: '拓扑结构',
    //animCollapse: true,
    rootVisible: true,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    enableDD: true,
    initComponent: function () {
        this.addEvents(
            'drapuserfinished'
        );
        var vme = this;
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            remoteFilter: true,
            root: { expanded: true, text: '所有单位', id: '' },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.urlGetGroupTree,
                reader: {
                    type: 'json'
                }
            }
        });

        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                dragGroup: 'group1',
                dropGroup: 'group1',
                enableDrag: true,
                enableDrop: true
            },
            listeners: {
                beforedrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
                    var vIDS = '';
                    for (var i = 0; i < data.records.length; i++) {
                        if (vIDS != '')
                            vIDS += ',';
                        vIDS += data.records[i].get('DWBH');
                    }
                    dropHandlers.wait = true;
                    Ext.MessageBox.show({ icon: Ext.MessageBox.QUESTION, buttons: Ext.MessageBox.YESNOCANCEL, title: SPLanguage.getMessage("REMINDER"), msg: '是否需要改变点位的编号？点击[是]会改变点位的编号，会导致之前历史数据无法查询。<br>点击[否]将不修改点位编号。点击[取消]将不移动点位。', fn: function (btn) {
                        if (btn === 'yes'
                        || btn === 'no') {
                            Ext.Ajax.request({
                                url: '../DWMng/EditDWUnitID',
                                method: 'post', //方法  
                                params: { DWBH: vIDS, GXDWDM: overModel.get('id'), MODIFYBH: (btn === 'yes') ? 1 : 0 },
                                callback: function (options, success, response) {
                                    dropHandlers.cancelDrop();
                                    if (success) {
                                        vme.fireEvent('drapuserfinished');
                                    }
                                    else {
                                        alert(SPLanguage.getMessage("Net_Error"));
                                    }
                                }
                            });
                        } else {
                            dropHandlers.cancelDrop();
                        }

                    }
                    });
                },
                drop: function (node, data, overModel, dropPosition, eOpts) {
                }
            }
        };

        this.refreshTree = function () {
            vme.store.load();
        };

        this.callParent(arguments);
    }
});


Ext.define('App.SystemSetting.DWMng.DWMng.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    lastGXDWDM: '',
    initComponent: function () {
        var vme = this;
        this.viewConfig = {
            plugins: {
                ptype: 'gridviewdragdrop',
                dragGroup: 'group1',
                dropGroup: 'group2',
                enableDrag: true,
                enableDrop: false
            }
        };

        var LDZXNAME = null;
        var DWLXNAME = null;
        var DWTYPENM = null;
        if (Ext.commonparams.PROJECT == 'changzhouwc') {
        }
        else {
            LDZXNAME = {
                name: 'LDZXNAME',
                type: 'string',
                gridcol: {
                    sortable: true,
                    header: '路段走向',
                    width: 70
                }
            };
            DWLXNAME = {
                name: 'DWLXNAME',
                type: 'string',
                gridcol: {
                    sortable: true,
                    header: '点位类型',
                    width: 70
                }
            };
            DWTYPENM = {
                name: 'DWTYPENM',
                type: 'string',
                gridcol: {
                    sortable: true,
                    header: '点位关联',
                    width: 80
                }
            };
        }

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
            name: 'GXDWDM',
            type: 'string'
        },
        {
            name: 'DWBH',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位编号',
                width: 150,
                hidden: true
            }
        },
        {
            name: 'DWMC',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位名称',
                width: 200
            }
        },
        {
            name: 'DWWZ',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '点位位置',
                width: 200,
                hidden: true
            }
        },
        {
            name: 'UNITNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("GXDW"),
                width: 100
            }
        },
        {
            name: 'LXR',
            type: 'string'
        },
        {
            name: 'LXDH',
            type: 'string'
        },
        {
            name: 'GISPIC',
            type: 'string'
        },
        {
            name: 'DWTYPE',
            type: 'string'
        },
        {
            name: 'LDZX',
            type: 'string'
        },
        LDZXNAME,
        {
            name: 'DWLX',
            type: 'string'
        },
        DWLXNAME,
        DWTYPENM,
        {
            name: 'DWJD',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("LONGITUDE"),
                width: 90
            }
        },
        {
            name: 'DWWD',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("LATITUDE"),
                width: 90
            }
        },
        {
            name: 'ZBKK',
            type: 'string',
            gridcol: {
                sortable: false,
                hidden: true,
                header: '24小时有警卡口',
                width: 90,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1')
                        return SPLanguage.getMessage("YES");
                    return SPLanguage.getMessage("NO");
                }
            }
        },
        {
            name: 'ZBR',
            type: 'string',
            gridcol: {
                sortable: false,
                hidden: true,
                header: '值班人',
                width: 90
            }
        },
        {
            name: 'ZBDH',
            type: 'string',
            gridcol: {
                sortable: false,
                hidden: true,
                header: SPLanguage.getMessage("ZBDH"),
                width: 90
            }
        },
        {
            name: 'DWGISTYPE',
            type: 'string'
        },
        {
            name: 'MINZOOM',
            type: 'string'
        },
        {
            name: 'MAXZOOM',
            type: 'string'
        }]
        var vzd = Ext.CustomDic.getZD('2');
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
        this.columns.push({
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                //hidden: true,
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                minWidth: 300,
                items: [{
                    iconCls: 'icon-edit',
                    tooltip: SPLanguage.getMessage("EDIT"),
                    scope: this,
                    handler: this.onModifyClick
                },
                {
                    iconCls: 'icon-del',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('DWBH'));
                    }
                },
                {
                    iconCls: 'icon-web',
                    tooltip: '标注点位坐标',
                    text: '标注坐标',
                    scope: this,
                    handler: this.onSetPosClick
                },
                {
                    iconCls: 'icon-web',
                    tooltip: '点位示意图设置',
                    text: '点位示意图',
                    scope: this,
                    handler: this.onShowDWMap
                },
                {
                    iconCls: 'icon-copy',
                    tooltip: '复制参数到其他点位',
                    text: '复制到',
                    scope: this,
                    handler: this.onCopyParams
                }]
            }
        });

        this.dwname = Ext.create('App.Common.AutoComplete', {
            hideLabel: false,
            fieldLabel: '点位名称',
             labelWidth: 60,
            width: 200,
            url: 'DWMng/GetAutoCompleteList',
            displayField: 'NAME',
            valueField: 'ID',
            cls: 'x-sp-toolbar-left',
            fields: [{
                name: 'ID'
            },
            {
                name: 'NAME'
            }]
        }
        );

        this.combDWTYPE = Ext.create('App.Common.ComboBoxDropList', {
            hideLabel: false,
            fieldLabel: '点位类型',
             labelWidth: 60,
            width: 180,
            value: '',
            cls: 'x-sp-toolbar-left',
            url: '../DWMng/GetDWTYPEComboAll'
        });

        this.groupTitle = Ext.create('Ext.draw.Text', {
            text: SPLanguage.getMessage("SYDW")
        });
        //////////////////////////////////////////////////////////////////////////
        //工具栏
       var items =  [
        this.dwname,
        this.combDWTYPE];
        
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
        items.push(
         {
             xtype: 'button',
             text: SPLanguage.getMessage("SEARCH"),
             tooltip: SPLanguage.getMessage("SEARCH"),
             iconCls: 'icon-find',
             cls: 'x-sp-toolbar-left',
             scope: this,
             handler: this.onSearch
         },
        {
        	xtype: 'button',
            iconCls: 'icon-add',
             cls: 'x-sp-toolbar-left',
            text: SPLanguage.getMessage("PUSH"),
            scope: this,
            handler: this.onAddClick
        },
        {
        	xtype: 'button',
            iconCls: 'icon-del',
             cls: 'x-sp-toolbar-left',
            text: SPLanguage.getMessage("DELETE"),
            scope: this,
            handler: this.onDelClick
        },
        {
        	xtype: 'button',
            iconCls: 'icon-web',
             cls: 'x-sp-toolbar-left',
            text: '图层管理',
            scope: this,
            handler: function () {
                if (vme.parentTab) {
                    vme.parentTab.addFeed('点位图层管理', 'App.SystemSetting.DWMng.LayerMng', true, {});
                }
            }
        },{
        	xtype: 'button',
            iconCls: 'icon-edit',
             cls: 'x-sp-toolbar-left',
            text: '自定义图标',
            scope: this,
            handler: function () {
                Ext.create('App.SystemSetting.CutomLayer.editIconDlg', {
                }).show();
            }
        },
        {
        	xtype: 'button',
            iconCls: 'icon-add',
             cls: 'x-sp-toolbar-left',
            text: '工具',
            menu: [{
                iconCls: 'icon-export',
                text: SPLanguage.getMessage("EXPORT"),
                scope: this,
                handler: this.onExportClick
            },
            {
                iconCls: 'icon-import',
                text: '导入新点位',
                scope: this,
                handler: this.onImportAddClick
            },
            {
                iconCls: 'icon-import',
                text: '导入更改点位',
                scope: this,
                handler: this.onBatchAddClick
            }
            ]
        });

        this.tbar = [{
        	xtype: 'container',
            width: '100%',
            layout: 'auto',
            items: items
        }];
        this.changeGroup = function (GXDWDM, text) {
            if (vme.lastGXDWDM != GXDWDM) {
                vme.lastGXDWDM = GXDWDM;
                vme.refreshChn();
                //vme.setTitle(text);
                //vme.groupTitle.setText(text);
            }
        };

        this.callParent(arguments);
    },
    getFilters: function () {
        var filters = [
            {
                property: 'DWMC',
                value: this.dwname.getRawValue()
            },
            {
                property: 'GXDWDM',
                value: this.lastGXDWDM
            },
            {
                property: 'DWTYPE',
                value: this.combDWTYPE.getValue()
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
        this.store.clearFilter(true);
        this.store.filter(this.getFilters());
        this.updateLayout();
    },
    onExportClick: function () {
        Ext.saveframe.src = '../DWMng/Export?filters=' + encodeURIComponent(Ext.encode(this.getFilters()));
    },
    onImportAddClick: function () {
        var vme = this;
        Ext.create('App.Common.UploadFileDlg', {
            url: '../DWMng/UploadExcelAdd',
            title: SPLanguage.getMessage("IMPORTDATA"),
            ID: this.lastGXDWDM,
            modurl: '../download/点位模板.xls',
            listeners: {
                scope: this,
                saveok: function (result) {
                    this.reLoad();
                }
            }
        }).show();
    },
    onAddClick: function () {
        //         if (typeof this.lastGXDWDM == 'undefined'
        //         || this.lastGXDWDM == '') {
        //             Ext.Msg.alert(SPLanguage.getMessage("REMINDER"), '请选择管辖单位！');
        //             return;
        //         }
        Ext.create('App.SystemSetting.DWMng.newDlg', {
            url: '../DWMng/AddDW',
            modifyMod: false,
            UNITID: this.lastGXDWDM,
            listeners: {
                scope: this,
                saveok: this.onFinished
            }
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.DWMng.newDlg', {
            url: '../DWMng/EditDW',
            modifyMod: true,
            UNITID: rec.get('GXDWDM'),
            DWBH: rec.get('DWBH'),
            listeners: {
                scope: this,
                saveok: this.onFinished
            }
        });
        v.show();
        //v.down('form').loadRecord(rec);
    },
    onSetPosClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        Ext.create('App.SystemSetting.Dlg.setPositionDlg', {
            isgpsmessure: true,
            lng: parseFloat(rec.get('DWJD')),
            lat: parseFloat(rec.get('DWWD')),
            mc: rec.get('DWMC'),
            bh: rec.get('DWBH'),
            url: '../GISDW/UpdateDWJWD',
            listeners:
            {
                scope: this,
                saveok: function () {
                    this.reLoad();
                }
            }
        }).show();
    },
    onShowUserClick: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (vme.parentTab) {
            vme.parentTab.addFeed(rec.get('DWMC') + '值班人员', 'App.SystemSetting.DWMng.DWUserMng', true, { DWBH: rec.get('DWBH') });
        }
    },
    onShowDWMap: function (grid, rowIndex, colIndex) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        if (vme.parentTab) {
            vme.parentTab.addFeed('点位地图管理', 'App.GIS.DWChn', true, { DWBH: rec.get('DWBH'), DWMC: rec.get('DWMC') });
        }
    },
    onCopyParams: function (grid, rowIndex, colIndex) {
		var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        
        Ext.create('App.SystemSetting.DWMng.copyDlg',{
        	DWBH: rec.get('DWBH'),
        	DWMC: rec.get('DWMC'),
        	listeners:{
        		scope: this,
        		saveok:this.onShowSelDW
        	}
        }).show();
    },
    onShowSelDW:function(dlg,values)
    {
		Ext.create('App.SystemSetting.Dlg.selDWDlgEx',{
        				listeners:{
        		scope: this,
        		saveok:function(v)
        		{
        			values.DESTDWS = v;
        			var myMask = new Ext.LoadMask(this, { msg: "正在复制参数，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../DWMng/CopyParams', 
                method: 'post', //方法  
                params: values,
                scope: this,
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            this.reLoad();
                    }
                    else {
                        alert('复制失败！');
                    }
                }
            });
        		}
        	}
        			}).show();
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: vme.urlDelGroupChn, //查询案件详细信息
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
                vchns += vsel[i].get('DWBH');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        this.refreshChn();
    },
    onFinished: function () {
        var vme = this;
        vme.refreshChn();
    }
});

Ext.define('App.SystemSetting.DWMng.DWMng', {
    extend: 'Ext.Panel',
    layout: 'border',
    forumId: '',
    border: 0,
    urlGetGroupTree: '../UNIT/GetUnitTree',
    urlAddGroupChn: '../DWMng/AddDW',
    urlListGroupChn: '../DWMng/ListGroupDW',
    urlDelGroupChn: '../DWMng/DelDW',
    initComponent: function () {
        this.items = [this.createRight(), this.createOCX()];
        // call the superclass's initComponent implementation
        this.callParent(arguments);
    },
    createOCX: function () {

        this.vchnlist = Ext.create('App.SystemSetting.DWMng.DWMng.List', {
            parentTab: this.parentTab,
            region: 'center',
            //title: '根',
            urlAddGroupChn: this.urlAddGroupChn,
            url: this.urlListGroupChn,
            urlDelGroupChn: this.urlDelGroupChn
        });

        return this.vchnlist;
    },
    createRight: function () {
        var v = Ext.create('App.SystemSetting.DWMng.DWMng.groupTree', {
            region: 'east',
            title: SPLanguage.getMessage("GXDW"),
            width: 210,
            split: true,
            border: 1,
            minWidth: 230,
            maxWidth: 230,
            collapsible: true,
            urlAddGroup: this.urlAddGroup,
            urlEditGroup: this.urlEditGroup,
            urlDelGroup: this.urlDelGroup,
            urlGetGroupTree: this.urlGetGroupTree,
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

