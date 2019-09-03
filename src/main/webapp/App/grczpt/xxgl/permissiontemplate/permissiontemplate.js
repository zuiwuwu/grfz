Ext.define('App.grczpt.xxgl.permissiontemplate.permissiontemplate', {
	extend : 'App.framework.listfrm',
	oldStyle : true,
	url : '../info/getLists',
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
			name : 'CONTEXT',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '模板名',
				width : 400
			}
		}, {
			name : 'CJSJ',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '创建时间',
				width : 200
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
			text : '添加字段',
			iconCls : 'icon-add',
			scope : this,
			width : 100,
			handler : this.addField
		} ),
		
		this.delButton = Ext.create('Ext.button.Button', {
			id : 'delButton',
			margin : '0 0 0 10',
			text : '删除字段',
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
		Ext.create('App.grczpt.xxgl.info.addInfo', {
			url:'../info/addField',
			listeners : {
				scope : this,
				saveok : function(result) {
				 this.list.store.load();
				}
			}
		}).show();		
		
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
               			url : '../info/delLists',
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