Ext.define('App.grczpt.zhpg.ryb', {
	extend : 'Ext.Container',
	border:false,
	width:400,
	height:276,
	autoScroll:true,
	initComponent : function() {
		var vme = this;
		this.store = new Ext.data.Store({
            autoLoad: true,
            remoteFilter: true,
            scope:this,
            pageSize:5,
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
                name: "NAME",
                type: 'string'
            }, {
                name: "RYMC",
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
				'<tpl for=".">',
				'<div style=" border: 1px solid #d2d2d2;margin-top:5px;width:280px;height:40px;margin-left:16px;" class="x-combo-list-item";>'+ 
				'<span style="color:#59D9FF;font-size:10px; font-family: MicrosoftYaHei;margin-left:15px;width:40px;height:40px;display:inline;text-align:center; line-height:40px;">{NAME:htmlEncode}</span>'+
				'<span style="color:#59D9FF;font-size:10px; font-family: MicrosoftYaHei;margin-left:15px;height:40px;">|</span>'+
				'<span style="color:#59D9FF;font-size:10px; font-family: MicrosoftYaHei;margin-left:15px;height:40px;">{RYMC:htmlEncode}</span>'+
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
