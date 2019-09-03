
Ext.define('App.SystemSetting.TransSvr.RecChn.groupTree', {
    extend: 'Ext.tree.Panel',
    //title: '拓扑结构',
    //animCollapse: true,
    rootVisible: false,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    enableDD: true,
    initComponent: function () {
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            root: { expanded: false, text: '根', id: 0, mustselchild: true },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: '../DevGroup/GetGroupTree',
                reader: {
                    type: 'json'
                }
            }
        });

        var vme = this;

        this.refreshTree = function () {
            vme.store.load();
        };
        this.callParent(arguments);
    }
});


Ext.define('App.SystemSetting.TransSvr.RecChn.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    showImagePreview: false,
    showProgressBarPager: false,
    lastgroupid: 0,
    header: false,
    gridautoLoad: false,
    initChnRight: false,
    chnRighs: {},
    selType: 'rowmodel',
    gridpageSize: 14,
    initComponent: function () {
        var vme = this;
        vme.chnRighs = {};
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: '',
                width: 24
            }
        },
        {
            name: 'GLOBALID',
            type: 'string'
        },
        {
            name: 'REC',
            type: 'bool',
            gridcol: {
                sortable: false,
                xtype: 'checkcolumn',
                header: '<input type="checkbox" id="CHECKREC"/><a>录像</a>',
                width: 60,
                stopSelection: false,
                listeners: {
                    scope: this,
                    checkchange: this.onViewCheckChange
                }
            }
        },
        {
            name: 'SUBSTREAM',
            type: 'bool',
            gridcol: {
                sortable: false,
                xtype: 'checkcolumn',
                header: '<input type="checkbox" id="CHECKSUBSTREAM"/><a>子码流</a>',
                width: 60,
                stopSelection: false,
                listeners: {
                    scope: this,
                    checkchange: this.onPTZCheckChange
                }
            }
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
            name: 'DEVICENAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: SPLanguage.getMessage("SBMC"),
                width: 200
            }
        },
        {
            name: 'PGNAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '物理分组名称',
                width: 200
            }
        },
        {
            name: 'INDEXID',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '排序序号',
                width: 60
            }
        }];


        //////////////////////////////////////////////////////////////////////////
        //工具栏

        this.changeGroup = function (groupid, text) {
            if (vme.lastgroupid != groupid) {
                vme.lastgroupid = groupid;
                vme.store.clearFilter(true);
                vme.store.filter([{
                    property: 'GID',
                    value: groupid
                }]);
                vme.updateLayout();
                vme.setTitle(text);
            }
        };

        this.refreshChn = function () {
            vme.store.clearFilter(true);
            vme.store.filter([{
                property: 'GID',
                value: vme.lastgroupid
            }]);
            vme.updateLayout();
        };

        this.loadChnRight = function (params) {
            vme.chnRighs = {};
            Ext.Ajax.request({
                url: '../TransSvr/GetRecChn', //查询案件详细信息
                method: 'post', //方法  
                params: params,
                callback: function (options, success, response) {
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        vme.initChnRight = true;
                        for (var i = 0; i < v.length; i++) {
                            vme.chnRighs[v[i].GLOBALID] = v[i];
                        }
                    }
                    else {
                        alert('获取用户通道权限失败！');
                    }
                }
            });
        };

        this.getValues = function () {
            var v = new Array();
            for (var item in vme.chnRighs) {
                if (typeof (vme.chnRighs[item]) != 'function')
                    v.push(vme.chnRighs[item]);
            }
            return v;
        };

        ////////////////////////////////////////////////////////////////
        //清除选择所有
        this.cleanAllSel = function () {
            vme.chnRighs = {};
            for (var i = 0; i < vme.store.getCount(); i++) {
                var rec = vme.store.getAt(i);
                if (rec.get('REC')) {
                    rec.set('REC', false);
                }
                if (rec.get('SUBSTREAM')) {
                    rec.set('SUBSTREAM', false);
                }
            }
        };

        ////////////////////////////////////////////////////////////////
        //选择所有
        this.selAll = function () {
            Ext.Ajax.request({
                url: '../DevGroup/GetAllChn', //查询案件详细信息
                method: 'post', //方法  
                callback: function (options, success, response) {
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        vme.chnRighs = {};
                        for (var i = 0; i < v.length; i++) {
                            vme.chnRighs[v[i]] = { GLOBALID: v[i],
                                SUBSTREAM: true
                            };
                        }
                        for (var i = 0; i < vme.store.getCount(); i++) {
                            var rec = vme.store.getAt(i);
                            if (!rec.get('REC')) {
                                rec.set('REC', true);
                            }
                            if (!rec.get('SUBSTREAM')) {
                                rec.set('SUBSTREAM', true);
                            }
                        }
                    }
                    else {
                        alert('获取通道失败！');
                    }
                }
            });
        };
        this.callParent(arguments);

        this.store.on('datachanged', function (store) {
            for (var i = 0; i < store.getCount(); i++) {
                var rec = store.getAt(i);
                var vchnright = vme.chnRighs[rec.get('GLOBALID')];
                if (typeof vchnright != 'undefined') {
                    store.getAt(i).set('REC', true);
                    store.getAt(i).set('SUBSTREAM', vchnright.SUBSTREAM);
                }
            }
        }, this);
        this.store.on('load', function (store) {
            /*
            var vsel = new Array();
            for (var i = 0; i < store.getCount(); i++) {
            var rec = store.getAt(i);
            if (typeof vme.chnRighs[rec.get('GLOBALID')] != 'undefined') {
            vsel.push(rec);
            }
            }
            vme.getSelectionModel().select(vsel);
            */
        }, this);
    },
    afterRender: function () {
        this.callParent();

        var vme = this;
        this.CHECKREC = Ext.get('CHECKREC');
        this.CHECKREC.on('change', function (e, t, eOpts) {
            var v = this.CHECKREC.dom.checked;
            if (v != this.CHECKREC.checked) {
                this.CHECKREC.checked = v;
                for (var i = 0; i < this.store.getCount(); i++) {
                    var rec = this.store.getAt(i);
                    rec.set('REC', v);
                    this.onViewCheckChange(null, i, v, null);
                }
            }

        }, this);

        this.CHECKSUBSTREAM = Ext.get('CHECKSUBSTREAM');
        this.CHECKSUBSTREAM.on('change', function (e, t, eOpts) {
            var v = this.CHECKSUBSTREAM.dom.checked;
            if (v != this.CHECKSUBSTREAM.checked) {
                this.CHECKSUBSTREAM.checked = v;
                for (var i = 0; i < this.store.getCount(); i++) {
                    var rec = this.store.getAt(i);
                    rec.set('SUBSTREAM', v);
                    this.onPTZCheckChange(null, i, v, null);
                }
            }

        }, this);

    },
    onViewCheckChange: function (col, rowIndex, checked, eOpts) {
        var vme = this;
        var rec = this.store.getAt(rowIndex);
        var vchnright = vme.chnRighs[rec.get('GLOBALID')];
        if (checked) {
            if (typeof vchnright == 'undefined') {
                vme.chnRighs[rec.get('GLOBALID')] = { GLOBALID: rec.get('GLOBALID'),
                    PTZ: false,
                    LST: false,
                    PLAYBACK: false
                };
            }
        }
        else {
            if (typeof vchnright != 'undefined') {
                delete vme.chnRighs[rec.get('GLOBALID')];
                if (rec.get('SUBSTREAM'))
                    rec.set('SUBSTREAM', false);
            }
        }
    },
    onPTZCheckChange: function (col, rowIndex, checked, eOpts) {
        var vme = this;
        var rec = this.store.getAt(rowIndex);
        var vchnright = vme.chnRighs[rec.get('GLOBALID')];
        if (checked) {
            if (typeof vchnright == 'undefined') {
                rec.set('REC', checked);
                vme.chnRighs[rec.get('GLOBALID')] = { GLOBALID: rec.get('GLOBALID'),
                    SUBSTREAM: true
                };
            }
            else {
                vchnright.SUBSTREAM = true;
            }
        }
        else {
            if (typeof vchnright != 'undefined') {
                vchnright.SUBSTREAM = false;
            }
        }
    }
});

Ext.define('App.SystemSetting.TransSvr.RecChn', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    title: SPLanguage.getMessage("GNQXSZ"),
    initComponent: function () {
        this.wizardId = 'recchn';

        this.vchnlist = Ext.create('App.SystemSetting.TransSvr.RecChn.List', {
            width: 360,
            height: '100%',
            url: '../DevGroup/ListGroupChn',
            border: 0
        });

        this.vtree = Ext.create('App.SystemSetting.TransSvr.RecChn.groupTree', {
            width: 210,
            height: '100%',
            listeners: {
                scope: this,
                selectionchange: this.onSelectionchange
            },
            border: 1
        });


        this.chnname = Ext.create('App.Common.AutoComplete', {
            hideLabel: true,
            width: 100,
            url: '../UserManage/GetAutoCompleteList',
            displayField: 'USERNAME',
            valueField: 'USERID',
            fields: [{
                name: 'USERID',
                mapping: function (raw) {
                    return raw.USERID;
                }
            },
            {
                name: 'USERNAME',
                mapping: function (raw) {
                    var result = raw.USERNAME + '(' + raw.DESCRIPTION + ')';
                    return result;
                }
            }, {
                name: 'DESCRIPTION'
            }]
        }
        );

        this.items = [
        {
            xtype: 'panel',
            layout: 'hbox',
            border: 1,
            height: 400,
            tbar: [
        {
            iconCls: 'icon-add',
            text: '选择所有通道',
            scope: this,
            handler: this.onSelAllClick
        },
        {
            iconCls: 'icon-add',
            text: '清除选择',
            scope: this,
            handler: this.onCleanAllClick
        },
        SPLanguage.getMessage("TDMC"),
        this.chnname,
        {
            iconCls: 'icon-add',
            text: SPLanguage.getMessage("JS"),
            scope: this,
            handler: this.onSearchClick
        }],
            items: [this.vtree, this.vchnlist]
        }];
        this.callParent(arguments);

        this.getValues = function () {
            return { RECCHNS: this.vchnlist.getValues() };
        };
    },
    onSelAllClick: function () {
        this.vchnlist.selAll();
    },
    onCleanAllClick: function () {
        this.vchnlist.cleanAllSel();
    },
    onSearchClick: function () {
    },
    onPrev: function () {
        this.wizard.onSetWizardItemActive('userinfo');
    },
    onNext: function () {
        this.wizard.onSetWizardItemActive('createtransrule');
    },
    onWizardActive: function () {
        this.wizard.setWizardBtnDisabled('prev', false);
        this.wizard.setWizardBtnDisabled('next', false);
    },
    onSelectionchange: function (tree, selected, eOpts) {
        if (selected.length > 0) {
            this.vchnlist.changeGroup(selected[0].get('id'), selected[0].get('text'));
        }
    },
    onWizardInit: function () {
        if (typeof this.wizard.rightParams != 'undefined')
            this.vchnlist.loadChnRight(this.wizard.rightParams);
        this.vtree.expandNode(this.vtree.getRootNode());
    }
});
