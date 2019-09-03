Ext.define('App.grczpt.dbmjgt.dwxj', {
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
                name: "TIME",
                type: 'string'
            }, {
                name: "RANK",
                type: 'string'
            }, {
                name: "SCORE",
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
				'<div style="width:160px;height:20px; display:block;margin-top: 10px;" >'+ 
				'<div style=" display:block; z-index:2; margin-left: 45px; width: 100px;color:#CFF4FF;font-size:12px;text-align: center; font-family: MicrosoftYaHei;">{TIME:htmlEncode}</div>'+
				'<div style=" display: block;z-index:2;margin-left: 150px;margin-top: -16px;text-align: center;width: 50px;color: #CFF4FF;font-size: 12px;font-family: MicrosoftYaHei;">{SCORE:htmlEncode}</div>'+
//				'<div style=" display:block; z-index:2; margin-left: 105px;margin-top: -19px;text-align: center; width: 180px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{QS:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 240px;margin-top: -16px;text-align: center; width: 50px;color:#CFF4FF;font-size:12px; font-family: MicrosoftYaHei;">{RANK:htmlEncode}</div>'+

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
