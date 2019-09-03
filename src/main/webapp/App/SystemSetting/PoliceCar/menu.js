Ext.define('App.SystemSetting.PoliceCar.menu.item', {
	extend : 'Ext.Component',
	cls: 'x-map-searchmenu-item',
	overCls: 'x-map-searchmenu-item-hover',
	width: 80,
	height: 20,
	padding: 2,
	margin: 2,
	initComponent : function() {
		var vme = this;
		this.html = '<a title="' + Ext.htmlEncode(this.text) + '">' + Ext.htmlEncode(this.text) + '</a>';
		this.sel = false;
		this.addEvents('selchange');
		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
	},
	onRender : function() {
		this.callParent(arguments);
  		var btn = this.el;
        var btnListeners = {
            scope: this,
            click: this.onMouseClick
        };
        this.mon(btn, btnListeners);
	},
	onMouseClick : function() {
		var me = this;
		this.sel = !this.sel;
		if(this.sel)
			this.addCls('x-map-searchmenu-item-sel');
		else
			this.removeCls('x-map-searchmenu-item-sel');
		this.fireEvent('selchange');
	}
});

Ext.define('App.SystemSetting.PoliceCar.menu', {
	extend : 'App.Common.menu',
	width : 272,
	layout : 'vbox',
	url : '../GISPoliceCar/GetCLFL',
	initComponent : function() {
		var me = this;
		this.searchItems = Ext.create('Ext.Container', {
			width: '100%',
			padding: 8
		});
		this.searchtext = '';
		this.searchtextfield = Ext.create('Ext.form.field.Text',{
			flex: 1
		});
		
		this.showconnected = Ext.create('Ext.form.field.Checkbox',{
			padding: '4 0 0 0',
			boxLabel  : '只显示在线设备',
            inputValue: '1',
            hidden: this.notshowzt,
            listeners:{
            	 scope: this,
            	 change: function( btn, newValue, oldValue, eOpts )
            	 {
            	 	this.fireEvent('selchange',this.getSelections(),this.searchtext,this.showconnected.getValue());
            	 }
            }
		});
		this.addEvents('selchange');
		this.items = [{
			xtype: 'container',
			layout: 'vbox',
			width: '100%',
			padding: 4,
			cls: 'x-map-searchmenu-top',
			items: [
			{
				xtype: 'container',
				layout: 'hbox',
				width: '100%',
				items: [this.searchtextfield,
			{
				xtype: 'button',
				iconCls: 'icon-find',
				text: '搜索',
				scope: this,
				handler: function()
				{
					this.searchtext = this.searchtextfield.getValue();
					this.fireEvent('selchange',this.getSelections(),this.searchtext,this.showconnected.getValue());
				}
			}]
			},
			this.showconnected]
		},
		this.searchItems];
		me.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
		Ext.Ajax.request({
					url : this.url,
					method : 'post', //方法  
					scope : this,
					callback : function(options, success, response) {
						if (success) {
							var v = Ext.JSON.decode(response.responseText);
							var items = [];
							for (var i = 0; i < v.rows.length; i++) {
								items.push(Ext.create('App.SystemSetting.PoliceCar.menu.item',{
											text : v.rows[i].NAME,
											selid: v.rows[i].ID,
											listeners:{
												scope: this,
												selchange: function()
												{
													this.fireEvent('selchange',this.getSelections(),this.searchtext,this.showconnected.getValue());
												}
											}
										}));
							}
							this.searchItems.add(items);
						} else {

						}
					}
				});
	},
	getSelections:function()
	{
		var ids = '';
		var items = this.searchItems.items;
		for(var i = 0;i < items.length;i ++)
		{
			var item = items.getAt(i);
			if(item.sel)
			{
				if(ids != '')
					ids += ',';
				ids += item.selid;
			}
		}
		return ids;
	}
});
