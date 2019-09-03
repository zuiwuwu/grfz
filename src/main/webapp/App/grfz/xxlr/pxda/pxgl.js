Ext.define('App.grfz.xxlr.pxda.pxgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.pxxx=Ext.create('App.grfz.xxlr.pxda.pxxx', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.xxlr.pxda.gridButton', {
			pxxx:me.pxxx,
			
		});
		
		
		me.items=[ me.gridButton,
		           me.pxxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});