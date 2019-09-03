Ext.define('App.grfz.searchContain', {
    extend: 'Ext.container.Container',
    layout : 'absolute',
    border: 0,
    width:'100%',
    flex:1,
    style:{
    	background:'url(../images/grfz/grfz_back.png);'
    },
    initComponent: function () {   	
    	 this.addEvents(
     	        'hsearch'
     	       );
    	var me = this;	
		me.searchtext = Ext.create('App.Public.HMTextField', {
			    x:680,
			    y:490,
				name : 'platechars',
				vtype : 'HPHM',
				width : 500,
				height:45,
				value : "",	
				tooltip : ""
			});
		 me.serachBtn = Ext.create('App.Common.ImageButtonEx',{
			    x:1160,
			    y:490,
	 		    width:80,
	 		    height:45,
	 			scope : this,
	 			tooltip: '搜索',
	 			btnCls:  'icon-grfz-search',
	 			handler : this.serach,
				});
		 me.hserachBtn = Ext.create('App.Common.ImageButtonEx',{
			    x:1260,
			    y:465,
	 		    width:100,
	 		    height:50,
	 			scope : this,
	 			tooltip: '高级搜索',
	 			//btnCls:'icon_grfz_search',
	 			handler :  function(btn){
	   				me.fireEvent('hsearch', btn);
	   			} 
				});
		 me.BBtext = Ext.create('Ext.Component',{
			     x:777,
			     y:850,
			     cls:'compay_right',
	             html:'版权所有:南京晟磐科技开发有限公司'
				});
		 var add = Ext.checkUsername();
    
    	 var temp = [];
    	 if(add ==""){
    		 temp.push( me.BBtext);
    	 }else {
    		 temp.push(me.searchtext);
    		 temp.push(me.serachBtn);
    		 temp.push( me.BBtext);
    	 }
    	 me.items = temp; 	
    	 me.callParent(arguments);
    },
    
     serach:function(){
    	 var search=this.searchtext.getValue();   	
    	 var cllsxx=Ext.create('App.grfz.cllsxx', {
 			width: '100%',
 			flex: 1,
 			index:this.index
 	        });
    	 cllsxx.getStore().clearFilter(true);
    	 cllsxx.getStore().filter( [{
				property : 'searchtext',
				value : search
			}]);
    	 //cllsxx.getStore().load({params:{searchtext:search}});
	     this.index.bottomcontain.removeAll();
	     this.index.bottomcontain.add(cllsxx);
	     this.index.topcontain.getLayout().setActiveItem(1);
    }
});