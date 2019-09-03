Ext.define('App.grfz.xxlr.jbxxda.jbxx', {
	extend:'App.framework.listfrm',
	url:'../JBXXGL/getJBGLLists',
	requires : ['App.Common.HyperLinkColumn'],
	title:'基本信息',
	gridautoLoad: true,
	pageitemselectkey:'JBXXDABH',
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
	  						name : 'JBXXDABH',
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
	  						name : 'SEX',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '性别',
	  							width : 100,
	  							renderer: function(value){
	  								if(value=='0'){
	  									return '男';
	  								}else if(value=='1'){
	  									return '女';
	  								}
	  								else if(value=='男'){
	  									return '男';
	  								}else if(value=='女'){
	  									return '女';
	  								}
	  							}
	  						}
	  					},{
	  						name : 'NL',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '年龄',
	  							width : 100
	  						}
	  					}/*,{
	  						name : 'ZZSF',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '政治身份',
	  							width : 100
	  						}
	  					}*/,{
	  						name : 'PHONE',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '手机号',
	  							width : 110
	  						}
	  					},{
	  						name : 'JZ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '警种',
	  							width : 100
	  						}
	  					},{
	  						name : 'JH',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '警号',
	  							width : 100
	  						}
	  					},{
	  						name : 'XGZDW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '现工作单位',
	  							width : 100
	  						}
	  					},{
	  						name : 'GW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '岗位',
	  							width : 100
	  						}
	  					},{
	  						name : 'ZW',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '职务',
	  							width : 100
	  						}
	  					},{
	  						name : 'GL',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '工龄',
	  							width : 100
	  						}
	  					},{
	  						name : 'XJWCQK',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '休假完成情况',
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
	  										handler : this.onModifyClick
	  									},{
	  										iconCls : 'icon-grfz-Del',
	  										tooltip : '删除',
	  										text:'删除',
	  										width:50,
	  										scope : this,
	  										handler: function (grid, rowIndex, colIndex) {
	  					                        var rec = grid.getStore().getAt(rowIndex);
	  					                     
	  					                        this.delChn(rec.get('JBXXDABH'));
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
	                url: '../JBXXGL/deleteJBXX',
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
    onModifyClick: function (grid, rowIndex, colIndex) {
    	var vme=this;
        var rec = grid.getStore().getAt(rowIndex);
        var v = Ext.create('App.grfz.xxlr.jbxxda.editDlg', {
            JBXXDABH: rec.get('JBXXDABH'),
            url: '../JBXXGL/editJBXX',
            modifyMod:true,
            listeners: {
                scope: vme,
                saveok: vme.onFinished
            }
        }).show();
    },
    onFinished:function(){
    	this.reLoad();
    }
});
