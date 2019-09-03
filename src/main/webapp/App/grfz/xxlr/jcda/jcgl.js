Ext.define('App.grfz.xxlr.jcda.jcgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.jcxx=Ext.create('App.grfz.xxlr.jcda.jcxx', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.xxlr.jcda.gridButton', {
			jcxx:me.jcxx,
			
		});
		
		
		me.items=[ me.gridButton,
		           me.jcxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});