
Ext.define('App.grczpt.xtsz.userlogin.SelectRole.List', {
    extend: 'App.Common.ImagePreview',
    listtype: 'grid',
    selType:"rowmodel",
    header: false,
    selModel: {
        injectCheckbox: 0,
        mode: "SINGLE",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },
//    gridautoLoad: false,
    arrraySelModID: {},
    gridpageSize: 14,
    url: this.url,
    oldStyle: true,
    initComponent: function () {

        var vme = this;   
        
	    
        this.columns = [
        {
            name: '',
            type: 'string',
            gridcol: {
                sortable: false,
                xtype: 'rownumberer',
                header: "序号",
                width: 60
            }
        },
        {
            name: 'ID',
            type: 'string'
        },
        {
            name: 'ROLENAME',
            type: 'string',
            gridcol: {
                sortable: false,
                header: '权限名称',
                width: 150,
              
            }
        }
        ];


        //////////////////////////////////////////////////////////////////////////
        //工具栏
        
       

        this.refreshChn = function () {
            vme.store.load();
        };



        this.callParent(arguments);


    },
    OnSelectionChange: function (grid, selected, eOpts) {
    	this.arrraySelModID = {}
        for (var i = 0; i < selected.length; i++) {
            var rec = selected[i];
            this.arrraySelModID[rec.get('ID')] = {
            		ID : rec.get('ID'),
            		
            };
           
        }
       
    }
    
    
});

Ext.define('App.grczpt.xtsz.userlogin.SelectRole', {
    extend: 'Ext.Window',
    flex: 1,
    id:'ss',
    width: 600,
    title: '权限设置',
    initComponent: function () {
        var vme = this;
        this.aa = '';
        this.vchnlist = Ext.create('App.grczpt.xtsz.userlogin.SelectRole.List', {
            height: 400,
            url: '../roleuser/terole',
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


        /*this.getValues = function (){
        return { JiFen: vme.vchnlist.getValues() };
        };*/
    },

    onSaveAllClick : function(){
		
    	var vme = this;
		var vchns = '';
		var vsel = vme.vchnlist.getSelectionModel().getSelection();
    	console.log(vsel)
/*        var ID = '';
       
    	for (var i = 0; i < this.vchnlist.getValues().length; i++) {
    		ID+= this.vchnlist.getValues()[i].ID+",";
        	
		}*/
    
    	if (vsel == '') {
    	
				Ext.Msg.alert("警告","未选择");
		}else{
   	Ext.Ajax.request({
            url: '../roleuser/addtextroleS', //编辑
            method: 'post', //方法  
            params:{
            	ROLENAME : vsel[0].data.ROLENAME,
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
		}
    	
    },
    
    setChildChecked : function(node){
		var vme = this;
		
		this.aa = node.raw.id + ','+this.aa;
        /*if(node.hasChildNodes()){
            node.eachChild(function(child) {
            	vme.setChildChecked(child);
            });
        }*/
    }
});
