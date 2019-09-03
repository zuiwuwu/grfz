Ext.define('App.grfz.xxlr.topmenu', {
    extend: 'Ext.container.Container',
    layout:'absolute',
    border: 0,
	width :'100%',
	height:190,
	changeX:270,//菜单的一次移动距离
	flg:0,
	gridcontain:'',
	initComponent : function() {
		
		    this.leftImg  = Ext.create('App.Common.ImageButtonEx',
					{
		    	x:80,
	        	y:75,
				btnCls: 'icon-grfz-leftBtn',
				width:50,
	            height:50,
	            scope : this,
	            handler:this.leftChange
			});
	        //菜单栏的左移按钮
	        this.rightImg  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:1611,
	        	y:75,
	        	width:50,
	            height:50,
				btnCls: 'icon-grfz-rightBtn',
	            scope : this,
	            handler:this.rightChange
			});
	        this.s1  = Ext.create('App.Common.ImageButtonEx',{
	        	x:0,
	        	y:0,
	        	
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-JBXXBtn',
				scope:this,
				handler:this.JBBtn
			});
	        this.s2  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:270,
	        	y:0,
	        	btnCls:  'icon-grfz-GWBtn',
	        	width:240,
	            height:97,
	            scope : this,
	            handler:this.JWBtn
			});
	     
	        this.s3 = Ext.create('App.Common.ImageButtonEx',{
	        	x:540,
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-KHBtn',
				scope : this,
				handler:this.KHBtn
	        });
	        this.s4  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:810,
	        	y:0,           
	            width:240,
	            height:97,
				btnCls: 'icon-grfz-JCBtn',
	            scope : this,
	            handler:this.JCBtn
			});
	        this.s5  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:1080,
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-JTBtn',
	            scope : this,
	            handler:this.JTBtn
			});
	        this.menu = Ext.create('Ext.Container',{
	        	x:215,
	        	y:50,
	        	width: 1330,
	        	height: 100,
	        	layout:'absolute',
	        	cls:'x-sp-main-menu-container',
	        	items :[ this.s1,this.s2,this.s3,this.s4 ,this.s5 ]
	        });
	        //菜单栏的左移按钮

 		this.items=[ this.leftImg,
 		             this.menu,
 		             this.rightImg  
    	          ]
    	
    	this.callParent(arguments);
		},
		leftChange : function(){//左移菜单按钮的方法
	    	var me = this;
	    	if(me.flg < 1)
	    		return null;
	    	this.flg--;
	    	this.leftImg.setChecked(true);
	    	this.rightImg.setChecked(false);
	    	this.menu.removeAll();
	    	var s1  = Ext.create('App.Common.ImageButtonEx',{
	        	x:0-(this.changeX*this.flg),
	        	y:0,
	        	btnCls:  'icon-grfz-JBXXBtn',
	        	width:245,
	            height:95,
	            scope : this,
	            handler:this.JBBtn
	        });	
	        var s2 = Ext.create('App.Common.ImageButtonEx',{
	        	x:270-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-GWBtn',
				scope:this,			
				handler:this.JWBtn
	        });
	        var s3 = Ext.create('App.Common.ImageButtonEx',{
	        	x:540-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
	            btnCls: 'icon-grfz-KHBtn',
				scope : this,
				handler:this.KHBtn
	        });
	        var s4 = Ext.create('App.Common.ImageButtonEx',{
	        	x:810-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-JCBtn',
				scope:this,
			    handler:this.JCBtn
	        });
	        
	        var s5 = Ext.create('App.Common.ImageButtonEx',{
	        	x:1080-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-JTBtn',
				scope : this,
				handler:this.JTBtn
	        });
	        
	       /* var s6 = Ext.create('App.Common.ImageButtonEx',{
	        	x:1350-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-KHBtn',
				scope : this,
				handler:this.KHBtn
	        });
	        */
	        var s6 = Ext.create('App.Common.ImageButtonEx',{
	        	x:1350-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-MZBtn',
				scope:this,
				handler:this.MZPCBtn
	        });  
	        var s7 = Ext.create('App.Common.ImageButtonEx',{
	        	x:1620-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-PXBtn',
				scope:this,
				handler:this.PXBtn
	        }); 
	        var s8 = Ext.create('App.Common.ImageButtonEx',{
	        	x:1890-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-TSBtn',
				scope:this,
				handler:this.TSBtn
	        });
	        var s9 = Ext.create('App.Common.ImageButtonEx',{
	        	x:2160-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-XLJKBtn',
				scope:this,
				handler:this.XLJKBtn
	        });
	        var s10 = Ext.create('App.Common.ImageButtonEx',{
	        	x:2430-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-XQBtn',
				scope:this,
				handler:this.XQAHBtn
	        });
	        var container = Ext.create('Ext.Container',{
	        	width: 1330,
	        	height: 100,
	        	layout:'absolute',
	        	cls:'x-sp-main-menu-container',
	        	items :[s1,s2,s3,s4,s5,s6,s7,s8,s9,s10]
	        });
	    	this.menu.add(container);
	    	
	    },
	    rightChange : function(){//左移菜单按钮的方法
	    	var me = this;
	    	if(me.flg > 4)
	    		return null;
	    	this.flg++;
	    	this.leftImg.setChecked(true);
	    	this.rightImg.setChecked(false);  	
	    	this.menu.removeAll();
	    	var s1  = Ext.create('App.Common.ImageButtonEx',{
	        	x:0-(this.changeX*this.flg),
	        	y:0,
	        	btnCls:  'icon-grfz-JBXXBtn',
	        	width:245,
	            height:95,
	            scope : this,
	            handler:this.JBBtn
	        });	
	        var s2 = Ext.create('App.Common.ImageButtonEx',{
	        	x:270-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-GWBtn',
				scope:this,			
				handler:this.JWBtn
	        });
	        var s3 = Ext.create('App.Common.ImageButtonEx',{
	        	x:540-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
	            btnCls: 'icon-grfz-KHBtn',
				scope : this,
				handler:this.KHBtn
	        });
	        var s4 = Ext.create('App.Common.ImageButtonEx',{
	        	x:810-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-JCBtn',
				scope:this,
			    handler:this.JCBtn
	        });
	        
	        var s5 = Ext.create('App.Common.ImageButtonEx',{
	        	x:1080-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-JTBtn',
				scope : this,
				handler:this.JTBtn
	        });
	        
	        var s6 = Ext.create('App.Common.ImageButtonEx',{
	        	x:1350-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-MZBtn',
				scope:this,
				handler:this.MZPCBtn
	        });  
	        var s7 = Ext.create('App.Common.ImageButtonEx',{
	        	x:1620-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-PXBtn',
				scope:this,
				handler:this.PXBtn
	        }); 
	        var s8 = Ext.create('App.Common.ImageButtonEx',{
	        	x:1890-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-TSBtn',
				scope:this,
				handler:this.TSBtn
	        });
	        var s9 = Ext.create('App.Common.ImageButtonEx',{
	        	x:2160-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-XLJKBtn',
				scope:this,
				handler:this.XLJKBtn
	        });
	        var s10 = Ext.create('App.Common.ImageButtonEx',{
	        	x:2430-(this.changeX*this.flg),
	        	y:0,
	        	width:240,
	            height:97,
				btnCls: 'icon-grfz-XQBtn',
				scope:this,
				handler:this.XQAHBtn
	        });
	        var container = Ext.create('Ext.Container',{
	        	width: 1330,
	        	height: 100,
	        	layout:'absolute',
	        	cls:'x-sp-main-menu-container',
	        	items :[s1,s2,s3,s4,s5,s6,s7,s8,s9,s10]
	        });
	    	this.menu.add(container);
	    	
	    },
	    JBBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(0);
	    },
	    JWBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(1);
	    },
	    KHBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(2);
	    },
	    JCBtn:function(){
	    	
	    	this.gridcontain.getLayout().setActiveItem(3);
	    },
	     
	    JTBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(4);
	    },	
	    MZPCBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(5);
	    },
	    PXBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(6);
	    },
	     
	    TSBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(7);
	    },
	    XLJKBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(8);
	    },
	    XQAHBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(9);
	    },
	 
	   
});