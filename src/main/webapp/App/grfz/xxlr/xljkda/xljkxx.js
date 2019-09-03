Ext.define('App.grfz.xxlr.xljkda.xljkxx', {
	extend:'App.framework.listfrm',
	url:'../XLJKGL/getXLJKGLLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'心里健康信息',
	gridautoLoad: true,
	pageitemselectkey:'XLJKDABH',
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
	  					},
	  					{
	  						name : 'XLJKDABH',
	  						type : 'string',	
	  					},{
	  						name : 'XM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '姓名',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'ZZDW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '组织单位',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'CSSJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '测试时间',
	  							width : 200,
	  						/*	renderer : function(value, metaData, record,
	  									rowIndex, colIndex, store) {
	  								return value.substr(0, 4)
	  										+'年'
	  										+ value.substr(4, 2)
	  										+'月'
	  										+ value.substr(6, 2)
	  										+ '日'
	  										+ value.substr(8, 2) + ':'
	  										+ value.substr(10, 2) + ':'
	  										+ value.substr(12, 2);
	  							}*/
	  						}
	  					},{
	  						name : 'CSXM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '测试项目',
	  							width : 100,
	  					
	  						}
	  					}, {
	  						name : 'CJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '成绩',
	  							width : 100
	  						}
	  					},{
	  						name : 'PJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '评价',
	  							width : 100
	  						}
	  					},{
	  						name : 'FDLS',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '辅导老师',
	  							width : 100
	  						}
	  					},{
	  						name : 'FDSJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '辅导时间',
	  							width : 200,
	  							/*renderer : function(value, metaData, record,
	  									rowIndex, colIndex, store) {
	  								return value.substr(0, 4)
	  										+'年'
	  										+ value.substr(4, 2)
	  										+'月'
	  										+ value.substr(6, 2)
	  										+ '日'
	  										+ value.substr(8, 2) + ':'
	  										+ value.substr(10, 2) + ':'
	  										+ value.substr(12, 2);
	  							}*/
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
	  							items : [{
	  								        iconCls:'icon-grfz-Look-icon',
	  										tooltip : '查看详情',	
	  										text:'查看详情',	
	  										scope : this,
	  										width:50,
	  										handler : this.onDetails
	  									}, {
	  										iconCls : 'icon-grfz-Edit-icon',
	  										tooltip : '编辑',
	  										text:'编辑',
	  										width:50,
	  										scope : this,
	  										handler : function(grid, rowIndex, colIndex){
	  									    	var vme=this;
	  									        var rec = grid.getStore().getAt(rowIndex);
	  									        var v = Ext.create('App.grfz.xxlr.xljkda.editDlg', {
	  									        	XLJKDABH: rec.get('XLJKDABH'),
	  									            url: '../XLJKGL/editJKXX',
	  									            modifyMod:true,
	  									            listeners: {
	  									                scope: vme,
	  									                saveok: function(){
	  									                	 vme.reLoad();
	  									                }
	  									            }
	  									        }).show();		  									    
	  										}
	  									},{
	  										iconCls : 'icon-grfz-Del',
	  										tooltip : '删除',
	  										text:'删除',
	  										width:50,
	  										scope : this,
	  										handler: function (grid, rowIndex, colIndex) {
	  					                        var rec = grid.getStore().getAt(rowIndex);
	  					                        this.delChn(rec.get('XLJKDABH'));
	  					                    }
	  									}
	  									]
	  						}
	  					}];	
		me.callParent(arguments);

	},
	  delChn: function (vchns) {
	        var vme = this;
	        Ext.MessageBox.confirm('提示', '是否确定要删除?', function (result) {
	            if (result != 'yes')
	                return;
	            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
	            myMask.show();
	            Ext.Ajax.request({
	                url: '../XLJKGL/deleteXLJKXX',
	                method: 'post', //方法  
	                params: { IDS: vchns },
	                callback: function (options, success, response) {
	                    myMask.hide();
	                    if (success) {
	                        var v = Ext.JSON.decode(response.responseText);
	                        if (!v.success)
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
	    	  var vsel = this.list.getSelectedString();
	    	  if(vsel!=''){
	          this.delChn(vsel);
	    	  }
	    },
	afterRender : function() {
		this.callParent(arguments);
		
	},	
	itemdblclick:function (grid, record, item, index, e, eOpts) {
	
    },
	
	
});
