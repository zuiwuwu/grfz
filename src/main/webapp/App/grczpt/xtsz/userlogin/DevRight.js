Ext.define('App.grczpt.xtsz.userlogin.DevRight.groupTree', {
	extend : 'Ext.tree.Panel',
	// title: '拓扑结构',
	// animCollapse: true,
	rootVisible : false, // 默认不显示根节点
	useArrows : true,
	flex : 1,
	autoScroll : true,
	enableDD : true,
	initComponent : function() {
		this.store = Ext.create('Ext.data.TreeStore', {
					autoLoad : true,
					root : {
						expanded : false,
						text : '根',
						id : 0,
						mustselchild : true
					},
					
					proxy : {
						type : 'ajax',
						actionMethods : 'post',
						url: '../roleuser/useroles',
						reader : {
							type : 'json'
						},
						filterParam: 'param',
		                encodeFilters: function (filters) {
		                	
		                    return Ext.JSON.encode(filters[0].value.ID);
		                }
					},
					
				});

		var vme = this;
		


		this.refreshTree = function() {
			vme.store.load();
		};
		this.callParent(arguments);
	}
});



Ext.define('App.grczpt.xtsz.userlogin.DevRight', {
	extend : 'App.Common.WizardForm',
	flex : 1,
	width : 600,
	title : "权限设置",
	initComponent : function() {
		this.wizardId = 'devright';
		var vme = this;
		var ss = '1231';
		 this.aa = '';

		this.vtree = Ext.create(
				'App.grczpt.xtsz.userlogin.DevRight.groupTree', {
		            height: 400,
		          
		            border: 1
		        });



		this.items = [ this.vtree];
		this.callParent(arguments);

		this.getValues = function(node) {
			var ss = this.vtree.getChecked();		    
			var vsel = this.vtree.getSelectionModel().getSelection();
			var bb = '';
			var node = '';
			for (var i = 0; i < ss.length; i++) {
				debugger;
				 node = ss[i];
				this.setChildChecked(node);
				bb = ''
				bb+=this.aa;
				
	       	}
			return { JiFen: bb }
		};
	},

	setChildChecked : function(node){
		var vme = this;
		console.log(node)
		
		this.aa = node.raw.id + ','+this.aa;
        /*if(node.hasChildNodes()){
            node.eachChild(function(child) {
            	vme.setChildChecked(child);
            });
        }*/
    },

	onPrev : function() {
		this.wizard.onSetWizardItemActive('userinfo');
	},
	onNext : function() {

		this.wizard.onSetWizardItemActive('jifen');
	},
	onWizardActive : function() {
		
		this.wizard.setWizardBtnDisabled('prev', false);
		this.wizard.setWizardBtnDisabled('next', true);
	},

	onWizardInit : function() {
		/*if (typeof this.wizard.rightParams != 'undefined')
			this.vchnlist.loadChnRight(this.wizard.rightParams);*/
//		this.vtree.expandNode(this.vtree.getRootNode());
		var ddd = 1;

		 this.vtree.store.load({
			 scope: this,
	            filters: [{
	                value: this.wizard.rightParams
	            }],
//		 url: '../roleuser/textroles?ID='+this.wizard.rightParams.ID,
		 })
		
	},
/*	onTreeItemContextMenu : function(tree, record, e) {
		if (!record)
			return;
		var me = this;
		
		console.log(record)
		var GID = record.get('id');
		var contextMenu = Ext.create('Ext.menu.Menu', {
					items : [Ext.create('Ext.Action', {
										iconCls : 'icon-add',
										text : '选中该节点所有通道（包括云台）',
										handler : function(widget, event) {
											me.vchnlist.selAll(GID, true);
										}
									}), Ext.create('Ext.Action', {
										iconCls : 'icon-add',
										text : '选中该节点所有通道（不包括云台）',
										handler : function(widget, event) {
											me.vchnlist.selAll(GID, false);
										}
									}), Ext.create('Ext.Action', {
										iconCls : 'icon-del',
										text : '删除该节点所有通道',
										handler : function(widget, event) {
											me.vchnlist.cleanAll(GID);
										}
									})]
				});

		contextMenu.showAt(e.getXY());
	}*/
});
