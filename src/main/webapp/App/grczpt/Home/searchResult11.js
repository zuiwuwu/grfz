Ext.define('App.grczpt.Home.searchResult', {
	extend : 'Ext.panel.Panel',
	border:false,
	width:400,
	style:{
		 background:'url(../images/grczpt/grczpt_bg.png)',
	       padding: '10px'
	 },
	initComponent : function() {
		var vme = this;
		/*this.store = new Ext.data.Store({
            autoLoad: false,
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
                name: "ID",
                type: 'string'
            }, {
                name: "DWBH",
                type: 'string'
            }, {
                name: "DWMC",
                type: 'string'
            }, {
                name: "DWWZ",
                type: 'string'
            }, {
                name: "DWLX",
                type: 'string'
            }, {
                name: "LDZX",
                type: 'string'
            }, {
                name: "DWJD",
                type: 'string'
            }, {
                name: "DWWD",
                type: 'string'
            }, {
                name: "JKDWHB",
                type: 'string'
            }, {
                name: "PICURL",
                type: 'string'
            }],
            listeners:{
            	scope:this,
            	callback:function(){
            		alert("34");
            	}
            	
            }
        });*/
		//{PICURL:htmlEncode}
		var tpl = new Ext.XTemplate(
				/*'<tpl for=".">',*/
		 '<div style=" padding:5px;" class="grczpt-home-grid" width:600px;height:265px>'+ 
                '<div style="padding:5px; float:left;width:133px;height:265px;"> '+
                '<div style=" width:132px;height:157px;text-align:center;"><img src="../images/4.png"></div>'+
                '<div style=" width:132px;height:20;text-align:center;">综合评估</div>'+ 
                '<div class="star-rating" style="margin-top:20px;"> '+
			       ' <div class="star-rating-top" style="width:49%">'+
			           ' <span>★</span>'+
			            '<span>★</span>'+
			           ' <span>★</span>'+
			           ' <span>★</span>'+
			          
			       ' </div>'+
			        '<div class="star-rating-bottom">'+
			          '  <span>★</span>'+
			           ' <span>★</span>'+
			           ' <span>★</span>'+
			           ' <span>★</span>'+
			        '</div>'+
			      '</div>'+
			    '</div>'+
                '<div style=" padding:5px;width:135px;height:265px;float:left;">'+
			    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">姓名:某某人</div>'+
			    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">性别:某某人</div>'+
			    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">年龄:某某人</div>'+
			    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">身高:某某人</div>'+
			    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">体重:某某人</div>'+
			    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">警号:某某人</div>'+
			    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">手机号:某某人</div>'+
			    '<div style="color:#59D9FF;font-size:12px; font-family: MicrosoftYaHei;height:25px;line-height:25px;">大部门:某某人</div>'+
			    '</div> '+
			    '<div style=" padding:5px;width:295px;height:265px;float:left;text-align:center;">'+
			    '<img src="../images/grczpt/home/ldt.png">'+
			    '</div> '+
				' </div>'/*+
                '</tpl>'*/
		);
		this.dataview = Ext.create('Ext.view.View',{
			store :this.store,
			tpl:tpl,
			itemSelector: 'div.grczpt-home-grid',
            listeners: {
                scope: this,                                                  
                
                itemclick:function(grid,record,item,index,e){
                	return this.showDWInfo(grid,record,item,index,e);
                }
            }
		})
		this.items=[this.dataview];
		
		this.bbar=Ext.create('Ext.Container',{});
		this.callParent(arguments);
	},
    afterRender: function () {
        this.callParent(arguments);
        var me =this;
        /*this.store.load({callback : function(){
    		for(var i=0;i<me.store.data.length;i++){
    		var DWBH = 	me.store.data.items[i].get('DWBH');
			var DWMC = me.store.data.items[i].get('DWMC');
			var DWJD = me.store.data.items[i].get('DWJD');
			var DWWD = me.store.data.items[i].get('DWWD');
			var DWWZ = me.store.data.items[i].get('DWWZ');
			var data={DWBH:DWBH};
			
			me.ocxobject.map.addMarker({ longitude: DWJD, latitude: DWWD },
					DWWZ,
                    {
                        centerx: 8,
                        centery: 16,
                        iconSrc: '../images/yjyd/map/dw/trouble.png',
                        iconHoverSrc: '../images/yjyd/map/dw/hover.png',
                        text: DWMC
                        
                    });
    		}
        }
		});*/
    },
    showDWInfo:function(grid,record,item,index,e){
    	
    	var me = this;
    	var target = e.getTarget();
    	if (e.type == 'click') {
    		/*var DWBH ='';
			var DWMC =''; 
			var DWWZ ='';
			var LDZX ='';
			var DWJD ='';
			var DWWD ='';
			var JKDWHB ='';
			var PICURL = '';
			me.store.each(function(record){
				DWBH = record.get('DWBH');
				DWMC = record.get('DWMC');
				DWWZ = record.get('DWWZ');
				LDZX = record.get('LDZX');
				DWJD = record.get('DWJD');
				DWWD = record.get('DWWD');
				JKDWHB = record.get('JKDWHB');
				PICURL =  record.get('PICURL');
			});*/
    		/*if (target.className.match('icon-edit')) {
    			//替换掉原来的地图
    			me.ocxobject.removeAll();
    			me.ocxobject.add(Ext.create('App.yjyd.Map.ShowDWInfo',{
    				width:'100%',
    				height:1000,
    				DWBH:DWBH,
    				DWMC:DWMC,
    				DWWZ:DWWZ,
    				LDZX:LDZX,
    				DWJD:DWJD,
    				DWWD:DWWD,
    				JKDWHB:JKDWHB,
    				PICURL:PICURL
    			})
    			);
    			
    			//打开新的浏览器界面
    			window.open('../yjyd/showdwinfo?DWBH='+DWBH,'dwinfo')
    		}*/
    			
    			
    		if (e.getTarget('.x-location')){
    			alert(record.get('DWBH'))
    			alert("在地图上显示点位")
    			this.ocxobject.map.addMarker({ longitude: record.get('DWJD'), latitude: record.get('DWWD') },
    					record.get('DWWZ'),
                        {
                            centerx: 8,
                            centery: 16,
                            iconSrc: '../images/yjyd/map/dw/trouble.png',
                            iconHoverSrc: '../images/yjyd/map/dw/hover.png',
                            text: record.get('DWMC')
                        });
    		}
    		
    	}
    	
    },
    showDW: function (store) {
    	var me = this;
    	/*store.each(function(record){
    		this.ocxobject.map.addMarker({ longitude: record.get('DWJD'), latitude: record.get('DWWD') },
				record.get('DWWZ'),
                {
                    centerx: 8,
                    centery: 16,
                    iconSrc: '../images/yjyd/map/dw/trouble.png',
                    iconHoverSrc: '../images/yjyd/map/dw/hover.png',
                    text: record.get('DWMC')
                });});*/
    }/*,
    onAJClick: function (index, data, target, e) {
    	
    	window.open('../yjyd/showdwinfo?DWBH='+data.DWBH,'dwinfo')
    }*/
    
});
