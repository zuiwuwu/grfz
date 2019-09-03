Ext.define('App.grfz.highsearch.hSearchContain', {
    extend: 'Ext.container.Container',
    layout : 'vbox',
    border: 1,
    width:'100%',
    flex:1,
    style:{
    },
    initComponent: function () {   	
      this.jbxxContain=Ext.create('App.grfz.highsearch.jbxxContain',{
    	   flex:1,
    	   height:50,
    	   cls: 'x-sp-main-toolbar',
       });
  	 
      this.gwxxContain=Ext.create('App.grfz.highsearch.gwxxContain',{
   	       flex:1,
   	       height:50,
   	       cls: 'x-sp-main-toolbar',
      });
      this.xqahxxContain=Ext.create('App.grfz.highsearch.xqahxxContain',{
      	   flex:1,
      	   height:50,
      	  cls: 'x-sp-main-toolbar',
         });
      this.pxxxContain=Ext.create('App.grfz.highsearch.pxxxContain',{
     	   flex:1,
     	   height:50,
     	  cls: 'x-sp-main-toolbar',
        });
      this.jcxxContain=Ext.create('App.grfz.highsearch.jcxxContain',{
    	   flex:1,
    	   height:50,
    	   cls: 'x-sp-main-toolbar',
       });
      this.khxxContain=Ext.create('App.grfz.highsearch.khxxContain',{
   	   flex:1,
   	   height:350,
   	 
      });
      this.serachBtn = Ext.create('App.Common.ImageButtonEx',{
		    x:900,
		    y:100,
		    width:80,
		    height:45,
			scope : this,
			tooltip: '搜索',
			btnCls:  'icon-grfz-search',
			handler :this.search,
			});
  	   this.items=[{
			           xtype: 'container',
			           layout: 'hbox',
			           width: '100%',     
			           height:50,
			           items: [{ 
			        	   xtype: 'component',
			        	   cls: 'x-sp-main-toolbar',
			        	   width:200,
			       	       height:50,
			       	       padding:'15 20 15 40',
			       	       html:'民警基本信息档案'
			        	   },
			        	   this.jbxxContain
			           ]
                   },{
			           xtype: 'container',
			           layout: 'hbox',		          
			           width: '100%',
			           height:50,
			           items: [{ 
			        	   xtype: 'component',
			        	   cls: 'x-sp-main-toolbar',
			        	   width:200,
			       	       height:50,
			       	       padding:'15 20 15 40',
			       	       html:'岗位档案'
			        	   },
			        	   this.gwxxContain
			           ]
                   },{
			           xtype: 'container',
			           layout: 'hbox',
			           border: 10,    
			           width: '100%',
			           height:50,
			           items: [{ 
			        	   xtype: 'component',
			        	   width:200,
			       	       height:50,
			       	       cls: 'x-sp-main-toolbar',
			       	       padding:'15 20 15 40',
			       	       html:'兴趣爱好档案'
			        	   },
			        	   this.xqahxxContain
			           ]
                   },{
			           xtype: 'container',
			           layout: 'hbox',
			           width: '100%',
			          
			           height:50,
			           items: [{ 
			        	   xtype: 'component',
			        	   width:200,
			       	       height:50,
			       	       cls: 'x-sp-main-toolbar',
			       	       padding:'15 20 15 40',
			       	       html:'培训档案'
			        	   },
			        	   this.pxxxContain
			           ]
                   },{
			           xtype: 'container',
			           layout: 'hbox',
			           width: '100%',
			           height:50,
			           items: [{ 
			        	   xtype: 'component',
			        	   width:200,
			       	       height:50,
			       	       cls: 'x-sp-main-toolbar',
			       	       padding:'15 20 15 40',
			       	       html:'奖惩档案'
			        	   },
			        	   this.jcxxContain
			           ]
                   },{
			           xtype: 'container',
			           layout: 'hbox',
			           width: '100%',
			           height:350,
			           items: [{ 
			        	   xtype: 'component',
			        	   width:200,
			       	       height:350,
			       	       cls: 'x-sp-main-toolbar',
			       	       padding:'150 80 150 40',
			       	       html:'考核档案'
			        	   },
			        	   this.khxxContain
			           ]
                   },{
			           xtype: 'container',
			           layout : 'absolute',
			           width: '100%',
			           flex:1,
			           cls: 'x-sp-main-toolbar',
			           items: [
                          this.serachBtn
			           ]
                   }
  	               ]
    	this.callParent(arguments);
    },
   getFilter:function(){
	   var filters=this.jbxxContain.getValue();
	   debugger;
	   filters.push({
			property : 'GWLB',
			value : this.gwxxContain.GWLB.getValue(),
		},{
			property : 'GWNDSTART',
			value : this.gwxxContain.GWNDSTART.getValue(),
		},{
			property : 'GWNDSTOP',
			value : this.gwxxContain.GWNDSTOP.getValue(),
		},{
			property : 'NDCJPMJK',
			value : this.gwxxContain.NDCJPMJK.getValue(),
		},{
  			property : 'XQAH',
  			value : this.xqahxxContain.XQAH.getValue(),
  		},{
			property : 'PXLB',
			value : this.pxxxContain.PXLB.getValue(),
		},{
			property : 'JCLB',
			value : this.jcxxContain.JCLB.getValue(),
		})
		return filters
   },
  search:function(){ 
	  
	   var filters=this.getFilter();
	   console.log(filters);
		Ext.Ajax.request({
			url : '../GRFZ/getSerachLists',
			params : {
				filter :filters
			},
			method : 'post',
			scope : this,
			callback : function(options, success, response) {
				
				if (success) {

				} else {
					alert("网络错误！");
				}
			}
		});	      
  }  
  
});