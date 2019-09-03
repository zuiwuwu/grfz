Ext.define('App.grczpt.xxgl.point.point.treeModel', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'USERID', type: 'string' },
            { name: 'USERNAME', type: 'string' },
            { name: 'XM', type: 'string' }
        ]
});

Ext.define('App.grczpt.xxgl.point.point.newDlg', {
    extend: 'App.Common.Wizard',
    title: '编辑',
    initComponent: function () {
        this.wizardItems = [Ext.create('App.grczpt.xtsz.userlogin.RoleInfo', {}),
        Ext.create('App.grczpt.xtsz.userlogin.DevRight', {})];
        this.callParent(arguments);
    }
});

Ext.define('App.grczpt.xtsz.userlogin.UserLogin', {
	extend : 'App.framework.listfrm',
	requires : ['App.Common.HyperLinkColumn'],
	oldStyle : true,
	url : '../user/getLists',
	pageitemselectkey:'USERID',//顶部工具栏用来获取ID
	initComponent : function() {
		
		
		this.columns = [ {
			name : '',
			type : 'string',
			gridcol : {
				sortable : false,
				xtype : 'rownumberer',
				header : '序号',
				width : 60
			}
		}, {
			name : 'USERID',
			type : 'string'
		}, 
		
		{
			name : 'USERNAME',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '用户名',
				width : 200
			}
		}, {
			name : 'NAME',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '真实姓名',
				width : 200
			}
		}, {
			name : 'ROLE',
			type : 'string',
			gridcol : {
				sortable : true,
				xtype: 'hyperlinkcolumn',
				header : '角色',
				width : 200,
				handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.create('App.grczpt.xtsz.userlogin.SelectRole', {
                        ID : rec.data.USERID,
                        store:grid.getStore()
                    }).show();
                },
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (value == '') {
                        return "无";
                    }
                    return value;
                }
			}
		}, {
			name : '',
			type : 'string',
			gridcol : {
	               header: '操作',
	               sortable: false,
	               xtype: 'actioncolumn',
	               flex: 1,
	               minWidth: 100,
	               items: [{
	            	   iconCls: 'icon-add',
	            	   text: '重置密码',	            	 
	                   scope: this,
	                   handler: function (grid, rowIndex, colIndex) {
	                       var rec = grid.getStore().getAt(rowIndex);
	                       console.log(rec.data.USERID)
	                       Ext.Msg.confirm('信息', '确定要重置密码,重置密码为123456?',function(btn){
       	             		if(btn == 'yes'){
  		     	             		Ext.MessageBox.show({
  		         	             			 msg:'正在请求数据，请稍后',
  		         	             			 progressText:'正在请求数据',
  		         	             			 width:300,
  		         	             			 wait: true
  		         	             		 });
  		     	             		Ext.Ajax.request({
  				                			url : '../user/upLists',
  				                			params : {
  				                				USERID : rec.data.USERID
  				                			},
  				                			method : 'post',
  				                			failure:function(){
  				     	             						Ext.MessageBox.hide();
  				     	             						Ext.Msg.alert("警告","出现异常，请联系管理员！");
  				     	             					},
  				     	             		success:function(){
  				     	             						Ext.MessageBox.hide();
  				     	             						Ext.Msg.alert("成功","重置成功！");
  				     	             					}
  		                		                        });
  		     	             	grid.getStore().reload() ;
                  		                   }	
                          	 
       	             			},this);
	                   }
	               },{
                       iconCls: 'icon-edit',
                       text: '编辑',
                       scope: this,
                       handler: function (grid, rowIndex, colIndex) {
                           var rec = grid.getStore().getAt(rowIndex);
                           console.log(grid.getStore())
                          var v =  Ext.create('App.grczpt.xxgl.point.point.newDlg', {
                        
                        	   modifyMod: false,
                               listeners: {
                                   scope: this,
                                   finished: this.onFinished
                               },
                               rightParams: { 
                                   ID: rec.data.USERID,
                               }
                        	    
       						});
                           
                           v.show();
                          
                           v.down('form').loadRecord(Ext.create('App.grczpt.xxgl.point.point.treeModel', {
                               'USERNAME': rec.data.USERNAME,
                               'XM': rec.data.XM
                           }));
                       }
                   }]
	           }
		}],
		

		this.fuzzy = Ext.create('Ext.form.field.Text', {
			emptyText : '模糊查询',
			width : 300
		});
		
		this.tbitems = [ this.fuzzy, {
			xtype : 'button',
			margin : '0 0 0 4',
			text : '查询',
			iconCls : 'icon-find',
			scope : this,
			handler : this.onSearch
		} ,
		
		this.addButton = Ext.create('Ext.button.Button', {
			id : 'addButton',
			margin : '0 0 0 10',
			text : '添加用户',
			iconCls : 'icon-add',
			scope : this,
			width : 100,
			handler : this.addField
		} ),
		
		this.delButton = Ext.create('Ext.button.Button', {
			id : 'delButton',
			margin : '0 0 0 10',
			text : '删除用户',
			iconCls : 'icon-del',
			scope : this,
			width : 100,
			handler : this.remove
		})
		];
			
		this.callParent(arguments);
	},
	
	onFinished: function (wizard) {
		 var vme = this;
		 var store = this.getStore();
		 var vValues = wizard.getValues();
		 var id = wizard.rightParams.ID;
		 debugger
		 if (vValues.password1 == vValues.password2) {
			 Ext.Ajax.request({
	             url: '../roleuser/adduseroles', //编辑
	             method: 'post', //方法  
	             params:{
	             	value : vValues.JiFen,
	             	USERNAME : vValues.USERNAME,
	             	NAME : vValues.XM,
	             	PASSWORD1 : vValues.password1,
	             	ID : id
	             },
	                            
	         });
			 wizard.close();
			 store.reload();
		}else{
			Ext.Msg.alert("警告","密码不一致,请重新操作");
	         wizard.close();
		}
		 console.log(id+vValues.JiFen)
	     
         
//         wizard.close();
//         store.reload();
	},
	
	onSearch : function() {
		var store = this.getStore();
		store.clearFilter(true);
		store.filter(this.getFilters());
	},
	getFilters : function() {
		return [ {
			property : 'fuzzy',
			value : this.fuzzy.getRawValue()
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

	
	addField : function() {
		var vme = this;
		var store = this.getStore();
		
/*		Ext.MessageBox.prompt('添加用户','用户名',function(btn,text){
			if(btn=='ok'){
				Ext.Ajax.request({
					scope : this,
					url : '../user/addLists', 
					method : 'post', 
					params : {					
					USERNAME : text, 						    							        					
					},
				success:function(){
						
						Ext.MessageBox.hide();
						Ext.Msg.alert("成功","添加成功！");
					}
			
				},this);   					      						
				store.reload();
			}
			 
		})	*/
		Ext.create('App.grczpt.xtsz.userlogin.addUser', {
			store:store
			
		
		}).show()
		
	},

	remove : function (grid, rowIndex, colIndex){
		var id = this.list.getSelectedString();

		Ext.Msg.confirm('信息', '确定要删除?',function(btn){
     		if(btn == 'yes'){
             		Ext.MessageBox.show({
	             			 msg:'正在请求数据，请稍后',
	             			 progressText:'正在请求数据',
	             			 width:300,
	             			 wait: true
	             		 });
             		Ext.Ajax.request({
               			url : '../user/delLists',
               			params : {
               				ID : id
               			},
               			method : 'post',
               			failure:function(){
    	             						Ext.MessageBox.hide();
    	             						Ext.Msg.alert("警告","出现异常，请联系管理员！");
    	             					},
    	             		success:function(){
    	             						Ext.MessageBox.hide();
    	             						Ext.Msg.alert("成功","删除成功！");
    	             					}
       		                        });
             		this.list.store.reload() ;
		                   }	
       	 
     			},this);
	}
	
});