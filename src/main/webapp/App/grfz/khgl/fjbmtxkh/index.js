Ext.define('App.grfz.khgl.fjbmtxkh.index.list', {
	extend:'App.framework.listfrm',
	url:'../KHGL/getFJBMTXKHLists',
	pageitemselectkey:'ID',
	width :'100%',
	flex:1,
	oldStyle : true,
	initComponent : function() {
		var me = this;	
		var labelWidth = 120;
		var width = 300;
	this.Year=Ext.create('App.Common.ComboBoxDropList', {
			fieldLabel : '年份',
			allowBlank : false,
			width:width,
			labelWidth : labelWidth,
			name : 'YEAR',
			value : '',
			data : [{
						ID : '2010',
						NAME : "2010"
					}, {
						ID : '2011',
						NAME : "2011"
					}, {
						ID : '2012',
						NAME : "2012"
					}, {
						ID : '2013',
						NAME : "2013"
					}, {
						ID : '2014',
						NAME : "2014"
					}, {
						ID : '2015',
						NAME : "2015"
					}, {
						ID : '2016',
						NAME : "2016"
					}, {
						ID : '2017',
						NAME : "2017"
					}]
					
					});
	
	this.Month=Ext.create('App.Common.ComboBoxDropList', {
		fieldLabel : '月份',
		allowBlank : false,
		editable:true,
		width:width,
		labelWidth : labelWidth,
		name : 'MONTH',
		value : '',
		data : [{
					ID : '01',
					NAME : "01"
				}, {
					ID : '02',
					NAME : "02"
				}, {
					ID : '03',
					NAME : "03"
				}, {
					ID : '04',
					NAME : "04"
				}, {
					ID : '05',
					NAME : "05"
				}, {
					ID : '06',
					NAME : "06"
				}, {
					ID : '07',
					NAME : "07"
				}, {
					ID : '08',
					NAME : "08"
				}, {
					ID : '09',
					NAME : "09"
				}, {
					ID : '10',
					NAME : "10"
				}, {
					ID : '11',
					NAME : "11"
				}, {
					ID : '12',
					NAME : "12"
				}]
				
				});
	
	this.DEPT = Ext.create('App.Common.AutoComplete',{
        name : 'DEPT',
		width : width ,
		labelWidth : labelWidth,
        hideLabel: false,
        fieldLabel : '部门',
        url: '../listCombo/listDept',
        displayField: 'DEPTNAME',
        valueField: 'DEPTNAME',
        hideTrigger: false,
        queryPageSize: 10000,
        fields: ['DEPTNAME']
    });
	
	this.JYSX = Ext.create('App.Common.AutoComplete',{
        name : 'JYSX',
		width : width ,
		labelWidth : labelWidth,
        hideLabel: false,
        fieldLabel : '警员属性',
        url: '../listCombo/listJYSX',
        displayField: 'JYSX',
        valueField: 'JYSX',
        hideTrigger: false,
        queryPageSize: 10000,
        fields: ['JYSX']
    });
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
	  						name : 'ID',
	  						type : 'string',
	  					},{
	  						name : 'USERNAME',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '姓名',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'USERTYPE',
	  						type : 'string',
	  						gridcol : {
	  							sortable : false,
	  							header : '警员属性',
	  							width : 100,
	  					
	  						}
	  					},{
	  						name : 'TIME',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '时间',
	  							width : 100
	  						}
	  					},{
	  						name : 'DF',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '得分',
	  							width : 100
	  						}
	  					},{
	  						name : 'RANK',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '排名',
	  							width : 100
	  						}
	  					},{
	  						name : 'DBM',
	  						type : 'string',
	  						gridcol : {
	  							sortable : true,
	  							header : '部门',
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
	  							items : [/*{
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
	  					                        this.delChn(rec.get('ID'));
	  					                    }
	  									}
	  									*/]
	  						}
	  					}];	
	 
	 this.tbitems =[this.Year,this.Month,this.DEPT,this.JYSX,,
	                   {
         xtype: 'button',
         text: '搜索',
         tooltip: '搜索',
         iconCls: 'icon-find',
         scope: this,
         handler: this.onSearch
     }];
		me.callParent(arguments);

	},
	
	afterRender : function() {
		this.callParent(arguments);
		
	},
	onSearch : function() {
		var store = this.getStore();
		store.clearFilter(true);
		store.filter(this.getFilters());
	},
	getFilters : function() {
		return [{
					property : 'YEAR',
					value : this.Year.getRawValue()
				},{
					property : 'MONTH',
					value : this.Month.getRawValue()
				},{
					property : 'DEPTNAME',
					value : this.DEPT.getRawValue()
				},{
					property : 'JYSX',
					value : this.JYSX.getRawValue()
				}];
	},	
	
	  delChn: function (vchns) {
	        var vme = this;
	        Ext.MessageBox.confirm('提示', '是否确定要删除?', function (result) {
	            if (result != 'yes')
	                return;
	            var myMask = new Ext.LoadMask(vme, { msg: "正在删除，请稍候！" });
	            myMask.show();
	            Ext.Ajax.request({
	                url: '../KHGL/delFJBMTXKH',
	                method: 'post', //方法  
	                params: { IDS: vchns },
	                callback: function (options, success, response) {
	                    myMask.hide();
	                    if (success) {
	                        var v = Ext.JSON.decode(response.responseText);
	                        if (v.errcode==0)
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
	    	  var sels = this.list.getSelectionModel().getSelection();
	  		if(sels.length == 0)
	  		{
	  			Ext.MessageBox.alert('提示','请选择删除的信息');
	  			return ;
	  		}
	  		var ID = '';
	  		for(var i = 0;i < sels.length;i ++)
	  		{
	  			if(ID != '')
	  				ID += ',';
	  			ID += sels[i].get('ID');
	  		}
	  		this.delChn(ID);
	    }
	
});


Ext.define('App.grfz.khgl.fjbmtxkh.index.gridButton', {
    extend: 'Ext.container.Container',
    layout:'absolute',
    border: 0,
	width :'100%',
	height:30,
	initComponent : function() {
		var me=this;
		   me.addBtn= Ext.create('App.Common.ImageButtonEx',{
			    x:1680,
			    y:0,	
	 		    width:50,
	 		    height:20,		   
	 			scope : this,
	 			tooltip: '添加',
	 			btnCls:  'icon-grfz-Add-icon',
	 			handler :this.addxx
				});
	 	    me.delBtn  = Ext.create('App.Common.ImageButtonEx',{
	 	    	x:1740,
				y:0,
			    width:50,
			    height:20,
			  
				scope : this,
				tooltip: '删除',
				btnCls:  'icon-grfz-Del-icon',
				handler : this.onDelClick
				});
		 me.importBtn= Ext.create('App.Common.ImageButtonEx',{
			 x:1800,
			y:0,
 		    width:54,
 		    height:20,
 		    
 			scope : this,
 			tooltip: '导入',
 			btnCls:  'icon-grfz-Import-icon',
 			handler : this.onImportClick
			});
 	    me.exportBtn =this.searchButton = Ext.create('App.Common.ImageButtonEx',{
 	    	 x:1860,
			y:0,
		    width:54,
		    height:20,
		   
			scope : this,
			tooltip: '导出',
			btnCls:  'icon-grfz-Export-icon',
			handler :this.onexportClick
			});
 		me.items=[ 
 		           me.delBtn,
 		           me.addBtn,
 		           me.importBtn,
 		           me.exportBtn
                  
    	          ]
    	me.callParent(arguments);
		},
		addxx: function(btn){
			
			},
		onImportClick: function () {
			        var vme = this;
			        Ext.create('App.Common.UploadFileDlg', {
			            url: '../KHGL/importfjbmtxkh',
			            title: '导入数据',     
			            listeners: {
			                saveok: function (result) {
			                
			                	vme.list.reLoad();
			                }
			            }
			        }).show();
			    },
		onDelClick:function(){
			  this.list.onDelClick();  	
			    },
	   onFinished:function(){
		   
	   }
});





Ext.define('App.grfz.khgl.fjbmtxkh.index', {
    extend: 'Ext.container.Container',
    layout: 'vbox',
    border: 0,
	width :'100%',
	flex:1,
	initComponent : function() {
		var me=this;
		me.list=Ext.create('App.grfz.khgl.fjbmtxkh.index.list', {
			width: '100%',
			flex: 1
	        });
		me.gridButton = Ext.create('App.grfz.khgl.fjbmtxkh.index.gridButton', {
			list:me.list,
		});
		
		
		me.items=[ me.gridButton,
		           me.list             
    	          ]
    	
    	me.callParent(arguments);
		}
});