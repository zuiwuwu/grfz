//定义编辑对话框
Ext.define('App.Common.CheckBoxFieldset', {
    extend: 'Ext.form.FieldSet',
    alias: 'widget.checkboxfieldset',
    checkboxToggle: true,
    createCheckboxCmp: function () {
        var me = this,
            suffix = '-checkbox';

        me.checkboxCmp = Ext.widget({
            xtype: 'checkbox',
            hideEmptyLabel: true,
            name: me.checkboxName || me.id + suffix,
            cls: me.baseCls + '-header' + suffix,
            id: me.id + '-legendChk',
            checked: false,
            inputValue: true,
            uncheckedValue: false,
            listeners: {
                change: me.onCheckChange,
                scope: me
            }
        });
        return me.checkboxCmp;
    },
    onCheckChange: function (cmp, checked) {
        for (var i = 0; i < this.items.length; i++) {
            this.items.get(i).setDisabled(!checked);
        }
    },
    afterRender: function () {
        this.callParent(arguments);
        var me = this;
        if (me.checkboxCmp) {
            var checked = me.checkboxCmp.getValue();
            for (var i = 0; i < this.items.length; i++) {
                this.items.get(i).setDisabled(!checked);
            }
        }

    }
});