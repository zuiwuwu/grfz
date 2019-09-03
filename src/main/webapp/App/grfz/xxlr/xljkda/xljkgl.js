Ext.define('App.grfz.xxlr.xljkda.xljkgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.xljkxx=Ext.create('App.grfz.xxlr.xljkda.xljkxx', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.xxlr.xljkda.gridButton', {
			xljkxx:me.xljkxx,
			
		});
		
		
		me.items=[ me.gridButton,
		           me.xljkxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});