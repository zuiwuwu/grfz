Ext.define('App.grfz.topButton', {
    extend: 'Ext.container.Container',
    layout:'absolute',
    border: 0,
    width:'100%',
	height:50,
	
    initComponent: function () {
    	 this.addEvents(
    	        'search',
    	        'xxlr',
    	        'tjfx',
    	        'jxgl',
    	        'khgl',
    	        'hsearch'
    	       );
    	 var me = this;
    	 me.searchBtn = Ext.create('App.Common.ImageButtonEx',{
    	    x:1150,
    	    y:20,
 		    width:60,
 		    height:30,
 		    text:'查询',
 			scope : this,
 			tooltip: '查询',
 			//btnCls:  'icon-search1',
 			handler :  function(btn){
   				me.fireEvent('search', btn);
   			} 
			});
    	 me.hsearchBtn = Ext.create('App.Common.ImageButtonEx',{
     	    x:1200,
     	    y:20,
  		    width:90,
  		    height:30,
  		    text:'高级搜索',
  			scope : this,
  			tooltip: '高级搜索',
  			//btnCls:  'icon-search1',
  			handler :  function(btn){
    				me.fireEvent('hsearch', btn);
    			} 
 			});
    	 me.XXLRBtn= Ext.create('App.Common.ImageButtonEx',{
    		x:1300,
      	    y:20,
  		    width:90,
  		    height:30,
  		    text:'信息录入',
  			scope : this,
  			tooltip: '信息录入',
  			//btnCls:  'icon-search1',
  			handler :  function(btn){
   				me.fireEvent('xxlr', btn);
   			} 
 			});
    	
    	 me.JXGLBtn= Ext.create('App.Common.ImageButtonEx',{
    		    x:1400,
       	        y:20,
    		    width:90,
    		    height:30,
    		    text:'执法管理',
    			scope : this,
    			tooltip: '执法管理',
    			handler : function(btn){
    				me.fireEvent('jxgl', btn);
    			}
   			});
    	 me.KHGLBtn= Ext.create('App.Common.ImageButtonEx',{
 		    x:1500,
    	    y:20,
 		    width:90,
 		    height:30,
 		    text:'考核管理',
 			scope : this,
 			tooltip: '考核管理',
 			handler : function(btn){
 				me.fireEvent('khgl', btn);
 			}
			});
    	 me.TJFXBtn= Ext.create('App.Common.ImageButtonEx',{
     		x:1600,
       	    y:20,
    		    width:90,
    		    height:30,
    		    text:'统计分析',
    			scope : this,
    			tooltip: '统计分析',
    			handler : function(btn){
    				me.fireEvent('tjfx', btn);
    			}
   			});
    	 me.loginBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
    		 x:1550,
    	      y:20,
 		    width:90,
 		    height:30,
 		    text:'登陆',
 			scope : this,
 			tooltip: '登陆',
 			//btnCls:  'icon-search1',
 			handler : this.login
			});
    	 me.resetBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
    		 x:1810,
    	      y:20,
 		    width:90,
 		    height:30,
 		    text:'注销',
 			scope : this,
 			tooltip: '注销',
 			//btnCls:  'icon-search1',
 			handler : this.reset
			});
    	 var add = Ext.checkUsername();
    	 this.username = Ext.create('Ext.Component',
                 {
    		 		x:1700,
   	      			y:20,
   	      		    width:120,
   	 		        height:30,
                    cls: 'x-sp-main-menu-text',
                    html: '欢迎:'+add
                 });
    	 var temp = [];
    	 if(add ==""){
    		 temp.push(me.loginBtn);
    	 }else {
    		 temp.push(me.searchBtn);
    		 temp.push(me.hsearchBtn);
    		 temp.push(me.XXLRBtn);
    		 temp.push(me.JXGLBtn);
    		 temp.push(me.KHGLBtn);
    		 temp.push(me.TJFXBtn);
    		 temp.push(this.username);
    		 temp.push(me.resetBtn);
    	 }
    	 me.items = temp;
    	/*me.items=[ 
    	           me.searchBtn,
    	           me.hsearchBtn,
                   me.XXLRBtn,
                   me.JXGLBtn,
                   me.TJFXBtn,
                   me.loginBtn
    	          ]*/
    	
    	me.callParent(arguments);
    },
    
    
    setSelectValue:  function(selected){
    	this.selected=selected;
    },
    login:function(){
    	Ext.create("App.grfz.loginDlg",{
    		url:'../GRFZ/login',
    	}).show();
    },
    reset:function(){
    	window.open('../GRFZ/reset',"_self")
    }
});