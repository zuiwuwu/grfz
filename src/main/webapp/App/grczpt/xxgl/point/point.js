/**
 * 
 */
/**
 * 
 */
Ext.define('App.grczpt.xxgl.point.point.treeModel', {
    extend: 'Ext.data.Model',
    fields: [
            { name: 'ROLEID', type: 'string' },
            { name: 'ROLENM', type: 'string' },
            { name: 'PARENTID', type: 'string' }
        ]
});

//定义编辑对话框
Ext.define('App.grczpt.xxgl.point.point.newDlg', {
    extend: 'App.Common.Wizard',
    title: '添加积分',
    initComponent: function () {
        this.wizardItems = [Ext.create('App.grczpt.xxgl.point.RoleInfo', {}),
        Ext.create('App.grczpt.xxgl.UserPage.RightTypeSel', { showRoleSel: false }),
        Ext.create('App.grczpt.xxgl.UserPage.DevRight', {}),
        Ext.create('App.grczpt.xxgl.UserPage.JiFen', {}),
        Ext.create('App.grczpt.xxgl.UserPage.RightMod', {})];
        this.callParent(arguments);
    }
});

Ext.define('App.grczpt.xxgl.point.point', {
    extend: 'Ext.tree.Panel',
    //title: '拓扑结构',
    //animCollapse: true,
    rootVisible: true,  //默认不显示根节点
    useArrows: true,
    flex: 1,
    autoScroll: true,
    enableDD: true,
    initComponent: function () {
    	this.aa = '',
        this.store = Ext.create('Ext.data.TreeStore', {
            autoLoad: true,
            root: { expanded: true, text: '根', id: 0 },
            proxy: {
                type: 'ajax',
                actionMethods: 'post',
                url: '../point/listsyjbTree',
                reader: {
                    type: 'json'
                }
            }
        });

        var vme = this;

        this.viewConfig = {
            plugins: {
                ptype: 'treeviewdragdrop',
                containerScroll: true,
                ddGroup: 'rolemngdrag',
                appendOnly: true
            },
            listeners: {
                beforedrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
                    dropHandlers.wait = true;
                    var vroleid = 0;
                    if (data.records.length > 0) {
                        vroleid = data.records[0].get('id');
                    }
                    if (vroleid == 0) {
                        dropHandlers.cancelDrop();
                        return;
                    }
                    Ext.MessageBox.confirm("REMINDER", '是否确定要移动角色?', function (btn) {
                        if (btn === 'yes') {
                            Ext.Ajax.request({
//                                url: '../RoleMng/EditRoleParentID', //查询案件详细信息
                                method: 'post', //方法  
                                jsonData: { ROLEID: vroleid, PARENTID: overModel.get('id') },
                                callback: function (options, success, response) {

                                    if (success) {
                                        var v = Ext.JSON.decode(response.responseText);
                                        if (!v.success) {
                                            dropHandlers.cancelDrop();
                                            alert(v.msg);
                                        }
                                        else
                                            dropHandlers.processDrop();
                                    }
                                    else {
                                        dropHandlers.cancelDrop();
                                        alert("Net_Error");
                                    }
                                }
                            });
                        } else {
                            dropHandlers.cancelDrop();
                        }

                    });
                },
                drop: function (node, data, overModel, dropPosition, eOpts) {
                }
            }
        };

        this.refreshTree = function () {
            vme.store.load();
        };

        this.tbar = [{
            text: "刷新",
            iconCls: 'icon-refresh',
            handler: function () {
                vme.store.load();
            }
        }, {
            text: "添加",
            iconCls: 'icon-add',
            scope: this,
            handler: this.onAddClick
        }, {
            text: "编辑",
            iconCls: 'icon-edit',
            scope: this,
            handler: this.onModifyClick
        }, {
            text: "删除",
            iconCls: 'icon-del',
            scope: this,
            handler: this.onDelClick
        },
        /*{
            text: '设置角色用户',
            iconCls: 'icon-add',
            scope: this,
            handler: function () {
                var vsel = vme.getSelectionModel().getSelection();
                if (vsel.length > 0) {
                	Ext.create('App.grczpt.xxgl.point.RoleUserMng',{
                	ROLEID: vsel[0].get('id')
                	}).show();
                }
                console.log(vsel[0].get('id'))
            }
        }*/];
        this.callParent(arguments);
    },
    onAddClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        var vPARENTID = 0;
        if (vsel.length > 0)
            vPARENTID = vsel[0].get('id');
        Ext.create('App.grczpt.xxgl.point.point.newDlg', {
            modifyMod: false,
            listeners: {
                scope: this,
                finished: this.onFinished
            },
            rightParams: { settype: 'role',
                PARENTID: vPARENTID
            }
        }).show();
    },
    onModifyClick: function () {
        var vsel = this.getSelectionModel().getSelection();
        if (vsel.length > 0) {
            var v = Ext.create('App.grczpt.xxgl.point.point.newDlg', {
                modifyMod: true,
                listeners: {
                    scope: this,
                    finished: this.onFinished
                },
                rightParams: { settype: 'role',
                    ID: vsel[0].get('id')
                }
            });
            v.show();
            v.down('form').loadRecord(Ext.create('App.grczpt.xxgl.point.point.treeModel', {
                'ROLENM': vsel[0].get('text'),
                'ROLEID': vsel[0].get('id')
            }));
        }
    },
    onDelClick: function () {
        var vme = this;
        
        var vsel = vme.getSelectionModel().getSelection();
        var node = vsel[0];
        console.log(node)
		this.setChildChecked(node);
        var bb = this.aa;
        console.log(bb)
        if(vsel.length < 1){
   		 Ext.Msg.confirm('提示','请选择要操作的分组');
   	 	}else{
  			Ext.Msg.confirm('提示','确定要删除当前分组(包括该组下的所有数据)？',function(btn){
   				if(btn=='yes'){
   					Ext.Ajax.request({
   						scope : this,
   						url : '../point/delsyjb', 
   						method : 'post', 
   						params : {
   						ID : bb,
						    							        					
   						},
   					success:function(){
    						
    						Ext.MessageBox.hide();
    						Ext.Msg.alert("成功","删除成功！");
    					}
					
   					},this);   					      						
   					vme.refreshTree();
   				}
   				 
   			})				
   	 }
        this.aa='';

    },
    onFinished: function (wizard) {
        var vme = this;
        
        if (wizard.modifyMod) {
            //修改模式
            var vValues = wizard.getValues();
            var rec = wizard.getItemRecord(0);
            vValues.ROLEID = wizard.rightParams.ID;
            var a = JSON.stringify(vValues.CHNRIGHTS);
            var s = '';
            var ID = '';
            var ZQ = '';
            var NAME = '';
            var DF = '';
            var QZ = '';
            
            if( 'undefined'!==typeof(vValues.CHNRIGHTS)){
            	
            	for (var i = 0; i < vValues.CHNRIGHTS.length; i++) {
   				 s+= ","+vValues.CHNRIGHTS[i].GROWID;
            	}
            }
            
           
            if('undefined'!==typeof(vValues.JiFen)){
            	
            	for (var i = 0; i < vValues.JiFen.length; i++) {
                	ID+= ","+vValues.JiFen[i].ID;
                	ZQ+= ","+vValues.JiFen[i].ZQ;
                	NAME+= ","+vValues.JiFen[i].NAME;
                	DF+= ","+vValues.JiFen[i].DF;
                	QZ+= ","+vValues.JiFen[i].LBQZ;
                	
    			}
            }
            
            
            
            Ext.Ajax.request({
                url: '../point/editsyjb', //编辑
                method: 'post', //方法  
                params:{
                	ROLEID : vValues.ROLEID,
                	ROLENM : vValues.ROLENM,
                	GROWID : s,
//                	JIFEN : JSON.stringify(vValues.JiFen)
                	ID : ID,
                	NAME : NAME,
                	ZQ : ZQ,
                	DF : DF,
                	QZ : QZ
                },
                               
             /*   callback: function (options, success, response) {
                   console.log(success)
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else {
                            wizard.close();
                            vme.refreshTree();
                        }
                    }
                    else {
                    	Ext.MessageBox.hide();
 						Ext.Msg.alert("提示",response.responseText);
                    }
                	
                }*/
            });
            wizard.close();
            vme.refreshTree();
        }
        else {
            //添加模式
            var vValues = wizard.getValues();
            console.log(vValues)
            //获取地址栏中文参数
		function GetQueryString(name) {

			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var result  = window.location.search.substr(1).match(reg);
		     if(result !=null)
		    return result ? decodeURIComponent(result[2]) : null;
		     }
		
		var check_val = ','+GetQueryString("check_val"); 
		
		var s = '';
		 if( 'undefined'!==typeof(vValues.CHNRIGHTS)){
         	
         	for (var i = 0; i < vValues.CHNRIGHTS.length; i++) {
				 s+= ","+vValues.CHNRIGHTS[i].GROWID;
         	}
         }
		
            vValues.PARENTID = wizard.rightParams.PARENTID;
            Ext.Ajax.request({
                url: '../point/addsyjb', //查询案件详细信息
                method: 'post', //方法  
                params:{
                	PARENTID : wizard.rightParams.PARENTID,
                	TEXT : vValues.ROLENM,
                	check_val : check_val,
                	GROWID : s
                }
                /*callback: function (options, success, response) {
                    myMask.hide();
                    if (success) {
                        var v = Ext.JSON.decode(response.responseText);
                        if (!v.success)
                            alert(v.msg);
                        else {
                            wizard.close();
                            vme.refreshTree();
                        }
                    }
                    else {
                        alert("Net_Error");
                    }
                }*/
            });

            wizard.close();
            vme.refreshTree();
        }

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
});
