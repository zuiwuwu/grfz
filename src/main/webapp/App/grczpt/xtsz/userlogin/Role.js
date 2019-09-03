
Ext.define('App.grczpt.xtsz.userlogin.Role.List', {
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
						url : this.url,
						reader : {
							type : 'json'
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

Ext.define('App.grczpt.xtsz.userlogin.Role', {
    extend: 'Ext.Window',
    flex: 1,
    id:'ss',
    width: 600,
    title: '权限设置',
    initComponent: function () {
        var vme = this;
        this.aa = '';
        this.vchnlist = Ext.create('App.grczpt.xtsz.userlogin.Role.List', {
            height: 400,
            url: '../roleuser/textroles?ID='+this.ID,
            border: 1
        });
        
   
		
		this.items = [ {
			xtype : 'panel',			
			border : 1,
			height : 400,
			tbar : [{
						iconCls : 'icon-add',
						margin : '0 0 0 10',
						text : '保存',
						scope : this,
						handler : this.onSaveAllClick
					}],
			items : [this.vchnlist]
			
		}]
        this.callParent(arguments);


        this.getValues = function (node) {};
    },

    onSaveAllClick : function(node){
//    	var bb = '';
//    	debugger;
    	var ss = this.vchnlist.getChecked();		    
		var vsel = this.vchnlist.getSelectionModel().getSelection();
		var bb = '';
		var node = '';
		for (var i = 0; i < ss.length; i++) {
//			debugger;
			 node = ss[i];
			this.setChildChecked(node);
			bb = ''
			bb+=this.aa;
			
       	}
		

    	
/*        var ID = '';
       
    	for (var i = 0; i < this.vchnlist.getValues().length; i++) {
    		ID+= this.vchnlist.getValues()[i].ID+",";
        	
		}*/
    
    	
   	Ext.Ajax.request({
            url: '../roleuser/addtextrole', //编辑
            method: 'post', //方法  
            params:{
            	value : bb,
//            	JIFEN : JSON.stringify(vValues.JiFen)
            	ID : this.ID
            },
            success:function(){
				Ext.Msg.alert("成功","设置成功！");
				}
        });
    	var win = Ext.getCmp('ss');
		win.close();
		this.store.reload();
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
    }
});
