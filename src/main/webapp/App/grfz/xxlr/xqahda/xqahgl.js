Ext.define('App.grfz.xxlr.xqahda.xqahgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.xqahxx=Ext.create('App.grfz.xxlr.xqahda.xqahxx', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.xxlr.xqahda.gridButton', {
			xqahxx:me.xqahxx,
			
		});
		
		
		me.items=[ me.gridButton,
		           me.xqahxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});