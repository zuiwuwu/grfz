Ext.define('App.grfz.xxlr.jcda.jcxx', {
	extend:'App.framework.listfrm',
	url:'../JCGL/getJCGLLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'奖惩信息',
	gridautoLoad: true,
	pageitemselectkey:'JCDABH',
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
	  						name : 'JCDABH',
	  						type : 'string',	
	  					},{
	  						name : 'GRHDW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '个人或单位',
	  							width : 150,
	  					
	  						}
	  					},{
	  						name : 'JLCS',
	  						type : 'string',
	  						gridcol : {
	  			                xtype: 'hyperlinkcolumn',
	  			                sortable: true,
	  			                header: '奖励次数',
	  			                width: 100,
	  			                handler: function (grid, rowIndex, colIndex) {
	  			                    var rec = grid.getStore().getAt(rowIndex);
	  			                  var s = '1';
	  			                
	  			                    Ext.create('App.grfz.xxlr.jcda.jcdaxq', {
	  			                    	GRHDW : rec.data.GRHDW,
	  			                    	ss : grid.getStore(),
	  			                    	S : s
	  			                    }).show();
	  			                },
	  			               /* customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
	  			                    if (value == '') {
	  			                        return "无";
	  			                    }
	  			                    return value;
	  			                }*/
	  			            }
	  					},{
	  						name : 'CFCS',
	  						type : 'string',
	  						gridcol : {
	  			                xtype: 'hyperlinkcolumn',
	  			                sortable: true,
	  			                header: '惩罚次数',
	  			                width: 100,
	  			                handler: function (grid, rowIndex, colIndex) {
	  			                    var rec = grid.getStore().getAt(rowIndex);
	  			                    var s = '2';
	  			                    Ext.create('App.grfz.xxlr.jcda.jcdaxq', {
	  			                    	GRHDW : rec.data.GRHDW,
	  			                    	ss : grid.getStore(),
	  			                    	S : s
	  			                    }).show();
	  			                },
	  			               /* customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
	  			                    if (value == '') {
	  			                        return "无";
	  			                    }
	  			                    return value;
	  			                }*/
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
	                url: '../JCGL/deleteJCXX',
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
