	Ext.define('App.grczpt.zhpg.tab', {
		extend : 'Ext.container.Container',
		layout : 'vbox',
		height : '100%',
		width : '100%',
		border : false,
		autoScroll:true,
		style:{
			 background:'url(../images/grczpt/grczpt_bg.png)',
		       padding: '10px'
		 },
		initComponent : function() {
			var vme = this;
			//积分排名
			this.jfpm = Ext.create(
					'App.grczpt.zhpg.jfpm', {});
			//统计分析
			this.tjfx = Ext.create('App.grczpt.zhpg.index',{});
			//上边
			this.top = Ext.create('App.grczpt.zhpg.top', {
				jfpm : this.jfpm,
				tjfx : this.tjfx
			});

			this.items = [ this.top,this.jfpm,this.tjfx

			];
			this.callParent(arguments);
		},
		afterRender : function() {
			this.callParent(arguments);
		},

	});