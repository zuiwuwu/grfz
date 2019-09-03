Ext.define('App.grczpt.zhpg.top', {
	extend : 'Ext.container.Container',
	height : 40,
	layout : 'hbox',
	autoScroll:true,
	initComponent : function() {
		var vme = this;

		var flag = 0;

		var jfpm = this.jfpm;
		var tjfx = this.tjfx;

/*		this.dataview = Ext.create('App.Common.Button', {
			x : 250,
			y : 10,
			width : 30,
			height : 30,
			btnCls : 'x-sp-wjw-listmodels',
			scope : this,
			handler : function(btn) {
				if (flag == 0) {
					snapshotInfo.list.showListType('dataview');
					this.dataview.setChecked(true);
					flag++;
				} else if (flag == 1) {
					snapshotInfo.list.showListType('grid');
					this.dataview.setChecked(false);
					flag--;
				}
			}
			
		});*/
		
		this.a = Ext.create('Ext.button.Button', {
			
			text : '统计分析',
			
			margin : '5 0 0 10',
			width : 70,
			height : 30,
			handler : function(btn) {
				console.log(jfpm.hidden)
				jfpm.hide();
				tjfx.show();
			}
		});
		this.b = Ext.create('Ext.button.Button', {
			
			text : '积分排名',
			
			margin : '5 0 0 15',
			width : 70,
			height : 30,
			handler : function(btn) {
				console.log(jfpm.hidden)
				jfpm.show();
				tjfx.hide();
			}
		});

		this.items = [this.a,this.b];

		this.callParent(arguments);
	}
});