Ext.define('App.SSGCXX.ButtonContainerFirst', {
    extend: 'Ext.container.Container',
    layout: 'hbox',
    border: 0,
    width:'100%',
	height:20,
	selected:'',
    initComponent: function () {
    	 this.addEvents(
    	        'prevpage',
    	        'nextpage',
    	        'stop'
    	       );
    	var me = this;
    	 me.KSBKBtn = Ext.create('App.Common.ImageButtonEx',{
 		    width:90,
 		    height:30,
 		    text:'快速布控',
 			scope : this,
 			tooltip: '快速布控',
 			//btnCls:  'icon-search1',
 			handler : this.KSBK,
			});
    	 me.TPXZBtn= Ext.create('App.Common.ImageButtonEx',{
  		    width:90,
  		    height:30,
  		    text:'图片下载',
  			scope : this,
  			tooltip: '图片下载',
  			//btnCls:  'icon-search1',
  			handler : this.DownLoadPic
 			});
    	 me.PreBtn= Ext.create('App.Common.ImageButtonEx',{
   		    width:90,
   		    height:30,
   		    text:'上一个',
   			scope : this,
   			tooltip: '上一个',
   			//btnCls:  'icon-search1',
   			handler : function(btn){
   				me.fireEvent('prevpage', btn);
   			}
  			});
    	 me.NEXTBtn= Ext.create('App.Common.ImageButtonEx',{
    		    width:90,
    		    height:30,
    		    text:'下一个',
    			scope : this,
    			tooltip: '下一个',
    			//btnCls:  'icon-search1',
    			handler : function(btn){
    				me.fireEvent('nextpage', btn);
    			}
   			});
    	 me.STOPBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
 		    width:90,
 		    height:30,
 		    text:'暂停',
 			scope : this,
 			tooltip: '暂停',
 			//btnCls:  'icon-search1',
 			handler : function(btn){
				me.fireEvent('stop', btn);
			}
			});
    	me.items=[
                   me.KSBKBtn,
                  // me.TPXZBtn,
                   me.PreBtn,
                   me.STOPBtn,
                   me.NEXTBtn
    	          ]
    	
    	me.callParent(arguments);
    },
    
    
    setSelectValue:  function(selected){
    	this.selected=selected;
    },
    
    KSBK:function(){
	   var rec = this.selected[0];
		Ext.create('App.BKGL.addDlg', {
			        url: '../BKGL/addBKXX',
					modifyMod : false,
					HPHM : rec.get('HPHM'),
					HPYS:rec.get('HPYS'),
					CSYS:rec.get('CSYS'),
					QUICKDETECT : true,
					LX: 0
				}).show();
   },
   
    DownLoadPic:function(){
    	 var picPath=this.selected[0].get("TPLJ")
		 Ext.saveframe.src= '../SSGC/downPic?picPath='+picPath;
    },
});