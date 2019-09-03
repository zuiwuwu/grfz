Ext.define('App.grfz.jxgl.fajjxglda.jxxx', {
	extend:'App.framework.listfrm',
	url:'../JXGL/getFAJJXGLLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'绩效信息',
	gridautoLoad: true,
	pageitemselectkey:'FAJJXGLBH',
	width :'100%',
	flex:1,
	oldStyle : true,
	initComponent : function() {
		var me = this;	
	     	this.columns = [{
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
	  						name : 'AJMC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '案件名称',
	  							width : 100,
	  					
	  						}
	  					},
	  					{
	  						name : 'FAJJXGLBH',
	  						type : 'string',
	  						
	  					},{
	  						name : 'AJLB',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '案件类别',
	  							width : 100
	  						}
	  					},,{
	  						name : 'AJFLB',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '案件副案别',
	  							width : 100
	  						}
	  					},{
	  						name : 'BADW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '办案单位',
	  							width : 100
	  						}
	  					},{
	  						name : 'ZBMJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '主办民警',
	  							width : 100
	  						}
	  					},{
	  						name : 'ZBMJZXF',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '主办民警质效分',
	  							width : 110
	  						}
	  					},{
	  						name : 'XBMJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '协办民警',
	  							width : 100
	  						}
	  					},{
	  						name : 'XBMJZXF',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '协办民警质效分',
	  							width : 110
	  						}
	  					},{
	  						name : 'ZBRY',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '抓捕人员',
	  							width : 80
	  						}
	  					},{
	  						name : 'SXRY',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '审讯人员',
	  							width : 80
	  						}
	  					},{
	  						name : 'JASJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '办结时间',
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
	  						name : 'TJSJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '统计时间',
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
	  										//width:50,
	  										handler : this.onDetails
	  									}, {
	  										iconCls : 'icon-grfz-Edit-icon',
	  										tooltip : '编辑',
	  										text:'编辑',
	  										//width:50,
	  										scope : this,
	  										handler : this.onQuickDeploy
	  									},{
	  										iconCls : 'icon-grfz-Del',
	  										tooltip : '删除',
	  										text:'删除',
	  										//width:50,
	  										scope : this,
	  										handler: function (grid, rowIndex, colIndex) {
	  					                        var rec = grid.getStore().getAt(rowIndex);
	  					                        this.delChn(rec.get('FAJJXGLBH'));
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
	                url: '../JXGL/deleteFAJJXXX',
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
	   itemdblclick:function (grid, record, item, index, e, eOpts) {
	
        },
        onDetails:function(){
        	console.log(this.viewPort.bottomcontain);
        	this.viewPort.bottomcontain.getLayout().setActiveItem(3);
        }
	
});
