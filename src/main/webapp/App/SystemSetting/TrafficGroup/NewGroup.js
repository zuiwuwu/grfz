
Ext.define('App.SystemSetting.TrafficGroup.NewGroup', {
			extend : 'App.Common.EditDlg',
			title : '分组属性',
			initComponent : function() {
				this.items = [{
							xtype : 'textfield',
							allowBlank : true,
							name : 'GID',
							hidden : true
						}, {
							xtype : 'textfield',
							allowBlank : false,
							fieldLabel : '名称',
							name : 'GNAME',
							emptyText : '不能为空'
						}, {
							xtype : 'textfield',
							allowBlank : false,
							fieldLabel : '序号',
							name : 'INDEXID',
							emptyText : '序号'
						}];

				this.callParent(arguments);
			},
			getValues : function() {
				var form = this.down('form');

				var values = form.getValues();
				if (this.PARENTID)
					values.PARENTID = this.PARENTID;
					return values;
			}
		});
