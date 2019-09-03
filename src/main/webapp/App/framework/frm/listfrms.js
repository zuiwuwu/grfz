Ext.define('App.framework.frm.listfrms', {
	extend : 'Ext.Container',
	border : false,
	layout : 'vbox',
	width : '100%',
	flex : 1,
	tbcolnum : 3,
	tbitems : [],
	tbbuttons : [],
	pageitemselectkey:'ID',
	gridautoLoad: true,
	padding: 10,
	style:{
		background:'transparent'
	},
	dataviewShowImageTpl:undefined,
	initComponent : function() {
		if (!this.list) {
			this.list = Ext.create('App.framework.frm.ImagePreview', {
				        pageitemselectkey:this.pageitemselectkey,
						flex : 1,
						width : '100%',
						emptyText : '无数据',
						border : false,
						gridautoLoad: this.gridautoLoad,
						stripeRows : true,
						columnLines : false,
						showBarPager : false,
						rowLines : true,
						columns : this.columns,
						dataviewShowImageTpl:this.dataviewShowImageTpl,
						url : this.url,
						listeners:{
							scope:this,
							itemdblclick:this.itemdblclick,
							selectionchange:this.selectionchange,
						}
					});
		}

		this.items = [
		this.createToolbar(),
		{
			xtype: 'container',
			layout: 'fit',
			flex: 1,
			width : '100%',
			cls: 'x-sp-main-grid',
			style:{
				background:'transparent'
			},
			border:false,
			items: [this.list]
		}
		];
		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
	},
	createInput : function() {
		var cols = [];
		var items = [];
		for (var i = 0; i < this.tbcolnum; i++) {
			if(i != 0)
				items.push({
						xtype : 'component',
						flex : 200
					});
					var item = {
						xtype : 'container',
						layout : 'anchor',
						flex : 400,
						defaults : {
							anchor : '100%',
							labelAlign : 'right'
						},
						items : []
					};
			items.push(item);
			cols.push(item);
		}
		var index = 0;
		for(var i = 0;i < this.tbitems.length;i ++)
		{
			if(this.tbitems[i])
			{
				cols[index%this.tbcolnum].items.push(this.tbitems[i]);
				index ++;
			}
		}
		return {
			xtype : 'container',
			layout : {
				type : 'hbox'
			},
			width : '100%',
			items : items
		};
	},
	createButtons : function() {

		return {
			xtype : 'container',
			width : '100%',
			padding : '4 0 0 0',
			layout : {
				type : 'hbox',
				pack : 'center'
			},
			items : this.tbbuttons
		};
	},
	createToolbar : function() {
		if (this.tooltar)
			return this.tooltar;

		if (this.tbitems && this.tbitems.length > 0) {
			var items = [];
			for(var i = 0;i < this.tbitems.length;i ++)
			{
				if(this.tbitems[i] == '->')
				{
					items.push({
						xtype: 'component',
						flex: 1
					});
				}
				else if(this.tbitems[i] == '|')
				{
					
				}
				else if(this.tbitems[i])
				{
					items.push(this.tbitems[i]);
				}
			}
			this.tooltar = Ext.create('Ext.Container', {
					width : '100%',
					layout : 'hbox',
					margin : '0 0 10 0',
					padding : '10 10 10 10',
					cls : 'x-sp-main-toolbar',
					style:{
						background:'transparent'
					},
					border:false,
					items : items
				});
		}
		
		return this.tooltar;
	},
	getStore:function()
	{
		return this.list.store;
	},
	reLoad: function()
	{
		return this.list.reLoad();
	},
	itemdblclick:function (grid, record, item, index, e, eOpts) {
		
	},
	selectionchange:function(grid, selected, eOpts){
		
	}
});