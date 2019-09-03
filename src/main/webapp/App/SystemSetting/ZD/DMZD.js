
Ext.define('App.SystemSetting.ZD.DMZD', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    url : '../SJZD/ListSGDM',
    showImagePreview: false,
    requires: ['App.Common.HyperLinkColumn','App.Common.ComboBoxDropList','SZPT.view.ui.DateTimeBox'],
    showadd: true,
    pageitemselectkey: 'ID',
    //gridautoLoad: true,
    initComponent: function () {
        var vme = this;
        this.columns = [{
            name: 'ID',
            type: 'string'
        },
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                align: 'center',
                header: '序号',
                width: 40
            }
        },
         {
             name: 'SGDM',
            type: 'string',
            gridcol: {
                header: '收购店名',
                sortable: true,
                align: 'center',
                width: 80
            }
        },
        
         {
             name: 'DZ',
            type: 'string',
            gridcol: {
                header: '地址',
                sortable: true,
                align: 'center',
                width: 100
               
            }
        },
        
         {
             name: 'YZXM',
            type: 'string',
            gridcol: {
                header: '业主姓名',
                sortable: true,
                align: 'center',
                width: 100
               
            }
        },
         {
             name: 'SFZHM',
            type: 'string',
            gridcol: {
                header: '身份证号码',
                sortable: true,
                align: 'center',
                width: 80
            }
        },
         {
             name: 'HJD',
            type: 'string',
            gridcol: {
                header: '户籍地',
                sortable: true,
                align: 'center',
                width: 80
            }
        },
         {
             name: 'LXDH',
            type: 'string',
            gridcol: {
                header: '联系电话',
                sortable: true,
                align: 'center',
                width: 100
                
            }
        },
         {
             name: 'QQ',
            type: 'string',
            gridcol: {
                header: 'QQ号码',
                sortable: true,
                align: 'center',
                width: 120
               
            }
        },
         {
             name: 'WX',
            type: 'string',
            gridcol: {
                header: '微信号码',
                sortable: true,
                align: 'center',
                width: 120
               
            }
        },{
             name: 'CL',
            type: 'string',
            gridcol: {
                header: '车辆',
                sortable: true,
                align: 'center',
                width: 120
               
            }
        },
       {
           name: 'GXDW',
          type: 'string',
          gridcol: {
              header: '管辖单位',
              sortable: true,
              align: 'center',
              width: 100
          }
      }, {
          name: 'LRSJ',
          type: 'string',
          gridcol: {
              header: '录入时间',
              sortable: true,
              align: 'center',
              width: 100
          }
      }, {
          name: 'SQMJ',
          type: 'string',
          gridcol: {
              header: '社区民警',
              sortable: true,
              align: 'center',
              width: 100
          }
      }, {
          name: 'JYZT',
          type: 'string',
          gridcol: {
              header: '经营状态',
              sortable: true,
              align: 'center',
              width: 100
          }
      },
        {
            name: '',
            type: 'string',
            gridcol: {
                header: '操作',
                sortable: false,
                xtype: 'actioncolumn',
                flex: 1,
                minWidth: 300,
                items: [{
                    iconCls: 'icon-details',
                    tooltip: '浏览',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                    	var vSGDMLX = this.SGDM.getValue();
                    	var rec = grid.getStore().getAt(rowIndex);
                       Ext.create('App.SystemSetting.ZD.dmzdBaseDlg',
							{  
								readOnly:false,
								showaddButton:false,
								SGDMLX : vSGDMLX,
								DMID:  rec.get('ID'),
								showtjjl: false
							}).show();
                    }
                },{
                    iconCls: 'icon-edit',
                    tooltip: '编辑',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        var DMID=  rec.get('ID');
                        var vSGDMLX = this.SGDM.getValue();
                       Ext.create('App.SystemSetting.ZD.dmzdBaseDlg',
							{   
								url : '../SJZD/edit' ,
								method : 'post',
                    	        listeners : {
								scope : this,
								saveok : function() {	
									this.reLoad();
								}
                       },
                    	   
								DMID:  rec.get('ID'),
								SGDMLX : vSGDMLX
							}).show();
                    }
                },{
                    iconCls: 'icon-del',
                    tooltip: '删除',
                    scope: this,
                    handler: function (grid, rowIndex, colIndex) {
                         var rec = grid.getStore().getAt(rowIndex);
                        var DMID=  rec.get('ID');
                        var vSGDMLX = this.SGDM.getValue();
                        Ext.Msg.confirm('信息', '确定要删除?',function(btn){
     	             		if(btn == 'yes'){
		     	             		Ext.MessageBox.show({
		         	             			 msg:'正在请求数据，请稍后',
		         	             			 progressText:'正在请求数据',
		         	             			 width:300,
		         	             			 wait: true
		         	             		 });
		     	             		Ext.Ajax.request({
				                			url : '../SJZD/delete',
				                			params : {
				                				DMID:  rec.get('ID'),
								                SGDMLX : vSGDMLX
				                			},
				                			method : 'post',
				                			callback: function (options, success, response) {
				                				Ext.MessageBox.hide();
				                				if (success) {
								                        var result = Ext.JSON.decode(response.responseText);
								                        if (result.success) {
								                            Ext.Msg.alert("成功","删除成功！");
								
								                        }
								                        else {
								                            Ext.Msg.alert(result.msg);
								                        }
								                    }
								                    else {
								                        Ext.Msg.alert("警告","出现异常，请联系系统管理员！");
								                    }
				                			 }
				                			
		                		                        });
		                		                 
                		                   }	
                        	 this.store.reload() ;
     	             			},this);
                    }
                }]
            
            }
        }];


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        this.SGDM = Ext.create('App.Common.ComboBoxDropList', {
        	                id: 'SGDM', 
							fieldLabel : '字典类型',
							allowBlank : false,
							width:200,
							labelWidth:60,
							name : 'ZDLX',
							value : '',
							data : [{
										ID : '1',
										NAME:'手机收购店'
									}, {
										ID : '2',
										NAME:'电脑收购店'
									}, {
										ID : '3',
										NAME:'金银回收店'
									}, {
										ID : '4',
										NAME:'电动车店'
									}, {
										ID : '9',
										NAME:'摩托车店'
									}, {
										ID : '5',
										NAME:'汽车租赁店'
									}, {
										ID : '6',
										NAME:'典当行'
									}, {
										ID : '7',
										NAME:'废旧回收店'
									}, {
										ID : '8',
										NAME:'电瓶回收店'
									}],
             listeners:
             {
                 scope: this,
                 select: this.onZDTypeSelectChange
             }
									});
      
		
        this.JSNR = Ext.create('Ext.form.field.Text', {
							fieldLabel : '检索内容',
							value : '',
							allowBlank :true,
							id: 'JSNR',
							labelWidth : 80
						});
//////////////////////////////////////////////////////////////////////////
		//工具栏

		
       
       
        //////////////////////////////////////////////////////////////////////////
        //工具栏
        	 this.tbar = [
          this.SGDM,this.JSNR,
         {
             xtype: 'button',
             text: '搜索',
             tooltip: '搜索',
             iconCls: 'icon-find',
             scope: this,
             handler: this.onSearch
         },
         '-',
         {
         	 iconCls: 'icon-add',
         	text: '添加信息',
         	scope: this,
         	handler:function()
         	{
         		var vSGDMLX = this.SGDM.getValue();
         		Ext.create('App.SystemSetting.ZD.addDMZD',                                                                                                                                                                                                                                                                                                                                              
         		{   
         			title: '添加店名',
         			url : '../SJZD/addSGDM',
         			SGDMLX : vSGDMLX,
         			listeners:
         			{
         				scope: this,
         				saveok:function()
         				{
         					this.reLoad();
         				}
         			}
         		}).show();
         		this.store.reload();
         	}
         },{
             xtype: 'button',
             text: '导出',
             tooltip: '导出',
             iconCls: 'icon-export',
             scope: this,
             handler: this.onExportClick
            
         }];
        this.callParent(arguments);
        
     
    },
		getFilters : function() {
			var vfilters = [{
						property : 'SGDM',
						value : this.SGDM.getValue()
					},
					{
						property : 'JSNR',
						value : this.JSNR.getRawValue()
					}]
			return vfilters;
		},
        getfilter : function(){
    	
                    var filters = this.getFilters();
                    filters.push({
                        property: 'select',
                        value: this.getSelectedString()
                    });
                    return filters;
    },
        onZDTypeSelectChange: function (combo, records, eOpts) {
        this.onSearch();
    },
		onSearch : function() {
			this.store.clearFilter(true);
			this.store.filter(this.getFilters());
			this.updateLayout();
		},
	    onExportClick : function () {
	       Ext.saveframe.src = '../SJZD/Export?filters=' + encodeURIComponent(Ext.encode(this.getfilter()));
	    }
});



