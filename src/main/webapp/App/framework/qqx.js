Ext.define('App.framework.qqx', {

	extend : 'Ext.Container',
	border:false,
	  height : 100,
	initComponent : function() {
		var me = this;	


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
                url:this.url,
                reader: {
                    type: 'json',
                    root: 'rows',
                    successProperty: 'success',
                    totalProperty: 'total'
                }
            },
            fields: [{
                name: "SENDPP",
                type: 'string'
            }, {
                name: "CONTEXT",
                type: 'string'
            }, {
                name: "RECEIVER",
                type: 'string'
            }, {
                name: "TIME",
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
				'<div style="width:150px;height:80px; display:block;" >'+ 
				'<div style="width:94px;height:1px;margin-top: 15px;margin-left: 1px;border-top:dashed  #979797 2px;"></div>'+
//				'<div style=" display:block; z-index:2; margin-left: 20px; width: 10px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{#}</div>'+
				'<div style=" display: block;z-index:2;margin-left: 79px;margin-top: -10px;text-align: center;width: 140px;color: #979797;font-size: 10px;font-family: MicrosoftYaHei;">{TIME:htmlEncode}</div>'+
				'<div style="width:94px;height:1px;margin-top: -9px;margin-left: 202px;border-top:dashed  #979797 2px;"></div>'+
				'<br>'+
//				'<div style=" display:block; z-index:2; margin-left: 105px;margin-top: -19px;text-align: center; width: 180px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{QS:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 6px;margin-top: 1px;text-align: center; width: 56px;color:#979797;font-size:16px; font-family: MicrosoftYaHei;">{SENDPP:htmlEncode}:</div>'+
				
				'<div style=" display:block; z-index:2; margin-left: 60px;margin-top: -17px; width: 230px;height:65px;color:#979797;font-size:12px; font-family: MicrosoftYaHei;">{CONTEXT:htmlEncode}</div>'+
				'<br>'+
				
				' </div>'+
                '</tpl>');
		this.dataview = Ext.create('Ext.view.View',{
			store :this.store,
			tpl:tpl,
			itemSelector: 'div.x-combo-list-item',
            listeners: {}
		})
		console.log(this.store)
		this.items=[this.dataview];
		
		this.callParent(arguments);
	},
    afterRender: function () {
        this.callParent(arguments);

        var me =this;
    },

    

});
