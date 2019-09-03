//自动完成编辑框
Ext.define('App.Common.AutoComplete', {
    extend: 'Ext.form.field.ComboBox',
    typeAhead: false,
    hideLabel: true,
    hideTrigger: true,
    queryMode: 'remote',
    minChars: 1,
    url: '',
    queryPageSize: 10,
    displayField: 'text',
    fields: [],
    getInnerTpl: null,
    //maxWidth: 200,
    maxHeight: 300,
    matchFieldWidth: true,
    initComponent: function () {
        var vme = this;
        this.listConfig = {
            loadingText: '正在检索...',
            //maxWidth: this.maxWidth,
            maxHeight: this.maxHeight,
            //emptyText: '没有符合条件的用户',
            // Custom rendering template for each item
            getInnerTpl: this.getInnerTpl?this.getInnerTpl:function () {
                return '{%var value = this.field.getRawValue().replace(/([.?*+^$[\\]\\\\(){}|-])/g, "\\\\$1");%}' + 
                    '{[values.' + vme.displayField + '.replace(new RegExp(value, "i"), function(m) {return "<b>" + m + "</b>";})]}';
            }
        };

        this.store = Ext.create('Ext.data.Store', {
            pageSize: this.queryPageSize,
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
            fields: this.fields
        });
        this.callParent(arguments);
    }

});
