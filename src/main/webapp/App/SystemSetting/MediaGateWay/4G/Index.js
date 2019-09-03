Ext.define('App.SystemSetting.MediaGateWay.4G.Index', {
    extend: 'Ext.container.Container',
    layout: 'fit',
    border: 0,
    vminViewHeight: 768,
    vminViewWidth: 1240,
    requires: ['App.Common.ImageButtonEx', 'App.Common.SPAcorddionBtn'],
    initComponent: function () {
        var vme = this;
		this.MEDIAGATEWAYID = this.commonparams?this.commonparams.MEDIAGATEWAYID:null;
        this.vwork = Ext.create('Ext.Container', {
            region: 'center',
            layout: 'fit',
            items: [Ext.create('App.SystemSetting.MediaGateWay.4G.Mng',{
            	MEDIAGATEWAYID: this.MEDIAGATEWAYID
            })]
        });

	this.vtop = Ext.create('App.ZHDD.RealTraffic.Top', {
            width: '100%'
        });

        this.vleft = Ext.create('App.Common.SPAcorddion',
        {
            title: '',
            flex: 1,
            height: '100%',
            cls: 'x-spacorddion'
        });

        this.vwest = Ext.create('Ext.Panel',
        {
            layout: 'vbox',
            height: '100%',
            width: 281,
            region: 'west',
            collapsible: true,
            border: 0,
            split: true,
            minWidth: 281,
            maxWidth: 281,
            header: false,
            collapseMode: 'mini',
            items: [this.vleft]
        });

        this.items = [
        {
            xtype: 'container',
            layout: 'vbox',
            border: 0,
            items: [
            this.vtop,
            {
                xtype: 'container',
                layout: 'border',
                border: 0,
                flex: 1,
                width: '100%',
                items: [
                this.vwest
                 , this.vwork]
            }
            ]
        }];
        // call the superclass's initComponent implementation
        this.callParent(arguments);
    },
    afterRender: function () {
        this.callParent(arguments);
        var menus = [
        {
        	MenuName: '网关设置',
        	MenuIcon: 'x-sp-acorddion-item-img1',
        	MenuAction: '#',
        	ChildMenu: [
        	{
        		MenuName: '移动终端管理',
        		MenuIcon: 'icon-gnxx',
        		MenuAction: 'App.SystemSetting.MediaGateWay.4G.Mng'
        	},
        	{
        		MenuName: '视频设备管理',
        		MenuIcon: 'icon-gnxx',
        		MenuAction: 'App.SystemSetting.MediaGateWay.GB28181.DevMng'
        	},
        	{
        		MenuName: '网关参数',
        		MenuIcon: 'icon-gnxx',
        		MenuAction: 'App.SystemSetting.MediaGateWay.GB28181.Set'
        	}]
        }];
         this.addAccordion(menus);
    },
    addAccordion: function (data) {      //显示左侧菜单
        var vme = this;
        for (var i = 0; i < data.length; i++) {
            vme.vleft.addItem(vme.createSel(data[i].MenuName, data[i].ChildMenu), data[i].MenuIcon);
        }
    },
    createSel: function (title, data) {
        var vme = this;
        var vitems = new Array();
        for (var i = 0; i < data.length; i++) {
            var cls = Ext.baseCSSPrefix + 'spacorddion-btn';
            if (i == 0) {
                cls = Ext.baseCSSPrefix + 'spacorddion-btn-first';
            }
            vitems.push({
                url: data[i].MenuAction,
                title: data[i].MenuName,
                xtype: 'spacorddionbtn',
                width: 281,
                height: 39,
                btnCls: cls,
                baseCls: Ext.baseCSSPrefix + 'spacorddion-btn-base',
                imgCls: data[i].MenuIcon,
                text: data[i].MenuName,
                scope: this,
                handler: function (btn) {
                	vme.vwork.removeAll();
                	vme.vwork.add(Ext.create(btn.url,{
                		MEDIAGATEWAYID: this.MEDIAGATEWAYID
                	}));
                }
            });
        }
        var feedPanel = Ext.create('App.Menu.MenuList', {
            title: title,
            items: vitems
        });

        return feedPanel;
    }
});

