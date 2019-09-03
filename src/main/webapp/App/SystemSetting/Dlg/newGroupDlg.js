Ext.define('App.SystemSetting.Dlg.newGroupDlg', {
			extend : 'App.Common.EditDlg',
			title : '分组属性',
			initComponent : function() {
				this.items = [{
							allowBlank : true,
							name : 'PARENTID',
							hidden : true,
							value : this.PARENTID
						}, {
							allowBlank : true,
							name : 'GID',
							hidden : true,
							value : this.GID
						}, {
							allowBlank : false,
							fieldLabel : '名称',
							name : 'GNAME',
							emptyText : '不能为空'
						}, {
							allowBlank : false,
							fieldLabel : '序号',
							name : 'INDEXID',
							emptyText : '不能为空'
						}];

				this.callParent(arguments);
			}
		});