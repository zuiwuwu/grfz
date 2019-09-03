Ext.define('App.grczpt.Home.gwdas', {
	
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
	                name: "GWDABH",
	                type: 'string'
	            }, {
	                name: "GWLB",
	                type: 'string'
	            }, {
	                name: "SJGWMC",
	                type: 'string'
	            }, {
	                name: "ZRQ",
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
					'<tpl for="." >',
					'<div style="width:700px;height:65px;vertical-align:middle;line-height:65px;">'+ 
					'<span style="color:#FFFFFF;font-size:13px; font-family: MicrosoftYaHei;margin-left:30px;width:80px;height:25px;display:inline;text-align:center;">{GWDABH:htmlEncode}</span>'+
					'<span style="color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;margin-left:15px;height:40px;">|</span>'+
					'<span><div style="position:relative;display:inline;"><img style="margin-left:30px;vertical-align:middle;line-height:65px;width:480px;" src="../images/gangwei_bg1.png"></img><div style="display:inline;position:absolute; z-index:2; left:50px; top:-23px;color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;">{GWLB:htmlEncode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{SJGWMC:htmlEncode}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{ZRQ:htmlEncode}</div>  </span>'+
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

