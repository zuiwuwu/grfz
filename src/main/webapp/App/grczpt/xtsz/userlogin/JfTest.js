Ext.define('App.grczpt.xtsz.userlogin.JfTest', {
	extend : 'App.framework.listfrm',
	oldStyle : true,
	url : '../jf/getLists',
	pageitemselectkey:'ID',
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
				header : '维度名称',
				width : 200
			}
		}, {
			name : 'WEIDUSUM',
			type : 'string',
			gridcol : {
				sortable : true,
				header : '维度总分',
				width : 200
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
	            	   text: '查看详情',	            	 
	                   scope: this,
	                   handler: function (grid, rowIndex, colIndex) {
	                       var rec = grid.getStore().getAt(rowIndex);
	                       console.log(rec.data.USERNAME+rec.data.NAME)
	                       Ext.create('App.grczpt.xtsz.userlogin.UserJf', {
	                    	        USERNAME : rec.data.USERNAME,
	                    	        NAME : rec.data.NAME
	                    	    
	   						}).show();
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
		} 
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



	
});