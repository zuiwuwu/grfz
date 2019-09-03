
Ext.define('App.grczpt.xtsz.userlogin.SelectRole.Listd', {
	extend:'App.framework.listfrm',
	
	requires : ['App.Common.HyperLinkColumn'],
	gridautoLoad: true,
	pageitemselectkey:'PXDABH',
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
	  						name : 'PXDABH',
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
	  						name : 'SJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '时间',
	  							width : 150,
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
	  						name : 'DD',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '地点',
	  							width : 100,
	  					
	  						}
	  					}, {
	  						name : 'PXMC',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '培训名称',
	  							width : 100
	  						}
	  					},{
	  						name : 'PXCJ',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '培训成绩或得分',
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
	  							minWidth : 150,
	  							items : [{
	  										iconCls : 'icon-grfz-Edit-icon',
	  										tooltip : '编辑',
	  										text:'编辑',
	  										width:50,
	  										scope : this,
	  										handler : function(grid, rowIndex, colIndex){
	  									    	var vme=this;
	  									        var rec = grid.getStore().getAt(rowIndex);
	  									        var v = Ext.create('App.grfz.xxlr.pxda.editDlg', {
	  									        	PXDABH: rec.get('PXDABH'),
	  									            url: '../PXGL/editPXXX',
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
	  					                        this.delChn(rec.get('PXDABH'));
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
	                url: '../PXGL/deletePXXX',
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

Ext.define('App.grczpt.Home.pxxx', {
	extend : 'Ext.Container',
	layout : 'vbox',
	width:'100%',
	
	initComponent : function() {
        var vme = this;
        this.aa = '';
        this.vchnlist = Ext.create('App.grczpt.xtsz.userlogin.SelectRole.Listd', {
            height: 400,
            url: '../grxq/getPXPP?XM='+this.NAME,
            border: 1
        });

		
		this.items = [ {
			xtype : 'container',			
			
			layout : 'hbox',
			height : 25,
			items : [ {},{
						xtype : 'button',	
						iconCls : 'icon-add',
						margin : '0 0 0 10',
						text : '添加',
						scope : this,
						handler : this.addxx
					}]},
			this.vchnlist
			
		]
        this.callParent(arguments);


        /*this.getValues = function (){
        return { JiFen: vme.vchnlist.getValues() };
        };*/
    },
    afterRender: function () {
        this.callParent(arguments);
        var me =this;
    },
    addxx : function(btn){
/*		var vme = this;
		 Ext.create('App.grfz.xxlr.pxda.addDlg', {
	            modifyMod: false,
	            url: '../PXGL/importPXXX',
	            listeners: {
	                scope: this,
	                saveok: function (result) {
	                	vme.vchnlist.reLoad();
	                }
	            }
	        }).show();*/
    	console.log(this.vchnlist.getStore())
    	this.vchnlist.getStore().add({});
		},
    
});
