
Ext.define('App.grczpt.xtsz.userlogin.SelectRole.Listss', {
	extend:'App.framework.listfrm',
	
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
	  					},{},{}, {},{},{},{},{},{
	  						name : '',
	  						type : 'string',
	  						gridcol : {
	  							header : '操作',
	  							sortable : false,
	  							xtype : 'actioncolumn',
	  							flex : 1,
	  							minWidth : 160,
	  							items : [{}, {
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

Ext.define('App.grczpt.Home.ahtc', {
	extend : 'Ext.Container',
	layout : 'vbox',
	width:'100%',
	
	initComponent : function() {
        var vme = this;
        this.aa = '';
        this.vchnlist = Ext.create('App.grczpt.xtsz.userlogin.SelectRole.Listss', {
            height: 400,
            url: '../grxq/getXQPP?XM='+this.NAME,
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
	addxx: function(btn){
		var vme = this;
		 Ext.create('App.grfz.xxlr.xqahda.addDlg', {
	            modifyMod: false,
	            url: '../XQAHGL/importAHXX',
	            listeners: {
	                scope: this,
	                saveok: function (result) {
	                	vme.vchnlist.reLoad();
	                }
	            }
	        }).show();
		},
    
});
