//定义编辑对话框
Ext.define('App.SystemSetting.DWMng.copyDlg', {
	extend : 'App.Common.EditDlg',
	//url: '../DWMng/CopyParams',
	initComponent : function() {

		this.title = '复制点位[ ' + this.DWMC + ' ]参数到其他点位';

		var vitems = [{
					boxLabel : '表现图片',
					name : 'GISPIC'
				}, {
					boxLabel : '点位关联',
					name : 'DWTYPE'
				}, {
					boxLabel : '点位类型',
					name : 'DWLX'
				}, {
					boxLabel : '点位地图分类',
					name : 'DWGISTYPE'
				}, {
					boxLabel : '联系人',
					name : 'LXR'
				}, {
					boxLabel : SPLanguage.getMessage("LXDH"),
					name : 'LXDH'
				}, {
					boxLabel : '24小时有警卡口',
					name : 'ZBKK'
				}, {
					boxLabel : '值班人',
					name : 'ZBR'
				}, {
					boxLabel : '最小缩放',
					name : 'MINZOOM'
				}, {
					boxLabel : '最大缩放',
					name : 'MAXZOOM'
				}];

		var vzd = Ext.CustomDic.getZD('2');
		for (var i = 0; i < vzd.length; i++) {
			vitems.push({
						name : 'CUSTOM_' + vzd[i].ZDLX,
						boxLabel : vzd[i].ZDLXNM
					});
		}
		this.copyparams = vitems;
		var vtemp = [[], []];
		for (var i = 0; i < vitems.length; i++) {
			vtemp[i % 2].push(Ext.apply({
				xtype: 'checkboxfield'
			},vitems[i]));
		}
		var vinfo = {};
		vinfo = {
			xtype : 'container',
			layout : 'anchor',
			items : [ {
						xtype : 'container',
						layout : 'hbox',
						width : 400,
						items : [

						{
									xtype : 'container',
									layout : 'anchor',
									flex : 1,
									defaultType : 'textfield',
									defaults : {
										width : 180,
										labelWidth : 90
									},
									items : vtemp[0]
								}, {
									xtype : 'container',
									layout : 'anchor',
									flex : 1,
									defaultType : 'textfield',
									defaults : {
										width : 180,
										labelWidth : 90
									},
									items : vtemp[1]
								}]
					}]
		};

		this.items = [vinfo];

		this.buttons = [{
					text : SPLanguage.getMessage("SURE"),
					action : 'save',
					scope : this,
					handler : this.onSave
				}, {
					text : SPLanguage.getMessage("CANCLE"),
					scope : this,
					handler : function() {
						this.close();

					}
				}];

		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
	},
	getValues : function() {
		var form = this.down('form');
		var v = form.getValues();
		var fields = [];
		for(var i = 0;i < this.copyparams.length;i ++)
		{
			var item = this.copyparams[i];
			if(v[item.name] == 'on')
			{
				fields.push(item.name);
			}
		}

		return {
			SRCDWBH: this.DWBH,
			FIELDS: fields.join(',')
		};
	}
});
