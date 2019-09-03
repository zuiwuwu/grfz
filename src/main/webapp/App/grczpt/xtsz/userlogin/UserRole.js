Ext.define('App.grczpt.xtsz.userlogin.UserRole', {
	extend : 'App.framework.listfrm',
	requires : ['App.Common.HyperLinkColumn'],
	oldStyle : true,
	url : '../roleuser/textrole',
	pageitemselectkey:'ID',//顶部工具栏用来获取ID
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
			name : 'ID',
			type : 'string'
		}, 
		
		{
			name : 'ROLENAME',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '角色',
				width : 200
			}
		},, {
			name : 'SHUZHI',
			type : 'string',
			gridcol : {
				sortable : true,
				xtype: 'hyperlinkcolumn',
				header : '有无权限',
				width : 200,
				handler: function (grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    Ext.create('App.grczpt.xtsz.userlogin.Role', {
                        ID : rec.data.ID,
                        store:grid.getStore()
                    }).show();
                },
                customrender: function (value, metaData, record, rowIndex, colIndex, store, vcol) {
                    if (value == '') {
                        return "无";
                    }else{
                    	return "有";
                    }
                    
                }
			}
		}, {}],
		

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
			text : '添加角色',
			iconCls : 'icon-add',
			scope : this,
			width : 100,
			handler : this.addField
		} ),
		
		this.delButton = Ext.create('Ext.button.Button', {
			id : 'delButton',
			margin : '0 0 0 10',
			text : '删除角色',
			iconCls : 'icon-del',
			scope : this,
			width : 100,
			handler : this.remove
		})
		];
			
		this.callParent(arguments);
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
		
		Ext.MessageBox.prompt('添加角色','角色名',function(btn,text){
			if(btn=='ok'){
				Ext.Ajax.request({
					scope : this,
					url : '../user/addRoleLists', 
					method : 'post', 
					params : {					
					ROLENAME : text, 						    							        					
					},
				success:function(){
						
						Ext.MessageBox.hide();
						Ext.Msg.alert("成功","添加成功！");
					}
			
				},this);   					      						
				store.reload();
			}
			 
		})	
		
		
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
               			url : '../user/delRoleLists',
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