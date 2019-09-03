
Ext.define('App.SystemSetting.UserPage.DWRight.groupTree', {
    extend: 'App.Common.MultTree',
    //title: '拓扑结构',
    //animCollapse: true,
    rootVisible: true,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    height: 400,
    initComponent: function () {
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: false,
            remoteFilter: true,
            root: { expanded: false, text: '全部点位', id: '', checked: 'none' },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: '../UserManage/GetDWTree',
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
                if (node.raw.attributes
                && node.raw.attributes.TYPE == 1) {
                    if (v != '')
                        v += ',';
                    v += node.raw.id;
                }
            }

            return v;
        };
        this.callParent(arguments);
    }
});


//定义编辑对话框
Ext.define('App.SystemSetting.UserPage.DWRight', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    title: '抓拍机点位权限',
    initComponent: function () {
        var vme = this;
        this.wizardId = 'dwright';
        this.functiontree = Ext.create('App.SystemSetting.UserPage.DWRight.groupTree', {});
        this.items = [this.functiontree];
        this.callParent(arguments);

        this.getValues = function () {
            return { DWRIGHTS: vme.functiontree.getValues() };
        };
    },
    onPrev: function () {
        this.wizard.onSetWizardItemActive('devright');
    },
    onNext: function () {
        this.wizard.onSetWizardItemActive('mapright');
    },
    onWizardActive: function () {
        this.wizard.setWizardBtnDisabled('prev', false);
        this.wizard.setWizardBtnDisabled('next', false);
    },
    onWizardInit: function () {
        this.functiontree.store.load({
            scope: this,
            filters: [{
                value: this.wizard.rightParams
            }],
            callback: function (records, operation, success) {
                this.functiontree.getRootNode().expand();
                this.functiontree.getRootNode().eachChild(function (child) { child.expand(); });
            }
        });
    }
});

