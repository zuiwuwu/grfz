//定义编辑对话框
Ext.define('App.SystemSetting.Dlg.selDWFromGISDlg', {
	extend : 'Ext.window.Window',
	layout : 'fit',
	modal : true,
	title : '选择点位',
	width : 900,
	height : 500,
	maximizable : true,
	initComponent : function() {
		var me = this;
		this.addEvents('saveok');
		this.map = Ext.create('App.GIS.Main', {

		});
		this.listsel = Ext.create('App.Common.ImagePreview', {
					border : 0,
					oldStyle : true,
					showBarPager : false,
					gridautoLoad : false,
					columns : [{
								name : '',
								type : 'string',
								gridcol : {
									sortable : false,
									xtype : 'rownumberer',
									header : SPLanguage.getMessage("SERIALNUM"),
									width : 60
								}
							}, {
								name : 'DWBH',
								type : 'string'
							}, {
								name : 'DWMC',
								type : 'string',
								gridcol : {
									sortable : false,
									header : '点位名称',
									flex : 1
								}
							}]
				});
		this.items = [{
					xtype : 'container',
					layout : 'border',
					items : [{
								xtype : 'panel',
								border : false,
								layout : 'fit',
								region : 'center',
								split : true,
								items : [this.map]
							}, {
								xtype : 'panel',
								border : false,
								width : 280,
								region : 'east',
								split : true,
								title : '选中点位',
								collapsible : true,
								animate : false,
								layout : 'fit',
								items : [this.listsel]
							}]
				}];

		this.tbar = [{
					text : '框选',
					action : 'save',
					scope : this,
					handler : this.onRectSel
				}, {
					text : '平移',
					action : 'save',
					scope : this,
					handler : function() {
						this.layer.cleanSelectItem();
						if (this.selid)
							this.map.clearShapeById(this.selid);
						this.selid = null;
						this.onSelectChange();
					}
				}];

		this.buttons = [{
					text : '确定',
					action : 'save',
					scope : this,
					handler : this.onSave
				}, {
					text : '取消',
					scope : this,
					handler : function() {
						//this.fireEvent('close', this);
						this.close();
					}
				}];
		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
		this.layer = this.map.addLayer('App.SystemSetting.DWMng.Layer', {
					width : 0,
					height : 0
				});
	},
	onRectSel : function() {
		if (this.selid)
			this.map.clearShapeById(this.selid);
		this.selid = this.map.drawRect({
					scope : this,
					onOverlayCreatedByUser : this.onSel
				});
	},
	onSel : function(obj, e) {
		if (!e.ctrlKey)
			this.layer.cleanSelectItem();
		var sels = this.layer.selectItem([{
					lng : obj.leftTopPoint.lng,
					lat : obj.leftTopPoint.lat
				}, {
					lng : obj.rightBottomPoint.lng,
					lat : obj.rightBottomPoint.lat
				}]);
		if (this.selid)
			this.map.clearShapeById(this.selid);
		this.layer.select(sels);
		this.onSelectChange();
		this.selid = this.map.drawRect({
					scope : this,
					onOverlayCreatedByUser : this.onSel
				});
	},
	onSelectChange : function() {
		var sel = this.layer.getSelectItem();
		this.listsel.store.loadData(sel);
	},
	onSave : function() {
		var sel = [];
		for (var i = 0; i < this.listsel.store.getCount(); i++) {
			var rec = this.listsel.store.getAt(i);
			sel.push({
						DWBH : rec.get('DWBH'),
						DWMC : rec.get('DWMC')
					});
		}

		this.fireEvent('saveok', this, sel);

		this.close();
	}
});
