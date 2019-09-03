
Ext.define('App.grfz.index', {
	extend : 'Ext.container.Container',
	layout : 'vbox',
	width:'100%',
    height:'100%',
	initComponent : function() {
		var me=this;
		me.topButton1=Ext.create('App.grfz.topButton', {
	        width:'100%',
	        height: 50,
	        style:{
		    	background:'url(../images/grfz/top_bg.png);'
		    },
	        listeners:{	
   			 search: function (btn) {
   				me.bottomcontain.removeAll();
   				var searchContain=Ext.create('App.grfz.searchContain', {
   					width: '100%',
   					flex : 1,	
   			        index:me,   			     
   			        });
   				me.bottomcontain.add(searchContain);
   				me.topcontain.getLayout().setActiveItem(0);
                },
             hsearch: function (btn) {
		   				me.bottomcontain.removeAll(); 
		   				var hSearchContain=Ext.create('App.grfz.highsearch.hSearchContain',{});
		            	me.bottomcontain.add(hSearchContain);
		            	me.topcontain.getLayout().setActiveItem(1);
		                },   
             xxlr:   function(){
            	me.bottomcontain.removeAll();    
            	var xxlrindex=Ext.create('App.grfz.xxlr.index', {			
        			viewPort:me,
        		});
            	me.bottomcontain.add(xxlrindex);
            	me.topcontain.getLayout().setActiveItem(1);
            	  	
             } ,
             login:function(){
            	 
             },
             jxgl:function(){
            
            		me.bottomcontain.removeAll();    
                	var jxglindex=Ext.create('App.grfz.jxgl.index', {	
                		viewPort:me,
            		});
                	me.bottomcontain.add(jxglindex);
                	me.topcontain.getLayout().setActiveItem(1);
             },
            khgl:function(){
                 
         		me.bottomcontain.removeAll();    
             	var khglindex=Ext.create('App.grfz.khgl.index', {	
             		viewPort:me,
         		});
             	me.bottomcontain.add(khglindex);
             	me.topcontain.getLayout().setActiveItem(1);
          },
             
	          tjfx:function(){
	        	  me.bottomcontain.removeAll();
	        	  Ext.Ajax.request({
	    			url:'../TJFX/getAlldata',
	      			method : 'post', 
	      			params: { DEPTNAME: '全局' },
	      			scope: this,
	      			callback : function(options, success, response) {
	      				if (success) {
	      					if (response.responseText&& response.responseText != '') {
	      						 result = Ext.JSON.decode(response.responseText);
	      						var result = Ext.JSON.decode(response.responseText);
	    						 var tjfxindex=Ext.create('App.grfz.tjfx.index', {	
	    		   	              		viewPort:me,
	    		   	              		result:result
	    		   	          		});
	    						 me.bottomcontain.add(tjfxindex);
	    		   	              	me.topcontain.getLayout().setActiveItem(1);
	      					}
	      				} else {
	      					
	      				}
	      			}
	      		});
	                   
	           	  
	   	              }
   		 }
	        });
		me.topButton2=Ext.create('App.grfz.topButton', {
	        width:'100%',
	        height: 50,
	        style:{
		    	background:'url(../images/grfz/grfz_top_back.png);'
		    },
	        listeners:{	
   			 search: function (btn) {
   				me.bottomcontain.removeAll();
   				var searchContain=Ext.create('App.grfz.searchContain', {
   					width: '100%',
   					flex : 1,	
   			        index:me,
   			     
   			        });
   				me.bottomcontain.add(searchContain);
   				me.topcontain.getLayout().setActiveItem(0);
                },
             xxlr:   function(){
            	me.bottomcontain.removeAll();    
            	var xxlrindex=Ext.create('App.grfz.xxlr.index', {			
        			viewPort:me,
        		});
            	me.bottomcontain.add(xxlrindex);
            	me.topcontain.getLayout().setActiveItem(1);
            	 	
             } ,
             hsearch: function (btn) {
	   				me.bottomcontain.removeAll(); 
	   				var hSearchContain=Ext.create('App.grfz.highsearch.hSearchContain',{});
	            	me.bottomcontain.add(hSearchContain);
	            	me.topcontain.getLayout().setActiveItem(1);
	                },   
             jxgl:function(){
                 
         		me.bottomcontain.removeAll();    
             	var jxglindex=Ext.create('App.grfz.jxgl.index', {	
             		viewPort:me,
         		});
             	me.bottomcontain.add(jxglindex);
             	me.topcontain.getLayout().setActiveItem(1);
          },
          khgl:function(){
              
       		me.bottomcontain.removeAll();    
           	var khglindex=Ext.create('App.grfz.khgl.index', {	
           		viewPort:me,
       		});
           	me.bottomcontain.add(khglindex);
           	me.topcontain.getLayout().setActiveItem(1);
        },
           
	   	   tjfx:function(){
	   		 me.bottomcontain.removeAll();
	   		var result = '';
	   		
      	  Ext.Ajax.request({
  			url:'../TJFX/getAlldata',
    			method : 'post', 
    			params: { DEPTNAME: '全局' },
    			scope: this,
    			callback : function(options, success, response) {
    				if (success) {
    					if (response.responseText&& response.responseText != '') {
    						var result = Ext.JSON.decode(response.responseText);
    						 var tjfxindex=Ext.create('App.grfz.tjfx.index', {	
    		   	              		viewPort:me,
    		   	              		result:result
    		   	          		});
    						 me.bottomcontain.add(tjfxindex);
    		   	             me.topcontain.getLayout().setActiveItem(1);
    					}
    				} else {
    					
    				}
    			}
    		});
      	  
	   	              	
	   	              	
	   	           	  
	   	   	              }
          
   		 }
	        });
		
		
		me.searchContain=Ext.create('App.grfz.searchContain', {
			width: '100%',
			 flex : 1,	
	        index:this,
	        listeners:{	
	   			 hsearch: function (btn) {
	   				me.bottomcontain.removeAll(); 
	   				var hSearchContain=Ext.create('App.grfz.highsearch.hSearchContain',{});
	            	me.bottomcontain.add(hSearchContain);
	            	me.topcontain.getLayout().setActiveItem(1);
	                },        
	   		}
	        });

		
	
		me.bottomcontain=Ext.create('Ext.container.Container', {
			    layout: 'card',
			    border: 0,
			    width : '100%',
			    flex : 1,	
			    items: [
	                     me.searchContain,                 
				             ]
		});
		me.topcontain=Ext.create('Ext.container.Container', {
		    layout: 'card',
		    border: 0,
		    width : '100%',
		    height:50,	
		    items: [
                     me.topButton1, 
                     me.topButton2,    
			             ]
	});
		me.items = [	            
                  me.topcontain,
                  me.bottomcontain 		
		];	
		this.callParent(arguments);
	},
	
});

