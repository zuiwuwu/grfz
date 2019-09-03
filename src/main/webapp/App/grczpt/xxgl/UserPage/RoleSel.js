
Ext.define('App.SystemSetting.UserPage.RoleSel.groupTree', {
    extend: 'Ext.tree.Panel',
    //title: '拓扑结构',
    //animCollapse: true,
    rootVisible: false,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    height: 400,
    initComponent: function () {
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: false,
            remoteFilter: true,
            root: { expanded: false, text: SPLanguage.getMessage("QBQX"), id: 0,checked:'none' },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: '../RoleMng/GetRoleMngCheckTree',
                reader: {
                    type: 'json'
                },
                filterParam: 'param',
                encodeFilters: function (filters) {
                    return Ext.JSON.encode(filters[0].value);
                }
            }
        });

        var vme = this;

        this.refreshTree = function () {
            vme.store.load();
        };

        this.getValues = function () {
            var rec = vme.getChecked();

            var v = '';
            for (var i = 0; i < rec.length; i++) {
                var node = rec[i];
                v += node.get('id');
                v += ",";
            }
            if (v == '')
                v = ',';
            return v;
        };
        this.callParent(arguments);
    }
});


//定义编辑对话框
Ext.define('App.SystemSetting.UserPage.RoleSel', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    title: '用户角色选择',
    firstload: true,
    initComponent: function () {
        var vme = this;
        this.wizardId = 'rolesel';
        this.functiontree = Ext.create('App.SystemSetting.UserPage.RoleSel.groupTree', {});
        this.items = [this.functiontree];
        this.callParent(arguments);

        this.getValues = function () {
            return { ROLEIDS: vme.functiontree.getValues() };
        };
    },
    onPrev: function () {
        this.wizard.onSetWizardItemActive('userinfo');
    },
    onNext: function () {
        this.wizard.onSetWizardItemActive('righttypesel');
    },
    onWizardInit: function () {
        var vme = this;
        var expandNode = function (node) {
            node.eachChild(function (child) {
                child.expand();
                expandNode(child);
            });
        };
        this.functiontree.store.load({
            scope: this,
            filters: [{
                value: this.wizard.rightParams
            }],
            callback: function (records, operation, success) {
                this.functiontree.getRootNode().expand();
                expandNode(this.functiontree.getRootNode());
            }
        });
    },
    onWizardActive: function () {
        this.wizard.setWizardBtnDisabled('prev', false);
        this.wizard.setWizardBtnDisabled('next', false);
    }
});

