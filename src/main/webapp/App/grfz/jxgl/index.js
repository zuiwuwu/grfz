Ext.define('App.grfz.jxgl.index', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		
		var me=this;	
		me.zfzggl=Ext.create('App.grfz.jxgl.zfzgda.zfzggl',{
			
		});
	   
	    me.ajjxgl=Ext.create('App.grfz.jxgl.ajjxglda.jxgl',{
	    	viewPort:me.viewPort,
	    });  
	    me.fajjxgl=Ext.create('App.grfz.jxgl.fajjxglda.jxgl',{
	    	viewPort:me.viewPort,
	    }); 
	    me.sldjxgl=Ext.create('App.grfz.jxgl.sldjxglda.jxgl',{
	    	
	    }); 
	    me.ksgl=Ext.create('App.grfz.jxgl.ksdfda.ksgl',{
	    	
	    });
	    me.qtjkfgl=Ext.create('App.grfz.jxgl.qtjkfda.qtjkfgl',{
	    
	    });
	    me.gridcontain=Ext.create('Ext.container.Container', {
		    layout: 'card',
		    border: 0,
		    width : '100%',
		    flex:1,
		    items: [ 
		             me.zfzggl,
		             me.ajjxgl, 
		             me.fajjxgl,
		             me.sldjxgl,
                     me.ksgl,                     
                     me.qtjkfgl                   
			             ]
	});
	    me.topmenu=Ext.create('App.grfz.jxgl.topmenu',{
	    	gridcontain:me.gridcontain,
	    });	
		me.items=[ me.topmenu,
		           me.gridcontain                
    	          ]   	
    	me.callParent(arguments);
		}
});