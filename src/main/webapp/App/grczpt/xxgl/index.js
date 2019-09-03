Ext.define('App.grczpt.xxgl.index', {
	extend : 'App.framework.menufrm',
	initComponent : function() {
		
		var vme = this;
		var str = new Array(); 
		
		str = this.ss;
		
		this.menus = [ {
			text : '能力维度信息管理',
			child : [  {
				text : '维度管理',
	    		 url : 'App.grczpt.xxgl.dimensionmanage.dimension',
	    		 role : '9999'
	    		}]
	      }, {
				text : '事件信息管理',
				child : [  {
					text : '事件管理',
		    		 url : 'App.grczpt.xtsz.growevent.growevents',
		    		 role : '1010'
		    		}]
		      },{
					text : '档案管理',
					child : [  {
						text : '所有档案',
						url : 'App.grfz.xxlr.index',
			    		 role : '1110'
			    		}]
			      } ];
		
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