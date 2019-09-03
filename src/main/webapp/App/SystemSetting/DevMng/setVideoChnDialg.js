
//定义数据模型
Ext.define('App.SystemSetting.DevMng.setVideoChnDialg.model', {
    extend: 'Ext.data.Model',
    fields: ['GLOBALID', 'CHNNAME']
});

Ext.define('App.SystemSetting.DevMng.setVideoChnDialg.CellEditing', {
    extend: 'Ext.grid.Panel',
    frame: false,
    url: '../DevMng/listDevLinkVideoChn',
    initComponent: function () {
        var vme = this;
        vme.chns = {};
        vme.addchns = {};
        vme.delchns = {};
        this.store = new Ext.data.Store({
            autoDestroy: true,
            autoLoad: true,
            remoteFilter: true,
            model: 'App.SystemSetting.DevMng.setVideoChnDialg.model',
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.url,
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                }
            },
            filters: [{
                property: 'JKSBBH',
                value: this.JKSBBH
            }]
        });

        this.columns = [{
            header: SPLanguage.getMessage("TDMC"),
            dataIndex: 'CHNNAME',
            flex: 1
        }];


        this.callParent(arguments);


        this.store.on('load', function (store) {
            for (var i = 0; i < store.getCount(); i++) {
                var rec = store.getAt(i);
                var id = rec.get('GLOBALID');
                if (typeof this.chns[id] == 'undefined') {
                    this.chns[id] = id;
                }
            }

        }, this);
    },
    afterRender: function () {
        this.callParent(arguments);
    },
    addChn: function (vchns) {
        var rec = new Array();
        for (var i = 0; i < vchns.length; i++) {
            var id = vchns[i].id;
            if (typeof this.chns[id] != 'undefined') {
                //已经删除需重新添加
                if (typeof this.delchns[id] != 'undefined') {
                    delete this.delchns[id];
                    rec.push(Ext.create('App.SystemSetting.DevMng.setVideoChnDialg.model', {
                        GLOBALID: id,
                        CHNNAME: vchns[i].name
                    }));
                }
            }
            else {
                if (typeof this.addchns[id] == 'undefined') {
                    this.addchns[id] = id;
                    if (typeof this.delchns[id] != 'undefined') {
                        delete this.delchns[id];
                    }
                    rec.push(Ext.create('App.SystemSetting.DevMng.setVideoChnDialg.model', {
                        GLOBALID: id,
                        CHNNAME: vchns[i].name
                    }));
                }
            }
        }
        this.getStore().add(rec);
    },
    delChn: function (vchns) {
        var vIndex = -1;
        for (var i = 0; i < vchns.length; i++) {
            var id = vchns[i].get('GLOBALID');
            if (typeof this.delchns[id] == 'undefined') {
                if (typeof this.addchns[id] != 'undefined') {
                    delete this.addchns[id];
                }
                this.delchns[id] = id;
            }
            vIndex = this.getStore().indexOf(vchns[i]);
        }
        this.getStore().remove(vchns);
        if (vIndex >= this.getStore().getCount()) {
            vIndex--;
        }
        if (vIndex < 0
        || vIndex >= this.getStore().getCount())
            return;
        var rec = this.getStore().getAt(vIndex);
        this.getSelectionModel().select(rec);
    },
    getValues: function () {
        var vaddchns = '';
        for (var item in this.addchns) {
            if (typeof (this.addchns[item]) != 'function') {
                if (vaddchns != '')
                    vaddchns += ',';
                vaddchns += item;
            }
        }

        var vdelchns = '';
        for (var item in this.delchns) {
            if (typeof (this.delchns[item]) != 'function') {
                if (vdelchns != '')
                    vdelchns += ',';
                vdelchns += item;
            }
        }
        return { ADDCHNS: vaddchns, DELCHNS: vdelchns };
    }
});

//定义编辑对话框
Ext.define('App.SystemSetting.DevMng.setVideoChnDialg', {
    extend: 'Ext.window.Window',
    width: 600,
    height: 422,
    title: '视频通道',
    layout: 'fit',
    modal: true,
    autoDestroy: true,
    closeAction: 'destroy',
    initComponent: function () {
        var vme = this;
        this.vchntree = Ext.create('App.Common.ChnTree', {
            //checkBox: true,
            title: '组织结构'
        });

        this.vchnList = Ext.create('App.SystemSetting.DevMng.setVideoChnDialg.CellEditing', {
            height: '100%',
            flex: 1,
            JKSBBH: this.JKSBBH
        });


        this.items = [
            {
                xtype: 'container',
                flex: 1,
                width: 580,
                height: 400,
                layout: 'hbox',
                items: [
            {
                xtype: 'panel',
                layout: 'accordion',
                width: 230,
                height: '100%',
                items: [this.vchntree]
            },
            {
                xtype: 'container',
                height: '100%',
                margins: '0 4',
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
                items: [{
                    xtype: 'button',
                    tooltip: '',
                    handler: vme.onBtnAdd,
                    cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                    iconCls: Ext.baseCSSPrefix + 'form-itemselector-add',
                    navBtn: true,
                    scope: this,
                    margin: '4 0 0 0'
                }, {
                    xtype: 'button',
                    tooltip: '',
                    handler: vme.onBtnRemove,
                    cls: Ext.baseCSSPrefix + 'form-itemselector-btn',
                    iconCls: Ext.baseCSSPrefix + 'form-itemselector-remove',
                    navBtn: true,
                    scope: this,
                    margin: '4 0 0 0'
                }]
            },
            this.vchnList]
            }];

        this.buttons = [
        {
            text: SPLanguage.getMessage("SURE"),
            action: 'save',
            scope: this,
            handler: this.onSave
        },
        {
            text: SPLanguage.getMessage("CANCLE"),
            scope: this,
            handler: function () {
                vme.close();
            }
        }];
        this.callParent(arguments);
    },
    onBtnAdd: function () {
        this.vchnList.addChn(this.vchntree.getSelectedChn());
    },
    onBtnRemove: function () {
        var vsel = this.vchnList.getSelectionModel().getSelection();
        if (vsel.length == 0)
            return;
        this.vchnList.delChn(vsel);
    },
    getValues: function () {
        return this.vchnList.getValues();
    },
    onSave: function () {
        var vme = this;
        var store = this.vchnList.store;
		var vchns = '';
		for (var j = 0; j < store.getCount(); j++) {
			if (vchns != '')
				vchns += ',';
			vchns += store.getAt(j).get('GLOBALID');
		}
        var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZBCQSH") });
        myMask.show();
        Ext.Ajax.request({
            url: '../DevMng/SetDevLinkVideoChn', //请求地址  
            params: {
                ID:this.JKSBBH,
                CHNS:vchns
            },
            method: 'post', //方法  
            callback: function (options, success, response) {
                myMask.hide();
                if (success) {
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.success) {
                        vme.close();
                    }
                    else {
                        alert(result.msg);
                    }
                }
                else {
                    alert(SPLanguage.getMessage("Net_Error"));
                }
            }
        });
    }
});


