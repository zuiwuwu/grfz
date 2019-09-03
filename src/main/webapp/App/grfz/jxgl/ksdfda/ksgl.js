Ext.define('App.grfz.jxgl.ksdfda.ksgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.ksxx=Ext.create('App.grfz.jxgl.ksdfda.ksxx', {
			width: '100%',
			flex: 1,
			viewPort:this.viewPort
	        });
		me.gridButton = Ext.create('App.grfz.jxgl.ksdfda.gridButton', {
			ksxx:me.ksxx,
		});
		
		
		me.items=[ me.gridButton,
		           me.ksxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});