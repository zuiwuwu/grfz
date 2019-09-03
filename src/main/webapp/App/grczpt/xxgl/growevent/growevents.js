Ext.define('App.grczpt.xxgl.growevent.growevents', {
	extend : 'Ext.Container',
	layout : 'border',
	forumId : '',
	border : 0,
	pageitemselectkey: 'GROWID',
	urlGetGroupTree : '../dictionarys/listsyjbTree',
	urlDelLists : '../growevent/delLists',
	urlListGroup : '../growevent/getLists',
	
	showchntype : false,
	lastgroupid : '',
	initComponent : function() {
		this.aa = '',
		this.items = [this.createRight(), this.createOCX()];
		// call the superclass's initComponent implementation
		this.callParent(arguments);
	},
	createOCX : function() {
		var vme = this;
		var	columns = [
			               {
			            	  
			                   name: 's',
			                   type: 'string',
			                   gridcol: {
			                       sortable: true,
			                       xtype : 'rownumberer',
			                       header: '序号',
			                       width: 100
			                   },
			               },{
			       			name : 'GROWID',
			    			type : 'string'
			    		} ,{
			                   name: 'EVENTNAME',
			                   type: 'string',
			                   gridcol: {
			                       sortable: true,
			                       header: '事件名称',
			                       width: 150
			                   }
			               },
			               {
			                   name: 'EVENTTYPE',
			                   type: 'string',
			                   gridcol: {
			                       sortable: true,
			                       header: '事件类型',
			                       width: 150
			                   }
			               },
			               {
			                   name: 'EVENTDESC',
			                   type: 'string',
			                   gridcol: {
			                       sortable: true,
			                       header: '事件描述',
			                       width: 150
			                   }
			               },
			               {
			                   name: 'CREATEPEOPLE',
			                   type: 'string',
			                   gridcol: {
			                       sortable: true,
			                       header: '创建人',
			                       width: 150,
			                   }
			               },{
			                   name: 'UPPEOPLE',
			                   type: 'string',
			                   gridcol: {
			                       sortable: true,
			                       header: '更新人',
			                       width: 150,
			                   }
			               },{
			                   name: 'CREATETIME',
			                   type: 'string',
			                   gridcol: {
			                       sortable: true,
			                       header: '创建时间',
			                       width: 150,
			                   }
			               },{
			                   name: 'UPTIME',
			                   type: 'string',
			                   gridcol: {
			                       sortable: true,
			                       header: '更新时间',
			                       width: 150,
			                   }
			               }, {
			            	   name: '',
			                   type: 'string',
			                   gridcol: {
			                       header: '操作',
			                       sortable: false,
			                       xtype: 'actioncolumn',
			                       flex: 1,
			                       minWidth: 300,
			                       items: [{
			                           iconCls: 'icon-find',
			                           text: '查看详情',
			                           scope: this,
			                           handler: function (grid, rowIndex, colIndex) {
			                               var rec = grid.getStore().getAt(rowIndex);
			                               console.log(rec)
			                               
			                               Ext.create('App.grczpt.xxgl.growevent.growContext', {
			                            	   			                            
			                            	   rec : rec.data
			           						
			           						}).show(rec);
			                               
			                              
			                           }
			                       },{
			                           iconCls: 'icon-edit',
			                           text: '编辑',
			                           scope: this,
			                           handler: function (grid, rowIndex, colIndex) {
			                               var rec = grid.getStore().getAt(rowIndex);
			                               console.log(grid.getStore())
			                               Ext.create('App.grczpt.xxgl.growevent.editGrow', {
   	   			                            
			                            	    rec : rec.data,
			           							ss : grid.getStore()
			           						}).show(rec,grid);
			                           }
			                       },{
			                           iconCls: 'icon-del',
			                           text: '删除',
			                           scope: this,
			                           handler: function (grid, rowIndex, colIndex) {
			                               var rec = grid.getStore().getAt(rowIndex);
			                               var ID = rec.data.GROWID;
			                               
			                               Ext.Msg.confirm('信息', '确定要删除?',function(btn){
			            	             		if(btn == 'yes'){
			       		     	             		Ext.MessageBox.show({
			       		         	             			 msg:'正在请求数据，请稍后',
			       		         	             			 progressText:'正在请求数据',
			       		         	             			 width:300,
			       		         	             			 wait: true
			       		         	             		 });
			       		     	             		Ext.Ajax.request({
			       				                			url : this.urlDelLists,
			       				                			params : {
			       				                				ID : ID
			       				                			},
			       				                			method : 'post',
			       				                			failure:function(){
			       				     	             						Ext.MessageBox.hide();
			       				     	             						Ext.Msg.alert("警告","出现异常，请联系管理员！");
			       				     	             					},
			       				     	             		success:function(){
			       				     	             						Ext.MessageBox.hide();
			       				     	             						Ext.Msg.alert("成功","删除成功！");
			       				     	             					}
			       		                		                        });
			       		     	             	grid.getStore().reload() ;
			                       		                   }	
			                               	 
			            	             			},this);
			            	             			
			                               
			                           }
			                       }]
			                   
			                   }
			       				}];
			


		

		this.groupTitle = Ext.create('Ext.draw.Text', {
					text : '所有事件'
				});


		// ////////////////////////////////////////////////////////////////////////
		// 工具栏
		var tbar;
		this.fuzzy = Ext.create('Ext.form.field.Text', {
			emptyText : '模糊查询',
			width : 300
		});

				
		//工具栏
		tbar = ['事件名称', this.fuzzy, {
					iconCls : 'icon-find',
					text : '查询',
					scope : this,
					handler : this.onSearch
				}, '-', {
					iconCls : 'icon-add',
					text : '添加',
					scope : this,
					handler : this.onAddClick
					
				}, '-', {
					iconCls : 'icon-del',
					scope : this,
					text : '删除',
					handler : this.onDelClick
					
				}, '->', this.groupTitle];

		this.vchnlist = Ext.create('App.Common.ImagePreview', {
					region : 'center',
					url : this.urlListGroup,
					tbar : tbar,
					columns : columns,
				});
		
		
		var store = this.vchnlist.store;
		
		return this.vchnlist;
	},
	createRight : function() {
		var vme = this;
		var store = Ext.create('Ext.data.TreeStore', {
					autoLoad : true,
					root : {
						expanded : true,
						text : '所有事件',
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

		var viewConfig = {
			plugins : {
				ptype : 'treeviewdragdrop',
				containerScroll : true,
				dropGroup : 'groupmng',
				dragGroup : 'groupmng',
				enableDrag : true,
				enableDrop : true
			},
			listeners : {
				scope : this,
				beforedrop : this.onbeforedrop,
				drop : function(node, data, overModel, dropPosition, eOpts) {
				}
			}
		};

		var tbar = [{
					iconCls : 'icon-refresh',
					text : '刷新',
					scope : this,
					handler : function() {
						this.grouptree.store.load();
					}
				}, {
					iconCls : 'icon-add',
					text : '添加',
					scope : this,
					handler : this.onAddGroup
				}, {
					iconCls : 'icon-edit',
					text : '修改',
					scope : this,
					handler : this.onEditGroup
				}, {
					iconCls : 'icon-del',
					text : '删除',
					scope : this,
					handler : this.onDelGroup
				}];
		this.grouptree = Ext.create('Ext.tree.Panel', {
					store : store,
					tbar : tbar,
					viewConfig : viewConfig,
					rootVisible : true, // 默认不显示根节点
					useArrows : true,
					autoScroll : true, 
					enableDD : true,
					region : 'east',
					title : this.treetitle,
					width : 280,
					split : true,
					border : 1,
					minWidth : 230,
					// maxWidth : 230,
					collapsible : true,
					listeners : {
						scope : this,
						selectionchange : this.onSelectionchange,
/*						 'checkchange':function(node,checked){
							 this.setChildChecked(node,checked);
														
						 },*/

					}
				});
		return this.grouptree;
	},
	//树 添加事件
	onAddGroup : function() {
		var ss = this.grouptree.store;
		var vsel = this.grouptree.getSelectionModel().getSelection();
		 if(vsel.length < 1){
    		 Ext.Msg.confirm('提示','请选择要操作的分组');
    	 }else{
    		
    		 console.log('1')
    			Ext.MessageBox.prompt('添加分组','分组名称',function(btn,text){
    				if(btn=='ok'){
    					Ext.Ajax.request({
    						scope : this,
    						url : '../dictionarys/addsyjb', 
    						method : 'post', 
    						params : {
    						PARENTID : vsel[0].get('id'),
    						TEXT : text, 						    							        					
    						},
    					success:function(){
     						
     						Ext.MessageBox.hide();
     						Ext.Msg.alert("成功","添加成功！");
     					}
					
    					},this);   					      						
    					ss.load();
    				}
    				 
    			})				
    	 }
	},
	//树 编辑事件
	onEditGroup : function() {
		var ss = this.grouptree.store;
		var vsel = this.grouptree.getSelectionModel().getSelection();
		 if(vsel.length < 1){
    		 Ext.Msg.confirm('提示','请选择要操作的分组');
    	 }else{
    		
    		 console.log(vsel[0].get('id'))
    			Ext.MessageBox.prompt('编辑分组','分组名称',function(btn,text){
    				if(btn=='ok'){
    					Ext.Ajax.request({
    						scope : this,
    						url : '../dictionarys/editsyjb', 
    						method : 'post', 
    						params : {
    						ID : vsel[0].get('id'),
    						TEXT : text, 						    							        					
    						},
    					success:function(){
     						
     						Ext.MessageBox.hide();
     						Ext.Msg.alert("成功","修改成功！");
     					}
					
    					},this);   					      						
    					ss.load();
    				}
    				 
    			})				
    	 }
	},
	//树 删除事件
	onDelGroup : function(node) {     
		
		var ss = this.grouptree.store;		    
		var vsel = this.grouptree.getSelectionModel().getSelection();
		var node = vsel[0];
		this.setChildChecked(node);
        var bb = this.aa;
        console.log(bb)
		 if(vsel.length < 1){
    		 Ext.Msg.confirm('提示','请选择要操作的分组');
    	 }else{
    		
    		 
    			Ext.Msg.confirm('提示','确定要删除当前分组(包括该组下的所以数据)？',function(btn){
    				if(btn=='yes'){
    					Ext.Ajax.request({
    						scope : this,
    						url : '../dictionarys/delsyjb', 
    						method : 'post', 
    						params : {
    						ID : bb,
						    							        					
    						},
    					success:function(){
     						
     						Ext.MessageBox.hide();
     						Ext.Msg.alert("成功","删除成功！");
     					}
					
    					},this);   					      						
    					ss.load();
    				}
    				 
    			})				
    	 }
	},
	//树手动拖动组 事件
	onbeforedrop : function(node, data, overModel, dropPosition, dropHandlers,
			eOpts) {
		var vme = this;
		var view = data.view;
		if (view.xtype == 'treeview') {
			if (data.records.length == 0)
				return;
			var id = data.records[0].get('id');
			dropHandlers.wait = true;
			Ext.MessageBox.confirm('提示', '是否确定要把移动分组?', function(btn) {
				if (btn === 'yes') {
					//
//					var url = vme.urlUpdateGroupParent;
					var vparams = {};
					vparams = {
						PARENTID : overModel.get('id'),
						GID : id
					};
					Ext.Ajax.request({
//								url : url, // 查询案件详细信息
								method : 'post', // 方法
								params : vparams,
								callback : function(options, success, response) {
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
			Ext.MessageBox.confirm('提示', '是否确定要把通道移动到该分组?', function(btn) {
				if (btn === 'yes') {
					// dropHandlers.processDrop();
					var url = vme.urlAddGroupChn;
					var vparams = {};
					vparams = {
						GID : overModel.get('id'),
						CHNS : vIDS
					};
					Ext.Ajax.request({
//								url : url, // 查询案件详细信息
								method : 'post', // 方法
								params : vparams,
								callback : function(options, success, response) {
									dropHandlers.cancelDrop();
									if (success) {
										vme.onRefresh();

									} else {
										alert('网络错误！');
									}
								}
							});
				} else {
					dropHandlers.cancelDrop();
				}

			});
		}

	},
	//树点击改变事件
	onSelectionchange : function(node, checked, eOpts) {
		
		if (checked.length > 0) {
			var m = checked[0].get('id');
			this.changeGroup(m, checked[0].get('text'));
		}
	},
	changeGroup : function(groupid, text) {
		
		if (this.lastgroupid != groupid) {
			this.lastgroupid = groupid;
			this.eventtext = text;
			this.onRefresh();
			this.groupTitle.setText(text);
		}
	},
	
	//列表增加
	onAddClick : function() {	
		var store = this.vchnlist.store;
		console.log(store)

			Ext.create('App.grczpt.xxgl.growevent.addGrow', {									
				ss : store				
					}).show(store);			
			function refresh(){
				this.vchnlist.store.reload() ;
				}
	},
	//模糊查询
	onSearch : function() {
		var store = this.vchnlist.store;
		store.clearFilter(true);
		store.filter(this.getFilters());
	},
	getFilters : function() {
		return [ {
			property : 'fuzzy',
			value : this.fuzzy.getRawValue()
		} ];
	},
	
	getfilter : function() {
		var vme = this;
		var filters = this.getFilters();
		filters.push({
			property : 'select',
			value : vme.list.getSelectedString()
		});
		return filters;
	},
	
	//点击树 过滤列表
	onRefresh : function() {
		
		var vme = this;
		var store = vme.vchnlist.store;
		store.clearFilter(true);
		store.filter([{
					property : 'EVENTTYPE',
					value :  vme.eventtext
				}]);
	},

	//列表删除
	onDelClick : function () {
		var vme = this;
		var vchns = '';
		var vsel = vme.vchnlist.getSelectionModel().getSelection();
		if (vsel.length > 0) {			
			for (var i = 0; i < vsel.length; i++) {
				if (vchns != '')
					vchns += ',';
				vchns += vsel[i].data.GROWID;				
			}
		}		
		Ext.Msg.confirm('信息', '确定要删除?',function(btn){
     		if(btn == 'yes'){
             		Ext.MessageBox.show({
	             			 msg:'正在请求数据，请稍后',
	             			 progressText:'正在请求数据',
	             			 width:300,
	             			 wait: true
	             		 });
             		Ext.Ajax.request({
               			url : this.urlDelLists,
               			params : {
               				ID : vchns
               			},
               			method : 'post',
               			failure:function(){
    	             						Ext.MessageBox.hide();
    	             						Ext.Msg.alert("警告","出现异常，请联系管理员！");
    	             					},
    	             		success:function(){
    	             						Ext.MessageBox.hide();
    	             						Ext.Msg.alert("成功","删除成功！");
    	             					}
       		                        });
             		this.vchnlist.store.reload() ;
		                   }	
       	 
     			},this);
		
	},
	setChildChecked : function(node){
		var vme = this;
		
		this.aa = this.aa + ','+node.raw.id;
        if(node.hasChildNodes()){
            node.eachChild(function(child) {
            	vme.setChildChecked(child);
            });
        }
    }
	
/*	delChn : function(vchns) {
		if (!this.lastgroupid || this.lastgroupid == '')
			return;
		var vme = this;
		Ext.MessageBox.confirm('提示', '是否确定要删除通道?', function(result) {
					if (result != 'yes')
						return;
					var myMask = new Ext.LoadMask(vme, {
								msg : "正在删除通道，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : vme.urlDelGroupChn, // 查询案件详细信息
								method : 'post', // 方法
								params : {
									GID : vme.lastgroupid,
									CHNS : vchns
								},
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
										if (!v.success)
											alert(v.msg);
										else
											vme.onRefresh();
									} else {
										alert('删除失败！');
									}
								}
							});
				});

	},
	onDelClick : function() {
		var vsel = this.vchnlist.getSelectionModel().getSelection();
		if (vsel.length > 0) {
			var vchns = '';
			for (var i = 0; i < vsel.length; i++) {
				if (vchns != '')
					vchns += ',';
				vchns += vsel[i].get('DWBH');
			}
			this.delChn(vchns);
		}

	},
	onDelAllClick : function() {
		this.delChn('all');
	},
	onRefresh : function() {
		var vme = this;
		var store = this.vchnlist.store;
		store.clearFilter(true);
		store.filter([{
					property : 'DWMC',
					value : vme.dwname.getRawValue()
				}, {
					property : 'GID',
					value : vme.lastgroupid
				}, {
					property : 'DWTYPE',
					value : vme.combDWTYPE.getValue()
				}]);
	},
	onSaveModified : function() {
		var vme = this;
		var store = this.vchnlist.store;
		var vrecords = store.getModifiedRecords();
		if (vrecords.length == 0)
			return;
		var vchns = new Array();
		for (var i = 0; i < vrecords.length; i++) {
			vchns.push({
						GID : this.lastgroupid,
						DWBH : vrecords[i].get('DWBH'),
						INDEXID : vrecords[i].get('INDEXID')
					});
		}

		Ext.MessageBox.confirm('提示', '是否确定要保存通道?', function(result) {
					if (result != 'yes')
						return;
					var myMask = new Ext.LoadMask(vme, {
								msg : "正在保存，请稍候！"
							});
					myMask.show();
					Ext.Ajax.request({
								url : vme.urlUpdateGroupChn, // 查询案件详细信息
								method : 'post', // 方法
								jsonData : vchns,
								callback : function(options, success, response) {
									myMask.hide();
									if (success) {
										var v = Ext.JSON
												.decode(response.responseText);
										if (!v.success)
											alert(v.msg);
										else
											vme.onRefresh();
									} else {
										alert('保存失败！');
									}
								}
							});
				});
	}*/
	
	
});
