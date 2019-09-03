//定义编辑对话框
Ext.define('App.SystemSetting.TempRight.myMng.newDlg', {
    extend: 'App.Common.Wizard',
    title: SPLanguage.getMessage("TJYH"),
    modifyMod: false,
    initComponent: function () {
        this.wizardItems = ['App.SystemSetting.TempRight.Info',
        'App.SystemSetting.UserPage.FunctionRight',
        'App.SystemSetting.UserPage.DevRight',
        'App.SystemSetting.UserPage.MapRight',
        'App.SystemSetting.UserPage.DWRight',
         Ext.create('App.SystemSetting.UserPage.TVWall', { isEnd: true })
        ];
        this.callParent(arguments);
    }
});


Ext.define('App.SystemSetting.TempRight.myMng', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    url: '../TempRight/List',
    showme: true,
    gridautoLoad : false,
    initComponent: function () {
        var vme = this;
        if(this.commonparams)
        {
        	if(this.commonparams.showme == 0)
        		this.showme = false;
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
            name: 'ID',
            type: 'string'
        },
        {
            name: 'USERID',
            type: 'string'
        }, {
            name: 'KSSJ',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '开始时间',
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    var dt = new Date(value);
                    return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
                }
            }
        }, {
            name: 'JSSJ',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '截止时间',
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                    var dt = new Date(value);
                    return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
                }
            }
        },
        {
            name: 'SQRXM',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '申请人',
                width: 80
            }
        },
        {
            name: 'ZT',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '状态',
                width: 80,
                align: 'center',
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                   if(value == 0)
                   		return '待审核';
                   	if(value == 1)
                   		return  '<a style="color:green;">审核通过</a>';
                   	if(value == 2)
                   		return '<a style="color:gray;">审核未通过</a>';
                   	if(value == 3)
                   		return '<a style="color:gray;">已取消</a>';
                   	if(value == 4)
                   		return '<a style="color:red;">已过期</a>';
                   	return value;
                }
            }
        },
        {
            name: 'SHRXM',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '审核人',
                width: 80
            }
        }, {
            name: 'SHSJ',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '审核时间',
                width: 160,
                renderer: function (value, metaData, record, rowIndex, colIndex, store) {
                	if(value == '')
                		return value;
                    var dt = new Date(value);
                    return Ext.Date.format(dt, SPLanguage.getMessage("TIMEFORMAT2"));
                }
            }
        },
        {
            name: 'SQYY',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '申请原因',
                flex: 1
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
                width: 160,
                isItemRender: function (item, itemIndex, record, rowIdx, colIdx, store, view) {
                    var ZT = record.get('ZT');
                    var userid = record.get('USERID');
                    if (item.text == SPLanguage.getMessage("EDIT")
                    &&ZT == 0)
                    {
                    	if(userid == Ext.commonparams.userid
                    	||Ext.checkFunRight(1012))
                    		return true;
                    	return false;
                    }
                    else if(item.text == SPLanguage.getMessage("DELETE"))
                    {
                    	if(userid == Ext.commonparams.userid)
                    		return true;
                    	return false;
                    }
                    else if(item.text == '审核'
                    &&ZT == 0)
                    {
                    	if(Ext.checkFunRight(1012))
                    		return true;
                    	return false;
                    }
                    else if(item.text == '取消')
                    {
                    	if(Ext.checkFunRight(1012)
                    	&&ZT == 1)
                    		return true;
                    	return false;
                    }
                    return false;
                },
                items: [{
                    iconCls: 'icon-edit',
                    text: SPLanguage.getMessage("EDIT"),
                    scope: this,
                    handler: this.onModifyClick
                },
                {
                    iconCls: 'icon-del',
                    text: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('ID'));
                    }
                },
                {
                    iconCls: 'icon-edit',
                    text: '审核',
                    scope: this,
                    handler: this.onSHClick
                },
                {
                    iconCls: 'icon-del',
                    text: '取消',
                    scope: this,
                    handler: this.onQXClick
                }
                ]
            }
        }];

        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
         {
             xtype: 'button',
             text: SPLanguage.getMessage("REFRESH"),
             tooltip: SPLanguage.getMessage("REFRESH"),
             iconCls: 'icon-refresh',
             scope: this,
             handler: this.onSearch
         },
        {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("PUSH"),
            scope: this,
            handler: this.onAddClick
        },
        {
            iconCls: 'icon-del',
            text: SPLanguage.getMessage("DELETE"),
            scope: this,
            handler: this.onDelClick
        }];



        this.callParent(arguments);
    },
			afterRender : function() {
				this.callParent(arguments);
				this.onSearch();
			},
     onSHClick: function (grid, rowIndex, colIndex) {
     	var rec = grid.getStore().getAt(rowIndex);
     	Ext.create('App.SystemSetting.TempRight.shDlg',{
     		ID: rec.get('ID'),
     		url: '../TempRight/sh',
     		listeners:
     		{
     			scope: this,
     			saveok:function ()
     			{
     				this.reLoad();
     			}
     		}
     	}).show();
     },
     onQXClick: function (grid, rowIndex, colIndex) {
     	var rec = grid.getStore().getAt(rowIndex);
     	var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要取消该临时权限?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在保存，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../TempRight/qx', //查询案件详细信息
                method: 'post', //方法  
                params: { ID: rec.get('ID') },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.onSearch();
                    }
                    else {
                        alert(SPLanguage.getMessage("DelFail"));
                    }
                }
            });
        });
     },
    onAddClick: function () {
        Ext.create('App.SystemSetting.TempRight.myMng.newDlg', {
            modifyMod: false,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'tempright'
            }
        }).show();
    },
    onModifyClick: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.SystemSetting.TempRight.myMng.newDlg', {
            modifyMod: true,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'tempright',
                ID: rec.get('ID')
            }
        });
        v.show();

        v.down('form').loadRecord(rec);
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除该临时权限?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../TempRight/Del', //查询案件详细信息
                method: 'post', //方法  
                params: { IDS: vchns },
                callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.onSearch();
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
                vchns += vsel[i].get('ID');
            }
            this.delChn(vchns);
        }

    },
    onSearch: function () {
        this.store.clearFilter(true);
		this.store.filter(this.getFilters());
    },
	getFilters : function() {
		var vme = this;
		var vfilters = new Array();
		vfilters.push({
					property : 'showme',
					value : this.showme
				});
		return vfilters;
	},
    onFinished: function (wizard) {
        var vme = this;
        var myMask = new Ext.LoadMask(wizard, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        if (wizard.modifyMod) {
            //修改模式
            var vValues = wizard.getValues();
            var rec = wizard.getItemRecord(0);
            vValues.ID = wizard.rightParams.ID;
            Ext.Ajax.request({
                url: '../TempRight/Edit', //查询案件详细信息
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
                            vme.onSearch();
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
        else {
            //添加模式
            var vValues = wizard.getValues();
            Ext.Ajax.request({
                url: '../TempRight/Add', //查询案件详细信息
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
                            vme.onSearch();
                        }
                    }
                    else {
                        alert(SPLanguage.getMessage("Net_Error"));
                    }
                }
            });
        }
    }
});
