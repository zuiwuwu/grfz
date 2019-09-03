Ext.define('App.grfz.xxlr.jbxxda.jbgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.jbxx=Ext.create('App.grfz.xxlr.jbxxda.jbxx', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.xxlr.jbxxda.gridButton', {
			jbxx:me.jbxx,
			
		});
		
		
		me.items=[ me.gridButton,
		           me.jbxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});