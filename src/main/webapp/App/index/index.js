Ext.define('App.index.index', {
	extend : 'App.framework.mainfrm',
	url: 'App.grfz.index',
	initComponent : function() {
		this.menus = [{
						text: '',
						url: 'App.grfz.index'
		              }
		];
		this.callParent(arguments);
	}
});

