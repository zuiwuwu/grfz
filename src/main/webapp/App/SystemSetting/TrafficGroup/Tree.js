Ext.define('App.SystemSetting.TrafficGroup.Tree', {
	extend : 'Ext.tree.Panel',
	// title: '拓扑结构',
	// animCollapse: true,
	rootVisible : true, // 默认不显示根节点
	useArrows : true,
	flex : 1,
	autoScroll : true,
	enableDD : true,
	initComponent : function() {
		this.store = Ext.create('Ext.data.TreeStore', {
					autoLoad : true,
					root : {
						expanded : true,
						text : SPLanguage.getMessage("SYDW"),
						id : ''
					},
					proxy : {
						type : 'ajax',
						actionMethods : 'post',
						url : this.urlGetGroupTree,
						reader : {
							type : 'json'
						}
					}
				});

		var vme = this;

		this.viewConfig = {
			plugins : {
				ptype : 'treeviewdragdrop',
				containerScroll : true,
				dropGroup : 'groupmng',
				dragGroup : 'groupmng',
				enableDrag : true,
				enableDrop : true
			},
			listeners : {
				beforedrop : function(node, data, overModel, dropPosition,
						dropHandlers, eOpts) {
					var view = data.view;
					if (view.xtype == 'treeview') {
						if (data.records.length == 0)
							return;
						var id = data.records[0].get('id');
						dropHandlers.wait = true;
						Ext.MessageBox.confirm('提示', '是否确定要把移动分组?', function(
								btn) {
							if (btn === 'yes') {
								//
								var url = vme.urlUpdateGroupParent;
								var vparams = {};
								vparams = {
									PARENTID : overModel.get('id'),
									GID : id
								};
								Ext.Ajax.request({
									url : url, // 查询案件详细信息
									method : 'post', // 方法
									params : vparams,
									callback : function(options, success,
											response) {
										if (success) {
											var result = Ext.JSON
													.decode(response.responseText);
											if (result.success) {
												dropHandlers.processDrop();
											} else {
												dropHandlers.cancelDrop();
												alert(result.msg);
											}

										} else {
											dropHandlers.cancelDrop();
											alert('网络错误！');
										}
									}
								});
							} else {
								dropHandlers.cancelDrop();
							}

						});
					} else {
						var vIDS = '';
						for (var i = 0; i < data.records.length; i++) {
							if (vIDS != '')
								vIDS += ',';
							vIDS += data.records[i].get('DWBH');
						}
						dropHandlers.wait = true;
						Ext.MessageBox.confirm(SPLanguage
										.getMessage("REMINDER"),
								'是否确定要把点位移动到该分组?', function(btn) {
									if (btn === 'yes') {
										// dropHandlers.processDrop();
										var url = vme.urlAddGroupChn;
										var vparams = {};
										vparams = {
											GID : overModel.get('id'),
											CHNS : vIDS
										};
										Ext.Ajax.request({
											url : url, // 查询案件详细信息
											method : 'post', // 方法
											params : vparams,
											callback : function(options,
													success, response) {
												dropHandlers.cancelDrop();
												if (success) {

													vme
															.fireEvent('drapuserfinished');
												} else {
													alert(SPLanguage
															.getMessage("Net_Error"));
												}
											}
										});
									} else {
										dropHandlers.cancelDrop();
									}

								});
					}
				},
				drop : function(node, data, overModel, dropPosition, eOpts) {
				}
			}
		};

		this.refreshTree = function() {
			vme.store.load();
		};

		this.tbar = [{
					iconCls : 'icon-refresh',
					text : SPLanguage.getMessage("REFRESH"),
					handler : function() {
						vme.store.load();
					}
				}, {
					iconCls : 'icon-add',
					text : SPLanguage.getMessage("PUSH"),
					scope : this,
					handler : function() {
						var vsel = vme.getSelectionModel().getSelection();
						var vPARENTID = 0;
						if (vsel.length > 0)
							vPARENTID = vsel[0].get('id');
						Ext.create('App.SystemSetting.TrafficGroup.NewGroup', {
									PARENTID : vPARENTID,
									grouptree : vme,
									url : vme.urlAddGroup,
									listeners : {
										scope : this,
										saveok : function() {
											this.refreshTree();
										}
									}
								}).show();
					}
				}, {
					iconCls : 'icon-edit',
					text : SPLanguage.getMessage("ALTER"),
					scope : this,
					handler : function() {
						var vsel = vme.getSelectionModel().getSelection();
						if (vsel.length > 0) {
							var v = Ext.create(
									'App.SystemSetting.TrafficGroup.NewGroup',
									{
										grouptree : vme,
										url : vme.urlEditGroup,
										listeners : {
											scope : this,
											saveok : function() {
												this.refreshTree();
											}
										}
									}).show();
							v.setValues({
										'GNAME' : vsel[0].get('text'),
										'INDEXID' : vsel[0].raw.attributes.INDEXID,
										'GID' : vsel[0].get('id')
									});
						}
					}
				}, {
					iconCls : 'icon-del',
					text : SPLanguage.getMessage("DELETE"),
					handler : function() {
						var vsel = vme.getSelectionModel().getSelection();
						if (vsel.length > 0) {
							Ext.MessageBox.confirm(SPLanguage
											.getMessage("REMINDER"),
									'是否确定要删除当前分组?', function(result) {
										if (result != 'yes')
											return;
										var myMask = new Ext.LoadMask(vme, {
													msg : "正在删除分组，请稍候！"
												});
										myMask.show();

										Ext.Ajax.request({
											url : vme.urlDelGroup, // 查询案件详细信息
											method : 'post', // 方法
											params : {
												GID : vsel[0].get('id')
											},
											callback : function(options,
													success, response) {
												myMask.hide();
												if (success) {
													var v = Ext.JSON
															.decode(response.responseText);
													if (!v.success)
														alert(v.msg);
													else
														vme.refreshTree();
												} else {
													alert(SPLanguage
															.getMessage("DelFail"));
												}
											}
										});
									});
						}
					}
				}];
		this.callParent(arguments);
	}
});
