Ext.define('App.grczpt.Home.mes', {
	extend : 'App.grczpt.Home.mainfrm',

	initComponent : function() {
		
		
		
		this.menus = [ {
			text : '基本信息',
			url : 'App.grczpt.Home.jbxx',
			
		},{
			text : '岗位信息',
			url : 'App.grczpt.Home.gwxx',
			
		} ,{
			text : '家庭信息',
			url : 'App.grczpt.Home.jtxx',
			
		},{
			text : '培训档案',
			url : 'App.grczpt.Home.pxxx',
			
		},{
			text : '兴趣爱好及特长',
			url : 'App.grczpt.Home.ahtc',
			
		}];
		
	
		 this.callParent(arguments);
		}
	
	
});