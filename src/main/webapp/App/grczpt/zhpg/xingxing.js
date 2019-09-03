Ext.define('App.grczpt.zhpg.xingxing', {
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
                url: '../dimension/getLists',
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
                name: "NAME",
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
/*		this.items = Ext.create('Ext.Container',{
			width:'100%',
			 height:'100%',
			 layout : {
					
					align : 'middle ',
					pack : 'center'
				},
				items:[{
					 layout : {
							
							align : 'middle ',
							pack : 'center'
						},
     	        	  xtype:'component',
     	        	  width:282,
     	        	  height:280,
     	        	  html:'<div style="with:452px;height:280px;">'+
     	        	       '<div style="width:200px;height:250px;float:left;margin-top:3px;margin-left:40px;">'+
     	        	    '<div style="color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">身体素质  <img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/dark.png"></div>'+
     				    '<div style="color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">执行力度  <img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"></div>'+
     				    '<div style="color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">心理评测  <img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/dark.png"><img style="margin-left:13px;margin-top:5px;" src="../images/dark.png"></div>'+
     				    '<div style="color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">法律素养  <img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/dark.png"></div>'+
     				    '<div style="color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">工作成效  <img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"></div>'+
     				    '<div style="color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">民主评价  <img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/dark.png"></div>'+
     				    '<div style="color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">能力提升  <img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/dark.png"><img style="margin-left:13px;margin-top:5px;" src="../images/dark.png"></div>'+
     				    
     	        	       '</div>'+
     	        		  '</div>'
     	          
				}
				     ]
			
			
			
		});*/

		
		var tpl = new Ext.XTemplate(
				'<tpl for="." style="width:200px;height:250px;">',
				'<div style="width:200px;height:25px;float:left;margin-top:3px;margin-left:40px;">'+
				'<div style="color:#FFFFFF;font-size:15px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">{NAME:htmlEncode} <img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/bright.png"><img style="margin-left:13px;margin-top:5px;" src="../images/dark.png"></div>'+
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
