Ext.define('App.SSGCXX.ButtonContainerSec', {
    extend: 'Ext.container.Container',
    layout: 'hbox',
    border: 0,
    width : '100%',
	height:20,
    initComponent: function () {
    	var me = this;
    	 me.JBXXBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
 		    width:90,
 		    height:30,
 		    text:'基本信息',
 			scope : this,
 			tooltip: '基本信息',
 			//btnCls:  'icon-search1',
 			handler : this.JBXX
			});
    	 me.GJXXBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
  		    width:90,
  		    height:30,
  		    text:'告警信息',
  			scope : this,
  			tooltip: '告警信息',
  			//btnCls:  'icon-search1',
  			handler : this.GJXX
 			});
    	 me.WFXXBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
   		    width:90,
   		    height:30,
   		    text:'违法信息',
   			scope : this,
   			tooltip: '违法信息',
   			//btnCls:  'icon-search1',
   			handler : this.WFXX
  			});
    	me.items=[
                   me.JBXXBtn,
                   me.WFXXBtn,
                   me.GJXXBtn,
    	          ]
    	
    	me.callParent(arguments);
    },
    
    JBXX:function(){
    	this.index.BottomContainer.getLayout().setActiveItem(0);
    	this.index.rightcarInfoContainer.getLayout().setActiveItem(0);
    	this.index.ImageContainer.getLayout().setActiveItem(0);
    	this.index.ButtonContainerFirst.getLayout().setActiveItem(0);
    },
    
    GJXX:function(){
    	this.index.BottomContainer.getLayout().setActiveItem(1);
    	this.index.rightcarInfoContainer.getLayout().setActiveItem(1);
    	this.index.ImageContainer.getLayout().setActiveItem(1);
    	this.index.ButtonContainerFirst.getLayout().setActiveItem(1);
    },
    WFXX:function(){
    	this.index.BottomContainer.getLayout().setActiveItem(2);
    	this.index.rightcarInfoContainer.getLayout().setActiveItem(2);
    	this.index.ImageContainer.getLayout().setActiveItem(2);
    	this.index.ButtonContainerFirst.getLayout().setActiveItem(2);
    	
    }
});