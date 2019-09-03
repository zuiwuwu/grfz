
Ext.define('App.SystemSetting.DevMng.Combo', {
    extend: 'Ext.form.field.ComboBox',
    allowBlank: false,
    forceSelection: true,
    width: 300,
    labelWidth: 70,
    editable: false,
    emptyText: '请选择',
    displayField: 'NAME',
    valueField: 'ID',
    initComponent: function () {
        var vme = this;
        this.store = new Ext.data.Store({
            autoLoad: true,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: this.url,
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                },
                filterParam: 'id',
                encodeFilters: function (filters) {
                    return filters[0].value;
                }
            },
            fields: [{
                name: 'ID'
            }, {
                name: 'NAME'
            }]
        });

        this.callParent(arguments);
    }
});

