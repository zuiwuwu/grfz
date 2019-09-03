Ext.define('App.grczpt.yhgl.index', {
	extend : 'App.framework.menufrm',
	initComponent : function() {
		
		var vme = this;
		var str = new Array(); 
		
		str = this.ss;
		
		this.menus = [{
			text : '积分设置',
			child : [ {
				text : '事件积分管理',
				url : 'App.grczpt.xxgl.point.point',
				role : '7777'
			}]
		},{
			text : '模板设置',
			child : [ {
				text : '规则模板管理',
				url : 'App.grczpt.xxgl.permissiontemplate.permissiontemplate',
				role : '8888'
			} ]
		}
		
		];
		
		var temp = new Array();
		
		for (var j = 0; j < this.menus.length; j++) {
			for (var i = 0; i < str.length; i++) {
				
				if (this.menus[j].child[0].role == str[i]  ) {
					temp.push(this.menus[j])
					
				}
			}
									
		}
		this.menus = temp;
		this.callParent(arguments);
	}
});