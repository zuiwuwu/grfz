Ext.define('App.grfz.xxlr.showContain', {
    extend: 'Ext.container.Container',
    width:'100%',
    flex:1,
    layout:'vbox',
    border: 0,
    
    initComponent: function () {    
    	var  vme=this;
    	this.imageContain=Ext.create('App.grfz.xxlr.imageContain',{
    		index:this.index,
    		width:'100%',
    		height:200,
    		XM:vme.XM,
    		SEX:vme.SEX,
    		showContain:this,
    		ZPURL:vme.ZPURL,
    	});
    	
      
       this.gridContian=Ext.create('Ext.container.Container',{
    	    layout: 'card',
		    border: 0,
		    width : '100%',
		    flex:1,
		    XM:vme.XM,
		    ZPURL:vme.ZPURL,
 		    items:[]
 	});
       this.showMenu=Ext.create('App.grfz.xxlr.showMenu',{
   	    width:'100%',
   	    height:30,
   	    gridContian:this.gridContian
   	});
    	this.items=[
                   //this.imageContain,
                   //this.showMenu,
                   this.gridContian          
    	            ],
    	this.callParent(arguments);
    }
    
});