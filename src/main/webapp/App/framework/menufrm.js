Ext.define('App.framework.menufrm', {
	extend : 'Ext.Container',
	border : false,
	layout : 'hbox',
	width : '100%',
	menus : [],
	initComponent : function() {
		var leftitems = [];
		var expand = true;
		this.menuscacke = [];
		for (var i = 0; i < this.menus.length; i++) {
			var child = this.createSecondMenu(this.menus[i].child, expand);
			leftitems.push({
				xtype : 'component',
				height : 40,
				width : '100%',
				hidden: this.menus[i].text == '',
				cls : expand
						? 'x-sp-menufrm-firstmenu'
						: 'x-sp-menufrm-firstmenu x-sp-menufrm-firstmenu-iconbk-expand',
				html : '<div class="x-sp-menufrm-firstmenu-iconbk"><span class="x-sp-menufrm-firstmenu-icon"></span></div><span class="x-sp-menufrm-firstmenu-text">'
						+ this.menus[i].text + '</span>',
				childmenus : child,
				text : this.menus[i].text
			});
			leftitems.push(child);
		}

		this.leftmenupanel = Ext.create('Ext.Container', {
					layout : 'vbox',
					x : 0,
					y : 0,
					width : 180,
					// flex: 1,
					border : false,
					// autoScroll: true,
					cls : 'x-sp-menufrm-body',
					items : leftitems
				});
		this.leftmenupanelabs = Ext.create('Ext.Container', {
					layout : 'absolute',
					flex : 1,
					width : 180,
					cls : 'x-sp-menufrm-abs',
					items : [this.leftmenupanel]
				});
		this.leftpanel = Ext.create('Ext.Container', {
					layout : 'vbox',
					width : 180,
					height : '100%',
					cls : 'x-sp-menufrm-bk',
					items : [{
								xtype : 'component',
								height : 30,
								width : '100%',
								cls : 'x-sp-menufrm-collapse',
								overCls : 'x-sp-menufrm-collapse-hover'
							}, this.leftmenupanelabs]
				});
		// this.workitem = Ext.create('App.Common.echarts.chart', {
		// flex : 1,
		// height : '100%',
		// option : {
		//
		// title : {
		// text : 'ECharts 入门示例'
		// },
		// tooltip : {},
		// legend : {
		// data : ['销量']
		// },
		// xAxis : {
		// data : ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
		// },
		// yAxis : {},
		// series : [{
		// name : '销量',
		// type : 'bar',
		// data : [5, 20, 36, 10, 10, 20]
		// }]
		// }
		// });
		this.items = [this.leftpanel, this.workitem];
		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
		this.mon(this.leftpanel.el, {
					scope : this,
					click : this.onMenuItemClick
				});
		this.mon(this.leftmenupanelabs.el, {
					scope : this,
					mousewheel : this.onMouseWheel
				});
		if(this.leftmenupanel.items.length > 0)
		{
			var vmenu = this.leftmenupanel.items.getAt(0);
			if(vmenu.childmenus.items.length > 0)
			{
				this.showWorkPanel(vmenu.childmenus.items.getAt(0));
			}
		}
		
	},
	onMouseWheel : function(e) {
		var delta = e.getWheelDelta();//
		var y = this.leftmenupanel.getLocalY() + delta * 40;
		var height = this.leftmenupanel.getHeight();
		var cheight = this.leftmenupanelabs.getHeight();

		if (y < -(height - cheight)) {
			y = -(height - cheight);
		}
		if (y > 0)
			y = 0;
		if (this.leftmenupanel.getLocalY() == y) {
			return;
		}
		this.leftmenupanel.setLocalY(y);
		e.stopEvent();
	},
	onMenuItemClick : function(e) {
		var node = e.getTarget('.x-sp-menufrm-collapse');
		if (node) {
			node = Ext.getCmp(node.id);
			if (!node)
				return;
			if (node.getWidth() == 50) {
				node.setWidth(180);
				this.leftpanel.setWidth(180);

				var v = this.el.select('.x-sp-menufrm-firstmenu');

				for (var i = 0; i < v.elements.length; i++) {
					var element = Ext.getCmp(v.elements[i].id);
					var vtext = element.el
							.select('.x-sp-menufrm-firstmenu-text');
					vtext.setHTML(element.text);
				}
			} else {
				node.setWidth(50);
				this.leftpanel.setWidth(50);

				var v = this.el.select('.x-sp-menufrm-firstmenu-text');
				v.setHTML('');
			}
		}
		node = e.getTarget('.x-sp-menufrm-firstmenu');
		if (node) {
			node = Ext.getCmp(node.id);
			if (!node)
				return;
			if (node.childmenus) {
				node.childmenus.toggleCollapse();
				if (node.childmenus.getCollapsed()) {
					node.addCls('x-sp-menufrm-firstmenu-collapse');
					var v = node.el.select('.x-sp-menufrm-firstmenu-iconbk');
					v.addCls('x-sp-menufrm-firstmenu-iconbk-expand');
				} else {
					node.removeCls('x-sp-menufrm-firstmenu-collapse');
					var v = node.el.select('.x-sp-menufrm-firstmenu-iconbk');
					v.removeCls('x-sp-menufrm-firstmenu-iconbk-expand');
				}
			}
		}
		node = e.getTarget('.x-sp-menufrm-secondmenu');
		if (node) {
			node = Ext.getCmp(node.id);
			if (!node)
				return;
			this.showWorkPanel(node);
		}
	},
	createSecondMenu : function(child, expand) {
		var items = [];
		for (var i = 0; i < child.length; i++) {
			items.push({
				xtype : 'component',
				height : 40,
				width : 180,
				cls : 'x-sp-menufrm-secondmenu',
				overCls : 'x-sp-menufrm-secondmenu-hover',
				html : '<div class="x-sp-menufrm-secondmenu-iconbk"><span class="x-sp-menufrm-secondmenu-icon"></span></div><span>'
						+ child[i].text + '</span>',
				url : child[i].url
			});
		}
		return Ext.create('Ext.Panel', {
					animCollapse : false,
					border : false,
					header : false,
					collapsible : true,
					collapsed : expand ? false : true,
					bodyCls : 'x-sp-menufrm-secondmenu-body',
					width : 180,
					items : items
				});
	},
	showWorkPanel : function(node) {
		if (!node.url)
			return;
		if (this.selitem)
			this.selitem.removeCls('x-sp-menufrm-secondmenu-sel');
		node.addCls('x-sp-menufrm-secondmenu-sel');
		this.selitem = node;
		if (this.workitem) {
			this.remove(this.workitem);
		}
		this.workitem = Ext.create(node.url, {
					flex : 1,
					height : '100%'
				});
		this.add(this.workitem);
	}
});
