Ext.define('App.grfz.jxgl.zfzgda.zfzgxx', {
	extend:'App.framework.listfrm',
	url:'../JXGL/getZFZGLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'执法资格等级',
	gridautoLoad: true,
	pageitemselectkey:'ZFZGBH',
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
	  						name : 'XM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '姓名',
	  							width : 100,
	  					
	  						}
	  					},
	  					{
	  						name : 'ZFZGBH',
	  						type : 'string',
	  						
	  					},/*{
	  						name : 'ZWMC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '职务名称',
	  							width : 100
	  						}
	  					},*/{
	  						name : 'ZSJB',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '证书级别',
	  							width : 100
	  						}
	  					},{
	  						name : 'GQSJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '过期时间',
	  							width : 100
	  						}
	  					},{
	  						name : 'SFGQ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '是否过期',
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
	  					                        this.delChn(rec.get('ZFZGBH'));
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
	                url: '../JXGL/deleteZFZGXX',
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
