
Ext.define('App.SystemSetting.DWMng.menu', {
	extend : 'App.Common.menu',
	width : 442,
	layout : 'vbox',
	requires: ['App.SystemSetting.PoliceCar.menu'],
	initComponent : function() {
		var me = this;
		this.typeitems = [];
		this.searchItems = Ext.create('Ext.Container', {
					width : '100%',
					padding : 8,
					layout : 'vbox'
				});
		this.searchtext = '';
		this.searchtextfield = Ext.create('Ext.form.field.Text', {
					flex : 1
				});
/*		this.searchtextfield = Ext.create('App.Common.AutoComplete',{
										            hideLabel: false,
										            url: '../GISDW/ListDWMC',
										            displayField: 'DWMC',
										            valueField: 'DWMC',
										            flex : 1,
										            hideTrigger: false,
										            queryPageSize: 10000,
										            value: this.commonparams?this.commonparams.DWMC:'',
										            fields: [{
										                name: 'DWMC'
										            }]
										          
										        });*/

		this.showconnected = Ext.create('Ext.form.field.Checkbox', {
					flex : 1,
					boxLabel : '只显示在正常点位',
					inputValue : '1',
					listeners : {
						scope : this,
						change : function(btn, newValue, oldValue, eOpts) {
							this.fireEvent('selchange', this.getSelections(),
									this.searchtext, this.showconnected
											.getValue());
						}
					}
				});

		this.showall = Ext.create('Ext.form.field.Checkbox', {
					boxLabel : '显示所有点位',
					inputValue : '1',
					flex : 1,
					listeners : {
						scope : this,
						change : function(btn, newValue, oldValue, eOpts) {
							this.fireEvent('selchange', this.getSelections(),
									this.searchtext, this.showconnected
											.getValue());
						}
					}
				});
		this.addEvents('selchange');
		this.items = [{
			xtype : 'container',
			layout : 'vbox',
			width : '100%',
			padding : 4,
			cls : 'x-map-searchmenu-top',
			items : [{
				xtype : 'container',
				layout : 'hbox',
				width : '100%',
				items : [this.searchtextfield, {
					xtype : 'button',
					iconCls : 'icon-find',
					text : '搜索',
					scope : this,
					handler : function() {
						this.searchtext = this.searchtextfield.getValue();
						this.fireEvent('selchange', this.getSelections(),
								this.searchtext, this.showconnected.getValue());
					}
				}]
			}, {
				xtype : 'container',
				layout : 'hbox',
				width : '100%',
				padding : '4 0 0 0',
				items : [this.showall, this.showconnected]
			}]
		}, this.searchItems];
		me.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
		Ext.Ajax.request({
			url : '../GISDW/GISTypeTree',
			method : 'post', // 方法
			scope : this,
			callback : function(options, success, response) {
				if (success) {
					var v = Ext.JSON.decode(response.responseText);
					var items = [];
					for (var i = 0; i < v.length; i++) {
						var children = [];
						if (v[i].children) {
							for (var j = 0; j < v[i].children.length; j++) {
								var childitem = v[i].children[j];
								var subtype = Ext.create(
										'App.SystemSetting.PoliceCar.menu.item', {
											text : childitem.text,
											selid : childitem.id,
											listeners : {
												scope : this,
												selchange : function() {
													this
															.fireEvent(
																	'selchange',
																	this
																			.getSelections(),
																	this.searchtext,
																	this.showconnected
																			.getValue());
												}
											}
										});
								this.typeitems.push(subtype);
								children.push(subtype);
							}
						}
						var maintype = Ext.create(
								'App.SystemSetting.PoliceCar.menu.item', {
									text : v[i].text,
									selid : v[i].id,
									style : {
										'font-weight' : 'bold'
									},
									listeners : {
										scope : this,
										selchange : function() {
											this.fireEvent('selchange', this
															.getSelections(),
													this.searchtext,
													this.showconnected
															.getValue());
										}
									}
								});
						this.typeitems.push(maintype);
						var item = {
							xtype : 'container',
							layout : 'hbox',
							width : '100%',
							items : [maintype, {
										xtype : 'container',
										width : 340,
										items : children
									}]
						};
						items.push(item);
					}
					this.searchItems.add(items);
				} else {

				}
			}
		});
	},
	getSelections : function() {
		var ids = '';
		if (this.showall.getValue()) {
			ids = 'all';
		} else {
			for (var i = 0; i < this.typeitems.length; i++) {
				var item = this.typeitems[i];
				if (item.sel) {
					if (ids != '')
						ids += ',';
					ids += item.selid;
				}
			}
		}
		return ids;
	}
});
