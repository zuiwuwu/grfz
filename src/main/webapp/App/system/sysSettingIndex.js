Ext.define('App.system.sysSettingIndex', {
	extend : 'App.framework.menufrm',
	initComponent : function() {
		this.menus = [{
		    	text:'流量统计',
		    	child:[{
		    		text: '交通流量统计',
					url: 'App.CLXXTJ.jtlltj'
		    	},{
		    		text: '交通流量对比统计',
					url: 'App.CLXXTJ.jtlldbtj'
		    	}]
		    }
		];
		this.callParent(arguments);
	}
});