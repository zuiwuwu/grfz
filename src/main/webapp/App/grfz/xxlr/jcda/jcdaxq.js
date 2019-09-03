
Ext.define('App.grfz.xxlr.jcda.jcdaxq.List', {
    extend: 'App.framework.listfrm',
    listtype: 'grid',
    showImagePreview: false,
    showProgressBarPager: false,
    lastgroupid: 0,
    header: false,
//    gridautoLoad: false,
    arrraySelModID: {},
    checkOnly: false,
    gridpageSize: 14,
   url:this.url,
    oldStyle: false,
    initComponent: function () {
        this.arrraySelModID = {};
        var vme = this;
        var ss = '';   	    
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
		  							header : '姓名',
		  							width : 100,
		  					
		  						}
		  					}, {
		  						name : 'JLMC',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '奖励名称',
		  							width : 100
		  						}
		  					},{
		  						name : 'CFMC',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '惩罚名称',
		  							width : 100
		  						}
		  					},{
		  						name : 'JCYY',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '奖惩原因',
		  							width : 100
		  						}
		  					},{
		  						name : 'PZJGMC',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '批准机关名称',
		  							width : 110
		  						}
		  					},{
		  						name : 'WJZM',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '文件证明',
		  							width : 100
		  						}
		  					},{
		  						name : 'JCSJ',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '奖惩时间',
		  							width : 160,
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
		  							minWidth : 210,
		  							items : [{
		  								        iconCls:'icon-grfz-Look-icon',
		  										tooltip : '查看详情',	
		  										text:'查看详情',
		  										scope : this,
		  										width:50,
		  										handler : function (grid, rowIndex, colIndex) {
		  									    	var vme=this;
		  									        var rec = grid.getStore().getAt(rowIndex);
		  									        var v = Ext.create('App.grfz.xxlr.jcda.detailDlg', {
		  									        	JCDABH: rec.get('JCDABH'),
		  									        	modifyMod:true,
		  									            listeners: {
		  									                scope: vme,
		  									                saveok: function(){
		  									                	 
		  									                }
		  									            }
		  									           
		  									        }).show();		  									    
		  										}
		  									}, {
		  										iconCls : 'icon-grfz-Edit-icon',
		  										tooltip : '编辑',
		  										text:'编辑',
		  										width:50,
		  										scope : this,
		  										handler : function(grid, rowIndex, colIndex){
		  									    	var vme=this;
		  									        var rec = grid.getStore().getAt(rowIndex);
		  									        var v = Ext.create('App.grfz.xxlr.jcda.editDlg', {
		  									        	JCDABH: rec.get('JCDABH'),
		  									            url: '../JCGL/editJCXX',
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
		  					                     
		  					                        this.delChn(rec.get('JCDABH'));
		  					                    }
		  									},{/*
		  										iconCls : 'icon-add',
		  										tooltip : '附件上传',
		  										text:'附件上传',
		  										width:50,
		  										scope : this,
		  										handler : function(){
		  								    		var vme = this;
		  								            Ext.create('App.Common.UploadFileDlg', {
		  								                url: '../JBXXGL/UploadFile',
//		  								                ID: vme.imagerul.getValue(),
		  								                listeners: {
		  								                    scope: this,
		  								                    saveok: function (result) {
		  								                    	console.log(result);
		  								                    	ss = result.fileid;
		  								                        vme.image.setSrc('../JBXXGL/ShowFilePreview?ID=' + result.fileid);
//		  								                        vme.imagerul.setValue(result.fileid);
		  								                    }
		  								                }
		  								            }).show();
		  								    		
		  								    	},
		  									*/}
		  									]
		  						}
		  					}/*,{
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
		  										handler : function (grid, rowIndex, colIndex) {
		 			                               var rec = grid.getStore().getAt(rowIndex);
					                               console.log(rec)
					                               
					                               Ext.create('App.grfz.xxlr.jcda.jcdaxq', {
					                            	   			                            
					                            	   rec : rec.data
					           						
					           						}).show(rec);
					                               
					                              
					                           }
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
		  					                     
		  					                        this.delChn(rec.get('JCDABH'));
		  					                    }
		  									}
		  									]
		  						}
		  					}*/];


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        
  	  this.delChn = function (vchns) {
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
	                        vme.ss.reload();
	                    }
	                    else {
	                        alert('删除失败！');
	                    }
	                }
	            });
	        });

	    };

        this.refreshChn = function () {
            vme.store.load();
        };

        this.getValues = function () {
            var v = new Array();
            for (var item in vme.arrraySelModID) {
                if (typeof (vme.arrraySelModID[item]) != 'function')
                    v.push(vme.arrraySelModID[item]);
            }
            return v;
        };

        this.callParent(arguments);

    },

    
    
});

Ext.define('App.grfz.xxlr.jcda.jcdaxq', {
    extend: 'Ext.Window',
    flex: 1,
    width: 700,
    title: '奖惩明细',
    initComponent: function () {
        var vme = this;
        this.wizardId = 'jifen';

        this.vchnlist = Ext.create('App.grfz.xxlr.jcda.jcdaxq.List', {
            height: 400,
            url: '../JCGL/xiangqing?GRHDW='+this.GRHDW+'&S='+this.S,
            border: 1,
            ss:this.ss
        });

        this.fuzzys = Ext.create('Ext.form.field.Text', {
			emptyText : '模糊查询',
			width : 200
		});
		
		this.items = [ 
			this.vchnlist
			
		]
        this.callParent(arguments);

    },
    
	onSearch : function() {
		var store = this.vchnlist.store;
		store.clearFilter(true);
		store.filter(this.getFilters());
	},
	getFilters : function() {
		return [ {
			property : 'fuzzys',
			value : this.fuzzys.getRawValue()
		} ];
		
	},
	

	
	getfilter : function() {
		var vme = this;
		var filters = this.getFilters();
		filters.push({
			property : 'select',
			value : vme.list.getSelectedString()
		});
		return filters;
	},
	

});
