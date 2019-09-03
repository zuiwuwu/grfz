Ext.define('App.grfz.xxlr.gwda.gwxx', {
	extend:'App.framework.listfrm',
	url:'../GWGL/getGWGLLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'岗位信息',
	gridautoLoad: true,
	pageitemselectkey:'GWDABH',
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
	  						name : 'GWDABH',
	  						type : 'string',	
	  					},{
	  						name : 'XM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '姓名',
	  							width : 100,
	  					
	  						}
	  					}, {
	  						name : 'GWLB',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '岗位类别',
	  							width : 100
	  						}
	  					},{
	  						name : 'ZRQ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '责任区',
	  							width : 100
	  						}
	  					},{
	  						name : 'SJGWMC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '实际岗位名称',
	  							width : 100
	  						}
	  					},{
	  						name : 'XTNGWMC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '系统内岗位名称',
	  							width : 110
	  						}
	  					},{
	  						name : 'NDCJPMQK',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '年度成绩排名情况',
	  							width : 100
	  						}
	  					},{
	  						name : 'QSSJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '起始时间',
	  							width : 200,
	  						}
	  					},{
	  						name : 'JZSJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '结束时间',
	  							width : 200,
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
	  									        var v = Ext.create('App.grfz.xxlr.gwda.editDlg', {
	  									        	GWDABH: rec.get('GWDABH'),
	  									            url: '../GWGL/editGWXX',
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
	  					                        this.delChn(rec.get('GWDABH'));
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
	                url: '../GWGL/deleteGWXX',
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
