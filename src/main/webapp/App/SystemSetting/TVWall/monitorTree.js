Ext.define('App.SystemSetting.TVWall.monitorTree', {
    extend: 'Ext.tree.Panel',
    rootVisible: false,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    enableDD: true,
    initComponent: function () {
        var vme = this;
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            root: { expanded: true, text: ' ', id: '' },
            listeners:
            {
                scope: this,
                load: function (store, node, records, successful, eOpts) {
                    if (records.length > 0) {
                        vme.getSelectionModel().select(records[0]);
                    }
                }
            },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: '../TVWall/GetTVWall',
                reader: {
                    type: 'json'
                }
            }
        });

        this.tbar = [{
            text: SPLanguage.getMessage("REFRESH"),
            iconCls: 'icon-refresh',
            handler: function () {
                vme.store.load();
            }
        }, {
            text: SPLanguage.getMessage("PUSH"),
            iconCls: 'icon-add',
            scope: this,
            handler: this.onAddTVWall
        }, {
            text: SPLanguage.getMessage("ALTER"),
            iconCls: 'icon-edit',
            scope: this,
            handler: this.onEditTVWall
        }, {
            text: SPLanguage.getMessage("DELETE"),
            iconCls: 'icon-del',
            scope: this,
            handler: this.onDelTVWall
        }];

        this.callParent(arguments);
    },
    onAddTVWall: function () {
        Ext.create('App.SystemSetting.TVWall.newTVWall', {
            url: '../TVWall/AddTVWall',
            listeners: {
                scope: this,
                saveok: this.onSaveOK
            }
        }).show();
    },
    onEditTVWall: function () {
        var vme = this;
        var vsel = vme.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var v = Ext.create('App.SystemSetting.TVWall.newTVWall', {
                url: '../TVWall/EditTVWall',
                listeners: {
                    scope: this,
                    saveok: this.onSaveOK
                }
            });
            v.show();
            v.loadRecord(vsel);
        }
    },
    onDelTVWall: function () {
        var vme = this;
        var vsel = vme.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            Ext.MessageBox.confirm(SPLanguage.getMessage("REMINDER"), SPLanguage.getMessage("SFQDYSC"), function (result) {
                if (result != 'yes')
                    return;
                var myMask = new Ext.LoadMask(vme, { msg: SPLanguage.getMessage("ZZSCQSH") });
                myMask.show();

                Ext.Ajax.request({
                    url: '../TVWall/DelTVWall', //查询案件详细信息
                    method: 'post', //方法  
                    params: { TVWALLID: vsel[0].get('id') },
                    callback: function (options, success, response) {
                        myMask.hide();
                        if (success) {
                            var v = Ext.JSON.decode(response.responseText);
                            if (!v.success)
                                alert(v.msg);
                            else
                                vme.store.load();
                        }
                        else {
                            alert(SPLanguage.getMessage("DelFail"));
                        }
                    }
                });
            });
        }
    },
    onSaveOK: function () {
        this.store.load();
    }
});

