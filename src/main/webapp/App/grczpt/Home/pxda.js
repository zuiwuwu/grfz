Ext.define('App.grczpt.Home.pxda', {
	extend : 'Ext.Container',
	border:false,
	width:700,
	height:270,
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
                name: "SJ",
                type: 'string'
            }, {
                name: "PXMC",
                type: 'string'
            }, {
                name: "PXDW",
                type: 'string'
            }, {
                name: "PXWCQK",
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
				'<div style="width:670px;height:30px; display:block;margin-top: 5px;" >'+ 
				'<div style=" display:block; z-index:2; margin-left: 36px; width: 100px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{SJ:htmlEncode}</div>'+
				'<div style=" display: block;z-index: 2;margin-left: 130px;margin-top: -21px;text-align: center;width: 180px;color: #FFFFFF;font-size: 15px;font-family: MicrosoftYaHei;">{PXMC:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 290px;margin-top: -19px;text-align: center; width: 180px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{PXDW:htmlEncode}</div>'+
				'<div style="display:block; z-index:2;  margin-left: 520px; margin-top: -20px;width: 100px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{PXWCQK:htmlEncode}</div>'+
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
