Ext.define('App.grczpt.zhpg.gbmxjxq', {
	extend : 'Ext.Container',
	border:false,
	width:139,
	height:146,
	autoScroll:true,
	initComponent : function() {
		var vme = this;
		 ssd = '';
		
		

		//{PICURL:htmlEncode}
		var tpl = new Ext.XTemplate(
				'<tpl for="." >',
				'<div style="width:200px;height:25px;" >'+ 
				'<div style=" display:block; z-index:2; margin-left: 20px; width: 100px;color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;">111</div>'+
				'<div style=" display: block;z-index: 2;margin-left: 130px;margin-top: -18px;text-align: center;width: 50px;color: #FFFFFF;font-size: 14px;font-family: MicrosoftYaHei;">测试部门</div>'+
				'<div style=" display:block; z-index:2; margin-left: 160px;margin-top: -18px;text-align: center; width: 10px;color:#FFFFFF;font-size:14px; font-family: MicrosoftYaHei;">23</div>'+

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
    },
/*    store : function(ssd){
    	Ext.Ajax.request({
			url : '../zhpg/getjlzydb?ss=' + ss,
			method : 'get',
			scope : this,
			
		});
    }*/
    
    store : new Ext.data.Store({
        autoLoad: true,
        remoteFilter: true,
        scope:this,
        pageSize:999,
        proxy: {
            noCache: this.noCache,
            type: 'ajax',
            actionMethods: 'post',
            url :'../zhpg/getbjqk?bm='+this.ssd,
            reader: {
                type: 'json',
                root: 'rows',
                successProperty: 'success',
                totalProperty: 'total'
            }
        },
        fields: [{
            name: "XM",
            type: 'string'
        }, {
            name: "DBM",
            type: 'string'
        }, {
            name: "JQLB",
            type: 'string'
        }],
        listeners:{
        	scope:this,
        	callback:function(){
        		alert("34");
        	}
        	
        }
    })
    
});
