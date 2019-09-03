Ext.define('App.grfz.xxlr.showMenu', {
    extend: 'Ext.container.Container',
    layout: 'absolute',
    width:'100%',
    height:50,
    border: 0,
    initComponent: function () {
    	
    	this.GWBtn  = Ext.create('App.Common.ImageButtonEx',{
        	x:20,
        	y:10,
        	text:'岗位档案',
        	width:100,
            height:30, 
            scope:this,
            handler:this.GWChange
        });	
        this.JBXXBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:100,
        	y:10,
        	text:'基本信息档案',
        	width:100,
            height:30,
            scope:this,
            handler:this.JBXXChange
        });
        this.JXBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:200,
        	y:10,
        	text:'绩效档案',
        	width:100,
            height:30,
			scope:this,
			handler:this.JXChange
        });
        this.JCBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:300,
        	y:10,
        	text:'奖惩档案',
        	width:100,
            height:30,
			//btnCls: 'icon-grfz-JCBtn',
			scope:this,
		    handler:this.JCChange
        });
        
      this.JTBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:400,
        	y:10,
        	text:'家庭档案',
        	width:100,
            height:30,
        	scope:this,
		    handler:this.JTBChange
        });
        
        this.KHBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:500,
        	y:10,
        	text:'考核档案',
        	width:100,
            height:30,
            scope:this,
		    handler:this.KHChange
        });
        
        this.MZBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:600,
        	y:10,
        	text:'民主测评档案',
        	width:100,
            height:30,
            scope:this,
		    handler:this.MZChange
        });  
        this.PXBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:700,
        	y:10,
        	text:'培训档案',
        	width:100,
            height:30,
            scope:this,
		    handler:this.PXChange
        }); 
        this.TSBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:800,
        	y:10,
        	text:'投诉档案',
        	width:100,
            height:30,
            scope:this,
		    handler:this.TSChange
        });
        this.XLJKBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:900,
        	y:10,
        	text:'心里健康档案',
        	width:100,
            height:30,
            scope:this,
		    handler:this.XLJKChange
        });
        this.XQBtn = Ext.create('App.Common.ImageButtonEx',{
        	x:1000,
        	y:10,
        	text:'兴趣爱好及特长档案',
        	width:1000,
            height:30,
            scope:this,
		    handler:this.XQChange
        });
        this.items=[this.GWBtn,this.JBXXBtn,this.JXBtn,this.JCBtn,this.JTBtn,
                    this.KHBtn,this.MZBtn,this.PXBtn, this.TSBtn,this.XLJKBtn,this.XQBtn
                          
                    ]
    	this.callParent(arguments);
    },
       GWChange:function(){
    	   var gwxx=Ext.create('App.grfz.xxlr.gwda.gwxx',{
 			  width:'100%',
 	 		  height:'100%',
 		});

    	   var contain=Ext.create('Ext.container.Container',{
    		   width:'100%',
 	 		   height:'100%',
 	 		   layout: 'vbox',
 	 		   items:[
                        
                         {
                        	  xtype: 'container',
                              layout: 'hbox',
                              width:'100%',
                	 		  height:250,
                	 		 style:{    						    
 						    	background:'url(../images/grfz/GW.png);background-repeat:no-repeat'						    	
 						    }
 						  
                         },
                         gwxx
 	 		          
 	 		          ]
    	   })
           this.gridContian.removeAll();
           var filter=[{
					property : 'XM',
					value :this.gridContian.XM
				}];
           gwxx.getStore().filter(filter);
    	   this.gridContian.add(contain); 
       },
       JBXXChange:function(){
    	   var jbxx=Ext.create('App.grfz.xxlr.jbxxda.jbxx',{
  			  width:'100%',
  	 		  height:'100%',
  		});
    	   var filter=[{
				property : 'XM',
				value :this.gridContian.XM
			}];
    	   jbxx.getStore().filter(filter);
            this.gridContian.removeAll();
     	    this.gridContian.add(jbxx); 
       },
       JXChange:function(){
    	   var jxxx=Ext.create('App.grfz.jxgl.ajjxglda.jxxx',{
   			  width:'100%',
   	 		  height:'100%',
   		});
    	   var filter=[{
				property : 'ZBMJ',
				value :this.gridContian.XM
			}];
    	   console.log(this.gridContian.XM);
   	        jxxx.getStore().filter(filter);
            this.gridContian.removeAll();
      	    this.gridContian.add(jxxx); 
       },
       JCChange:function(){
    	   var jcxx=Ext.create('App.grfz.xxlr.jcda.jcxx',{
    			  width:'100%',
    	 		  flex:1,
    		});
    	   var contain=Ext.create('Ext.container.Container',{
    		   width:'100%',
 	 		   height:'100%',
 	 		   layout: 'vbox',
 	 		   items:[
                       
                         {
                        	  xtype: 'container',
                              layout: 'hbox',
                              width:'100%',
                	 		  height:350,
                	 		 style:{    						    
 						    	background:'url(../images/grfz/XQAH.png);'
 						    },
                         }
                         ,jcxx
 	 		          ]
    	   })
    	   var filter=[{
				property : 'XM',
				value :this.gridContian.XM
			}];
   	        jcxx.getStore().filter(filter);
            this.gridContian.removeAll();
       	    this.gridContian.add(contain); 
       },
       JTBChange:function(){
    	   var jtxx=Ext.create('App.grfz.xxlr.jtda.jtxx',{
 			  width:'100%',
 	 		  height:'100%',
 		});
    	   console.log(this.gridContian.XM);
    	   var filter=[{
				property : 'XM',
				value :this.gridContian.XM
			}];
  	        jtxx.getStore().filter(filter);
            this.gridContian.removeAll();
    	    this.gridContian.add(jtxx); 
       },
       KHChange:function(){
    	   var khxx=Ext.create('App.grfz.xxlr.khda.khxx',{
  			  width:'100%',
  	 		  height:'100%',
  		});
    	   var contain=Ext.create('Ext.container.Container',{
    		   width:'100%',
 	 		   height:'100%',
 	 		   layout: 'vbox',
 	 		   items:[
                        
                         {
                        	  xtype: 'container',
                              layout: 'hbox',
                              width:'100%',
                	 		  height:350,
                	 		 style:{    						    
 						    	background:'url(../images/grfz/KH.png);'
 						    }
 						  
                         },
                         khxx
 	 		          
 	 		          ]
    	   })
    	   var filter=[{
				property : 'XM',
				value :this.gridContian.XM
			}];
 	        khxx.getStore().filter(filter);
            this.gridContian.removeAll();
     	    this.gridContian.add(contain); 
       },
       MZChange:function(){
    	   var mzpcxx=Ext.create('App.grfz.xxlr.mzpcda.mzpcxx',{
   			  width:'100%',
   	 		  height:'100%',
   		});
    	   var filter=[{
				property : 'XM',
				value :this.gridContian.XM
			}];
    	    mzpcxx.getStore().filter(filter);
            this.gridContian.removeAll();
      	    this.gridContian.add(mzpcxx); 
       },
       PXChange:function(){
    	   var pxxx=Ext.create('App.grfz.xxlr.pxda.pxxx',{
    			  width:'100%',
    	 		  height:'100%',
    		});
    	   var contain=Ext.create('Ext.container.Container',{
    		   width:'100%',
 	 		   height:'100%',
 	 		   layout: 'vbox',
 	 		   items:[
                        
                         {
                        	  xtype: 'container',
                              layout: 'hbox',
                              width:'100%',
                	 		  height:400,
                	 		 style:{    						    
 						    	background:'url(../images/grfz/PX.png);background-repeat:no-repeat'
 						    }
 						  
                         },
                         pxxx
 	 		          
 	 		          ]
    	   })
    	   var filter=[{
				property : 'XM',
				value :this.gridContian.XM
			}];
    	    pxxx.getStore().filter(filter);
            this.gridContian.removeAll();
       	    this.gridContian.add(contain); 
       },
       TSChange:function(){
    	   var tsxx=Ext.create('App.grfz.xxlr.tsda.tsxx',{
 			  width:'100%',
 	 		  height:'100%',
 		});
    	    var filter=[{
				property : 'XM',
				value :this.gridContian.XM
			}];
    	    tsxx.getStore().filter(filter);
            this.gridContian.removeAll();
    	    this.gridContian.add(tsxx); 
       },
       XLJKChange:function(){
    	   var xljkxx=Ext.create('App.grfz.xxlr.xljkda.xljkxx',{
  			  width:'100%',
  	 		  height:'100%',
  		});
    	   var filter=[{
				property : 'XM',
				value :this.gridContian.XM
			}];
    	    xljkxx.getStore().filter(filter);
            this.gridContian.removeAll();
     	    this.gridContian.add(xljkxx); 
       },
       XQChange:function(){
    	   
    	   var xqahxx=Ext.create('App.grfz.xxlr.xqahda.xqahxx',{
   			  width:'100%',
   	 		  height:'100%',
   		});
    	   var contain=Ext.create('Ext.container.Container',{
    		   width:'100%',
 	 		   height:'100%',
 	 		   layout: 'vbox',
 	 		   items:[
                        
                         {
                        	  xtype: 'container',
                              layout: 'hbox',
                              width:'100%',
                	 		  height:320,
                	 		 style:{    						    
 						    	background:'url(../images/grfz/XQAH.png);'
 						    }
 						  
                         },
                         xqahxx
 	 		          
 	 		          ]
    	   })
    	   var filter=[{
				property : 'XM',
				value :this.gridContian.XM
			}];
    	    xqahxx.getStore().filter(filter);
            this.gridContian.removeAll();
      	    this.gridContian.add(contain); 
       }

});