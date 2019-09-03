Ext.define('App.grfz.khgl.qynkh.index.list', {
	extend:'App.framework.listfrm',
	url:'../KHGL/getQYNKHLists',
	pageitemselectkey:'ID',
	width :'100%',
	flex:1,
	oldStyle : true,
	initComponent : function() {
		var me = this;	
	     	this.columns = [
	  			          {
	  						name : '',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							//autoSizable : true,
	  							xtype : 'rownumberer',
	  							header : '序号',
	  							width : 60
	  						}
	  					},{
	  						name : 'ID',
	  						type : 'string',
	  					},{
	  						name : 'USERNAME',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '姓名',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'USERTYPE',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '警员属性',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'TIME',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '时间',
	  							width : 100
	  						}
	  					},{
	  						name : 'SCORE',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '得分',
	  							width : 100
	  						}
	  					},{
	  						name : 'RANK',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '排名',
	  							width : 100
	  						}
	  					},{
	  						name : '',
	  						type : 'string',
	  						gridcol : {
	  							header : '操作',
	  							sortable : false,
	  							xtype : 'actioncolumn',
	  							flex : 1,
	  							minWidth : 160,
	  							items : [/*{
	  								        iconCls:'icon-grfz-Look-icon',
	  										tooltip : '查看详情',	
	  										text:'查看详情',	
	  										scope : this,
	  										//width:50,
	  										handler : this.onDetails
	  									}, {
	  										iconCls : 'icon-grfz-Edit-icon',
	  										tooltip : '编辑',
	  										text:'编辑',
	  										//width:50,
	  										scope : this,
	  										handler : this.onQuickDeploy
	  									},*/{
	  										iconCls : 'icon-grfz-Del',
	  										tooltip : '删除',
	  										text:'删除',
	  										//width:50,
	  										scope : this,
	  										handler: function (grid, rowIndex, colIndex) {
	  					                        var rec = grid.getStore().getAt(rowIndex);
	  					                        this.delChn(rec.get('ID'));
	  					                    }
	  									}
	  									]
	  						}
	  					}];	
		me.callParent(arguments);

	},
	
	afterRender : function() {
		this.callParent(arguments);
		
	},	
	
	  delChn: function (vchns) {
	        var vme = this;
	        Ext.MessageBox.confirm('提示', '是否确定要删除?', function (result) {
	            if (result != 'yes')
	                return;
	            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
	            myMask.show();
	            Ext.Ajax.request({
	                url: '../KHGL/delQYNKH',
	                method: 'post', //方法  
	                params: { IDS: vchns },
	                callback: function (options, success, response) {
	                    myMask.hide();
	                    if (success) {
	                        var v = Ext.JSON.decode(response.responseText);
	                        if (v.errcode==0)
	                            alert(v.msg);
	                        else
	                            vme.reLoad();
	                    }
	                    else {
	                    	alert('删除失败！');
	                    }
	                }
	            });
	        });

	    },
	    
	    onDelClick: function () {
	    	  var sels = this.list.getSelectionModel().getSelection();
	  		if(sels.length == 0)
	  		{
	  			Ext.MessageBox.alert('提示','请选择删除的信息');
	  			return ;
	  		}
	  		var ID = '';
	  		for(var i = 0;i < sels.length;i ++)
	  		{
	  			if(ID != '')
	  				ID += ',';
	  			ID += sels[i].get('ID');
	  		}
	  		this.delChn(ID);
	    }
	
});


Ext.define('App.grfz.khgl.qynkh.index.gridButton', {
    extend: 'Ext.container.Container',
    layout:'absolute',
    border: 0,
	width :'100%',
	height:30,
	initComponent : function() {
		var me=this;
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
	 	    me.delBtn  = Ext.create('App.Common.ImageButtonEx',{
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
 		me.items=[ 
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
			            url: '../KHGL/importQYNKH',
			            title: '导入数据',     
			            listeners: {
			                saveok: function (result) {
			                
			                	vme.list.reLoad();
			                }
			            }
			        }).show();
			    },
		onDelClick:function(){
			  this.list.onDelClick();  	
			    },
	   onFinished:function(){
		   
	   }
});





Ext.define('App.grfz.khgl.qynkh.index', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.list=Ext.create('App.grfz.khgl.qynkh.index.list', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.khgl.qynkh.index.gridButton', {
			list:me.list,
		});
		
		
		me.items=[ me.gridButton,
		           me.list             
    	          ]
    	
    	me.callParent(arguments);
		}
});