Ext.define('App.framework.test', {
	extend : 'App.framework.frm.listfrms',
//	extend : 'App.framework.menufrm',
	border:false,
	  url: this.url,
	width:160,
	height:780,
	requires : ['App.Common.HyperLinkColumn'],

	gridautoLoad: true,
	pageitemselectkey:'clxxbh',
	flex:1,
	oldStyle :true,
	flag:0,
	total:0,
	initComponent : function() {
		mesages = '';
		var me = this;	
		abc = '';
/*		this.menus = [{
			text:'',
			child : [{
				text : '1',
				url : 'App.framework.password'
			},{
				text : '2'
			}]
		
		}]*/
		
		me.dataviewShowImageTpl = new Ext.XTemplate('<tpl for=".">',
				'<div class="imagepreview-thumb-wrap" style="width:155px;height:65px;margin-left: 5px;margin-top: 5px; display:block;" >'+ 
//				'<div style=" display:block; z-index:2; margin-left: 20px; width: 10px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{#}</div>'+
				'<div style=" display: block;z-index:2;margin-left: 2px;margin-top: 14px;text-align: center;width: 50px;color: #979797;font-size: 14px;font-family: MicrosoftYaHei;">{SENDPP:htmlEncode}</div>'+
//				'<div style=" display:block; z-index:2; margin-left: 105px;margin-top: -19px;text-align: center; width: 180px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{QS:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 65px;margin-top: -25px;text-align: center; width: 80px;color:#979797;font-size:10px; font-family: MicrosoftYaHei;">{TIME:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 11px;margin-top: 6px; width: 120px;height:16px;color:#979797;font-size:10px; font-family: MicrosoftYaHei;text-overflow:ellipsis; white-space:nowrap; overflow:hidden;">{CONTEXT:htmlEncode}</div>'+
		/*		'<div> </div>'+
				'<div style="width:154px;height:1px;margin-top: 6px;margin-left: 1px;border-top:solid  #979797 2px;"></div>'+*/
				' </div>'+
                '</tpl>');
		 
		
			 this.columns = [
		  			          {
		  						name : '',
		  						type : 'string',
		  						gridcol : {						
		  							sortable : false,
		  							//autoSizable : true,
		  							xtype : 'rownumberer',
		  							header : '序号',
		  							width : 60
		  						}
		  					},{
		  						name:"ID",
		  						type : 'string', 
		  					},{
		  						name : 'SENDPP',
		  						type : 'string',
		  						gridcol : {
		  							sortable : false,
		  							header : '姓名',
		  							width : 100,
		  					
		  						}
		  					},{
		  						name : 'CONTEXT',
		  						type : 'string',
		  						gridcol : {
		  							sortable : false,
		  							header : '姓名',
		  							width : 100,
		  					
		  						}
		  					},{
		  						name : 'RECEIVER',
		  						type : 'string',
		  						gridcol : {
		  							sortable : false,
		  							header : '姓名',
		  							width : 100,
		  					
		  						}
		  					},{
		  						name : 'TIME',
		  						type : 'string',
		  						gridcol : {
		  							sortable : false,
		  							header : '时间',
		  							width : 100,
		  							
		  						}
		  					}
		  					];	
			me.callParent(arguments);
		/*
		var vme = this;
		this.store = new Ext.data.Store({
            autoLoad: true,
            remoteFilter: true,
            scope:this,
            pageSize:999,
            proxy: {
                noCache: this.noCache,
                type: 'ajax',
                actionMethods: 'post',
                url: this.url,
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                }
            },
            fields: [{
                name: "USERTYPE",
                type: 'string'
            }, {
                name: "SCORE",
                type: 'string'
            }, {
                name: "USERNAME",
                type: 'string'
            }, {
                name: "DEPTNAME",
                type: 'string'
            }],
            listeners:{
            	scope:this,
            	callback:function(){
            		alert("34");
            	}
            	
            }
        });
		var i = 1;
		//{PICURL:htmlEncode}
		var tpl = new Ext.XTemplate('<tpl for=".">',
				'<div style="width:160px;height:15px; display:block;" >'+ 
//				'<div style=" display:block; z-index:2; margin-left: 20px; width: 10px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{#}</div>'+
				'<div style=" display: block;z-index:2;margin-left: 6px;margin-top: 24px;text-align: center;width: 50px;color: #979797;font-size: 14px;font-family: MicrosoftYaHei;">{USERNAME:htmlEncode}</div>'+
//				'<div style=" display:block; z-index:2; margin-left: 105px;margin-top: -19px;text-align: center; width: 180px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{QS:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 96px;margin-top: -19px;text-align: center; width: 50px;color:#979797;font-size:14px; font-family: MicrosoftYaHei;">{SCORE:htmlEncode}</div>'+
				'<div> </div>'+
				'<div style="width:183px;height:1px;margin-top: 15px;margin-left: 1px;border-top:solid  #979797 2px;"></div>'+
				' </div>'+
                '</tpl>');
		this.dataview = Ext.create('Ext.view.View',{
			store :this.store,
			tpl:tpl,
			itemSelector: 'div.x-combo-list-item',
            listeners: {}
		})
		this.items=[this.dataview];
		
		this.callParent(arguments);
	*/},
    afterRender: function () {
        this.callParent(arguments);
        this.list.showListType('dataview');
        console.log(this.list)
        var me =this;
    },
    itemdblclick:function (grid, record, item, index, e, eOpts) {
    	/*console.log(record)
    	var XM=record.get('USERNAME');
    	Ext.create('App.framework.password', {
		}).show();*/
    },
    
    selectionchange:function(grid, selected, eOpts){
    console.log(selected)
    
/*    
    if(s !== abc){*/
		Ext.create('App.framework.gbmxjxq', {
			sendpp : selected[0].data.SENDPP,
			receiver : selected[0].data.RECEIVER
		}).show();
/*		debugger
		
		abc = s;
		s = '';
	}else{
		console.log('重复')
	}*/
    
    }
});
