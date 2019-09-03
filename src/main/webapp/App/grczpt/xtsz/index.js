Ext.define('App.grczpt.xtsz.index', {
	extend : 'App.framework.menufrm',
	initComponent : function() {
		
		var vme = this;
		console.log(this.ss)
		var str = new Array(); 
		str = this.ss;

		
		this.menus = [{
				text : '用户登录管理',
				child : [ {
					text : '登录设置',
					url : 'App.grczpt.xtsz.userlogin.UserLogin',
		    		 role : '1212'
				}]
			} ,{
				text : '角色权限管理',
				child : [{
					text : '权限设置',
					url : 'App.grczpt.xtsz.userlogin.UserRole',
		    		 role : '1313'
				}]
			}
		]
		
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