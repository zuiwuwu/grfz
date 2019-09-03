Ext.define('App.grczpt.dbmjgt.xjph', {
	extend : 'Ext.Container',
	border:false,
	autoScroll:true,
	initComponent : function() {
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
                name: "ID",
                type: 'string'
            }, {
                name: "USERNAME",
                type: 'string'
            }, {
                name: "SCORE",
                type: 'string'
            }, {
                name: "GRADE",
                type: 'string'
            }],
            listeners:{
            	scope:this,
            	callback:function(){
            		alert("34");
            	}
            	
            }
        });
		//{PICURL:htmlEncode}
		var tpl = new Ext.XTemplate(
				/*'<tpl for=".">',
				'<div style="width:290px;height:25px; display:block;" >'+ 
				'<span style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;margin-left:20px;width:10px;height:25px;display:inline;text-align:center; line-height:25px;">{#}</span>'+
				'<span style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;margin-left:60px;height:25px;">{NAME:htmlEncode}</span>'+
				'<span style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;margin-left:50px;height:25px;">{QS:htmlEncode}</span>'+
				'<span style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;margin-left:50px;height:25px;">{SCORE:htmlEncode}</span>'+
				' </div>'+
                '</tpl>'*/
				
				'<tpl for=".">',
				'<div style="width:160px;height:15px; display:block;" >'+ 
//				'<div style=" display:block; z-index:2; margin-left: 20px; width: 10px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{#}</div>'+
				'<div style=" display: block;z-index:2;margin-left: 66px;margin-top: 26px;text-align: center;width: 50px;color: #979797;font-size: 14px;font-family: MicrosoftYaHei;">{USERNAME:htmlEncode}</div>'+
//				'<div style=" display:block; z-index:2; margin-left: 105px;margin-top: -19px;text-align: center; width: 180px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{QS:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 156px;margin-top: -19px;text-align: center; width: 50px;color:#979797;font-size:14px; font-family: MicrosoftYaHei;">{SCORE:htmlEncode}</div>'+
				'<div style="width:153px;height:1px;margin-top: 9px;margin-left: 65px;border-top:dashed  #979797 2px;"></div>'+
				' </div>'+
                '</tpl>'
		);
		this.dataview = Ext.create('Ext.view.View',{
			store :this.store,
			tpl:tpl,
			itemSelector: 'div.x-combo-list-item',
            listeners: {}
		})
		this.items=[this.dataview];
		
		this.callParent(arguments);
	},
    afterRender: function () {
        this.callParent(arguments);
        var me =this;
    }
    
});
