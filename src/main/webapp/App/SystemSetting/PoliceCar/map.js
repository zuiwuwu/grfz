

Ext.define('App.SystemSetting.PoliceCar.map', {
    extend: 'App.GIS.Main',
    modifyMod: true,
    initComponent: function () {
        
        this.btnshowtype = Ext.create('Ext.Button',
        {
            iconCls: 'icon-add',
            text: '搜索',
            scope: this,
            menu: Ext.create('App.SystemSetting.PoliceCar.menu',{
            	listeners:{
            		scope: this,
            		selchange:function(sels,searchtext,onlyshowconnected)
            		{
            			this.layer.showclfl = sels;
            			this.layer.searchtext = searchtext;
            			this.layer.onlyshowconnected = onlyshowconnected;
            			this.layer.loading = false;
            			this.layer.load();
            		}
            	}
            })
        });
        this.tbar = [
        {
            iconCls: 'icon-refresh',
            text: SPLanguage.getMessage("REFRESH"),
            scope: this,
            handler: function () {
                this.layer.load();
            }
        },
        this.btnshowtype
        ];
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);

        this.layer = this.addLayer('App.GIS.Layers.PoliceCar', {
            width: 0,
            height: 0,
            parentTab: this.parentTab,
            modifyMod: this.modifyMod,
            style:
        {
            position: "absolute"
        }
        });

    }
});

