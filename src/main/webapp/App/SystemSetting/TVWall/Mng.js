Ext.define('App.SystemSetting.TVWall.Mng', {
	extend : 'Ext.Panel',
	layout : 'border',
	border : 0,
	initComponent : function() {
		this.rownum = 4;
		this.colnum = 4;
		this.TVWALLID = this.commonparams?this.commonparams.TVWALLID:0;
		this.wallview = Ext.create('App.SystemSetting.TVWall.MonitorView', {
					region : 'center',
					showwin : true,
					TVWALLID: this.TVWALLID,
					listeners : {
						scope : this,
						loaddata : function(data) {
							if (data.vgas) {
								for (var i = 0; i < data.vgas.length; i++) {
									data.vgas[i].isvga = true;
								}
								this.listvga.store.loadData(data.vgas);
							}
						}
					}
				});

		this.treevideo = Ext.create('App.Common.ChnTree', {
					title : '监控设备',
					rootVisible : false, // 默认不显示根节点
					useArrows : true,
					autoScroll : true,
					enableDD : true,
					// store : this.videotreestore,
					treeViewConfig : {
						plugins : {
							ptype : 'treeviewdragdrop',
							containerScroll : true,
							dropGroup : 'tvwalldrag',
							dragGroup : 'tvwalldrag',
							enableDrag : true,
							enableDrop : false
						},
						videotreeview : true
					},
					searchViewConfig : {
						plugins : {
							ptype : 'gridviewdragdrop',
							dropGroup : 'tvwalldrag',
							dragGroup : 'tvwalldrag',
							enableDrag : true,
							enableDrop : false
						},
						videosearchview : true
					},
					listeners : {
						scope : this,
						itemdblclick : function(record) {
							this.wallview.createVideoInSel(record.GLOBALID,
									record.CHNNAME);
						}
					}
				});
		this.myvideotreestore = Ext.create('Ext.data.TreeStore', {
					autoLoad : true,
					root : {
						expanded : false
					},
					proxy : {
						type : 'ajax',
						actionMethods : 'post',
						url : '../CustomPatrolVideo/GetVideoChnTree',
						reader : {
							type : 'json'
						}
					}
				});

		this.mytreevideo = Ext.create('Ext.tree.Panel', {
					title : '我的视频',
					rootVisible : false, // 默认不显示根节点
					useArrows : true,
					autoScroll : true,
					enableDD : true,
					store : this.myvideotreestore,
					viewConfig : {
						plugins : {
							ptype : 'treeviewdragdrop',
							containerScroll : true,
							dropGroup : 'tvwalldrag',
							dragGroup : 'tvwalldrag',
							enableDrag : true,
							enableDrop : false
						},
						videotreeview : true
					},
					
					listeners : {
						scope : this,
						itemdblclick : function(tree, record) {
							if (record.raw.attributes
									&& record.raw.attributes.TYPE == 1)
								this.wallview.createVideoInSel(
										record.raw.attributes.GLOBALID, record
												.get('text'));
						},
						containercontextmenu:function(tree,e)
						{
							this.onMyVideoItemMenuContext(tree,e);
						},
						itemcontextmenu:function(tree, record, item, index, e)
						{
							this.onMyVideoItemMenuContext(tree,e,record);
						}
					}
					
				});
				this.tabpanelswitch = Ext.create('App.Common.VideoSwitch', {
					title : '切换'
            });
		this.listvga = Ext.create('App.Common.ImagePreview', {
					title : '屏幕输入',
					hideHeaders : true,
					gridautoLoad : false,
					showBarPager : false,
					oldStyle : true,
					selType : 'rowmodel',
					viewConfig : {
						plugins : {
							ptype : 'gridviewdragdrop',
							dropGroup : 'tvwalldrag',
							dragGroup : 'tvwalldrag',
							enableDrag : true,
							enableDrop : false
						},
						vgalistview : true
					},
					columns : [{
								name : 'index',
								type : 'string'
							}, {
								name : 'name',
								type : 'string',
								gridcol : {
									sortable : false,
									header : '',
									flex : 1
								}
							}],
					listeners : {
						scope : this,
						itemdblclick : function(grid, record, item, index, e,
								eOpts) {
							this.wallview.createVGAInSel(record.get('index'));
						}
					}
				});

		this.vtvwalllist = Ext.create('App.SystemSetting.TVWall.monitorTree', {
			title: '电视墙',
                listeners: {
                    scope: this,
                    selectionchange: function (tree, selected, eOpts) {
                        //this.fireEvent('tvwallselectchange', tree, selected, eOpts);
                    	if(selected.length > 0)
                    		this.wallview.chnageTVWall(selected[0].get('id'));
                    		else
                    		this.wallview.chnageTVWall(0);
                    }
                }
            });
		this.items = [{
					xtype : 'panel',
					region : 'center',
					layout : 'fit',
					border : 0,
					items : [this.wallview]
				}, {
					xtype : 'container',
					layout : 'border',
					region : 'east',
					width : 280,
					split : true,
					collapsible : true,
					collapseMode : 'mini',
					items : [{
						xtype : 'container',
						region : 'center',
						split : true,
						layout : {
							// layout-specific configs go here
							type : 'accordion',
							// titleCollapse : false,
							animate : false,
							activeOnTop : false
						},
						items : [this.vtvwalllist,this.treevideo, this.mytreevideo,
								this.tabpanelswitch]
					}, Ext.create('App.Common.PTZ.ControlPanel', {
								region : 'south',
								border : 0,
								split : true,
								collapsible : true,
								header : false,
								// collapsed: true,
								collapseMode : 'mini',
								listeners : {
									scope : this,
									ptzcmdmsg : this.onPTZCmd
								}
							})]
				}];
		this.callParent(arguments);
	},
	afterRender : function() {
		this.callParent(arguments);
	},
	onPTZCmd : function(cmd, down, speed) {
		var vptzcmd = 'PTZ_STOP';
		var vptzparam = 0;
		if (cmd == 'lock') {
			return;
		} else if (cmd == 'left') {
			vptzcmd = 'PTZ_LEFT';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'right') {
			vptzcmd = 'PTZ_RIGHT';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'up') {
			vptzcmd = 'PTZ_UP';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'down') {
			vptzcmd = 'PTZ_DOWN';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'leftup') {
			vptzcmd = 'PTZ_UP_LEFT';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'leftdown') {
			vptzcmd = 'PTZ_DOWN_LEFT';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'rightup') {
			vptzcmd = 'PTZ_UP_RIGHT';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'rightdown') {
			vptzcmd = 'PTZ_DOWN_RIGHT';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'home') {
			vptzcmd = 'PTZ_HOME';
			vptzparam = 0;
		} else if (cmd == 'zoomin') {
			vptzcmd = 'PTZ_LENS_ZOOM_IN';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_LENS_ZOOM_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'zoomout') {
			vptzcmd = 'PTZ_LENS_ZOOM_OUT';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_LENS_ZOOM_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'telenear') {
			vptzcmd = 'PTZ_LENS_ZOOMFAR';
			if (down)
				vptzparam = speed;
		} else if (cmd == 'telefar') {
			vptzcmd = 'PTZ_LENS_ZOOMNEAR';
			if (down)
				vptzparam = speed;
		} else if (cmd == 'focusnear') {
			vptzcmd = 'PTZ_LENS_FOCAL_NEAR';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_LENS_FOCAL_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'focusfar') {
			vptzcmd = 'PTZ_LENS_FOCAL_FAR';
			if (down)
				vptzparam = speed;
			else {
				vptzcmd = 'PTZ_LENS_FOCAL_STOP';
				vptzparam = 0;
			}
		} else if (cmd == 'autofocus') {
			vptzcmd = 'PTZ_LENS_AUTOFOCUS';
			if (down)
				vptzparam = speed;
		} else if (cmd == 'irisopen') {
			vptzcmd = 'PTZ_LENS_IRISOPEN';
			if (down)
				vptzparam = speed;
			else
				vptzparam = 0;
		} else if (cmd == 'irisclose') {
			vptzcmd = 'PTZ_LENS_IRISCLOSE';
			if (down)
				vptzparam = speed;
			else
				vptzparam = 0;
		} else if (cmd == 'gotopreset') {
			vptzcmd = 'PTZ_PRESET';
			if (down)
				vptzparam = speed;
			else
				return;
		} else if (cmd == 'setreset') {
			vptzcmd = 'PTZ_PRESETSET';
			if (down)
				vptzparam = speed;
			else
				return;
		} else if (cmd == 'delpreset') {
			vptzcmd = 'PTZ_PRESETCLEAR';
			if (down)
				vptzparam = speed;
			else
				return;
		}

		this.wallview.ptzCtrl(vptzcmd, vptzparam);
	},
	wallCmd : function(cmd, params, fun, scope, showmarsk) {
		var vme = this;
		var myMask = showmarsk ? new Ext.LoadMask(vme, {
					msg : "正在保存，请稍候！"
				}) : null;
		if (myMask)
			myMask.show();
			params.id = this.TVWALLID;
		Ext.Ajax.request({
					url : '../TVWALLB10/' + cmd,
					method : 'post', // 方法
					params : params,
					scope : this,
					callback : function(options, success, response) {
						if (myMask)
							myMask.hide();
						if (success) {
							var v = Ext.JSON.decode(response.responseText);
							if (v) {
								if (!v.success) {
									alert(v.msg);
								} else {
									if (fun) {
										Ext.callback(fun, scope);
									}
								}
							}
						} else {
							Ext.Msg.alert('提示',
									'网络错误');
						}
					}
				});
	},
	onMyVideoItemMenuContext:function(tree, e ,  record ){

		 var me = this;

        var bdisablegroup = true;
        if (record) {
            if (record.raw.attributes.TYPE == 0)
                bdisablegroup = false;
        }

        var bdisablechn = true;
        if (record) {
            if (record.raw.attributes.TYPE == 1)
                bdisablechn = false;
        }

        var addGroup = Ext.create('Ext.Action', {
            iconCls: 'icon-add',
            text: '添加分组',
            disabled: !bdisablechn,
            handler: function (widget, event) {
                me.onAddGroup(tree, record);
            }
        });
        var editGroup = Ext.create('Ext.Action', {
            iconCls: 'icon-edit',
            text: '修改分组',
            disabled: bdisablegroup,
            handler: function (widget, event) {
                me.onSetGroup(tree, record);
            }
        });

        var delGroup = Ext.create('Ext.Action', {
            iconCls: 'icon-del',
            text: '删除分组',
            disabled: bdisablegroup,
            handler: function (widget, event) {
                me.onDelGroup(tree, record);
            }
        });


        var editGroupChn = Ext.create('Ext.Action', {
            iconCls: 'icon-edit',
            text: '修改分组通道',
            disabled: bdisablegroup,
            handler: function (widget, event) {
                me.onSetGroupChn(tree, record);
            }
        });


        var delGroupChn = Ext.create('Ext.Action', {
            iconCls: 'icon-del',
            text: '删除通道',
            disabled: bdisablechn,
            handler: function (widget, event) {
                me.onDelGroupChn(tree, record);
            }
        });

        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [addGroup, editGroup, delGroup,
            {
                xtype: 'menuseparator'
            },
            editGroupChn,
            delGroupChn]
        });

        contextMenu.showAt(e.getXY());
        e.stopEvent();
		
	},
    onDelGroup: function (tree, record) {
        if (!record) {
            return;
        }
        var vGID = '0';
        if (record) {
            if (record.raw.attributes.TYPE != 0)
                return;
            vGID = record.get('id');
        }
        var me = this;
        if (confirm("是否确定要删除当前分组?")) {
            Ext.Ajax.request({
                url: '../CustomPatrolVideo/DelGroup',
                method: 'post', //方法  
                params: { GID: vGID },
                callback: function (options, success, response) {
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            me.myvideotreestore.load();
                    }
                    else {
                        alert('删除失败！');
                    }
                }
            });
        }
    },
    onAddGroup: function (tree, record) {
        var vGID = '0';
        if (record) {
            if (record.raw.attributes.TYPE != 0)
                return;
            vGID = record.get('id');
        }
        var vme = this;
        Ext.create('App.SystemSetting.Dlg.newGroupDlg', {
        	PARENTID : vGID,
        	url: '../CustomPatrolVideo/AddGroup',
            listeners:
            {
                scope: this,
                saveok: function () {
                	this.myvideotreestore.load();
                }
            }
        }).show();
    },
    onSetGroup: function (tree, record) {
        var vGID = '0';
        if (record) {
            if (record.raw.attributes.TYPE != 0)
                return;
            vGID = record.get('id');
        }
        var vme = this;
        var v = Ext.create('App.SystemSetting.Dlg.newGroupDlg', {
        	PARENTID : record.raw.parentId,
        	GID : record.get('id'),
        	url: '../CustomPatrolVideo/EditGroup',
            listeners:
            {
                scope: this,
                saveok: function () {
                	this.myvideotreestore.load();
                }
            }
        });
        v.show();
        v.setValues({
        	GNAME: record.get('text'),
        	INDEXID: record.raw.attributes.INDEXID
        });
    },
    onSetGroupChn: function (tree, record) {
        if (!record) {
            return;
        }
        var vGID = '0';
        if (record) {
            if (record.raw.attributes.TYPE != 0)
                return;
            vGID = record.get('id');
        }
        var vme = this;
        Ext.create('App.Common.IframeDialog', {
            dialogClass: 'App.WSXL.setGroupChnDialg',
            dialogParams: { GID: vGID, url: '../CustomPatrolVideo/ListGroupChn' },
            listeners:
            {
                scope: this,
                closedialog: function (dlg, ok, params) {
                    if (!ok)
                        return;
                    var vparams = { GID: vGID };
                    vparams = Ext.apply(vparams, params);
                    Ext.Ajax.request({
                        url: '../CustomPatrolVideo/AddGroupVideoChn', //请求地址  
                        params: vparams,
                        method: 'post', //方法  
                        callback: function (options, success, response) {
                            if (success) {
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.success) {
                                    vme.myvideotreestore.load();
                                }
                                else {
                                    alert(result.msg);
                                }
                            }
                            else {
                                alert("网络错误！");
                            }
                        }
                    });
                }
            }
        }).show();
    },
    onDelGroupChn: function (tree, record) {
        if (!record) {
            return;
        }
        var vGLOBALID = '0';
        var vGID = '0';
        if (record) {
            if (record.raw.attributes.TYPE != 1)
                return;
            vGLOBALID = record.raw.attributes.GLOBALID;
            vGID = record.parentNode.get('id');
        }
        var vme = this;
        if (confirm("是否确定要删除当前通道?")) {
            Ext.Ajax.request({
                url: '../CustomPatrolVideo/DelGroupChn',
                method: 'post', //方法  
                params: { GLOBALID: vGLOBALID, GID: vGID },
                callback: function (options, success, response) {
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else
                            vme.myvideotreestore.load();
                    }
                    else {
                        alert('删除失败！');
                    }
                }
            });
        }
    }
});

