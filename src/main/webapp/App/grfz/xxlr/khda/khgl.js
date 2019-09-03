Ext.define('App.grfz.xxlr.khda.khgl', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	height : '100%',
	width : '100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.khxx=Ext.create('App.grfz.xxlr.khda.gwyndkhdc', {
			width: '100%',
			flex: 1
	        });
		me.khxs=Ext.create('App.grfz.xxlr.khda.sjqyjxkhdj', {
			width: '100%',
			flex: 1
	        });
		me.khej=Ext.create('App.grfz.xxlr.khda.bmejkh', {
			width: '100%',
			flex: 1
	        });
		me.khtx=Ext.create('App.grfz.xxlr.khda.txkh', {
			width: '100%',
			flex: 1
	        });
		me.khdw=Ext.create('App.grfz.xxlr.khda.dwxjkh', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.xxlr.khda.gridButton', {
			me:me,
			jfpm : this.khxx,
			tjfx : this.khxs,
			ejkh : this.khej,
			txkh : this.khtx,
			dwkh : this.khdw
		});
			
		me.items=[ me.gridButton,
		           me.khxx,
		           me.khxs,
		           me.khej,
		           me.khtx,
		           me.khdw
    	          ] 	
    	me.callParent(arguments);
		}
});