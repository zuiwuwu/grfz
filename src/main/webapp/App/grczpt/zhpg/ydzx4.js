Ext.define('App.grczpt.zhpg.ydzx4', {
	extend : 'Ext.Container',
	border:false,
	width:320,
	height:190,
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
		//{PICURL:htmlEncode}
		var i = 1;
		
		var tpl = new Ext.XTemplate(
				'<tpl for="." >',
				'<div style="width:290px;height:25px;margin-top: 10px;" >'+ 
				'<div style=" display:block; z-index:2; margin-left: 1px;text-align: center; width: 50px;color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;">{USERNAME:htmlEncode}</div>'+
				'<div style=" display: block;z-index: 2;margin-left: 45px;margin-top: -19px;text-align: center;width: 130px;color: #FFFFFF;font-size: 14px;font-family: MicrosoftYaHei;">{DEPTNAME:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 166px;margin-top: -19px;text-align: center; width: 80px;color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;">{USERTYPE:htmlEncode}</div>'+
				'<div style=" display:block; z-index:2; margin-left: 250px;margin-top: -19px;text-align: center; width: 50px;color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;">{SCORE:htmlEncode}</div>'+
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
