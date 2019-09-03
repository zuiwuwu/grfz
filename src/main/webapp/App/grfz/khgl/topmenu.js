Ext.define('App.grfz.khgl.topmenu', {
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
	        	x:100,
	        	y:0,
	        	btnCls:'grfz-khgl-gwybutton',
	        	text:'',
	        	width:244,
	            height:98,
	            scope : this,
	            handler:this.GWYNDKHBtn
			});
	        this.s2  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:370,
	        	y:0,
	        	width:244,
	            height:98,
				btnCls: 'grfz-khgl-jxkhbutton',
				text:'',
				scope:this,
				handler:this.SJQYJXKHBtn
			});
	        this.s3  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:640,
	        	y:0,
	        	width:244,
	            height:98,
				btnCls: 'grfz-khgl-qjejkhbutton',
				text:'',
	            scope : this,
	            handler:this.FJBMEJKHBtn
			});
	        this.s4  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:910,
	        	y:0,           
	            width:244,
	            height:98,
				btnCls: 'grfz-khgl-qjtxkhbutton',
				text:'',
	            scope : this,
	            handler:this.SJBMTXKHBtn
			});
	     /*   this.s5  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:1180,
	        	y:0,           
	            width:244,
	            height:98,
				btnCls: '',
				text:'全员月考核排名',
	            scope : this,
	            handler:this.QYYKHBtn
			});
	        this.s6  = Ext.create('App.Common.ImageButtonEx',
					{
	        	x:1450,
	        	y:0,           
	            width:244,
	            height:98,
				btnCls: '',
				text:'全员年考核排名',
	            scope : this,
	            handler:this.QYNKHBtn
			});
	     */
	        this.menu = Ext.create('Ext.Container',{
	        	x:400,
	        	y:0,
	        	width: 1630,
	        	height: 100,
	        	layout:'absolute',
	        	cls:'x-sp-main-menu-container',
	        	items :[ this.s1 , this.s2 , this.s3 , this.s4 /*,this.s5,this.s6*/]
	        });
	        //菜单栏的左移按钮

 		this.items=[ 
 		             this.menu,
 		              
    	          ]
    	
    	this.callParent(arguments);
		},
		
	    
		GWYNDKHBtn:function(){	    
			
	    	this.gridcontain.getLayout().setActiveItem(0);
	    },
	    SJQYJXKHBtn:function(){
	    	
	    	this.gridcontain.getLayout().setActiveItem(1);
	    },
	    FJBMEJKHBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(2);
	    },
	    SJBMTXKHBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(3);
	    }/*,
	    QYYKHBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(4);
	    },
	    QYNKHBtn:function(){
	    	this.gridcontain.getLayout().setActiveItem(5);
	    }	*/    
	   
});