Ext.define('App.grfz.xxlr.index', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;		
	  
	    me.jcgl=Ext.create('App.grfz.xxlr.jcda.jcgl',{});
	    me.gwgl=Ext.create('App.grfz.xxlr.gwda.gwgl',{});
	    me.jtgl=Ext.create('App.grfz.xxlr.jtda.jtgl',{});
	    me.pxgl=Ext.create('App.grfz.xxlr.pxda.pxgl',{});
	    me.mzpcgl=Ext.create('App.grfz.xxlr.mzpcda.mzpcgl',{});
	    me.tsgl=Ext.create('App.grfz.xxlr.tsda.tsgl',{});
	    me.xljkgl=Ext.create('App.grfz.xxlr.xljkda.xljkgl',{});
	    me.xqahgl=Ext.create('App.grfz.xxlr.xqahda.xqahgl',{});
	    me.khgl=Ext.create('App.grfz.xxlr.khda.khgl',{});
	    me.jbgl=Ext.create('App.grfz.xxlr.jbxxda.jbgl',{});
	    me.gridcontain=Ext.create('Ext.container.Container', {
		    layout: 'card',
		    border: 0,
		    width : '100%',
		    flex:1,
		    items: [ me.jbgl,
		             me.gwgl,
		             me.khgl,
                     me.jcgl,                    
                     me.jtgl,
                     me.mzpcgl,
                     me.pxgl,       
                     me.tsgl,
                     me.xljkgl,
                     me.xqahgl,
                    
                    
			             ]
	});
	    me.topmenu=Ext.create('App.grfz.xxlr.topmenu',{
	    	gridcontain:me.gridcontain,
	    });	
		me.items=[ me.topmenu,
		           me.gridcontain                
    	          ]   	
    	me.callParent(arguments);
		}
});