Ext.define('App.grfz.xxlr.khda.gwyndkhdc', {
	extend:'App.framework.listfrm',
	url:'../KHGL/getGWYNDKHLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'考核信息',
	gridautoLoad: true,
	pageitemselectkey:'ID',
	width :'100%',
	hidden : false,
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
	  						name : 'ID',
	  						type : 'string',	
	  					},{
	  						name : 'USERNAME',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '姓名',
	  							width : 100
	  						}
	  					},{
	  						name : 'TIME',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '年度',
	  							width : 100
	  						}
	  					},{
	  						name : 'GRADE',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '等级评定',
	  							width : 100
	  						}
	  					}/*,{
	  						name : 'SCORE',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '得分',
	  							width : 110
	  						}
	  					},{
	  						name : 'SJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '时间',
	  							width : 110,
	  							renderer : function(value, metaData, record,
									rowIndex, colIndex, store) {
								return value.substr(0, 4)
										+'年'
										+ value.substr(4, 2)
										+'月'
										
										;
							}
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
	  					                        this.delChn(rec.get('TSDABH'));
	  					                    }
	  									}
	  									]
	  						}
	  					}*/


];	
		me.callParent(arguments);

	},
	
	
	
	
	
	onDetails:function(){
		
	},
	
	
	
	  delChn: function (vchns) {
	        var vme = this;
	        console.log(vchns)
	        Ext.MessageBox.confirm('提示', '是否确定要删除?', function (result) {
	            if (result != 'yes')
	                return;
	            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
	            myMask.show();
	            Ext.Ajax.request({
	                url: '../KHGL/delGWYNDKH',
	                method: 'post', //方法  
	                params: { IDS: vchns },
	                callback: function (options, success, response) {
	                    myMask.hide();
	                    if (success) {
	                        var v = Ext.JSON.decode(response.responseText);
	                       
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
