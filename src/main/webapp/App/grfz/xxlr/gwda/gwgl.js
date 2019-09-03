Ext.define('App.grfz.xxlr.gwda.gwgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.gwxx=Ext.create('App.grfz.xxlr.gwda.gwxx', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.xxlr.gwda.gridButton', {
			gwxx:me.gwxx,
			
		});
		
		
		me.items=[ me.gridButton,
		           me.gwxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});