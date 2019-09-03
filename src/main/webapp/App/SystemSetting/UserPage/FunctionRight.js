
Ext.define('App.SystemSetting.UserPage.FunctionRight.groupTree', {
    extend: 'App.Common.MultTree',
    //title: '拓扑结构',
    //animCollapse: true,
    rootVisible: true,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    height: 400,
    checkModel: 'multiple',
    initComponent: function () {
        this.listeners = {
            scope: this,
            checkchange: this.onCheckChange
        };
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: false,
            remoteFilter: true,
            root: { expanded: false, text: SPLanguage.getMessage("QBQX"), id: 0, checked: 'none', attributes: { V: 0 }, mustselchild: true },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: '../FunctionMng/GetFunctionTree',
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

    },
    onCheckChange: function (node, checked, eOpts) {
    }
});


//定义编辑对话框
Ext.define('App.SystemSetting.UserPage.FunctionRight', {
    extend: 'App.Common.WizardForm',
    flex: 1,
    width: 600,
    title: SPLanguage.getMessage("GNQXSZ"),
    initComponent: function () {
        var vme = this;
        this.wizardId = 'functionright';
        this.functiontree = Ext.create('App.SystemSetting.UserPage.FunctionRight.groupTree', {});
        this.items = [this.functiontree];
        this.callParent(arguments);


        this.getValues = function () {
            return { PERMISSIONXML: vme.functiontree.getValues() };
        };
    },
    onPrev: function () {
        if (this.wizard.rightParams.settype == 'mod'
        ||this.wizard.rightParams.settype == 'tempright')
            this.wizard.onSetWizardItemActive('userinfo');
        else
            this.wizard.onSetWizardItemActive('righttypesel');
    },
    onNext: function () {
        this.wizard.onSetWizardItemActive('devright');
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

