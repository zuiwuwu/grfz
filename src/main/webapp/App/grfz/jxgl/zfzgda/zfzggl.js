Ext.define('App.grfz.jxgl.zfzgda.zfzggl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.zfzgxx=Ext.create('App.grfz.jxgl.zfzgda.zfzgxx', {
			width: '100%',
			flex: 1,
			viewPort:this.viewPort
	        });
		me.gridButton = Ext.create('App.grfz.jxgl.zfzgda.gridButton', {
			zfzgxx:me.zfzgxx,
		});
		
		
		me.items=[ me.gridButton,
		           me.zfzgxx             
    	          ]
    	
    	me.callParent(arguments);
		}
});