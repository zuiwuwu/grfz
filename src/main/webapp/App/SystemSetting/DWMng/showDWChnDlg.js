Ext.define('App.SystemSetting.DWMng.showDWChnDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal : true,
    title: '点位设备',
    maximizable: true,
    //minimizable: true,
    width: 800,
    height: 500,
    requires: ['App.Common.ImageButtonEx'],
    initComponent: function () {
        var vme = this;
 		var columns = [
            {
            name: 'GLOBALID',
            type: 'string'
        },{
            name: 'JKSBBH',
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
            name: 'CHNNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '通道名称',
                width: 260,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    return '<a title="' + Ext.htmlEncode(value) + '">' + Ext.htmlEncode(value)+ '</a>';
                }
            }
        }, {
            name: 'JSFXNAME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '监视方向',
                width: 60
            }
        }];
        var vzd = Ext.CustomDic.getZD('0');
        for(var i = 0;i < vzd.length;i ++)
        {
        	if(vzd[i].SRLX == 3)
        	{
        	    columns.push(
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
        		columns.push(
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
        columns.push(
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
                width: 60
            }
        }, 
        {
            name: 'VCOUNT',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '访问次数',
                align: 'center',
                width: 60 
            }
        }, 
        {
            name: 'ZXSC',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '在线率',
                align: 'center',
                width: 60 ,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                	var DXSC = record.get('DXSC');
                    if(value != ''
                    &&DXSC != '')
                    {
                    	value = parseInt(value);
                    	DXSC = parseInt(DXSC) + value;
                    	if(DXSC == 0)
                    		return '0%';
                    	value = Math.round(value*1000/DXSC)/10;
                    	return value + '%';
                    }
                    return '0%';
                }
            }
        }, 
        {
            name: 'DXSC',
            type: 'string'
        }, 
        {
            name: 'JKSBZT',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '状态',
                 align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    if (value == '1')
                        return '在线';
                    return '<a style="color:red;">断线</a>';
                },
                width: 40 
            }
        }, 
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                 xtype: 'actioncolumn',
                header: '操作',
                flex: 1 ,
                items: [
                {
                    iconCls: 'icon-details',
                    tooltip: '查看',
                    text: '查看',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex, item,e) {
                    	 this.onShowChnMenu(grid, rowIndex, colIndex, e,false);
                    }
                }]
            }
        });
        this.chnlist = Ext.create('App.Common.ImagePreview',
        {
            gridautoLoad: false,
            showBarPager: false,
            oldStyle: true,
            selType: 'rowmodel',
            border: 0,
            url: '../DevMng/ListDevChn',
            columns: columns
        });
        this.items = [this.chnlist];
        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        {
        	iconCls: 'icon-refresh',
        	text: '刷新',
        	scope: this,
        	handler:function()
        	{
        		this.chnlist.reLoad();
        	}
        }];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
         this.onSearch();
    },
    onSearch: function () {
        this.chnlist.store.clearFilter(true);
            this.chnlist.store.filter([{
                property: 'DWBH',
                value: this.DWBH
            }]);

    },
    onShowChnMenu: function (grid, rowIndex, colIndex, e,showedit) {
        var vme = this;
        var rec = grid.getStore().getAt(rowIndex);
        var x = e.getX() - this.getX();
        var y = e.getY() - this.getY();
        var DEVICEID = rec.get('DEVICEID');
        var CHNTYPE = parseInt(rec.get('CHNTYPE'));
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [
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
                    text: '查看录像',
                    scope: this,
                   hidden: (CHNTYPE>1000)?true:false,
                    handler: function (grid, rowIndex, colIndex) {
                        Ext.create('App.SystemSetting.Dlg.showPlaybackDlg', {
                            chns: [{GLOBALID: rec.get('GLOBALID'),CHNNAME: rec.get('CHNNAME')}]
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
                },
                {
                    iconCls: 'icon-cog-edit',
                    tooltip: '对设备进行报修',
                    text: SPLanguage.getMessage("BAOXIU"),
                    actionid: 'bx',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        Ext.create('App.YWE.Repair.addDlg', {
                            url: '../Repair/AddRepair',
                            GLOBALID: rec.get('GLOBALID'),
                            title: '报修（<a style="color:Red">' + rec.get('CHNNAME') + '</a>）',
                            listeners: {
                                scope: this,
                                saveok: function () {
                                }
                            }
                        }).show();
                    }
                }]
        });

        contextMenu.showAt(e.getXY());
    }
});


