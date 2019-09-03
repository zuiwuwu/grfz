//关城门管理
Ext.define('App.SystemSetting.DevMng.CloseCityMng', {
    extend: 'App.Common.ImagePreview',
    showImagePreview: false,
    gridautoLoad: false,
    url: '../CloseCityMng/ListItems',
    initComponent: function () {
        var vme = this;
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
                width: 200
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
        },
        {
            name: 'JKSBZT',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("STATE"),
                width: 80,
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
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                sortable: false,
                minWidth: 60,
                xtype: 'actioncolumn',
                flex: 1,
                items: [
                {
                    iconCls: 'icon-del',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('GLOBALID'));
                    }
                }]
            }
        }];
        this.tbar = [{
        	iconCls: 'icon-add',
        	text: '添加通道',
        	scope: this,
        	handler:function()
        	{
        		Ext.create('App.SystemSetting.Dlg.selVideoDlg',{
        			title: '选择视频通道',
        			SELID: 'guanchengmen',
        			saveurl: '../CloseCityMng/AddChn',
        			gridurl: '../CloseCityMng/getSelItems',
        			listeners: {
        				scope: this,
        				saveok:function()
        				{
        					this.reLoad();
        				}
        			}
        		}).show();
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
        vme.store.load();
        vme.updateLayout();
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../CloseCityMng/DelChn', 
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
                vchns += vsel[i].get('GLOBALID');
            }
            this.delChn(vchns);
        }

    }
});

