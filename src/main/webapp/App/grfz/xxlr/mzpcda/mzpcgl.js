Ext.define('App.grfz.xxlr.mzpcda.mzpcgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.mzpcxx=Ext.create('App.grfz.xxlr.mzpcda.mzpcxx', {
			width: '100%',
			flex: 1
	        });
		
		me.gridButton = Ext.create('App.grfz.xxlr.mzpcda.gridButton', {
			mzpcxx:me.mzpcxx,			
		});
		
		
		me.items=[ me.gridButton,
		           me.mzpcxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});