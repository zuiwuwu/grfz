Ext.define('App.grfz.jxgl.qtjkfda.qtjkfgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.qtjkfxx=Ext.create('App.grfz.jxgl.qtjkfda.qtjkfxx', {
			width: '100%',
			flex: 1,
			viewPort:this.viewPort
	        });
		me.gridButton = Ext.create('App.grfz.jxgl.qtjkfda.gridButton', {
			qtjkfxx:me.qtjkfxx,
		});
		
		
		me.items=[ me.gridButton,
		           me.qtjkfxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});