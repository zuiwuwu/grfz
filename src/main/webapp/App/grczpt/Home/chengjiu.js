Ext.define('App.grczpt.Home.chengjiu', {
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
        },],
        listeners:{
        	scope:this,
        	callback:function(){
        		alert("34");
        	}
        	
        }
    });	
	
	var tpl= new Ext.XTemplate(
					
			'<tpl for=".">',
			'<div class="imagepreview-thumb-chengjiu" >',
			
			/*Ext.String
					.format('<div class="imagepreview-grade">ssssss</div>'),*/
			Ext.String
					.format('<div class="imagepreview-jbxxs">'),				
					
			Ext.String
					.format('<span class="x-editabless">晋升一级警员</span>'),
					
			Ext.String
					.format('<progress class="hot"  value="1" max="3">1/3</progress>'),
			Ext.String
					.format('<span class="x-editabless">1/3</span>'),
					
			Ext.String
					.format('<br />'),	
					Ext.String
					.format('<br />'),	
					
			Ext.String
					.format('<span class="x-editabless">领取条件:领取条件1</span>'),
					
			Ext.String
					.format('<br />'),	
					Ext.String
					.format('<br />'),	
			Ext.String
					.format('<span class="x-editabless">奖励:工作能力+5</span>'),
			Ext.String
					.format('</div>'),
								
			Ext.String
					.format('</div>'),'</tpl>', '<div class="x-clear"></div>');
	 

	this.dataview = Ext.create('Ext.view.View',{
		store :this.store,
		tpl:tpl,
		itemSelector: 'div.imagepreview-thumb-chengjiu',
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
