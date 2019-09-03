Ext.define('App.grfz.jxgl.topmenu', {
    extend: 'Ext.container.Container',
    layout:'absolute',
    border: 0,
	width :'100%',
	height:190,
	changeX:270,//菜单的一次移动距离
	flg:0,
	gridcontain:'',
	initComponent : function() {
			   
	        this.s1  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:0,
	        	y:0,
	        	btnCls:  'icon-grfz-ZFZGBtn',
	        	width:240,
	            height:97,
	            scope : this,
	            handler:this.ZFZGBtn
			});
	        this.s2  = Ext.create('App.Common.ImageButtonEx',{
	        	x:270,
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-AJJXGLBtn',
				scope:this,
				handler:this.AJZXBtn
			});
	        this.s3  = Ext.create('App.Common.ImageButtonEx',{
	        	x:540,
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-FAJJXGLBtn',
				scope:this,
				handler:this.FAJZXBtn
			});
	        this.s4  = Ext.create('App.Common.ImageButtonEx',{
	        	x:810,
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-SLDJXGLBtn',
				scope:this,
				handler:this.SLDZXBtn
			});
	        this.s5  = Ext.create('App.Common.ImageButtonEx',{
	        	x:1080,
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-KSDFBtn',
	            scope : this,
	            handler:this.KSDFBtn
			});
	        this.s6  = Ext.create('App.Common.ImageButtonEx',{
	        	x:1350,
	        	y:0,           
	            width:240,
	            height:97,
				btnCls: 'icon-grfz-QTJKFBtn',
	            scope : this,
	            handler:this.QTJKFBtn
			});	     
	        this.menu = Ext.create('Ext.Container',{
	        	x:160,
	        	y:50,
	        	width: 1650,
	        	height: 100,
	        	layout:'absolute',
	        	cls:'x-sp-main-menu-container',
	        	items :[ this.s1,this.s2,this.s3,this.s4,this.s5,this.s6]
	        });
	        //菜单栏的左移按钮
 		this.items=[ 
 		             this.menu, 		              
    	          ]
    	
    	this.callParent(arguments);
		},
		
	    
		ZFZGBtn:function(){	    
			
	    	this.gridcontain.getLayout().setActiveItem(0);
	    },
	    AJZXBtn:function(){
	    	
	    	this.gridcontain.getLayout().setActiveItem(1);
	    },
        FAJZXBtn:function(){
	    	
	    	this.gridcontain.getLayout().setActiveItem(2);
	    },
	    SLDZXBtn:function(){	
        	
	    	this.gridcontain.getLayout().setActiveItem(3);
	    },
	    KSDFBtn:function(){
	    	
	    	this.gridcontain.getLayout().setActiveItem(4);
	    },
	    QTJKFBtn:function(){
	    	
	    	this.gridcontain.getLayout().setActiveItem(5);
	    },	    
	   
});