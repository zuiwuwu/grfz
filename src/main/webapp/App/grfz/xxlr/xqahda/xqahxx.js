Ext.define('App.grfz.xxlr.xqahda.xqahxx', {
	extend:'App.framework.listfrm',
	url:'../XQAHGL/getXQAHGLLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'兴趣爱好及特长信息',
	gridautoLoad: true,
	pageitemselectkey:'AHTCDABH',
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
	  						name : 'AHTCDABH',
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
	  						name : 'CJST',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '参加社团',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'TC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '特长',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'HDZSSJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '获得证书时间',
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
	  						name : 'HDZSLB',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '获得证书类别',
	  							width : 100,
	  					
	  						}
	  					}, {
	  						name : 'FZDW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '发证单位',
	  							width : 100
	  						}
	  					},{
	  						name : 'BSHJSJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '比赛获奖时间',
	  							width : 100
	  						}
	  					},{
	  						name : 'BSMC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '比赛名称',
	  							width : 100
	  						}
	  					},{
	  						name : 'JBDW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '举办单位',
	  							width : 110
	  						}
	  					},{
	  						name : 'HJQK',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '获奖情况',
	  							width : 110
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
	  									        var v = Ext.create('App.grfz.xxlr.xqahda.editDlg', {
	  									        	AHTCDABH: rec.get('AHTCDABH'),
	  									            url: '../XQAHGL/editAHXX',
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
	  					                        this.delChn(rec.get('AHTCDABH'));
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
	                url: '../XQAHGL/deleteXQAHXX',
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
