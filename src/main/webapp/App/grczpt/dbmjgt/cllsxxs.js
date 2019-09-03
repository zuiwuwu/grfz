Ext.define('App.grczpt.dbmjgt.cllsxxs', {
	extend : 'Ext.Container',
	border:false,
	
	autoScroll:true,
	initComponent : function() {
		
	var me = this;		
	this.store = new Ext.data.Store({
        autoLoad: true,
        remoteFilter: true,
        scope:this,
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
        },fields: [{
            name: "JCSJ",
            type: 'string'
        }, {
            name: "JLMC",
            type: 'string'
        }, {
            name: "GRHDW",
            type: 'string'
        }],
        listeners:{
        	scope:this,
        	callback:function(){
        		alert("34");
        	}
        	
        }
    });	
	
	var tpl= new Ext.XTemplate(
					
			'<tpl for=".">',
			'<div class="imagepreview-thumb-wraps" >',
			
			/*Ext.String
					.format('<div class="imagepreview-grade">ssssss</div>'),*/
			Ext.String
					.format('<div class="imagepreview-jbxx">'),	
					 Ext.String
						.format('<span class="x-editables">姓名:{GRHDW:htmlEncode}</span>'),
						Ext.String
						.format('<br />'),
		    Ext.String
					.format('<span class="x-editables">时间:{JCSJ:htmlEncode}</span>'),
					Ext.String
					.format('<br />'),		
					
			Ext.String
					.format('<span class="x-editables">名称:{JLMC:htmlEncode}</span>'),
			Ext.String
					.format('</div>'),
					
			
					
					
			Ext.String
					.format('</div>'),'</tpl>', '<div class="x-clear"></div>');
	 

	this.dataview = Ext.create('Ext.view.View',{
		store :this.store,
		tpl:tpl,
		itemSelector: 'div.imagepreview-thumb-wraps',
        listeners: {}
	})
	this.items=[this.dataview];
		me.callParent(arguments);

	},
	
    afterRender: function () {
        this.callParent(arguments);
        var me =this;
    }
	
	
});
