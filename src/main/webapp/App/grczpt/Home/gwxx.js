
Ext.define('App.grczpt.xtsz.userlogin.SelectRole.List', {
	extend:'App.framework.listfrm',

	requires : ['App.Common.HyperLinkColumn'],
	gridautoLoad: true,
	pageitemselectkey:'GWDABH',
	width :'100%',
	flex:1,
	oldStyle : true,
    initComponent: function () {

        var vme = this;   
        
	    
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
		  						name : 'GWDABH',
		  						type : 'string',	
		  					},{
		  						name : 'XM',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '姓名',
		  							width : 100,
		  					
		  						}
		  					},{
		  						name : 'SJGWMC',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '实际岗位名称',
		  							width : 100
		  						}
		  					},,{
		  						name : 'NDCJPMQK',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '年度成绩排名情况',
		  							width : 100
		  						}
		  					},{
		  						name : 'QSSJ',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '起始时间',
		  							width : 200,
		  						}
		  					},{/*
		  						name : 'JZSJ',
		  						type : 'string',
		  						gridcol : {
		  							sortable : true,
		  							header : '结束时间',
		  							width : 200,
		  						}
		  					*/},{
		  						name : '',
		  						type : 'string',
		  						gridcol : {
		  							header : '操作',
		  							sortable : false,
		  							xtype : 'actioncolumn',
		  							flex : 1,
		  							minWidth : 150,
		  							items : [{}, {
		  										iconCls : 'icon-grfz-Edit-icon',
		  										tooltip : '编辑',
		  										text:'编辑',
		  										width:50,
		  										scope : this,
		  										handler : function(grid, rowIndex, colIndex){
		  									    	var vme=this;
		  									        var rec = grid.getStore().getAt(rowIndex);
		  									        var v = Ext.create('App.grfz.xxlr.gwda.editDlg', {
		  									        	GWDABH: rec.get('GWDABH'),
		  									            url: '../GWGL/editGWXX',
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
		  					                        console.log(rec.get('GWDABH'))
		  					                        this.delChn(rec.get('GWDABH'));
		  					                    }
		  									}
		  									]
		  						}
		  					}];


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        
       

        this.refreshChn = function () {
            vme.store.load();
        };



        this.callParent(arguments);


    },
    OnSelectionChange: function (grid, selected, eOpts) {
    	this.arrraySelModID = {}
        for (var i = 0; i < selected.length; i++) {
            var rec = selected[i];
            this.arrraySelModID[rec.get('ID')] = {
            		ID : rec.get('ID'),
            		
            };
           
        }
       
    },
	  delChn: function (vchns) {
	        var vme = this;
	        Ext.MessageBox.confirm('提示', '是否确定要删除?', function (result) {
	            if (result != 'yes')
	                return;
	            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
	            myMask.show();
	            Ext.Ajax.request({
	                url: '../GWGL/deleteGWXX',
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
    
    
});

Ext.define('App.grczpt.Home.gwxx', {
	extend : 'Ext.Container',
	layout : 'vbox',
	width:'100%',
//	autoScroll:true,
	initComponent : function() {
        var vme = this;
        this.aa = '';
        this.vchnlist = Ext.create('App.grczpt.xtsz.userlogin.SelectRole.List', {
            height: 400,
            url: '../grxq/getDAPP?XM='+this.NAME,
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
		 var vme = this;
		 Ext.create('App.grfz.xxlr.gwda.addDlg', {
	            modifyMod: false,
	            url:'../GWGL/importGWXX',
	            listeners: {
	                scope: this,
	                saveok: function (result) {
	                	
	                	vme.vchnlist.reLoad();
	                }
	            }
	        }).show();
		},
    
});
