Ext.define('App.grfz.xxlr.jtda.jtgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.jtxx=Ext.create('App.grfz.xxlr.jtda.jtxx', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.xxlr.jtda.gridButton', {
			jtxx:me.jtxx,
			
		});
		
		
		me.items=[ me.gridButton,
		           me.jtxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});