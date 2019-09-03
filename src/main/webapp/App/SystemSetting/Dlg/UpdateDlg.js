//接收服务器
Ext.define('App.SystemSetting.Dlg.UpdateDlg', {
    extend: 'Ext.window.Window',
    modal: true,
    layout: 'fit',
    showImagePreview: false,
    url: '../FileMng/ListFiles',
    requires: ['App.SWFUpload.UploadButton'],
    width: 600,
    height: 300,
    title: '升级包管理',
    updatetype: 'updatejkxx',
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
            name: 'ID',
            type: 'string'
        },
        {
            name: 'NM',
            type: 'string',
            gridcol: {
                sortable: true,
                header: SPLanguage.getMessage("NAME"),
                width: 200
            }
        },
        {
            name: 'FSIZE',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '文件大小',
                width: 80
            }
        },
        {
            name: 'CREATETIME',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '创建时间',
                width: 160
                //                 editor: {
                //                     xtype: 'numberfield',
                //                     allowBlank: false,
                //                     minValue: 0
                //                 }
            }
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: SPLanguage.getMessage("HANDLE"),
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                items: [
                {
                    iconCls: 'icon-del',
                    tooltip: SPLanguage.getMessage("DELETE"),
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        this.delChn(rec.get('ID'));
                    }
                }]
            }
        }];


        this.list = Ext.create('App.Common.ImagePreview',
        {
        	columns: this.columns,
        	listtype: 'fit',
    		showImagePreview: false,
    		url: this.url,
    		oldStyle: true,
    		gridautoLoad: false
        });


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.tbar = [
        {
            iconCls: 'icon-find',
            text: SPLanguage.getMessage("JS"),
            scope: this,
            handler: this.onSearch
        },
        {
        	xtype: 'fileuploadbutton',
            iconCls: 'icon-add',
            text: '上传更新模块',
            postParams: {parentid: this.updatetype},
            listeners:
            {
            	scope: this,
            	uploadsuccess:function(file, serverData, responseReceived)
            	{
            		this.list.reLoad();
            	}
            }
        }];

        this.items = [this.list];
        this.callParent(arguments);
    },
    afterRender:function()
    {
    	this.callParent(arguments);
    	this.onSearch();
    },
    onSearch: function () {
         var vme = this;
        vme.list.store.clearFilter(true);
        vme.list.store.filter([{
                property: 'PARENTID',
                value: vme.updatetype
            }]);
    },
    onFinished: function () {
        var vme = this;
        vme.onSearch();
    },
    delChn: function (vchns) {
        var vme = this;
        Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), '是否确定要删除通道?', function (result) {
            if (result != 'yes')
                return;
            var myMask = new Ext.LoadMask(vme, { msg: "正在删除通道，请稍候！" });
            myMask.show();
            Ext.Ajax.request({
                url: '../FileMng/Delete', //查询案件详细信息
                method: 'post', //方法  
                params: { id: vchns },
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
                        alert(SPLanguage.getMessage("DelFail"));
                    }
                }
            });
        });

    }
});
