Ext.define('App.grfz.jxgl.zfzgda.gridButton', {
    extend: 'Ext.container.Container',
    layout:'absolute',
    border: 0,
	width :'100%',
	height:30,
	initComponent : function() {
		  var me=this;
		  me.title = Ext.create('Ext.Component',{
			     x:10,
			     y:10,
			     //cls:'compay_right',
	             html:'执法资格等级'
				});
		   me.addBtn= Ext.create('App.Common.ImageButtonEx',{
			    x:1680,
			    y:0,	
	 		    width:50,
	 		    height:20,		   
	 			scope : this,
	 			tooltip: '添加',
	 			btnCls:  'icon-grfz-Add-icon',
	 			handler :this.addxx
				});
	 	    me.delBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
	 	    	x:1740,
				y:0,
			    width:50,
			    height:20,
			  
				scope : this,
				tooltip: '删除',
				btnCls:  'icon-grfz-Del-icon',
				handler : this.onDelClick
				});
		 me.importBtn= Ext.create('App.Common.ImageButtonEx',{
			 x:1800,
			y:0,
 		    width:54,
 		    height:20,
 		    
 			scope : this,
 			tooltip: '导入',
 			btnCls:  'icon-grfz-Import-icon',
 			handler : this.onImportClick
			});
 	    me.exportBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
 	    	 x:1860,
			y:0,
		    width:54,
		    height:20,
		   
			scope : this,
			tooltip: '导出',
			btnCls:  'icon-grfz-Export-icon',
			handler :this.onexportClick
			});
 		me.items=[ me.title,
 		           me.delBtn,
 		           me.addBtn,
 		           me.importBtn,
 		           me.exportBtn
                  
    	          ]
    	me.callParent(arguments);
		},
		addxx: function(btn){
			
			},
		onImportClick: function () {
			        var vme = this;
			        Ext.create('App.Common.UploadFileDlg', {
			            url: '../JXGL/importZFZGExcel',
			            title: '导入数据',     
			            listeners: {
			                saveok: function (result) {
			                
			                	vme.zfzgxx.reLoad();
			                }
			            }
			        }).show();
			    },
		onDelClick:function(){
			  this.zfzgxx.onDelClick();  	
			    },
	   onFinished:function(){
		   
	   }
});