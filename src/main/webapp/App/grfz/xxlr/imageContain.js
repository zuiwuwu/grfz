Ext.define('App.grfz.xxlr.imageContain', {
    extend: 'Ext.container.Container',
    width:'100%',
    height:200,
    border: 0,
    layout: 'absolute',
    initComponent: function () {  
    	 this.image = Ext.create('Ext.Img', {
             x: 10,
             y: 0,
             width: 200,
             height: 180,
             border: 0,
             src: '../JBXXGL/ShowFilePreview?ID='+this.ZPURL,
         });
    	 this.XMText = Ext.create('Ext.Component',{
		     x:90,
		     y:190,	 	   
             html:this.XM,
			});
    	 this.showPicBtn = Ext.create('App.Common.ImageButtonEx',{
			    x:1750,
			    y:0,
	 		    width:100,
	 		    height:50,
	 		    text:'图片展示',
	 			scope : this,
	 			tooltip: '图片展示',
	 			//btnCls:'icon_grfz_search',
	 			handler : this.showPic
				});
    	 this.closeBtn = Ext.create('App.Common.ImageButtonEx',{
			    x:1850,
			    y:0,
	 		    width:100,
	 		    height:50,
	 		    text:'关闭',
	 			scope : this,
	 			tooltip: '关闭',
	 			//btnCls:'icon_grfz_search',
	 			handler : this.closeBtn
				});
    	 this.close = Ext.create('App.Common.ImageButtonEx',{
			  
	 		    width:80,
	 		    height:45,
	 			scope : this,
	 			tooltip: '搜索',
	 			btnCls:  'icon-grfz-search',
	 			handler : this.serach,
				});
         this.items = [
                       this.image, 
                       this.closeBtn,
                       this.showPicBtn,
                       {
        	           xtype:'component',
        	           x:50,
        			   y:190,	 	   
        	           html:'姓名:',
        	           },
                       this.XMText];

        
    	this.callParent(arguments);
    },
   showPic:function(){
	 
	   if(this.SEX=="男"){
	   Ext.create('Ext.window.Window', {
		    header:true,
		    title: 'Hello',
		    margin:'0.0.0.0',
		    height: 950,
		    width: 1920,
		    layout : 'absolute',
		    style:{
		    	opacity: 0.6,
		    },
		    items:[
					{   x:0,
						y:0,
						width:'100%',
						height:'100%',
					    xtype: 'container',
					    layout: 'hbox',
					    style:{
					    	background:'url(../images/grfz/grfz_boyDetail.png);'
					    },
					    items: [ 
                              
					            ]
					 }
		           ],		       
		}).show();
	   
	   }else if(this.SEX=="0"){

		   Ext.create('Ext.window.Window', {
			    header:true,
			    title: 'Hello',
			    margin:'0.0.0.0',
			    height: 950,
			    width: 1920,
			    layout : 'absolute',
			    style:{
			    	opacity: 0.6,
			    },
			    items:[
						{   x:0,
							y:0,
							width:'100%',
							height:'100%',
						    xtype: 'container',
						    layout: 'hbox',
						    style:{
						    	background:'url(../images/grfz/grfz_boyDetail.png);'
						    },
						    items: [ 
	                              
						            ]
						 }
			           ],		       
			}).show();
		   
		   
	   }else if(this.SEX=="1"){

		   Ext.create('Ext.window.Window', {
			    header:true,
			    border:0,
			    margin:'0.0.0.0',
			    height: 950,
			    width: 1920,
			    layout : 'absolute',
			    style:{			    	
			    	opacity: 0.9,
			    },
			    items:[
						{   x:0,
							y:0,
							width:'100%',
							height:'100%',
						    xtype: 'container',
						    layout: 'absolute',
						    style:{		    
						    	background:'url(../images/grfz/grfz_gridDetail.png);'
						    },
						    items: [ 
						           			            
						            ]
						 }
			           ],		       
			}).show();
	   
	   }
	   else if(this.SEX=="女"){
		   Ext.create('Ext.window.Window', {
			    header:true,
			    border:0,
			    margin:'0.0.0.0',
			    height: 950,
			    width: 1920,
			    layout : 'absolute',
			    style:{			    	
			    	opacity: 0.9,
			    },
			    items:[
						{   x:0,
							y:0,
							width:'100%',
							height:'100%',
						    xtype: 'container',
						    layout: 'absolute',
						    style:{		    
						    	background:'url(../images/grfz/grfz_gridDetail.png);'
						    },
						    items: [ 
						           			            
						            ]
						 }
			           ],		       
			}).show();
	   }
   },
   closeBtn :function(){
	  
	  //this.index.bottomcontain.remove(this.index.bottomcontain.items.items[1]);
	  this.index.bottomcontain.getLayout().setActiveItem(0);   
   },
   setSrc: function (src) {
        this.image.setSrc(src);
 },    
    setXMText:function(XMText){
    	this.setXMText.setValue(XMText);
    }
});