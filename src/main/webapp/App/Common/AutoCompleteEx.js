Ext.define('App.Common.AutoCompleteEx', {
    extend: 'Ext.form.ComboBox',
    alias: 'widget.autocompleteex',
    url: '',                            //远程取数据的地址
    queryMode: 'remote',
    queryParam: 'query',
    allowBlank: true,                   //是否能为空值
    emptyText: '',
    hideTrigger: true,                  //下拉菜单
    valueField: 'value',
    displayField: 'text',
    displayVlaue: false,                //是否显示值
    pageSize: 10,
    limit: 10,                          //显示选择项的数量
    triggerAction: 'query',
    minChars: 0,
    //maxWidth: 200,
    matchFieldWidth: false,
    queryDelay: 10,
    initComponent: function () {
        var self = this;
        self.callParent();
        if (self.displayVlaue) {
            self.displayTpl = Ext.create('Ext.XTemplate',
            '<tpl for=".">',
                '{' + self.valueField + '}',
            '</tpl>');
        }
        if (!self.tpl) {
            self.tpl = Ext.create('Ext.XTemplate',
        '<tpl for=".">',
            '<div class="x-boundlist-item" style="width:' + self.columnWidth + 'px;">{' + self.valueField + '}<strong style="float:right; color: Highlight;">{' + self.displayField + '}</strong></div>',
        '</tpl>');
        }
        self.store = Ext.create('Ext.data.Store', {
            fields: [self.valueField, self.displayField],
            pageSize: self.limit,
            remoteFilter: true,
            proxy: {
                type: 'ajax',
                url: self.url,
                reader: {
                    type: 'json'
                }
            }
        });
    }
});