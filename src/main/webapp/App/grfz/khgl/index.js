Ext.define('App.grfz.khgl.index', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;	
		me.fjbmejkh=Ext.create('App.grfz.khgl.fjbmejkh.index',{});
		me.fjbmtxkh=Ext.create('App.grfz.khgl.fjbmtxkh.index',{});
		me.gwyndkh=Ext.create('App.grfz.khgl.gwyndkh.index',{});
		/*me.qynkh=Ext.create('App.grfz.khgl.qynkh.index',{});
		me.qyykh=Ext.create('App.grfz.khgl.qyykh.index',{});*/
		me.sjqyjxkh=Ext.create('App.grfz.khgl.sjqyjxkh.index',{});
	    me.gridcontain=Ext.create('Ext.container.Container', {
		    layout: 'card',
		    border: 0,
		    width : '100%',
		    flex:1,
		    items: [ 
  					 me.gwyndkh,
  					 me.sjqyjxkh,
		             me.fjbmejkh,
                     me.fjbmtxkh/*,                   
                     me.qyykh,
                     me.qynkh*/
			             ]
	});
	    me.topmenu=Ext.create('App.grfz.khgl.topmenu',{
	    	gridcontain:me.gridcontain,
	    });	
		me.items=[ me.topmenu,
		           me.gridcontain                
    	          ]   	
    	me.callParent(arguments);
		}
});