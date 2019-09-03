
Ext.define('App.SystemSetting.DevMng.discoveryDevDlg', {
    extend: 'Ext.window.Window',
    layout: 'fit',
    modal: true,
    title: '查找设备',
    urlStart: '../DevMng/StartDisconveryDev',
    urlStop: '../DevMng/StopDisconveryDev',
    urlKeepAlive: '../DevMng/GetDisconveryDevMsg',
    width: 800,
    height: 580,
    initComponent: function () {
  		this.createBtn();

        this.tbar = [this.startbtn,
        this.stopbtn,
        '-',
        {
        	iconCls: 'icon-add',
            text: '添加设备',
            scope: this,
            handler: this.onAddClick
        }];

        this.listdev = Ext.create('App.Common.ImagePreview',
        {
            gridautoLoad: false,
            showBarPager: false,
            gridremoteSort: false,
            gridremoteFilter: false,
            oldStyle: true,
            border: 0,
            columns: [
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
            name: 'IP',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'IP',
                width: 100
            }
        },
        {
            name: 'Address',
            type: 'string',
            gridcol: {
                sortable: true,
                header: 'UUID',
                width: 200
            }
        },
        {
            name: 'DisconveryType',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '类型',
                width: 60
            }
        },
        {
            name: 'XAddrs',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '连接地址',
                width: 200
            }
        },
        {
            name: 'MetadataVersion',
            type: 'string',
            gridcol: {
                sortable: true,
                header: '版本',
                width: 60
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
                items: []
            }
        }]
        });

        
        this.items = [this.listdev];
        
        this.callParent(arguments);
    },
    afterRender: function(){
    	 this.callParent(arguments);
    	 this.startPing();
    },
    createBtn: function () {
        this.startbtn = Ext.create('Ext.Button',
        {
            text: '启动',
            scope: this,
            handler: function () {
                this.startPing();
            }
        });
        this.stopbtn = Ext.create('Ext.Button',
        {
            text: SPLanguage.getMessage("STOP"),
            scope: this,
            disabled: true,
            handler: function () {
                this.stopPing();
            }
        });
    },
    onMsgResult: function (result) {
    	 if (result.resultmsg) {
            for (var i = 0; i < result.resultmsg.length; i++) {
                if ('finddev' == result.resultmsg[i].msgtype) {
                	this.listdev.store.add({
                		IP: result.resultmsg[i].IP,
                		Address: result.resultmsg[i].Address,
                		MetadataVersion: result.resultmsg[i].MetadataVersion,
                		Types: result.resultmsg[i].Types,
                		XAddrs: result.resultmsg[i].XAddrs,
                		DisconveryType: result.resultmsg[i].DisconveryType
                	});
                }
            }

        }
        if (result.finished) {
            this.stopPing();
        }
    },
    onGetMsg: function () {
        if (this.getmsging)
            return;
        this.getmsging = true;
        var me = this;
        this.getmsghandle = Ext.Ajax.request({
            url: this.urlKeepAlive,
            params: { id: this.workid },
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                this.getmsghandle = null;
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        this.getmsging = false;
                        this.onMsgResult(result);
                    }
                    else {
                        alert(result.msg);
                        this.getmsging = false;
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                    this.getmsging = false;
                }
            }
        });
    },
    getValues: function () {
        return {};
    },
    startPing: function () {
    	 this.listdev.store.removeAll();
        if (this.pro)
            this.pro.updateProgress(0, '');
        if (this.showinfo)
            this.showinfo.setValue("");
        this.stopPing();
        this.startbtn.setDisabled(true);
        this.stopbtn.setDisabled(false);
        var me = this;
        this.starthandle = Ext.Ajax.request({
            url: this.urlStart,
            jsonData: this.getValues(),
            method: 'post', //方法  
            scope: this,
            callback: function (options, success, response) {
                this.starthandle = null;
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        me.workid = result.msg;
                        me.gettimerid = setInterval(function () {
                            me.onGetMsg();
                        },
                        1000);
                    }
                    else {
                        this.startbtn.setDisabled(false);
                        this.stopbtn.setDisabled(true);
                        alert(result.msg);
                    }
                }
                else {
                    this.startbtn.setDisabled(false);
                    this.stopbtn.setDisabled(true);
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });

    },
    stopPing: function () {
        this.startbtn.setDisabled(false);
        this.stopbtn.setDisabled(true);
        this.getmsging = false;
        if (this.gettimerid)
            clearInterval(this.gettimerid);
        this.gettimerid = null;
        if (this.workid) {
            Ext.Ajax.request({
                url: this.urlStop,
                params: { id: this.workid },
                method: 'post', //方法  
                callback: function (options, success, response) {
                }
            });
        }
        if (this.starthandle)
            Ext.Ajax.abort(this.starthandle);
        this.starthandle = null;
        if (this.getmsghandle)
            Ext.Ajax.abort(this.getmsghandle);
        this.getmsghandle = null;
        this.workid = null;
    },
    destroy: function () {
        this.stopPing();
        this.callParent(arguments);
    },
    onAddClick:function()
    {
    	var vme = this;
				var v = new Array();
				var vsel = this.listdev.getSelectionModel().getSelection();
				if(vsel.length == 0)
					return ;
				for (var i = 0; i < vsel.length; i++) {
					v.push(vsel[i].raw);
				}
				var vValues = {
					GID: this.GID,
					USER: 'admin',
					PSW: 'admin',
					DEVS : v
				};
				var myMask = new Ext.LoadMask(vme, {
							msg : "正在添加设备，请稍候！"
						});
				myMask.show();
				Ext.Ajax.request({
							url : '../DevMng/AddDisconveryDev', //查询案件详细信息
							method : 'post', //方法  
							jsonData : vValues,
							scope : this,
							callback : function(options, success, response) {
								myMask.hide();
								if (success) {
									var v = Ext.JSON
											.decode(response.responseText);
									if (!v.success)
										Ext.MessageBox.alert('提示',v.msg);
									else {
										this.fireEvent('saveok');
									}
								} else {
									Ext.MessageBox.alert('提示',SPLanguage.getMessage("Net_Error"));
								}
							}
						});
    }
});
