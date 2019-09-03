
Ext.define('App.SSGCXX.Index',{
	 extend: 'Ext.container.Container',
	 layout: 'hbox',
	 border: 0,
	 height : '100%',
	 width : '100%',
	 initComponent: function () {
		var  vme=this;	
	    //过车基本信息
	    this.vtrafficinfojb = Ext.create('App.SSGCXX.CarInfo', {
	        height: '100%',
	        width:340
	        });
	    //告警信息
	    this.vtrafficinfogj = Ext.create('App.SSGCXX.CarInfo', {
	        height: '100%',
	        width:340
	        });
	    //
	    //违法信息
	    this.vtrafficinfowf = Ext.create('App.SSGCXX.CarInfo', {
	        height: '100%',
	        width:340
	        });
	    //
	    this.ImageContainerjb = Ext.create('App.SSGCXX.ImageContainer',{
			flex :1,
			width:'100%',
			
		});
	    
	    this.ImageContainergj = Ext.create('App.SSGCXX.ImageContainer',{
			flex :1,
			width:'100%',
			
		});
	    this.ImageContainerwf = Ext.create('App.SSGCXX.ImageContainer',{
			flex :1,
			width:'100%',
			
		});
	    this.ImageContainer=Ext.create('Ext.container.Container',{
    	    layout: 'card',
    	    border: 2,
    	    width : '100%',
    		flex:1,
    		items:[
    		        this.ImageContainerjb,
    		        this.ImageContainergj,
    		        this.ImageContainerwf
    		       ]
    	});
	    
	    this.ButtonContainerjb=Ext.create('App.SSGCXX.ButtonContainerFirst',{
    		width:'100%',
    		height:30,
    		border: 2,
    		listeners:{
    			
    			 prevpage: function (btn) {
                     vme.CLXXGrid.prevPage();
                 },
                 nextpage: function (btn) {
                     vme.CLXXGrid.nextPage();
                 },
                 stop:function(btn){
                	  vme.CLXXGrid.stop();
                 }
    		}
    	})
    	this.ButtonContainerwf=Ext.create('App.SSGCXX.ButtonContainerFirst',{
    		width:'100%',
    		height:30,
    		border: 2,
    		listeners:{
    			
    			 prevpage: function (btn) {
                     vme.WFXXGrid.prevPage();
                 },
                 nextpage: function (btn) {
                     vme.WFXXGrid.nextPage();
                 },
                 stop:function(btn){
                	  vme.WFXXGrid.stop();
                 }
    		}
    	})
	    this.ButtonContainergj=Ext.create('App.SSGCXX.ButtonContainerFirst',{
    		width:'100%',
    		height:30,
    		border: 2,
    		listeners:{
    			
   			 prevpage: function (btn) {
                    vme.BJXXGrid.prevPage();
                },
                nextpage: function (btn) {
                    vme.BJXXGrid.nextPage();
                },
                stop:function(btn){
               	  vme.BJXXGrid.stop();
                }
   		}
    		
    	})
	    
    	//
	    this.ButtonContainerFirst=Ext.create('Ext.container.Container',{
	        layout: 'card',
    		width:'100%',
    		height:30,
    		border: 2,
    		items:[
      		        this.ButtonContainerjb,
      		        this.ButtonContainergj,
      		        this.ButtonContainerwf
      		       ]
    	})
    	
    
	    //车辆基本信息
		this.CLXXGrid = Ext.create('App.SSGCXX.CLXXGrid', {
            width: '100%',
            listeners:
            {
                 scope: this,
                 trfficinfoselchange: function (selected) {
                 vme.vtrafficinfojb.updateTrafficInfo(selected);
                 vme.ImageContainerjb.setSrc(selected);
                 vme.ButtonContainerjb.setSelectValue(selected);
                }
            }
        });
	    //报警信息
    	this.BJXXGrid = Ext.create('App.SSGCXX.BJXXGrid', {
            width: '100%',
            listeners:
            {
                scope: this,
                trfficinfoselchange: function (selected) {
                    vme.vtrafficinfogj.updateTrafficInfo(selected);
                    vme.ImageContainergj.setSrc(selected);
                    vme.ButtonContainergj.setSelectValue(selected);
                }
            }
        });
    	
    	this.WFXXGrid = Ext.create('App.SSGCXX.WFXXGrid', {
            width: '100%',
            listeners:
            {
                scope: this,
                trfficinfoselchange: function (selected) {
                    vme.vtrafficinfowf.updateTrafficInfo(selected);
                    vme.ImageContainerwf.setSrc(selected);
                    vme.ButtonContainerwf.setSelectValue(selected);
                }
            }
        });
    	//
    	this.BottomContainer=Ext.create('Ext.container.Container',{  
    	    layout: 'card',
    	    border: 2,
    	    width : '100%',
    		flex:1,
    		items:[
    		       this.CLXXGrid,
                   this.BJXXGrid,
                   this.WFXXGrid
    		       ]
    	});
    	
    	this.rightcarInfoContainer=Ext.create('Ext.container.Container',{
    	    layout: 'card',
    	    border: 2,
    	    height: '100%',
	        width:340,
    		items:[
                   this.vtrafficinfojb,
                   this.vtrafficinfogj,
                   this.vtrafficinfowf
    		       ]
    	});
    	
   	 this.ButtonContainerSec=Ext.create('App.SSGCXX.ButtonContainerSec',{ 
         index:vme,
       	 width : '100%',
       	 height:30,
         border: 2,
   	});
   	 //左侧树
	this.leftTree = Ext.create('App.SSGCXX.leftTree', {
		index:this,
        height: '100%',
        width : 350,
	    });
   	 
	    this.items = [this.leftTree,
	                  {
                     xtype: 'container',
                     layout: 'vbox',
                     border: 0,
                     flex : 1,
                     width : '100%',
                     items: [
                             //rightcontainfirst
						     {  xtype: 'container',
							    layout: 'hbox',
							    border: 0,
							    height : 700,
							    width : '100%',
						    items: [
						            {   xtype: 'container',
						            	layout: 'vbox',
						                border: 1,
						                height: '100%',
						                flex :1,
								        items: [
								                this.ImageContainer,
								                this.ButtonContainerFirst
								                ]
						             },   
						             this.rightcarInfoContainer]
								    },
						    //rightcontainsec
						    {  xtype: 'container',
						       layout: 'vbox',
						       border: 0,
						       flex : 1,
						       width : '100%',
						    items: [    
                                  this.ButtonContainerSec,
                                  this.BottomContainer
                                     ]
						    }, 
                             ]
	                 } 
	                 ];
	   
		this.callParent(arguments);
	 },
	 
	  
 
});