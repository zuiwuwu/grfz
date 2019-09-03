Ext.define('App.grfz.jxgl.fajjxglda.jxgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.jxxx=Ext.create('App.grfz.jxgl.fajjxglda.jxxx', {
			width: '100%',
			flex: 1,
			viewPort:this.viewPort
	        });
		me.gridButton = Ext.create('App.grfz.jxgl.fajjxglda.gridButton', {
			jxxx:me.jxxx,
		});
		
		
		me.items=[ me.gridButton,
		           me.jxxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});