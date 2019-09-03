//定义编辑对话框
Ext.define('App.Common.WizardForm', {
    extend: 'Ext.panel.Panel',
    header: false,
    hasShow: false, //是否已经初始化
    isDirty: false, //是否已经修改
    fieldDefaults: {
        labelWidth: 75
//         ,
//         msgTarget: 'side'
    },
    defaultType: 'textfield',
    initComponent: function () {
        var vme = this;
        var vItem = this.items;
        this.items = [
                {
                    xtype: 'form',
                    flex: 1,
                    bodyPadding: 10,
                    border: 0,
                    items: vItem,
                    defaultType: this.defaultType,
                    fieldDefaults: this.fieldDefaults

                }];
 
        this.callParent(arguments);
    },
    onWizardInit: function () {
    },
    onPrev: function () {
    },
    onNext: function () {
    },
    onWizardActive: function () {
    },
    getValues: function () {
        var vme = this;
        var form = vme.down('form');
        return form.getValues();
    },
    setValues: function (values) {
        var form = this.down('form');
        form.getForm().setValues(values);
    },
    hasInvalidField: function () {
        var vme = this;
        var form = vme.down('form');
        return form.hasInvalidField();
    },
    isValid: function () {
        var vme = this;
        var form = vme.down('form');
        return form.isValid();
    },
    getRecord: function () {
        var vme = this;
        var form = vme.down('form');
        return form.getRecord();
    },
    setModified: function () {
        var vme = this;
        vme.isDirty = true;
    }
});
