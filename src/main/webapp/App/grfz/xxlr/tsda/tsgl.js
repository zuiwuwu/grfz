Ext.define('App.grfz.xxlr.tsda.tsgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.tsxx=Ext.create('App.grfz.xxlr.tsda.tsxx', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.xxlr.tsda.gridButton', {
			tsxx:me.tsxx,
			
		});
		
		
		me.items=[ me.gridButton,
		           me.tsxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});