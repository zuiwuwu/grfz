Ext.define('App.grczpt.main.index', {
	extend : 'App.framework.mainfrm',
	/*url: '../yjyd/getmainmenu',*/
	initComponent : function() {
		
		var vme = this;
		var str = new Array(); 
		
/*		Ext.Ajax.request({
    		url : '../grxq/getuserinfos',
   			method : 'get', 
   			params : {
   			},
   			async: false,//是否异步请求
   			scope:this,
   			callback : function(options, success, response) {
   				if (success) {
   					if (response.responseText&& response.responseText != '') {
   						var text =response.responseText;
   						str = text.split(',');
   					}
   				} else {
   				}
   			}
   		});*/
		
		this.menus = [ {
			text : '综合检索',
			url : 'App.grczpt.test.index',
			role : '1111'
		},{
			text : '全息展示',
			url : 'App.grczpt.Home.grxq',
			role : '2222'
		} ,{
			text : '综合评估',
			url : 'App.grczpt.zhpg.tab',
			role : '3333'
		},{
			text : '数据应用',
			url : 'App.grczpt.yhgl.index',
			role : '4444'
		},{
			text : '信息管理',
			url : 'App.grczpt.xxgl.index',
			role : '5555'
		},{
			text : '系统设置',
			url : 'App.grczpt.xtsz.index',
			role : '6666',
		
		}];
		
	/*	var temp = new Array();
		
		for (var j = 0; j < this.menus.length; j++) {
			for (var i = 0; i < str.length; i++) {
				
				if (this.menus[j].role == str[i]  ) {
					temp.push(this.menus[j])
					
				}
			}
									
		}
		this.menus = temp;
		this.ss = str;*/
		this.callParent(arguments);
	}
});
