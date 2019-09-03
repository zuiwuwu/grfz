Ext.define('App.grfz.RightPanel', {
    extend: 'Ext.Container',
    layout: 'vbox',
    border: 0,
    autoScroll: true,
    style:
    {
        'background-color': '#30468B',
        position: "absolute",
        "z-index": "4"
    },
    cls: 'x-sp-metro-rightpanel',
    title: '搜索',
    initComponent: function () {
        this.addEvents('closeapps');
        this.titletext = Ext.create('Ext.Component',
        {
            cls:'x-sp-metro-righttitle',
            html: this.title
        });
        this.items = [
        {
            xtype: 'container',
            layout: 'hbox',
            items: [this.titletext,
            Ext.create('App.Common.ImageButtonEx',
            {
                tooltip: '隐藏',
                btnCls: 'x-sp-metro-righthide',
                scope: this,
                handler: function () {
                    this.fireEvent('closeapps');
                }
            })]
            }];
        this.callParent(arguments);
    },
    showPanel:function (title,item) {
        this.title = title;
        this.titletext.update(title);

        if(this.showitem)
            this.remove(this.showitem);
            this.showitem = null;
         if(item)
         {
            item.flex = 1;
            item.width = '100%';
            this.showitem = this.add(item);
         }
    }
});
