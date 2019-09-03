Ext.define('App.grfz.xxlr.jtda.jtxx', {
	extend:'App.framework.listfrm',
	url:'../JTGL/getJTGLLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'家庭信息',
	gridautoLoad: true,
	pageitemselectkey:'JTDABH',
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
	  						name : 'JTDABH',
	  						type : 'string',	
	  					},
	  					{
	  						name : 'XM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '姓名',
	  							width : 100,
	  					
	  						}
	  					},
	  					{
	  						name : 'GXRXM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '关系人姓名',
	  							width : 100,
	  							
	  						}
	  					},{
	  						name : 'GXRCW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '关系人与该人关系名称',
	  							width : 150,
	  							
	  						}
	  					},{
	  						name : 'GXRCSRQ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '关系人出生日',
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
	  						name : 'GZDWMC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '工作单位名称',
	  							width : 100,
	  					
	  						}
	  					}, {
	  						name : 'BGDH',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '办公电话',
	  							width : 100
	  						}
	  					},{
	  						name : 'RYXZ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '人员现状',
	  							width : 100
	  						}
	  					},{
	  						name : 'XL',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '学历',
	  							width : 100
	  						}
	  					},{
	  						name : 'XQAH',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '兴趣爱好',
	  							width : 110
	  						}
	  					},{
	  						name : 'YHTC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '有何特长',
	  							width : 100
	  						}
	  					},{
	  						name : 'JTZZ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '家庭住址',
	  							width : 100
	  						}
	  					},{
	  						name : 'JTDH',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '家庭电话',
	  							width : 100
	  						}
	  					},{
	  						name : 'WXH',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '微信号',
	  							width : 100
	  						}
	  					},{
	  						name : 'EMAL',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '电子邮箱',
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
	  										handler : this.onQuickDeploy
	  									},{
	  										iconCls : 'icon-grfz-Del',
	  										tooltip : '删除',
	  										text:'删除',
	  										width:50,
	  										scope : this,
	  										handler: function (grid, rowIndex, colIndex) {
	  					                        var rec = grid.getStore().getAt(rowIndex);
	  					                        this.delChn(rec.get('JTDABH'));
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
	                url: '../JTGL/deleteJTXX',
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
